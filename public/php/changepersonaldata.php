<?php
include dirname(__DIR__) . "\db\dbmanager.php";

session_start();
$args = json_decode(file_get_contents('php://input'), true);
switch ($args["option"]) {
    case "password":
        changePassword($args);
        return;
    case "login":
        changeLogin($args);
        return;
    case "personal_data":
        changePersonalInformation($args);
        return;
}

function changeLogin($args)
{
    if (isset($args["new_login"])) {
        $login = $_SESSION["login"];
        $new_login = $args["new_login"];
        $db = DBManager::getInstance();
        $user = $db->getUserByLogin($login);
        if (count($user) == 0) {
            echo "invalid login";
            return;
        }
        $user = $db->getUserByLogin($new_login);
        if (count($user) != 0) {
            echo "duplicate login";
            return;
        }
        if ($db->updateLogin($login, $new_login) == "ok") {
            $_SESSION["login"] = $new_login;
            echo "success";
            return;
        }
    }
    echo "error";
}

function changePassword($args)
{
    if (isset($args["old_password"]) && isset($args["new_password"])) {
        $login = $_SESSION["login"];
        $old_password = $args["old_password"];
        $new_password = $args["new_password"];
        $db = DBManager::getInstance();
        $user = $db->getUserByLogin($login);
        if (count($user) == 0) {
            echo "invalid login";
            return;
        }
        if ($user[0]["User_password"] != $old_password) {
            echo "invalid password";
            return;
        }
        if ($db->updatePassword($login, $new_password) == "ok") {
            echo "success";
            return;
        }
    }
    echo "error";
}

function changePersonalInformation($args)
{
    if (isset($args["first_name"]) && isset($args["last_name"]) && isset($args["phone"]) && isset($args["email"])) {
        $login = $_SESSION["login"];
        $db = DBManager::getInstance();
        $user = $db->getUserByLogin($login);
        if (count($user) == 0) {
            echo "invalid login";
            return;
        }
        if ($db->updatePersonalInformation($login, $args["first_name"], $args["last_name"], $args["phone"], $args["email"]) == "ok") {
            echo "success";
            return;
        }
    }
    echo "error";
}