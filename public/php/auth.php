<?php
include dirname(__DIR__) . "\db\dbmanager.php";

session_start();
$args = json_decode(file_get_contents('php://input'), true);
if (isset($args["login"]) && isset($args["password"])) {
    $login = $args["login"];
    $password = $args["password"];
    try {
        $db = DBManager::getInstance();
        $user = $db->getUserByLogin($login);
        if (count($user) == 0) {
            echo "invalid login";
            return;
        }
        if ($user[0]["User_password"] != $password) {
            echo "invalid password";
            return;
        }
        $_SESSION["login"] = $login;
        setcookie("role", $user[0]["Role"], 0, "/");
        setcookie("login", $user[0]["User_login"], 0, "/");
        echo "success";
    } catch (SQLiteException $e) {
        echo "error";
    }

} else {
    echo "error";
}