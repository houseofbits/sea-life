<?php
header('Content-Type: application/json');
header('Expires: Thu, 01-Jan-70 00:00:01 GMT');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');

$config = file_get_contents('config.json');
$config = json_decode($config);

$outputData = [];

foreach ($config->listItems as $lisItem) {
    $baseData = [];
    $additionalData = [];

    foreach ($config->languages as $language) {
        $data = json_decode(file_get_contents($language . '/' . $lisItem));
        if ($language === $config->baseLanguage) {
            $baseData = $data;
        } else {
            $additionalData[$language] = $data;
        }
    }

    $baseData->translatedItems = $additionalData;

    $outputData[] = $baseData;
}

echo json_encode($outputData, JSON_PRETTY_PRINT);


