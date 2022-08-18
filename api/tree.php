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


//Info
if ($requestMethod === "GET") {
    $id = inVal($_GET["id"] ?? "1");
    try {
        $sqlInfo = "SELECT * FROM t_carbon_trees WHERE TREES_ID = :id ;";
        $stmInfo = $conn->prepare($sqlInfo);
        $stmInfo->execute(array(":id" => $id));
        $result = $stmInfo->fetchObject();
        $stmInfo->closeCursor();

        echo json_encode(["state" => true, "results" => $result]);
    } catch (PDOException $e) {
        echo json_encode(["state" => false, "message" => $e->getMessage()]);
    }
}

//Create
if ($requestMethod === "POST") {
    if (!empty($data) && $chkAuth()->state) {
        // if (!empty($data)) {
        try {
            $action = "registed";

            // $inputValues = "";
            // $inputParam = array();
            // for ($i = 0; $i < count($data); $i++) {
            //     $num = (string)($i + 1);
            //     $inputValues .= "( :treeCode$num, :treeName$num, :scientificName$num, :plantDate$num, :treeAge$num, :latitude$num, :longitude$num, :carbonCredit$num, :other$num, :image$num, :zone$num, :area$num )";
            //     if ($num < count($data)) $inputValues .= ", ";

            //     $inputParam[":treeCode$num"] = $data[$i]->treeCode;
            //     $inputParam[":treeName$num"] = $data[$i]->treeName;
            //     $inputParam[":scientificName$num"] = $data[$i]->scientificName;
            //     $inputParam[":plantDate$num"] = $data[$i]->plantDate;
            //     $inputParam[":treeAge$num"] = $data[$i]->treeAge;
            //     $inputParam[":latitude$num"] = $data[$i]->latitude;
            //     $inputParam[":longitude$num"] = $data[$i]->longitude;
            //     $inputParam[":carbonCredit$num"] = $data[$i]->carbonCredit;
            //     $inputParam[":other$num"] = $data[$i]->other;
            //     $inputParam[":image$num"] = $data[$i]->image;
            //     $inputParam[":zone$num"] = $data[$i]->zone;
            //     $inputParam[":area$num"] = $data[$i]->area;
            // }

            // $sql = "INSERT INTO t_carbon_trees (TREES_CODE,TREES_NAME,SCIENTIFIC_NAME,PLANT_DATE,TREES_AGE,LATITUDE,LONGITUDE,CARBON_CREDIT,OTHER,IMAGE,ZONE,AREA)
            //         VALUES $inputValues ;";

            // $stmRegis = $conn->prepare($sql);
            // $stmRegis->execute($inputParam);
            // $lastId = $conn->lastInsertId();
            // $stmRegis->closeCursor();

            $inputValues = "";
            for ($i = 0; $i < count($data); $i++) {
                $num = $i + 1;
                $treeCode = inVal($data[$i]->treeCode);
                $treeName = inVal($data[$i]->treeName);
                $scientificName = inVal($data[$i]->scientificName);
                $plantDate = inVal($data[$i]->plantDate);
                $treeAge = inVal($data[$i]->treeAge);
                $latitude = inVal($data[$i]->latitude);
                $longitude = inVal($data[$i]->longitude);
                $carbonCredit = inVal($data[$i]->carbonCredit);
                $other = inVal($data[$i]->other);
                $image = inVal($data[$i]->image);
                $zone = inVal($data[$i]->zone);
                $area = inVal($data[$i]->area);
                $type = inVal($data[$i]->type);
                $circumference = inVal($data[$i]->circumference);
                $height = inVal($data[$i]->height);
                $inputValues .= "('$treeCode','$treeName','$scientificName','$plantDate','$treeAge','$latitude','$longitude','$carbonCredit','$other','$image','$zone','$area','$type','$circumference','$height')";
                if ($num < count($data)) $inputValues .= ",";
            }
            $sql = "INSERT INTO t_carbon_trees (TREES_CODE,TREES_NAME,SCIENTIFIC_NAME,PLANT_DATE,TREES_AGE,LATITUDE,LONGITUDE,CARBON_CREDIT,OTHER,IMAGE,ZONE,AREA,TYPE,CIRCUMFERENCE,HEIGHT)
                    VALUES $inputValues; ";
            $stmRegis = $conn->query($sql);
            $lastId = $conn->lastInsertId();
            $stmRegis->closeCursor();

            $registotal = array();
            for ($i = count($data); $i > 0; $i--) {
                $registotal[] = $lastId - ($i - 1);
                $logger($action, $lastId - ($i - 1));
            }
            echo json_encode(["state" => true, "message" => "registed", "TREES_ID" => $registotal]);
            // echo $treeName;
        } catch (PDOException $e) {
            echo json_encode(["state" => false, "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["state" => false, "message" => "session timeout"]);
    }
}

//Update
if ($requestMethod === "PUT") {
    if (!empty($data) && $chkAuth()->state) {
        // if (!empty($data)) {
        try {
            $treeId = inVal($_GET["id"]);
            $treeCode = inVal($data->treeCode);
            $treeName = inVal($data->treeName);
            $scientificName = inVal($data->scientificName);
            $plantDate = inVal($data->plantDate);
            $treeAge = inVal($data->treeAge);
            $latitude = inVal($data->latitude);
            $longitude = inVal($data->longitude);
            $carbonCredit = inVal($data->carbonCredit);
            $other = inVal($data->other);
            $image = inVal($data->image);
            $zone = inVal($data->zone);
            $area = inVal($data->area);
            $type = inVal($data->type);
            $circumference = inVal($data->circumference);
            $height = inVal($data->height);
            $action = "update";

            // $sql = "UPDATE t_carbon_trees 
            //         SET TREES_CODE = :treeCode, 
            //             TREES_NAME = :treeName, 
            //             SCIENTIFIC_NAME = :scientificName, 
            //             PLANT_DATE = :plantDate, 
            //             TREES_AGE = :treeAge, 
            //             LATITUDE = :latitude, 
            //             LONGITUDE = :longitude, 
            //             CARBON_CREDIT = :carbonCredit, 
            //             OTHER = :other, 
            //             IMAGE = :image,
            //             ZONE = :zone,
            //             AREA = :area
            //         WHERE TREES_ID = :treeId ;";
            // $result = $conn->prepare($sql);
            // $result->execute(array(
            //     ":treeId" => $treeId,
            //     ":treeCode" => $treeCode,
            //     ":treeName" => $treeName,
            //     ":scientificName" => $scientificName,
            //     ":plantDate" => $plantDate,
            //     ":treeAge" => $treeAge,
            //     ":latitude" => $latitude,
            //     ":longitude" => $longitude,
            //     ":carbonCredit" => $carbonCredit,
            //     ":other" => $other,
            //     ":image" => $image,
            //     ":zone" => $zone,
            //     ":area" => $area
            // ));
            // $result->closeCursor();

            $sql = "UPDATE t_carbon_trees 
                    SET TREES_CODE = '$treeCode', 
                        TREES_NAME = '$treeName', 
                        SCIENTIFIC_NAME = '$scientificName', 
                        PLANT_DATE = '$plantDate', 
                        TREES_AGE = '$treeAge', 
                        LATITUDE = '$latitude', 
                        LONGITUDE = '$longitude', 
                        CARBON_CREDIT = '$carbonCredit', 
                        OTHER = '$other', 
                        IMAGE = '$image',
                        ZONE = '$zone',
                        AREA = '$area',
                        TYPE = '$type',
                        CIRCUMFERENCE = '$circumference',
                        HEIGHT = '$height'
                    WHERE TREES_ID = '$treeId' ;";
            $stm = $conn->query($sql);
            $stm->closeCursor();

            $logger($action, $treeId);
            echo json_encode(["state" => true, "message" => "updated"]);
        } catch (PDOException $e) {
            echo json_encode(["state" => false, "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["state" => false, "message" => "session timeout"]);
    }
}

//Delete
if ($requestMethod === "DELETE") {
    if ($chkAuth()->state) {
        try {
            $treeId = inVal($_GET["id"]);
            $action = "delete";

            $sql = "DELETE FROM t_carbon_trees WHERE TREES_ID = :treeId ;";
            $result = $conn->prepare($sql);
            $result->execute(array(":treeId" => $treeId));
            $result->closeCursor();

            $logger($action, $treeId);
            echo json_encode(["state" => true, "message" => "deleted"]);
        } catch (PDOException $e) {
            echo json_encode(["state" => false, "message" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["state" => false, "message" => "session timeout"]);
    }
}
