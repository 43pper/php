<?php
session_start();
function autoload($class){
    include "classes/" . $class . ".php";
}

spl_autoload_register("autoload");



foreach ($_POST as $item => $value){
    if (isset($_SESSION[$item]) && substr($item, 2) == "num") {
        $_SESSION[$item] = (int)$_SESSION[$item] + (int)$value;
    }
    else{
        $_SESSION[$item] = $value;
    }
}
$page = new BuyMessagePage();
$page->getPage();