<?php
include __DIR__."php/dbmanager.php";

    $db = new DBManager();
    $users = $db->getAllUsers();
    echo json_encode($users->fetchAll(PDO::FETCH_OBJ));
?>