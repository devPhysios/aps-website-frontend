<template>
    <div class="grid gap-3 sm:divide-aps-green overflow-hidden rounded-lg md:bg-gray-200 md:shadow md:grid md:grid-cols-2 md:gap-px md:divide-y-0">
        <div class="shadow rounded rounded-tl-lg rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500">
            <div>
                <span class="inline-flex rounded-lg p-3 bg-teal-50 text-teal-700 ring-white">
                    <svg class="w-6 h-6" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </span>
            </div>
            <div class="mt-8">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                    <RouterLink to="/profile" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Account Information
                    </RouterLink>
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                    View Your Full Profile Information.
                </p>
            </div>
            <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path>
                </svg>
            </span>
        </div>
        <div class="shadow rounded sm:rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500">
            <div>
                <span class="inline-flex rounded-lg p-3 bg-teal-50 text-teal-700 ring-white">
                    <svg class="w-6 h-6" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </span>
            </div>
            <div class="mt-8">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                    <RouterLink to="#" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Question Bank
                    </RouterLink>
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                    Check out the question bank.
                </p>
            </div>
            <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path>
                </svg>
            </span>
        </div>
        <div class="shadow rounded sm:rounded-tl-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500">
            <div>
                <span class="inline-flex rounded-lg p-3 bg-teal-50 text-teal-700 ring-white">
                    <svg class="w-6 h-6" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </span>
            </div>
            <div class="mt-8">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                    <RouterLink to="/constitution" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Constitution
                    </RouterLink>
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                    Get acquainted with the APS Constitution.
                </p>
            </div>
            <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path>
                </svg>
            </span>
        </div>
        <div class="shadow rounded sm:rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-inset focus-within:ring-indigo-500">
            <div>
                <span class="inline-flex rounded-lg p-3 bg-teal-50 text-teal-700 ring-white">
                    <svg class="w-6 h-6" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </span>
            </div>
            <div class="mt-8">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                    <RouterLink to="#" class="focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true"></span>
                        Orange Book
                    </RouterLink>
                </h3>
                <p class="mt-2 text-sm text-gray-500">
                    Get Course Requirements and Information about every course.
                </p>
            </div>
            <span class="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"></path>
                </svg>
            </span>
        </div>
    </div>
</template>