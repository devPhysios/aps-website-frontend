export const loginUser = async (email, password) => {
    try {
        const data = await fetch('https://api-mindwrite.onrender.com/api/v1/users/login', { // * Used this api as a dummy to check out.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const jsonData = await data.json()

        return jsonData
    
    } catch (err) {
        console.log(err)
    }
}