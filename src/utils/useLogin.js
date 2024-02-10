const loginUser = async () => {
    try {
        const data = await fetch('https://randomuser.me/api/')
        const jsonData = await data.json()
        // console.log(jsonData)
        return jsonData
    } catch (err) {
        console.log(err)
    }
}

export default loginUser