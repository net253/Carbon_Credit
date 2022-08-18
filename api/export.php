<?php
require_once('./libs/config.php');
$chkAuth = require('./libs/chk-auth.php');
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
    if (!empty($data) && $chkAuth()->state) {
        try {
            $zone = inVal($data->zone ?? "");
            $type = inVal($data->type ?? "");
            $treeAgeStart = $data->treeAgeStart ? inVal($data->treeAgeStart) : "0";
            $treeAgeEnd = $data->treeAgeEnd ? inVal($data->treeAgeStart) : "999";
            $regisDate = inVal($data->regisDate ?? "");

            $sql = "SELECT TREES_ID,TREES_CODE,TREES_NAME,SCIENTIFIC_NAME,PLANT_DATE,TREES_AGE,LATITUDE,LONGITUDE,CARBON_CREDIT,OTHER,ZONE,AREA FROM t_carbon_trees WHERE ";
            $sql .= "(TREES_AGE BETWEEN :treeAgeStart AND :treeAgeEnd)";
            $sql .= " AND ";
            $sql .= $zone ? "ZONE = :zone" : "ZONE != :zone";
            $sql .= " AND ";
            $sql .= $type ? "TREES_NAME = :type" : "TREES_NAME != :type";
            $sql .= " AND ";
            $sql .= $regisDate ? "PLANT_DATE = :regisDate" : "PLANT_DATE != :regisDate";
            $sql .= " ;";

            $stm = $conn->prepare($sql);
            $stm->execute(array(
                ":treeAgeStart" => $treeAgeStart,
                ":treeAgeEnd" => $treeAgeEnd,
                ":zone" => $zone,
                ":type" => $type,
                ":regisDate" => $regisDate
            ));
            $myExport = array();
            while ($row = $stm->fetchObject()) $myExport[] = $row;
            $stm->closeCursor();
            echo json_encode(["state" => true, "results" => $myExport]);
        } catch (PDOException $e) {
            echo json_encode(["state" => false, "message" => $e->getMessage()]);
        }
    }
}
