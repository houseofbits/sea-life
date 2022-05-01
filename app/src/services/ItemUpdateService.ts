import HttpService from "@src/services/HttpService";
import EditItemFormValuesStructure from "@src/structures/EditItemFormValuesStructure";

class ItemUpdateService extends HttpService {

    async update(sourceFileName: string, isBaseLanguage: boolean, language: string, formData: EditItemFormValuesStructure): Promise<any> {
        let result = null;
        try {
            result = await this.axiosInstance.post('/edit.php', {sourceFileName, isBaseLanguage, language, formData});
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export default new ItemUpdateService();