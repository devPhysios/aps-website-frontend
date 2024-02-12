import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('UserStore', () => {
    const user = ref(null || localStorage.getItem("userSaved"))

    const login = (data) => {
        try {
            localStorage.setItem("userSaved", JSON.stringify(data))
            user.value = localStorage.getItem("userSaved")
        } catch (err) {
            console.log(err)
        }
    }

    const logout = () => {
        try {
            localStorage.clear()
        } catch (err) {
            console.log(err)
        }
    }

    return { user, login, logout }
})