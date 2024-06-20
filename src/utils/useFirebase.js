import { ref } from "vue";
import { useToast } from "vue-toastification";
import { storage, birthdayCollectionRef } from "../firebase";
import {
  ref as storeRef,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDocs, query, where, deleteDoc, addDoc } from "firebase/firestore";

const toast = useToast();
const uploadProgress = ref(null);
const imageUrl = ref(null);
const updateConfirmation = ref(false);

const getExistingDocument = async (matricNumber) => {
  const q = query(
    birthdayCollectionRef,
    where("matricNumber", "==", matricNumber)
  );
  const querySnapshot = await getDocs(q);

  // If a document exists, return it
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0];
  }
  return null;
};

const createProfile = async (data) => {
  try {
    await addDoc(birthdayCollectionRef, data);
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error("Error adding birthday event", { timeout: 3000 });
  }
};

const uploadToFirebase = async (user, imageFile, storagePath, updating) => {
  try {
    const storageRef = storeRef(storage, storagePath);
    const existingDoc = await getExistingDocument(user.matricNumber);

    if (existingDoc && !updating) {
      toast.error(
        "You have already uploaded the birthday event for this user",
        { timeout: 3000 }
      );
      updateConfirmation.value = true;
    }

    if (existingDoc && updating) {
      await deleteDoc(existingDoc.ref);
      const existingImageRef = storeRef(storage, existingDoc.data().url);
      await deleteObject(existingImageRef);
    }

    // Upload the new image
    const uploadTask = uploadBytesResumable(storageRef, imageFile, {
      contentType: imageFile.type,
    });

    uploadProgress.value = 0;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        uploadProgress.value = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        toast.error(error.message, { timeout: 3000 });
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          const data = {
            matricNumber: user.matricNumber,
            fullName: user.fullName,
            classSet: user.classSet,
            level: user.level,
            url: downloadURL,
            birthMonth: user.birthdayMonth,
            birthDay: user.birthdayDay,
          };
          createProfile(data);
          uploadProgress.value = null;
          toast.success("Image uploaded successfully", { timeout: 3000 });
          imageUrl.value = downloadURL;
        } catch (error) {
          toast.error(error.message, { timeout: 3000 });
          return null;
        }
      }
    );
  } catch (error) {
    toast.error(error.message, { timeout: 3000 });
    return;
  }
  if (updateConfirmation.value) {
    return "Update Confirmation";
  }
  console.log(imageUrl.value)
  if (imageUrl.value) {
    return imageUrl.value;
  }
};

export { uploadToFirebase };
