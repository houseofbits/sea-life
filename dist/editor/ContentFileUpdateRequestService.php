<?php

class ContentFileUpdateRequestService
{
    /**
     * @throws Exception
     */
    public function updateContentFromData($data)
    {
        $existingFileName = './content/' . $data->language . '/' . $data->sourceFileName;

        if (!is_writable($existingFileName)) {
            throw new Exception('Content file ' . $existingFileName . ' is not writable');
        }

        if (!file_exists($existingFileName)) {
            throw new Exception('Content file ' . $existingFileName . ' does not exist');
        }

        $existingFile = file_get_contents($existingFileName);

        if (empty($existingFile)) {
            throw new Exception('Content file ' . $existingFileName . ' cannot be read or is empty');
        }

        $jsonData = json_decode($existingFile, JSON_THROW_ON_ERROR);

        if (empty($jsonData)) {
            throw new Exception('Content file ' . $existingFileName . ' cannot be parsed or is empty');
        }

        if ($data->isBaseLanguage) {
            $jsonData['identifier'] = $data->formData->identifier;
            $jsonData['latinTitle'] = $data->formData->latinTitle;
            if (!empty($data->formData->videoUrl)) {
                $jsonData['videoFileName'] = $data->formData->videoUrl;
            }
        }
        $jsonData['title'] = $data->formData->title;
        $jsonData['order'] = $data->formData->order;
        $jsonData['family'] = $data->formData->family;
        $jsonData['content'] = $data->formData->content;
        $jsonData['fact'] = $data->formData->fact;

        $outputData = json_encode($jsonData,  JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        file_put_contents($existingFileName, $outputData);
    }
}