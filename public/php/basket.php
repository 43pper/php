<?php
include "../db/dbmanager.php";

    $db = new DBManager();
    $users = $db->getAllUsers();
    foreach ($users as $user){
        print_r($user);
    }
?>