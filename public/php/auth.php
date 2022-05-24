<?php
include dirname(__DIR__)."\db\dbmanager.php";

session_start();
$args = json_decode(file_get_contents('php://input'), true);
if( isset($args["login"]) && isset($args["password"]) )
{
    $login = $args["login"];
    $password = $args["password"];
    $db = new DBManager();
    $user = $db->getUserByLogin($login);
    if (count($user) == 0){
        echo "Invalid login";
        return;
    }
    if ($user[0]["User_password"] != $password){
        echo "Invalid password";
        return;
    }
    $_SESSION["login"] = $login;
    echo "success";
} else {
    echo "error";
}