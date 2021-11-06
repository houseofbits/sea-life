import axios from "axios";

class HttpService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://0.0.0.0:9001/content",
            headers: {
                "Content-type": "text/html"
            }
        });
    }

    /**
     * @param {number} id
     * @param {string} lang
     * @returns {Promise<AxiosResponse<any>>}
     */
    get(id, lang) {
        return this.axiosInstance.get(id.toString().padStart(2, '0') + '-' + lang + '.html');
    }
}

export default new HttpService();
