<?php
include dirname(__DIR__)."\db\dbmanager.php";
    $db = new DBManager();
    $action = json_decode(file_get_contents('php://input'), true)['action'];
    $items = [];
    switch ($action)
    {
        case 'products':
            $items = $db->getAllProducts()->fetchAll(PDO::FETCH_OBJ);
            $items = array_map(fn($value) => (object) array('db_id'=> $value->Id, 'title'=> $value->Title, 'price'=> $value->Price, 'image'=>'/images/knife1.jpg'), $items);
            break;
        case 'categories':
            $items = $db->getAllCategories()->fetchAll(PDO::FETCH_OBJ);
            break;
    }

    echo json_encode($items);