<?php
require_once('./libs/config.php');

try {
    $db = new PDO("sqlsrv:server=$hostname;database=$database", $username, $password);


    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $req = (object) json_decode(file_get_contents('php://input'));
        $data = array();
        //! /all-allometric
        if ($req->router == '/all-allometric') {
            $sql = "
            SELECT * FROM t_allometric_variables
            ";
            $query = $db->prepare($sql);
            $query->execute();

            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                array_push($data, $row);
            }

            echo json_encode($data);
        } 
        
        //! /update-allometric
        else if ($req->router == '/update-allometric') {
            $keys = array_keys((array)$req);
            $sql = "UPDATE t_allometric_variables SET ";
            $values = array();
            foreach ($keys as $key) {
                if ($key == "router" || $key == "ID") continue;
                $value  = ((array)$req)[$key];
                if(!isset($value)) $value = 'NULL';
                array_push($values, $key . "=" . $value);
            }
            $sql .= implode(',', $values);
            $query = $db->prepare($sql);
            $query->execute();

            echo json_encode(["state" => true, "msg" => "Update Successfully"]);
        }
        //! /Carbon-Credit
        else if ($req->router == '/carbon-credit') {
            $sql = "
            SELECT SUM(C_ZONE) AS CARBON_CREDIT
            FROM v_cc_zone ;
            ";
            $query = $db->prepare($sql);
            $query->execute();

            while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
                array_push($data, $row);
            }

            echo json_encode($data);
        }

        //! Bad Request
        else {
            echo json_encode(["state" => false, "msg" => "Bad Request"]);
        }
    }
} catch (PDOException $error) {
    echo json_encode(["state" => false, "msg" => $error->getMessage()]);
}
