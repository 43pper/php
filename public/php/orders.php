<?php
include dirname(__DIR__) . "\db\dbmanager.php";

session_start();

$db = DBManager::getInstance();
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($_SESSION["login"])) {
    echo "invalid login";
    return;
}

$login = $_SESSION["login"];

$db = DBManager::getInstance();
$user = $db->getUserByLogin($login);
if (count($user) == 0) {
    echo "invalid login";
    return;
}

switch ($data["action"]) {
    case "create":
        createPurchase($db, $login, $data);
        break;
    case "delete":
        deletePurchase($db, $login, $data);
        break;
}


function createPurchase($db, $login, $data)
{
    echo $db->createPurchase($login,
        "PROCESSED",
        date('Y-m-d H:i:s'),
        $data["firstname"],
        $data["middlename"],
        $data["surname"],
        $data["phone"],
        $data["email"],
        $data["cityRef"],
        $data["warehouseRef"],
        $data["cityName"],
        $data["warehouseName"],
        $data["basketItems"]);
}

function deletePurchase($db, $login, $data)
{
    echo $db->deletePurchase($login, $data["purchase_id"]);
}
