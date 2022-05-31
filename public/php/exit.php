<?php
include dirname(__DIR__) . "\db\dbmanager.php";

session_start();
$args = json_decode(file_get_contents('php://input'), true);
if (isset($_SESSION["login"])) {
    $db = new DBManager();
    $user = $db->getUserByLogin($_SESSION["login"]);
    if (count($user) == 0) {
        echo "invalid login";
        return;
    }

    unset($_SESSION["login"]);
    setcookie("role", "", 0, "/");
    setcookie("login", "", 0, "/");
    echo "success";
} else {
    echo "error";
}