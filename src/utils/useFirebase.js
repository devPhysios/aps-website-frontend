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
      updateConfirmation.value = true;
      return "updateConfirmation";
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

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          uploadProgress.value = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          toast.error(error.message, { timeout: 3000 });
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const data = {
              matricNumber: user.matricNumber,
              fullName: user.fullName,
              classSet: user.classSet,
              level: user.level,
              url: downloadURL,
              birthMonth: user.birthdayMonth,
              birthDay: user.birthdayDay,
            };
            await createProfile(data);
            uploadProgress.value = null;
            imageUrl.value = downloadURL;
            resolve(downloadURL);
          } catch (error) {
            toast.error(error.message, { timeout: 3000 });
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    toast.error(error.message, { timeout: 3000 });
    return null;
  }
};

const deleteUserProfileImage = async (imageUrl) => {
  const imageRef = storeRef(storage, imageUrl);
  await deleteObject(imageRef);
};

const deleteFromFirebase = async (matricNumber) => {
  try {
    const userProfileDoc = await getExistingDocument(matricNumber);
    if (userProfileDoc) {
      await deleteUserProfileImage(userProfileDoc.data().url);
      await deleteDoc(userProfileDoc.ref);
      return true;
    } else {
      toast.info("Profile not found... Cleaning up the Server");
      return true;
    }
  } catch (error) {
    toast.error(error.message);
    console.error("Error deleting user profile:", error);
    return false;
  }
};

export { uploadToFirebase, deleteFromFirebase };
