<template>
  <aside
    class="custom-transition h-full w-full max-w-[110px] bg-white md:static md:max-w-60"
  >
    <div class="side-container">
      <div class="img relative">
        <img
          :src="previewImage || profilePicture || avatar"
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
      <!-- Third One -->
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

     <!-- Fourth One -->
<div v-if="allowedMatricNumbers.includes(user.matricNumber)">
  <RouterLink to="/dashboard/birthdayupload">
    <div class="sidemenu__items">
      <span class="text-[12px] md:text-[20px]">
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="birthday">
            <path
              fill="#FF5722"
              d="M22.5,3H21V2a1,1,0,0,0-1-1H19a1,1,0,0,0-1,1V3H14V2a1,1,0,0,0-1-1H12a1,1,0,0,0-1,1V3H7V2A1,1,0,0,0,6,1H5A1,1,0,0,0,4,2V3H2.5A1.5,1.5,0,0,0,1,4.5v18A1.5,1.5,0,0,0,2.5,24h20A1.5,1.5,0,0,0,24,22.5V4.5A1.5,1.5,0,0,0,22.5,3ZM19,2l1,0,0,3L19,5ZM12,2l1,0V3.44s0,0,0,.06,0,0,0,.07L13,5,12,5ZM5,2,6,2,6,5,5,5ZM2.5,4H4V5A1,1,0,0,0,5,6H6A1,1,0,0,0,7,5V4h4V5a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V4h4V5a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4h1.5a.5.5,0,0,1,.5.5V8H2V4.5A.5.5,0,0,1,2.5,4Zm20,19H2.5a.5.5,0,0,1-.5-.5V9H23V22.5A.5.5,0,0,1,22.5,23Z"
            />
            <path
              fill="#FF5722"
              d="M17.5,15H16V13.91a1.51,1.51,0,0,0,1-1.41c0-.58-.47-2.5-1.5-2.5S14,11.92,14,12.5a1.51,1.51,0,0,0,1,1.41V15H13V13.91a1.51,1.51,0,0,0,1-1.41c0-.58-.47-2.5-1.5-2.5S11,11.92,11,12.5a1.51,1.51,0,0,0,1,1.41V15H10V13.91a1.51,1.51,0,0,0,1-1.41c0-.58-.47-2.5-1.5-2.5S8,11.92,8,12.5a1.51,1.51,0,0,0,1,1.41V15H7.5a.5.5,0,0,0-.5.5v6a.5.5,0,0,0,.5.5h10a.5.5,0,0,0,.5-.5v-6A.5.5,0,0,0,17.5,15Zm-2-4A3.21,3.21,0,0,1,16,12.5a.5.5,0,0,1-1,0A3.21,3.21,0,0,1,15.5,11Zm-3,0A3.21,3.21,0,0,1,13,12.5a.5.5,0,0,1-1,0A3.21,3.21,0,0,1,12.5,11Zm-3,0A3.21,3.21,0,0,1,10,12.5a.5.5,0,0,1-1,0A3.21,3.21,0,0,1,9.5,11ZM17,16v1.27a2.53,2.53,0,0,1-1.52.73,2.11,2.11,0,0,1-1.23-.41A3.08,3.08,0,0,0,12.5,17a3.08,3.08,0,0,0-1.75.59A2.09,2.09,0,0,1,9.52,18,2.53,2.53,0,0,1,8,17.27V16ZM8,21V18.51A3.21,3.21,0,0,0,9.48,19a2.85,2.85,0,0,0,1.79-.56A2.16,2.16,0,0,1,12.5,18a2.16,2.16,0,0,1,1.23.44,3,3,0,0,0,1.66.56h.13A3.21,3.21,0,0,0,17,18.51V21Z"
            />
          </g>
        </svg>
      </span>
      <h3 class="text-[12px] md:text-[20px]">Upload Birthday Events</h3>
    </div>
  </RouterLink>
</div>

