<?php

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");

    include_once '../config/Database.php';
    include_once '../models/Words.php';

    // Init Database
    $database = new Database();
    $db = $database -> connect();

    // Init News
    $words = new Words($db);

    // Call Update
    $words -> getMeaning();
    
?>