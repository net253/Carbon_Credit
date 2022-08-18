<?php
return function () {
    if (isset($_SESSION["username"]) && isset($_SESSION["timeout"])) {
        if ($_SESSION["timeout"] > time()) {
            return (object)array("state" => true, "username" => $_SESSION["username"]);
        } else {
            return (object)array("state" => false, "username" => "");
        }
    } else {
        return (object)array("state" => false, "username" => "");
    }
};
