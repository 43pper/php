<?php
include dirname(__DIR__) . "\db\dbmanager.php";

session_start();

if (!isset($_POST["data"]) || !$_FILES && !$_FILES["photo"]["error"] == UPLOAD_ERR_OK) {
    echo "error";
    return;
}

$args = json_decode($_POST["data"], true);

if (!isset($args["title"]) || !isset($args["category"]) || !isset($args["price"])
    || !isset($args["weight"]) || !isset($args["in_stock"])) {
    echo implode("|",$args);
    return;
}

//$login = $_SESSION["login"];
//$new_login = $args["new_login"];
$db = DBManager::getInstance();
//$user = $db->getUserByLogin($login);
//if (count($user) == 0) {
//    echo "invalid login";
//    return;
//}


$name = dirname(__DIR__) . "\images\\" . $_FILES["photo"]["name"];
move_uploaded_file($_FILES["photo"]["tmp_name"], $name);

echo($db->createProduct($args["title"], $args["price"], $args["weight"], $args["category"], "/images/" . $_FILES["photo"]["name"], $args["in_stock"]));