import axios, {AxiosInstance, AxiosResponse} from "axios";
import DetailListItem from "@src/structures/DetailListItem";

export default class HttpService {

    axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: window.location.origin,      //"http://beta.dizainsuninterjers.lv/",//http://0.0.0.0:9001/",
            headers: {
                'Content-type': 'text/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        });
    }

    async get(url: string): Promise<any> {
        let result = null;
        try {
            result = await this.axiosInstance.get('/content/' + url);
        }catch (e: any) {
            throw new Error("Failed to load 'content/" + url + "'. " + e.message);
        }

        if (typeof result.data === 'string'){
            try {
                return JSON.parse(result.data);
            } catch (e: any) {
                throw new Error("Failed to parse JSON data for 'content/" + url + "'. " + e.message)
            }
        }

        if (typeof result.data === 'object') {
            return result.data;
        }

        throw new Error("Unknown data type for fetched result of 'content/" + url + "'");
    }

    getContent(language: string, filename: string): Promise<any> {
        return this.get(language + '/' + filename);
    }

    // async getList(language: string = 'lv'): Promise<Array<DetailListItem>> {
    //     const response = await this.get('content/' + language + '/list.json');
    //     const listItems = [];
    //     for (const params of response.data.itemsList) {
    //         listItems.push(
    //             new DetailListItem(params)
    //         );
    //     }
    //     return listItems;
    // }
    //
    // async getDetail(id: number): Promise<any> {
    //
    // }

}
