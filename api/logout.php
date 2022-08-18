<?php
require_once('./libs/config.php');
$logger = require('./libs/logger.php');
$conn = new PDO("sqlsrv:server=$hostname; Database=$database", $username, $password);
session_start();

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "GET") {
    try {
        if (isset($_SESSION["username"])) {
            $username = $_SESSION["username"];
            $action = "logout";
            $logger($action);
        }

        session_destroy();
        unset($_SESSION['username']);
        unset($_SESSION['timeout']);
        setcookie('username', '', time() - 1000);

        echo json_encode(["state" => true, "message" => "logout Successfully"]);
    } catch (PDOException $e) {
        echo json_encode(["state" => false, "message" => $e->getMessage()]);
    }
}
