<?php

$files = array_diff(scandir('./txt'), array('.', '..'));

$assembly = [];

foreach ($files as $file) {

    $split = explode('_', $file);

    $key = strtolower($split[0]);
    $lang = strtolower($split[1]);

    if (!isset($assembly[$key])) {
        $assembly[$key] = [];
    }

    $assembly[$key][$lang] = $file;
}

//var_dump($assembly); exit;

//$langs = ['lv', 'eng', 'ru', 'de'];
$langs = ['eng'];
$template = file_get_contents('./template.json');
$id = 1;
foreach ($assembly as $item) {

    foreach ($langs as $lang) {
        $result = [];
        if (isset($item[$lang])) {
            $file = file_get_contents('./txt/' . $item[$lang]);
            $result = parseTXTFile($file);
        }

        $resultingJson = $template;

        $resultingJson = str_replace('{id}', $id, $resultingJson);
        $resultingJson = str_replace('{title}', $result['title'] ?? '', $resultingJson);
        $resultingJson = str_replace('{order}', $result['order'] ?? '', $resultingJson);
        $resultingJson = str_replace('{family}', $result['family'] ?? '', $resultingJson);

        if ($lang === 'lv') {
            $resultingJson = str_replace('{latinTitle}', '"latinTitle": "' . ($result['latinTitle'] ?? '') . '",', $resultingJson);
        } else {
            $resultingJson = str_replace('{latinTitle}', '', $resultingJson);
        }

        if (!empty($result['content'])) {

            $fact = array_pop($result['content']);
            $resultingJson = str_replace('{fact}', slashIt($fact['subject']), $resultingJson);
            $content = [];
            foreach ($result['content'] as $contentItem) {
                $content[] = '
                    {
                      "title": "' . $contentItem['title']. '",
                      "content": "' . slashIt($contentItem['subject']). '"
                    }
                ';
            };

            $resultingJson = str_replace('{content}', implode(',', $content), $resultingJson);

        } else {
            $resultingJson = str_replace('{content}', '', $resultingJson);
            $resultingJson = str_replace('{fact}', '', $resultingJson);
        }

        $resultingJsonOut = json_encode(json_decode($resultingJson), JSON_PRETTY_PRINT |  JSON_UNESCAPED_UNICODE);

//        var_dump($resultingJsonOut);

        $adjustedLang =  ($lang === 'eng') ? 'en' : $lang;

        $dir = 'output/'.$adjustedLang;
        $path = $dir.'/'.str_pad($id, 2, '0', STR_PAD_LEFT).'.json';

        if( !is_dir($dir) ) {
            mkdir($dir, 0777, true);
        }
  //      var_dump($resultingJsonOut);
       file_put_contents($path, $resultingJsonOut);

//        if ($resultingJsonOut === "null") {
//            var_dump($resultingJson);
//            exit;
//        }

        //exit;
    }

    $id++;
}


function parseTXTFile(string $input): array
{
    $data = [];
    $data['content'] = [];

    $lines = explode(PHP_EOL, $input);

    $index = 0;
    $contentTmpIndex = 0;
    $contentIndex = 0;
    foreach ($lines as $line) {

        $line = trim($line);

        //Title
        if ($index === 0 && empty($line)) { continue; }
        if ($index === 0) {
            $data['title'] = trim($line);
            $index++;
            continue;
        }
        //Latin Title
        if ($index === 1 && empty($line)) { continue; }
        if ($index === 1) {
            $data['latinTitle'] = trim($line);
            $index++;
            continue;
        }
        //Order
        if ($index === 2 && empty($line)) { continue; }
        if ($index === 2) {
            $order = explode(':', $line);
            $order = trim($order[1] ?? '');
            $data['order'] = $order;
            $index++;
            continue;
        }
        //Family
        if ($index === 3 && empty($line)) { continue; }
        if ($index === 3) {
            $family = explode(':', $line);
            $family = trim($family[1] ?? '');
            $data['family'] = $family;
            $index++;
            continue;
        }

        //Content
        if ($index >= 4 && empty($line) && $contentTmpIndex === 1) {
            $contentTmpIndex = 0;
            $contentIndex++;
            continue;
        }
        if ($index >= 4 && !empty($line) && $contentTmpIndex === 0) {
            $data['content'][$contentIndex] = [
                'title' => trim($line)
            ];
            $index++;
            $contentTmpIndex++;
            continue;
        }
        if ($index >= 4 && !empty($line) && $contentTmpIndex === 1) {
            if(!isset($data['content'][$contentIndex]['subject'])) {
                $data['content'][$contentIndex]['subject'] = '';
            }
            $data['content'][$contentIndex]['subject'] .= trim($line);
            $index++;
            continue;
        }
    }

    return $data;
}

function slashIt(string $str): string {
    return str_replace('"','\"', $str);
}