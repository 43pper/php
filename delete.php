<?php
function autoload($class){
    include "classes/" . $class . ".php";
}

spl_autoload_register("autoload");

session_start();

$_POST = json_decode(file_get_contents('php://input'), true);

$_SESSION[$_POST["id"]."_check"] = "off";
$_SESSION[$_POST["id"]."_num"] = 0;

$page = new BasketPage();
$page->getPage();