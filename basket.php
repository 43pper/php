<?php
    session_start();
    function autoload($class){
        include "classes/" . $class . ".php";
    }

    spl_autoload_register("autoload");

    $page = new BasketPage();
    $page->getPage();