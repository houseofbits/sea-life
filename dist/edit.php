<?php
$ts = gmdate("D, d M Y H:i:s") . " GMT";
header("Expires: $ts");
header("Last-Modified: $ts");
header("Pragma: no-cache");
header("Cache-Control: no-cache, must-revalidate");

spl_autoload_register(function ($class_name) {
    include './editor/' . $class_name . '.php';
});

$encoded_passphrase = '$2y$10$an9ZyXTrqC1F9a04dcTpLOR/yxXhIUfRijM6dlr2bRqp5hVlb1GA.';
//var_dump(password_hash('krists', PASSWORD_DEFAULT));

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])
    && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    $rawdata = json_decode(file_get_contents("php://input"));
    $service = new ContentFileUpdateRequestService();

    if (!password_verify($rawdata->password, $encoded_passphrase)) {
        header('Status: 403 Access denied');
        exit;
    }

    if ($rawdata->authenticate) {
        exit;
    }

    try {
        $service->updateContentFromData($rawdata);
        exit;
    } catch (Exception $e) {
        header('Status: 400 ' . $e->getMessage());
        exit;
    }
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


