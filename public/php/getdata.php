<?php
include dirname(__DIR__) . "\db\dbmanager.php";
session_start();
$db = DBManager::getInstance();
$data = json_decode(file_get_contents('php://input'), true);
$action = $data['action'];
$items = [];
switch ($action) {
    case 'products':
        $items = $db->getAllProducts()->fetchAll(PDO::FETCH_ASSOC);
        $items = array_map(fn($value) => (object)['db_id' => $value['Id'],
            'title' => $value['Title'],
            'price' => $value['Price'],
            'image' => $value['Image'],
            'max_count' => $value['CountInStock']], $items);
        break;
    case 'categories':
        $items = $db->getAllCategories()->fetchAll(PDO::FETCH_OBJ);
        break;
    case 'purchases':
        $items = $db->getPurchaseByLogin($_SESSION["login"]);
        for ($i = 0; $i < count($items); $i++) {
            $items[$i]["Products"] = $db->getProductsByPurchase($items[$i]["Id"]);
        }
        break;
    case 'user':
        $items = $db->getUserByLogin($_SESSION["login"]);
        $items = array_map(fn($value) => (object)['User_login' => $value['User_login'],
            'FirstName' => $value['FirstName'],
            'LastName' => $value['LastName'],
            'Email' => $value['Email'],
            'Phone' => $value['Phone']], $items)[0];
        break;
    case 'quantity':
        $items = $db->getProductsCount($data["products"]);
        break;
}

echo json_encode($items);