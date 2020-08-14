<?php

require 'utils.php';
require 'db_connect.php';

/*========================================== GetAsset =================================================*/
function getAsset($customerId) {
    global $conn;
    $result = pg_query($conn, "select id,name from asset where customer_id ='".UUIDencode($customerId)."'");
    while($row = pg_fetch_object($result))
    {
        $response[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($response, JSON_PRETTY_PRINT);
}


switch(true) {
    case (!empty($_GET["email"]) AND !empty($_GET["pass"])):
        $email = $_GET["email"];
        $pass = $_GET["pass"];
        $token = gen_token($email,$pass);
        $usr_data = JWTdecode($token);

        if(!empty($_GET["asset"])) {
            getAsset($usr_data->customerId);
        }
    break;

    default:
        header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
        echo '<div align="center"><font face="arial" size="10" color="#8b0000">Nothing to found here! Check the parameter</font><br />';
        break;
    
}



?>