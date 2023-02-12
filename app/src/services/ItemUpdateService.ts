import HttpService from "@src/services/HttpService";
import EditItemFormValuesStructure from "@src/structures/EditItemFormValuesStructure";

class ItemUpdateService extends HttpService {

    async update(sourceFileName: string, isBaseLanguage: boolean, language: string, formData: EditItemFormValuesStructure, password: string): Promise<any> {
        let result = null;
        try {
            result = await this.axiosInstance.post('/edit.php', {sourceFileName, isBaseLanguage, language, formData, password});
        } catch (error: any) {
            throw new Error(error.response.statusText);
        }
    }

    async authenticate(password: string): Promise<any> {
        try {
            await this.axiosInstance.post('/edit.php', {authenticate:true, password});
        } catch (error: any) {
            throw new Error(error.response.statusText);
        }
    }
}

export default new ItemUpdateService();