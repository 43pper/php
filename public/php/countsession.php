<?php
session_start();
if (!isset($_SESSION['counted']) || $_SESSION['counted']) {
    $agent = $_SERVER['HTTP_USER_AGENT'];
    $uri = $_SERVER['REQUEST_URI'];
    $user = $_SERVER['PHP_AUTH_USER'];
    $ip = $_SERVER['REMOTE_ADDR'];
    $ref = $_SERVER['HTTP_REFERER'];
    $dtime = date('r');
    if (!$ref) {
        $ref = "Ні";
    }
    if (!$user) {
        $user = "Ні";
    }
    $entry_line = "$dtime - IP: $ip | Agent: $agent | URL: $uri | Referrer: $ref | Username: $user \n";
    $fp = fopen("logs.txt", "a");
    fputs($fp, $entry_line);
    fclose($fp);
    $_SESSION['counted'] = true;
}