<?php

function listFiles(array $directories)
{
    $result = [];

    foreach ($directories as $directory) {
        $files = array_diff(scandir($directory), array('.', '..'));

        foreach ($files as $file) {
            $result[] = [
                'file' => $file,
                'path' => trim($directory) . '/' . $file,
            ];
        }
    }

    return $result;
}

$files = listFiles([
    './original/lv',
    './original/ru',
    './original/de',
    './original/en',
]);

foreach ($files as $file) {
    $inPath = $file["path"];
    $outfile = explode('.', $file['file'])[0] . '·' . 'txt';

    $result = '';
    $status = '';

    exec('docx2txt < ' . $inPath . ' > ./txt/' . $outfile, $result, $status);
    if ($status > 0) {
        var_dump($inPath);
    }
}