<template>
    <!-- <div>
        <McqQuestions />
    </div> -->
    <div>
        <ClozeQuestions />
    </div>
</template>

<script setup>
    import McqQuestions from '@/components/McqQuestions.vue';
    import ClozeQuestions from '@/components/ClozeQuestions.vue';
    import EssayQuestions from '@/components/EssayQuestions.vue';
    import { useUserStore } from '@/stores/UserStore';
    import router from '@/router';
    import { onMounted } from 'vue';
    const users = useUserStore();
    onMounted(() => {
        if (users.user.isAcademicCommittee === false) {
            router.push('/dashboard');
        }
    });
</script>