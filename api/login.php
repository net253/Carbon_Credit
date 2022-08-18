<?php
require_once('./libs/config.php');
$logger = require('./libs/logger.php');
$conn = new PDO("sqlsrv:server=$hostname; Database=$database", $username, $password);
session_start();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$dataJson = file_get_contents('php://input');
$data = json_decode($dataJson);

function inVal($myInput)
{
    $detect = ["'", "#", "<", ">", "/", "+", "-", "--", "*", "="];
    return str_replace($detect, "", $myInput);
}

if ($requestMethod === "POST") {
    try {
        if (!empty($data)) {
            $username = inVal($data->username);
            $password = md5($data->password);
            $action = "login";

            $sqlChk = "SELECT USERNAME, PASSWORD FROM t_carbon_account WHERE USERNAME = :username ;";
            $result = $conn->prepare($sqlChk);
            $result->execute(array(":username" => $username));

            if ($result->rowCount() !== 0) {
                if ($password === $result->fetchObject()->PASSWORD) {
                    $result->closeCursor();
                    $cookieOptions = array(
                        'domain' => ($_SERVER['HTTP_HOST'] != 'localhost') ? $_SERVER['HTTP_HOST'] : false,
                        'secure' => false,
                        'expires' => time() + (60 * 60),
                        'path' => '/'
                    );
                    setcookie('username', $username, $cookieOptions);
                    $_SESSION["username"] = $username;
                    $_SESSION["timeout"] = time() + (60 * 60);
                    $logger($action);

                    echo json_encode(["state" => true, "username" => $username]);
                } else {
                    echo json_encode(["state" => false, "message" => "Username not found or password is incorrect."]);
                }
            } else {
                echo json_encode(["state" => false, "message" => "Username not found or password is incorrect."]);
            }
        }
    } catch (PDOException $e) {
        echo json_encode(["state" => false, "message" => $e->getMessage()]);
    }
}
