import Axios from 'axios'

// process.env.NODE_ENV = 'production';
let apiUrl = process.env.NODE_ENV === 'production' ? 'https://mighty-wildwood-47895.herokuapp.com/' : 'http://localhost:3001/'
// const environment = {
//       production: true,
//       apiUrl: "https://mighty-wildwood-47895.herokuapp.com/"
//     }
    

// export const BASE_URL = environment.apiUrl
export const BASE_URL = apiUrl

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use((config) => {
    //reading our LS Token
    const token = localStorage.getItem('token')
    
if (token) {
    config.headers['authorization'] = `Bearer ${token}`
}
return config
},
    (error) => Promise.reject(error)
)

export default Client



// import Axios from "axios";

// export const BASE_URL = "http://localhost:3001";

// const Client = Axios.create({ baseURL: BASE_URL });

