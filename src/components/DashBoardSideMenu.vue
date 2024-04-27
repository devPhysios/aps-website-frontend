<template>
  <aside
    class="custom-transition w-[100px] bg-white pt-[10px] md:static md:w-60 md:pt-8"
  >
    <div class="side-container">
      <div class="img relative">
        <img
          :src="profilePicture || avatar"
          :alt="store.user.firstName"
        />
        <div
          v-if="editImage"
          class="flex flex-col items-center w-full mx-auto gap-2"
        >
          <input
            type="file"
            class="box-border border-0 w-[90%] mx-auto focus:outline-0 text-[12px]"
            @change="handleFileChange"
          />
          <button
            class="custom-transition text-[12px] rounded py-1 px-[2px] text-white bg-blue-400 w-[90%] md:text-[18px] hover:bg-blue-500"
            type="button"
            @click="handleUpload"
          >
            Upload Image
          </button>
        </div>
        <div
          v-if="uploadProgress !== null"
          class="w-full bg-gray-200 rounded-full h-2.5"
        >
          <div
            class="bg-blue-600 h-2.5 rounded-full"
            :style="{ width: `${uploadProgress}%` }"
          >
            {{ uploadProgress }}%
          </div>
        </div>
        <div
          v-if="serverProgress !== null"
          class="w-full bg-gray-200 rounded-full h-2.5"
        >
          <div
            class="bg-green-600 h-2.5 rounded-full"
            :style="{ width: `${serverProgress}%` }"
          >
            {{ serverProgress }}%
          </div>
        </div>
        <span
          title="Upload Image"
          @click="editImage = !editImage"
          class="absolute top-[-6px] right-2 text-gray-500 md:text-xl cursor-pointer md:right-8 md:top-[-2px]"
        >
          <i class="bi bi-pencil-square"></i>
        </span>
      </div>
      <!-- First One -->
      <RouterLink to="/dashboard">
        <div class="sidemenu__items">
          <span class="text-[12px] md:text-[20px]">
            <i class="bi bi-ui-checks-grid"></i>
          </span>
          <h3 class="text-[12px] md:text-[20px]">Dashboard</h3>
        </div>
      </RouterLink>
      <!-- Second One -->
      <RouterLink to="/payment">
        <div class="sidemenu__items">
          <span class="text-[12px] md:text-[20px]">
            <i class="bi bi-cash-stack"></i>
          </span>
          <h3 class="text-[12px] md:text-[20px]">Payment</h3>
        </div>
      </RouterLink>
      <!-- Third One & Fourth One -->
      <div v-if="store.user.isAcademicCommittee">
        <RouterLink to="/dashboard/uploadquestion">
          <div class="sidemenu__items">
            <span class="text-[12px] md:text-[20px]">
              <i class="bi bi-patch-question"></i>
            </span>
            <h3 class="text-center text-[12px] md:text-[20px]">
              Upload Questions
            </h3>
          </div>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import { ref as vueRef, onMounted, computed } from "vue";
import { storage, imagesCollectionRef } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import axios from "axios";

const toast = useToast();
const imageFile = vueRef(null);
const editImage = vueRef(false);
const store = useUserStore();
const user = store.user;
const uploadProgress = vueRef(null);
const serverProgress = vueRef(null);

const profilePicture = computed(() => {
  try {
    if (store.user.profilePicture) {
      new URL(store.user.profilePicture);
      return store.user.profilePicture;
    }
  } catch (error) {
    console.error("Error loading profile picture:", error);
  }
  return avatar;
});

const getExistingDocument = async (matricNumber) => {
  const q = query(
    imagesCollectionRef,
    where("matricNumber", "==", matricNumber)
  );
  const querySnapshot = await getDocs(q);

  // If a document exists, return it
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0];
  }

  // If no document exists, return null
  return null;
};

const avatar = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`;

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const fileSize = file.size / 1024; // Size in KB
  const fileType = file.type;

  if (fileSize > 1000) {
    toast.error("File size must not exceed 1MB", { timeout: 3000 });
    imageFile.value = null;
    return;
  }

  if (
    fileType !== "image/jpeg" &&
    fileType !== "image/png" &&
    fileType !== "image/jpg"
  ) {
    toast.error("File must be an image (JPEG, PNG, or JPG)", { timeout: 3000 });
    imageFile.value = null;
    return;
  }
  imageFile.value = file;
};

const createProfile = async (data) => {
  try {
    await addDoc(imagesCollectionRef, data);
  } catch (error) {
    console.error("Error adding document: ", error);
    toast.error("Error updating image", { timeout: 3000 });
  }
};

const sendToServer = async (imgURL) => {
  serverProgress.value = 0;
  try {
    const token = localStorage.getItem("studentToken");
    const progressHandler = (event) => {
      serverProgress.value = Math.round((100 * event.loaded) / event.total);
    };

    const response = await axios.patch(
      "https://aps-website-backend.onrender.com/api/v1/dashboard/profile",
      {
        profilePicture: imgURL,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: progressHandler,
      }
    );
    if (response.status === 200) {
      store.updateProfilePicture(imgURL);
      toast.success("Profile picture updated successfully", { timeout: 3000 });
    } else {
      toast.error("Error updating profile picture", { timeout: 3000 });
    }
    serverProgress.value = null;
  } catch (error) {
    serverProgress.value = null;
    toast.error("Error sending image link to backend", { timeout: 3000 });
  }
};

const handleUpload = () => {
  editImage.value = false;
  if (imageFile.value.size > 1024000) {
    console.log(imageFile.value.size)
    toast.error("File size must not exceed 1MB", { timeout: 3000 });
    imageFile.value = null;
    return;
  }

  if (
    imageFile.value.type !== "image/jpeg" &&
    imageFile.value.type !== "image/png" &&
    imageFile.value.type !== "image/jpg"
  ) {
    toast.error("File must be an image (JPEG, PNG, or JPG)", { timeout: 3000 });
    imageFile.value = null;
    return;
  }

  if (!imageFile.value) {
    toast.error("No file selected", { timeout: 3000 });
    return;
  }

  const { name, type } = imageFile.value;
  const storageRef = ref(storage, `images/${name}`);

  // Check if a document with the same matricNumber exists
  getExistingDocument(user.matricNumber).then(async (existingDoc) => {
    if (existingDoc) {
      // If a document exists, delete the existing document and image
      await deleteDoc(existingDoc.ref);
      const existingImageRef = ref(storage, existingDoc.data().url);
      await deleteObject(existingImageRef);
    }
    // Upload the new image
    const uploadTask = uploadBytesResumable(storageRef, imageFile.value, {
      contentType: type,
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            matricNumber: user.matricNumber,
            fullName: `${user.firstName} ${user.lastName}`,
            set: user.classSet,
            url: downloadURL,
          };
          createProfile(data);
          uploadProgress.value = null;
          sendToServer(downloadURL);
          toast.success("Image uploaded successfully", { timeout: 3000 });
        });
      }
    );
  });
};
</script>

<style scoped>
.side-container {
  @apply flex flex-col gap-4 w-full h-full rounded-tr-lg md:rounded-tr-none md:gap-6;
}

.sidemenu__items {
  @apply border-b border-b-gray-100 min-w-full flex flex-col items-center gap-px font-medium text-gray-500 py-2 px-4 hover:shadow md:flex-row md:gap-2;
}

img {
  @apply w-[80px] h-[80px] rounded-full object-cover mx-auto mb-10 md:w-[200px] md:h-[200px];
}
</style>
