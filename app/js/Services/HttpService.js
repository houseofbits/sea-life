import axios from "axios";

class HttpService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://0.0.0.0:9001/",
            headers: {
                "Content-type": "text/html"
            }
        });
    }

    /**
     * @param {string} url
     * @returns {Promise<AxiosResponse<any>>}
     */
    get(url) {
        return this.axiosInstance.get(url);
    }
}

export default new HttpService();