<!-- Fifth One -->
<div v-if="allowedMatricNumbers.includes(user.matricNumber)">
  <RouterLink to="/dashboard/birthday-manager">
    <div class="sidemenu__items">
      <span class="text-[12px] md:text-[20px]">
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g data-name="calendar movie" id="calendar_movie">
            <path
              fill="#4CAF50"
              d="M22.5,3H21V2a1,1,0,0,0-1-1H19a1,1,0,0,0-1,1V3H14V2a1,1,0,0,0-1-1H12a1,1,0,0,0-1,1V3H7V2A1,1,0,0,0,6,1H5A1,1,0,0,0,4,2V3H2.5A1.5,1.5,0,0,0,1,4.5v18A1.5,1.5,0,0,0,2.5,24h20A1.5,1.5,0,0,0,24,22.5V4.5A1.5,1.5,0,0,0,22.5,3ZM19,2l1,0,0,3L19,5ZM12,2l1,0V3.44s0,0,0,.06,0,0,0,.07L13,5,12,5ZM5,2,6,2,6,5,5,5ZM2.5,4H4V5A1,1,0,0,0,5,6H6A1,1,0,0,0,7,5V4h4V5a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V4h4V5a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4h1.5a.5.5,0,0,1,.5.5V8H2V4.5A.5.5,0,0,1,2.5,4Zm20,19H2.5a.5.5,0,0,1-.5-.5V9H23V22.5A.5.5,0,0,1,22.5,23Z"
            />
            <path
              fill="#4CAF50"
              d="M6,14H5v1.5A1.5,1.5,0,0,0,6.5,17H8V15.5A1.5,1.5,0,0,0,6.5,14ZM8,19H6.5A1.5,1.5,0,0,0,5,20.5V22H6.5A1.5,1.5,0,0,0,8,20.5ZM13.5,14H12V17h1.5A1.5,1.5,0,0,0,15,15.5V14Zm0,6H12v3h1.5A1.5,1.5,0,0,0,15,21.5V20ZM19,19H17.5A1.5,1.5,0,0,0,16,20.5V22H17.5A1.5,1.5,0,0,0,19,20.5ZM16,15.5V17h1.5A1.5,1.5,0,0,0,19,15.5V14H17.5A1.5,1.5,0,0,0,16,15.5ZM6,11.5V13H7.5A1.5,1.5,0,0,0,9,11.5V10H7.5A1.5,1.5,0,0,0,6,11.5Zm6,1.5h1.5A1.5,1.5,0,0,0,15,11.5V10H13.5A1.5,1.5,0,0,0,12,11.5ZM19,10H17.5A1.5,1.5,0,0,0,16,11.5V13h1.5A1.5,1.5,0,0,0,19,11.5ZM6,10H5V11.5A1.5,1.5,0,0,0,6.5,13H8V11.5A1.5,1.5,0,0,0,6.5,10ZM12,10H10.5A1.5,1.5,0,0,0,9,11.5V13h1.5A1.5,1.5,0,0,0,12,11.5ZM10.5,19H9V20.5A1.5,1.5,0,0,0,10.5,22H12V20.5A1.5,1.5,0,0,0,10.5,19ZM12,15.5V17h1.5A1.5,1.5,0,0,0,15,15.5V14H13.5A1.5,1.5,0,0,0,12,15.5ZM15,10H13.5A1.5,1.5,0,0,0,12,11.5V13h1.5A1.5,1.5,0,0,0,15,11.5ZM10.5,14H9V15.5A1.5,1.5,0,0,0,10.5,17H12V15.5A1.5,1.5,0,0,0,10.5,14Z"
            />
          </g>
        </svg>
      </span>
      <h3 class="text-[12px] md:text-[20px]">Birthday Events Manager</h3>
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
import { ref as vueRef, computed } from "vue";
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
const previewImage = vueRef(null);
const store = useUserStore();
const user = store.user;
const uploadProgress = vueRef(null);
const serverProgress = vueRef(null);
const allowedMatricNumbers = ["213569", "220978"];

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

  // Display the selected image
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
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
      "https://api.apsui.com/api/v1/dashboard/profile",
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
          previewImage.value = null; // Clear the preview after upload
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
