<?php
include dirname(__DIR__) . "\db\dbmanager.php";

session_start();

$db = DBManager::getInstance();
$db->resetStatistics();

$ip = $_SERVER['REMOTE_ADDR'];
$data = $db->updateStatistics($ip);
output_img($data["hosts"], $data["hits"], $data["total"]);

function output_img($hosts, $hits, $total)
{
    $img = imagecreatefrompng('bg.png');
    $color = ImageColorAllocate($img, 0, 0, 0);
    Imagestring($img, 5, 10, 10, $hosts.' hosts', $color);
    Imagestring($img, 5, 10, 25, $hits.' hits', $color);
    Imagestring($img, 5, 10, 40, $total.' total', $color);
    header("Content-type: image/png");
    ImagePng($img);
}
