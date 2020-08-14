<?php

function api_del($req,$site=null,$token=null) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $req);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');


    $headers = array();
    $headers[] = 'Accept: application/json';

    if($site == 'thgd'){
        $headers[] = 'X-Authorization:'.$token;
    } else {
        $headers[] = 'Grpc-Metadata-Authorization:'.$token;
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return array('result'=>json_decode($result,true),'code'=>$httpcode);
}

function api_get($req,$site=null,$token=null) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $req);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');


    $headers = array();
    $headers[] = 'Accept: application/json';

    if($site == 'thgd'){
        $headers[] = 'X-Authorization:'.$token;
    } else {
        $headers[] = 'Grpc-Metadata-Authorization:'.$token;
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return array('result'=>json_decode($result,true),'code'=>$httpcode);
}

function api_post($req,$param,$site=null,$token=null,$type=null){
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL,$req);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $param);

    $headers = array();
    $headers[] = 'Content-Type: application/json';
    $headers[] = 'Accept: application/json';
    if ($site == 'thgd' && $type !='token'){
        $headers[] = 'X-Authorization:'.$token;
    } else if($type !='token') {
        $headers[] = 'Grpc-Metadata-Authorization:'.$token;
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return array('result'=>json_decode($result,true),'code'=>$httpcode);
}

function api_put($req,$param,$site=null,$token=null,$type=null){
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL,$req);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $param);

    $headers = array();
    $headers[] = 'Content-Type: application/json';
    $headers[] = 'Accept: application/json';
    if ($site == 'thgd' && $type !='token'){
        $headers[] = 'X-Authorization:'.$token;
    } else if($type !='token') {
        $headers[] = 'Grpc-Metadata-Authorization:'.$token;
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return array('result'=>json_decode($result,true),'code'=>$httpcode);
}

//Convert String from Database into UUID format
function UUIDconvert($UUID)
{
    $UUID = substr($UUID, 7, 8) . '-' . substr($UUID, 3, 4) . "-1" . substr($UUID, 0, 3) . '-' . substr($UUID, 15, 4)  . '-' . substr($UUID, 19);
    return $UUID;
}

function UUIDencode($UUID) 
{
    $str = strval($UUID);
        // 58e0a7d7-eebc-11d8-9669-0800200c9a66 => 1d8eebc58e0a7d796690800200c9a66. Note that [11d8] -> [1d8]
    return substr($str,15, 3) . substr($str,9, 4) . substr($str,0, 8) . substr($str,19, 4) . substr($str,24);
}

    
function JWTdecode($token) {
    $data = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
    return $data;
}


function database($request,$search) {
    try
	{
		$bdd = new PDO('pgsql:host=51.91.8.75;dbname=thingsboard;port=5433', 'administrateur', 'tJNXnbMgd6Q7s69rK2Y', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	}
	catch(Exception $e)
	{
        die('Erreur : '.$e->getMessage());
	}

	$req = $bdd->prepare($request);
	$req->execute(array($search));
    $resultat = $req->fetchAll(PDO::FETCH_ASSOC);
    return $resultat;
}

function gen_token($email,$pass) {
    // Generate token with tenant account (thingsboard)
    $data = api_post('https://dashboard.digitalconstructionhub.ovh/api/auth/login',"{\"username\":\"".$email."\", \"password\":\"".$pass."\"}",'thgd','','token');
    $jwt_thingsboard = "Bearer ".$data['result']['token'];
    if($data['result']["status"] != 401) {
        return $jwt_thingsboard;
    } else {
        print('{ "error":true, "message":"Votre compte ne possède pas les droits requis!"}');
        exit;
    }
    
}

?>