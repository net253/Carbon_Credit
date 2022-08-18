<?php
require_once('./libs/config.php');
$chkAuth = require('./libs/chk-auth.php');
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

//Overview
if ($requestMethod === "GET") {
    try {
        $filter = inVal($_GET["filter"] ?? "");

        $sqlTreeType = "SELECT TREES_NAME, COUNT(TREES_NAME) AS TreeType FROM t_carbon_trees GROUP BY TREES_NAME ORDER BY TreeType DESC ;";
        $sqlTreeVolume = "SELECT * FROM v_raw_graph ;";
        $sqlCarbonCredit = "SELECT * FROM v_cumulative ;";
        $sqlLayout = "SELECT * FROM v_area_total ;";
        $sqlOverview = "SELECT TREES_ID, TREES_CODE, TREES_NAME, SCIENTIFIC_NAME, PLANT_DATE, TREES_AGE, LATITUDE, LONGITUDE, C_ZONE, OTHER, ZONE, AREA, TYPE, CIRCUMFERENCE, HEIGHT FROM v_cc_zone WHERE TREES_NAME ";
        $sqlOverview .= $filter ? " = :filter ;" : " != :filter ;";

        $stmTreeType = $conn->query($sqlTreeType);
        $stmTreeVolume = $conn->query($sqlTreeVolume);
        $stmCarbonCredit = $conn->query($sqlCarbonCredit);
        $stmLayout = $conn->query($sqlLayout);
        $stmOverview = $conn->prepare($sqlOverview);
        $stmOverview->execute(array(":filter" => $filter));

        $treeType = array();
        $treeVolume = array();
        $carbonCredit = array();
        $layout = array();
        $overview = array();

        while ($row = $stmTreeType->fetchObject()) $treeType[] = $row;
        while ($row = $stmTreeVolume->fetchObject()) $treeVolume[] = $row;
        while ($row = $stmCarbonCredit->fetchObject()) $carbonCredit[] = $row;
        while ($row = $stmLayout->fetchObject()) $layout[] = $row;
        while ($row = $stmOverview->fetchObject()) $overview[] = $row;

        $stmTreeType->closeCursor();
        $stmTreeVolume->closeCursor();
        $stmCarbonCredit->closeCursor();
        $stmLayout->closeCursor();
        $stmOverview->closeCursor();

        echo json_encode([
            "state" => true,
            "results" => [
                "treeType" => $treeType,
                "treeVolume" => $treeVolume,
                "carbonCredit" => $carbonCredit,
                "layout" => $layout,
                "overview" => $overview
            ]
        ]);
    } catch (PDOException $e) {
        echo json_encode(["state" => false, "message" => $e->getMessage()]);
    }
}
