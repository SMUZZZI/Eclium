import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://45.84.226.30:5000'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("token")
    return config
})

instance.interceptors.response.use(
    (res) => {console.log(res.status); return res},
    (error) => {
        if (axios.isAxiosError(error)) {
            console.log(error);
            console.log(error.response?.data.errText);
        }
        else if (error instanceof Error) {
            console.log(error.message);
        }
    }
)


export default instance

