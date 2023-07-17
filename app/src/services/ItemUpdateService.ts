import HttpService from "@src/services/HttpService";
import EditItemFormValuesStructure from "@src/structures/EditItemFormValuesStructure";

class ItemUpdateService extends HttpService {

    async update(sourceFileName: string, isBaseLanguage: boolean, language: string, formData: EditItemFormValuesStructure, username: string, password: string): Promise<any> {
        let result = null;
        try {
            result = await this.axiosInstance.post('/edit.php', {sourceFileName, isBaseLanguage, language, formData, username, password});
        } catch (error: any) {
            throw new Error(error.response.statusText);
        }
    }

    async authenticate(username: string, password: string): Promise<any> {
        try {
            await this.axiosInstance.post('/edit.php', {authenticate:true, username, password});
        } catch (error: any) {
            throw new Error(error.response.statusText);
        }
    }
}

export default new ItemUpdateService();