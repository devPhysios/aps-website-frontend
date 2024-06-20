import imageCompression from "browser-image-compression";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const compressionProgress = ref(0);

const compressImage = async (imageFile) => {
  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
  };
  try {
    toast.info("Compressing image...", 800);
    const intervalId = setInterval(() => {
      if (compressionProgress.value < 90) {
        compressionProgress.value += 10;
      }
    }, 100);
    const compressedFile = await imageCompression(imageFile, options);
    clearInterval(intervalId);
    compressionProgress.value = 100;
    return compressedFile;
  } catch (error) {
    console.error("Compression or upload error:", error);
    toast.error("Failed to compress image. Please try again.");
    compressionProgress.value = 0;
    return null;
  }
};


export {compressImage}