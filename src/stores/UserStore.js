import { defineStore } from 'pinia'
import { ref } from 'vue'

import loginUser from '@/utils/useLogin'

export const useUserStore = defineStore('UserStore', () => {
    const user = ref(null)

    const login = () => {
        // console.log(loginUser)
        user.value = loginUser()
        // console.log(user.value)
    }

    const signup = () => {
        console.log('signup')
    }

    const logout = () => {
        console.log('logout')
    }

    return { user, login, signup, logout }
})