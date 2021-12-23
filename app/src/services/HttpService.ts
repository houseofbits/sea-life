import axios, {AxiosInstance, AxiosResponse} from "axios";
import DetailListItem from "@src/structures/DetailListItem";

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

    async getList(language: string = 'lv'): Promise<Array<DetailListItem>> {
        const response = await this.get('content/' + language + '/list.json');
        const listItems = [];
        for (const params of response.data.list) {
            listItems.push(
                new DetailListItem(params)
            );
        }
        return listItems;
    }

    async getDetail(id: number): Promise<any> {

    }

}

export default new HttpService();
