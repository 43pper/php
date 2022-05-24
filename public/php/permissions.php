<?php
include dirname(__DIR__)."\db\dbmanager.php";
session_start();
$db = new DBManager();
if(isset($_SESSION["login"])){
    $user = $db->getUserByLogin($_SESSION["login"]);
    if (count($user) == 0){
        echo json_encode((object) array("checkout" => false));
        return;
    }
    $user_role = $user[0]["Role"];
    switch ($user_role){
        case "USER":
            echo json_encode((object) array("checkout" => true));
            return;
        case "MODERATOR":
            echo json_encode((object) array("checkout" => true));
            return;
    }
}
else{
    echo json_encode((object) array("checkout" => false));
    return;
}