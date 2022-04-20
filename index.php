<?php
    function autoload($class){
        include "classes/" . $class . ".php";
    }

    spl_autoload_register("autoload");

    session_start();
    $page = new HomePage();
    $page->getPage();