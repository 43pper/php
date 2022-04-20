<?php
function autoload($class){
    include "classes/" . $class . ".php";
}

spl_autoload_register("autoload");

session_start();

$_SESSION = $_POST;
$page = new BuyMessagePage();
$page->getPage();