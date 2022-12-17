<?php
spl_autoload_register(function ($class_name) {
    include './editor/' . $class_name . '.php';
});

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    $rawdata = json_decode(file_get_contents("php://input"));
    $service = new ContentFileUpdateRequestService();

    try {
        $service->updateContentFromData($rawdata);
    } catch (Exception $e) {
        header('Status: 400 ' . $e->getMessage());
        exit;
    }

    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <script defer src="/edit.js"></script>
    <link href="/edit.css" rel="stylesheet">
</head>
<body>
<div id="gui"></div>
</body>
</html>


