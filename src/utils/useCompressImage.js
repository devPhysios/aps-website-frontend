import imageCompression from "browser-image-compression";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const compressionProgress = ref(0);

const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calculate the new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, { type: "image/webp" }));
      }, "image/webp");
    };
    img.src = URL.createObjectURL(file);
  });
};

const compressImage = async (imageFile) => {
  const options = {
    maxSizeMB: 0.6, // Reduced to 600KB as per Facebook's recommendation
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
  };

  try {
    toast.info("Compressing image...", { timeout: 500 });
    const intervalId = setInterval(() => {
      if (compressionProgress.value < 90) {
        compressionProgress.value += 10;
      }
    }, 100);

    let compressedFile = await imageCompression(imageFile, options);
    clearInterval(intervalId);

    // Resize the image to fit Facebook's recommendations
    const resizedFile = await resizeImage(compressedFile, 1125, 600);
    
    compressionProgress.value = 100;
    return resizedFile;
  } catch (error) {
    console.error("Compression or upload error:", error);
    toast.error("Failed to compress image. Please try again.");
    compressionProgress.value = 0;
    return null;
  }
};

export { compressImage };