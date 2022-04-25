<?php
function autoload($class){
    include "classes/" . $class . ".php";
}

spl_autoload_register("autoload");

session_start();

$deletedItem = json_decode(file_get_contents('php://input'), true);

$_SESSION[$deletedItem["id"]."_check"] = "off";
$_SESSION[$deletedItem["id"]."_num"] = 0;

$page = new BasketPage();
$page->getPage();