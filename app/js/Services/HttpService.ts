import axios, {AxiosInstance, AxiosResponse} from "axios";

class HttpService {

    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://0.0.0.0:9001/",
            headers: {
                "Content-type": "text/html"
            }
        });
    }

    get(url: string): Promise<AxiosResponse<any>> {
        return this.axiosInstance.get(url);
    }
}

export default new HttpService();
