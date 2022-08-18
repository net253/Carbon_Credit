<?php
require_once('./libs/config.php');
$conn = new PDO("sqlsrv:server=$hostname; Database=$database", $username, $password);
session_start();

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod === "GET") {
    if (isset($_SESSION["username"]) && $_SESSION["timeout"] > time()) {
        $username = $_SESSION['username'];
        echo json_encode(["state" => true, "username" => $username]);
    } else {
        session_destroy();
        unset($_SESSION['username']);
        unset($_SESSION['timeout']);
        setcookie('username', '', time() - 1000);
        echo json_encode(["state" => false, "message" => "session timeout."]);
    }
}
