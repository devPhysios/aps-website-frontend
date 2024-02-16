<template>
    <div class="p-1 md:p-6 font-display my-8 mx-4 md:m-8 bg-yellow-200 rounded-md">
        <div class="">
            <p class="font-bold text-center text-2xl md:text-4xl ">Past Presidents</p>
        </div>
        <div class=" p-1 md:p-6 my-8 mx-4 md:m-8 text-base md:text-2xl">
            <table class="table-fixed border-separate border-spacing-2 border border-slate-100 mx-auto w-full text-center">
                <thead>
                    <tr>
                    <th class="border border-slate-200">Name</th>
                    <th class="border border-slate-200">Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="border border-slate-200">{{ item.name }}</td> <td class="border border-slate-200">{{ item.tenure }}</td>
                    </tr>
                    <tr>
                    <td class="border border-slate-200">Witchy Woman</td>
                    <td class="border border-slate-200">1972</td>
                    </tr>
                    <tr>
                    <td class="border border-slate-200">Shining Star</td>
                    <td class="border border-slate-200">1975</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script setup>
// Import any required libraries, e.g., for date formatting

// Define your data array
const tableData = [
  { name: 'John Doe', tenure: 30 },
  { name: 'Jane Smith', tenure: 25 },
  // Add more objects as needed
];

// Additional functions for formatting, sorting, etc. (optional)
</script>