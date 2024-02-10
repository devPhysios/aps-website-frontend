<template>
    <div class="container mx-auto p-8">
        <h1 class="text-2xl font-bold mb-4">Upload to Gallery</h1>

        <input type="file" @change="handleImageUpload" />

        <div v-if="imageUrl" class="mt-4">
            <img :src="imageUrl" class="w-64" />
            <input type="text" v-model="title" placeholder="Image Title" class="mt-2" />
            <input type="text" v-model="description" placeholder="Description" class="mt-2" />
            <button @click="submitData" class="mt-2 bg-blue-500 text-white px-4 py-2">Submit</button>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const imageFile = ref(null);
const imageUrl = ref(null);
const title = ref('');
const description = ref('');

const handleImageUpload = (event) => {
    imageFile.value = event.target.files[0];
    uploadToCloudinary();
}

const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', imageFile.value);
    formData.append('upload_preset', 'h6mtoaot'); // Create an upload preset in Cloudinary

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dp4sbuifi/image/upload`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        imageUrl.value = response.data.secure_url;
        console.log(imageUrl.value);
    } catch (error) {
        console.error('Cloudinary upload error:', error);
    }
};


const submitData = async () => {
    try {
        await axios.post('http://localhost:8800/api/v1/gallery', {
            imageUrl: imageUrl.value,
            title: title.value,
            description: description.value
        });
        console.log('Data submitted successfully!');
    } catch (error) {
        console.error('Submission error:', error);
    }
}
</script>

<style></style>