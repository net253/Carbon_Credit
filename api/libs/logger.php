<?php
return function ($action, $treeId = 0) {
    global $conn;
    $username = $_SESSION["username"];
    $now = (new DateTime())->format('Y-m-d H:i:s');

    $sqlLog = "INSERT INTO t_carbon_history (TREES_ID, USERNAME, ACTION, DATETIME) VALUES ( :treeId, :username, :action, :now ) ;";
    $result = $conn->prepare($sqlLog);
    $result->execute(array(
        ":treeId" => $treeId,
        ":username" => $username,
        ":action" => $action,
        ":now" => $now
    ));
    $result->closeCursor();
};
