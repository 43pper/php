<?php
include dirname(__DIR__)."\db\dbmanager.php";
session_start();

$db = new DBManager();
$data = json_decode(file_get_contents('php://input'), true);
$login = "";

if(isset($_SESSION["login"])){
    $login = $_SESSION["login"];
}
else{
    echo "Invalid login";
    return;
}

$user = $db->getUserByLogin($login);
if (count($user) == 0){
    echo "Invalid login";
    return;
}

$db->createPurchase($login,
    "DONE",
    date('Y-m-d H:i:s'),
    $data["firstname"],
    $data["middlename"],
    $data["surname"],
    $data["phone"],
    $data["email"],
    $data["cityRef"],
    $data["warehouseRef"],
    $data["basketItems"]);


echo "success";