
function checkForPinAccess() {
	// if(!isset($_SESSION[$config['variablePrefix'].'PinVerified']) && $config['pinAccess'] == '1') {
	// 	$current_file = strlen($_SERVER['QUERY_STRING']) ? basename($_SERVER['PHP_SELF'])."?".$_SERVER['QUERY_STRING'] : basename($_SERVER['PHP_SELF']);
	// 	if($current_file != 'pinAccess.php' && $current_file != 'pinAccessVerify.php' && $current_file != 'pinAccess.php?err=pwd' && $current_file != 'router.php') {
	// 		$_SESSION[$config['variablePrefix'].'AfterAccessFile'] = $current_file;
	// 		return false;
	// 	}
	// }	
	// return true;
}

function get_table_rows_sql(sql, binds=[]) {
	// global $PDOcon;
	// global $config;
	// $reply=[];
	// $reply['status']='SUCCESS';
	// $reply['message']='good';
	// $reply['reply']=[];
	// try {
	// 	$stmt=$PDOcon->prepare($sql);
	// 	if (is_array($binds)){
	// 		foreach($binds as $key=>$bind){
	// 			$stmt->bindValue($key, $bind);
	// 	//		error_log('binding '. $key . ' ' . $bind);
	// 		}
	// 	}
	// 	$result=$stmt->execute();
	// } catch (Exception $e) {
	// 	error_log('execute_sql failed sql '. $sql . ' binds ' . print_r($binds, true). ' message ' . $e->getMessage());
	// 	$returnValue['status']='FAIL';
	// 	return($returnValue);
	// }

	// if ($result){
	// 	$returnValue['status']='SUCCESS';
	// 	$returnValue['message']='SUCCESS';
	// 	$returnValue['reply']=$stmt->fetchAll(PDO::FETCH_ASSOC);
	// 	$returnValue['rowsReturned']=count($returnValue['reply']);
	// } else {
	// 	$returnValue['status']='FAIL';
	// 	$returnValue['message']=$stmt->errorInfo();
	// }
	// if ($config['sandboxDomain']=='1'){
	// 	$returnValue['sql']=$sql;
	// 	$returnValue['binds']=$binds;
	// }
	// return($returnValue);
}



function get_table_row_sql(sql, binds='') {
	// $reply=get_table_rows_sql($sql, $binds);
	// $returnValue=$reply;
	// $returnValue['reply']=$reply['reply'][0];
	// return $returnValue; 
}

function execute_sql(sql, binds=[]) {
	// global $PDOcon;
	// $returnValue=[];
	// try {
	// 	$stmt=$PDOcon->prepare($sql);
	// 	if (is_array($binds)){
	// 		foreach($binds as $key=>$bind){
	// 			if (strstr($sql,$key)>''){
	// 				$stmt->bindValue($key, $bind);
	// 	//		error_log('binding '. $key . ' ' . $bind);
	// 			}
	// 		}
	// 	}
	// 	$result=$stmt->execute();
	// } catch (Exception $e) {
	// 	error_log('execute_sql failed sql '. $sql . ' binds ' . print_r($binds, true). ' message ' . $e->getMessage());
	// 	$returnValue['status']='FAIL';
	// 	return($returnValue);
	// }
	// if ($result){
	// 	$returnValue['status']='SUCCESS';
	// 	$returnValue['message']='SUCCESS';
	// 	$returnValue['affectedRows']=$stmt->rowCount();
	// 	$returnValue['insertId']=$PDOcon->lastInsertId();
		
	// } else {
	// 	$returnValue['status']='FAIL';
	// 	$returnValue['message']=$stmt->errorInfo();
	// 	ob_start();
	// 	echo (print_r($stmt->debugDumpParams(), true));
	// 	$returnValue['errorDetails']=ob_get_contents();
	// 	ob_end_clean();
	// }
	// $returnValue['sql']=$sql;
	// $returnValue['binds']=$binds;
	// return($returnValue);
}

function getRandomValueFromTable(tableName, columnName, whereClause='') {
	// global $PDOcon;
	// $sql='select ' . $columnName. ' randomValue from ' . $tableName . ' ' . $whereClause . ' order by rand() limit 1 ';
	// $stmt=$PDOcon->prepare($sql);
	// $result=$stmt->execute();
	// if ($result){
	// 	$returnValue=$stmt->fetchAll(PDO::FETCH_ASSOC);	
	// 	return($returnValue[0]['randomValue']);
	// } else {
	// 	return($stmt->errorInfo());
	// }
}


function valueFilled(inValue){
	// if (!isset($inValue)) return false;
	// if (is_array($inValue)) {
	// 	foreach ($inValue as $key => $value) {
    //         if (!valueFilled($value)) return false;
    //     }
	// 	return true;
	// }
	// if (strval($inValue)=='0') return true;
	// if ($inValue=='') return false;
	// return true;
}


function valueFilledArray(request, key){
	// if (!isset($request[$key])) return false;
	// if (!is_array($request[$key]) && strval($request[$key])=='0') return true;
	// if (is_array($request[$key]) && count($request[$key])==0) return false;
	// if ($request[$key]=='') return false;
	// return true;
}


function getReferenceCd(referenceSet, referenceMeaning){
	// $sql='select getReferenceCd(\'' . $referenceSet . '\',\''. $referenceMeaning . '\') as referenceCd';
	// $result=get_table_row_sql($sql);
	// return($result['reply']['referenceCd']);
}




function getUUID(){
	// $sql='select uuid() uuid';
	// $uuidReply=get_table_row_sql($sql);
	// return($uuidReply['reply']['uuid']);
}

function signout(){
	// global $config;
	// unset($_SESSION[$config['variablePrefix'].'UserId']);
	// unset($_SESSION[$config['variablePrefix'].'BusinessCnt']);
	// unset($_SESSION[$config['variablePrefix'].'UserTypeCd']);
	// unset($_SESSION[$config['variablePrefix'].'LoginTarget']);
	// $_SESSION[$config['variablePrefix'].'Rememberme']='';
	// unset($_SESSION[$config['variablePrefix'].'AFTERLOGINURL']);
	// setcookie($config['variablePrefix'].'Rememberme', '', 1, '/');
	// destroySessionCookie();
}

function destroySessionCookie(){
	// global $config;
	// if (isset($_COOKIE[$config['variablePrefix'].'SessionId'])) setcookie($config['variablePrefix'].'SessionId', $_COOKIE[$config['variablePrefix'].'SessionId'], 1, '/'); // 
}



function onLogin(userId, rememberMe=false) {
// 	global $config;
//     $token = getUUID();
// 	$sql='update user set sessionId=:token, lastLoginDate = current_timestamp, lastIP=:lastIP where userId = :userId';
// 	$binds=[];
// 	$binds[':token']=$token;
// 	$binds[':userId']=$userId;
// 	$binds[':lastIP']=$_SERVER['REMOTE_ADDR'];
// 	execute_sql($sql, $binds);
// 	$cookie=[];
// 	$cookie['userId']=$userId;
// 	$cookie['token']=$token;
// 	$cookie['lastIP']=$_SERVER['REMOTE_ADDR'];
// 	$cookieJson=json_encode($cookie);
//     $mac = hash_hmac('sha256', $cookieJson, $config['secretKey']);
//     $cookiePlusMac['cookieJson']=$cookieJson;
//     $cookiePlusMac['mac']=$mac;
// 	$cookiePlusMacJson=json_encode($cookiePlusMac);
// //	error_log(' onLogin cookie ' . print_r($cookie, true) . ' $mac ' . $mac . ' $cookieJson ' . $cookieJson);
// 	$_SESSION[$config['variablePrefix'].'Rememberme']=$cookiePlusMacJson;
// 	if ($rememberMe) setcookie($config['variablePrefix'].'Rememberme', $cookiePlusMacJson, time()+60*60*24*30, '/');
}

function rememberMe() {
// 	global $config;
// 	if (valueFilledArray($_SESSION, $config['variablePrefix'].'UserId') && valueFilledArray($_SESSION, $config['variablePrefix'].'UserTypeCd')) return true;
// 	$_SESSION[$config['variablePrefix'].'LoginTarget'] = '';
// 	$_SESSION[$config['variablePrefix'].'UserTypeCd'] = '';
// 	$_SESSION[$config['variablePrefix'].'UserId'] = '';
	
//     $cookiePlusMacJson = isset($_COOKIE[$config['variablePrefix'].'Rememberme']) ? $_COOKIE[$config['variablePrefix'].'Rememberme'] : '';
//     $cookiePlusMacJson = isset($_SESSION[$config['variablePrefix'].'Rememberme']) ? $_SESSION[$config['variablePrefix'].'Rememberme'] : $cookiePlusMacJson;
// //	error_log('rememberMe cookiePlusMacJson '.$cookiePlusMacJson);
//     if ($cookiePlusMacJson>'') {
// 		$cookiePlusMac=json_decode($cookiePlusMacJson, true);
// 		$storedMac=$cookiePlusMac['mac'];
// 		$cookieJson=$cookiePlusMac['cookieJson'];
// 		$cookie=json_decode($cookiePlusMac['cookieJson'], true);
// 		$userId=$cookie['userId'];
// 		$token=$cookie['token'];
// 		$lastIP=$cookie['lastIP'];
// 		if($cookie['lastIP']!=$_SERVER['REMOTE_ADDR']){
// //			error_log('rememberMe !IP difference '.$userId. '  cookie '.print_r($cookie, true).  ' $currentIP ' . $_SERVER['REMOTE_ADDR'] );
//             return false;
// 		}

// 		$mac=hash_hmac('sha256', $cookieJson, $config['secretKey']);
// //		error_log('rememberMe userId '.$userId. '  token '.$token);
//         if (!hash_equals($mac, $storedMac)) {
// //			error_log('rememberMe !hash_equals1 userId '.$userId. '  cookieJson '.$cookieJson.  ' $mac ' . $mac . ' storedMac ' . $storedMac);
//             return false;
//         }
// 		$sql='select u.userId, u.loginTarget, u.userTypeCdMeaning, u.sessionId, u.lastIP, u.statusCdMeaning
// 									from userView u
// 									where u.userId = :userId ';
// 		$binds=[];
// 		$binds[':userId']=$userId;	
// 		$user=get_table_row_sql($sql, $binds);
// //		error_log('rememberMe hash_equals2 user '.print_r($user,true). ' cookie ' . print_r($cookie, true));
// //			error_log('rememberMe hash_equals3');
// 		$_SESSION[$config['variablePrefix'].'LoginTarget'] = $user['reply']['loginTarget'];
// 		$_SESSION[$config['variablePrefix'].'BusinessCnt'] = $user['reply']['businessCnt'];
// 		$_SESSION[$config['variablePrefix'].'UserTypeCd'] = $user['reply']['userTypeCdMeaning'];
// 		$_SESSION[$config['variablePrefix'].'UserStatusCd'] = $user['reply']['statusCdMeaning'];
// 		$_SESSION[$config['variablePrefix'].'UserId'] = $userId;
// 		onLogin($userId, true);
// 		return true;
//     }
// 	return false;
}


function createJWT(){
	// global $config;
	// $secretKey  = $config['JWTPrivateKey'];
	// $issuedAt   = new DateTimeImmutable();
	// $expire     = $issuedAt->modify('+30 minutes')->getTimestamp();      // Add 30 minutes
	// $serverName = $_SERVER['SERVER_NAME'];
	// $username='';
	// if (valueFilledArray($_SESSION, $config['variablePrefix'].'UserId')) $username   = $_SESSION[$config['variablePrefix'].'UserId'];
	// $data = [
	// 	'iat'  => $issuedAt->getTimestamp(),         // Issued at: time when the token was generated
	// 	'iss'  => $serverName,                       // Issuer
	// 	'nbf'  => $issuedAt->getTimestamp(),         // Not before
	// 	'exp'  => $expire,                           // Expire
	// 	'userName' => $username,                     // User name
	// ];
	// $_SESSION[$config['variablePrefix'].'JWT']=JWT::encode($data, $secretKey, 'RS256');	
}



function validateJWT(jwt){
// 	global $config;	
// 	if (!isset($jwt)) return false;
// 	try {
// 		JWT::$leeway = 60; // $leeway in seconds
// 		$token = JWT::decode($jwt, new Key($config['JWTPublicKey'], 'RS256'));
// 	} catch (Exception $e) {
// 		return false;
// 	}
// //	error_log('validateJWT JWTPublicKey ' . print_r($config['JWTPublicKey'], true));
// 	$now   = new DateTimeImmutable();
// 	if ($token->nbf <= $now->getTimestamp() && $token->exp > $now->getTimestamp()){
// 		return true;
// 	} else {
// 		error_log('validateJWT invalid token ' . print_r($token, true) . ' now ' . $now->getTimestamp());
// 		return false;
// 	}
}



function executeMicroService(url, request){	
	data={
        jwtName: config.variablePrefix,
        jwtToken: config[config.variablePrefix+'JWT'],
        request: request
    };
	$header=['Accept:application/json', 'Content-Type: application/json'];
	returnValue=processCURL(url, header, data);
	return returnValue;
}


function userAuthorized($userTypeCdMeanings){
// 	global $config;
	
// 	if(!checkForPinAccess()) { 
// 		header('Location: '.basepath(). 'pinAccess.php');
// 	}


// //	error_log('userAuthorized $_SESSION[\'userId\'] '. $_SESSION[$config['variablePrefix'].'UserId']. '$_SESSION[\'userTypeCd\'] '. $_SESSION[$config['variablePrefix'].'UserTypeCd']);
// 	if (!rememberMe()){
// //		error_log('userAuthorized !rememberMe $_SESSION[\'userId\'] '. $_SESSION[$config['variablePrefix'].'UserId']. '$_SESSION[\'userTypeCd\'] '. $_SESSION[$config['variablePrefix'].'UserTypeCd']);
// //		echo "<script>window.location.assign('" . basepath().'login.php'. "');</script>";
// 		header('Location: login.php');
// 	} else {
// // 		error_log('userAuthorized rememberMe $_SESSION[\'userId\'] '. $_SESSION[$config['variablePrefix'].'UserId']. '$_SESSION[\'userTypeCd\'] '. $_SESSION[$config['variablePrefix'].'UserTypeCd']);
// 		foreach($userTypeCdMeanings as $userTypeCdMeaning){
// //			error_log('userAuthorized $userTypeCdMeaning '. $userTypeCdMeaning);
// 			if ($userTypeCdMeaning==$_SESSION[$config['variablePrefix'].'UserTypeCd'] || $userTypeCdMeaning=='ALL'){
// 				return;
// 			}
// 		}
// //		echo "<script>window.location.assign('" . basepath().$_SESSION[$config['variablePrefix'].'LoginTarget']. "');</script>";			
// 		header('Location: '.basepath(). $_SESSION[$config['variablePrefix'].'LoginTarget']);
// 	}
}


function formatDollars($inValue, $precision=0, $returnIfNull=''){
	// if (is_null($inValue)) return $returnIfNull;
	// return '$' . number_format($inValue, $precision);
}


function getRelativeDate($inTimeSeconds, $relative){
// 	return(strtotime(date("Y-m-d H:i:s", $inTimeSeconds) . $relative));
// /*
// 	$date=new DateTime("@$inTimeSeconds");
// 	$date->modify($relative);
// 	return $date->format('U');
// 	*/
}


function timeSinceSeconds($thenSeconds) {
	// $nowSeconds = time();
	// $seconds = $nowSeconds-$thenSeconds;
	// $interval = round($seconds / 31536000);
	// if ($interval > 1) return $interval . " years ago";
	// $interval = round($seconds / 2592000);
	// if ($interval > 1) return $interval . " months ago";
	// $interval = round($seconds / 86400);
	// if ($interval > 1) return $interval . " days ago";
	// $interval = round($seconds / 3600);
	// if ($interval > 1) return $interval . " hours ago";
	// $interval = round($seconds / 60);
	// if ($interval > 1) return $interval . " minutes ago";
	// return 'Just now';
}



// function csvstr($fields, $separator=',', $enclosure='\'') : string
// {
// 	$firstOne=true;
// 	$returnValue='';
// 	foreach($fields as $field){
// 		if (!$firstOne) $returnValue.=$separator;
// 		$firstOne=false;
// 		$returnValue.=$enclosure.$field.$enclosure;
// 	}
//     return $returnValue;
// }


function setAfterLoginURL(){
	// global $config;
	// $_SESSION[$config['variablePrefix'].'AFTERLOGINURL']=$_SERVER['SCRIPT_URI'];
	// if ($_SERVER['argc']>0) $_SESSION[$config['variablePrefix'].'AFTERLOGINURL'].='?'.  $_SERVER['argv'][0];
}


function packParameters(parameters){
	// $parametersJSON=json_encode($parameters);
	// $parametersEncoded=base64_encode($parametersJSON);
	// return $parametersEncoded;
}


function unpackParameters(parametersEncoded){
	// $parametersJSON=base64_decode($parametersEncoded);
	// $parameters=json_decode($parametersJSON, true);
	// return $parameters;
}

function removeBlackListedColumns(replys, columnsToReturnCSV){
//	error_log('removeBlackListedColumns columnsToReturn '. print_r($columnsToReturn, true). '  replys '. print_r($replys, true));
// 	if (!($columnsToReturnCSV>'') || ($columnsToReturnCSV=='*')) return $replys;
// 	$columnsToReturn=str_getcsv($columnsToReturnCSV);
// 	$returnReply=[];
// 	foreach($replys as $ndx=>$reply){
// 		$returnReply[$ndx]=[];
// 		foreach($reply as $key=>$data){
// 			if (in_array($key, $columnsToReturn)) $returnReply[$ndx][$key]=$data;
// 		}
// 	}
// //	error_log('removeBlackListedColumns returnReply '. print_r($returnReply, true));
// 	return $returnReply;
}

function curl_get_file_contents(URL) {
// 
//     $c = curl_init();
//     curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
//     curl_setopt($c, CURLOPT_URL, $URL);
//     $contents = curl_exec($c);
//     curl_close($c);

//     if ($contents) return $contents;
//     else return FALSE;
}


function persistTemporaryFile(request){
	/*
	request must include
	$request['baseTargetDirectory'] directory above base path where file should be persisted
	$request['fileById']            id that will be parsed to create subdirectories
	and one of the following:
	$request['uploadedFile']        local path/filename of temporary file that should be persisted
	$request['url']                 url of temporary file that should be persisted

	$request['targetTable']         if file compression should occur
	*/
	// global $config;
	// $returnValue=[];
	// $fileRoute = $request['baseTargetDirectory'];
	// $fileRoute.='/'. substr($request['fileById'], 0, 1);
	// if (!is_dir($config['localBasepath'].$fileRoute)) mkdir($config['localBasepath'].$fileRoute);
	// $fileRoute.='/'. substr($request['fileById'], 1, 1);
	// if (!is_dir($config['localBasepath'].$fileRoute)) mkdir($config['localBasepath'].$fileRoute);
	// $fileRoute.='/'. substr($request['fileById'], 2, 1);
	// if (!is_dir($config['localBasepath'].$fileRoute)) mkdir($config['localBasepath'].$fileRoute);
	// $fileRoute.='/'. substr($request['fileById'], 3, 1);
	// if (!is_dir($config['localBasepath'].$fileRoute)) mkdir($config['localBasepath'].$fileRoute);
	// $fileRoute.='/';

	// $returnValue['extension']=(isset($request['uploadedFile']))?pathinfo($request['uploadedFile'], PATHINFO_EXTENSION):pathinfo($request['url'], PATHINFO_EXTENSION);
	// if (isset($request['extension'])) $returnValue['extension']=$request['extension'];
	// $returnValue['newFileName'] = $request['fileById']. hrtime(true).'.'.$returnValue['extension']; 
	// $returnValue['newFileURL']=$config['basepath'] . $fileRoute . $returnValue['newFileName']; 
	// $returnValue['newFileLocal']=$config['localBasepath'] . $fileRoute . $returnValue['newFileName'];
	// if (file_exists($returnValue['newFileLocal'])) unlink($returnValue['newFileLocal']);
	// if (isset($request['uploadedFile'])){
	// 	if (!rename($request['uploadedFile'], $returnValue['newFileLocal'])){			
	// 		error_log('Error moving file: from ' . $request['uploadedFile'] . ' to ' . $returnValue['newFileLocal']. ' request '. print_r($request, true) . ' returnValue ' . print_r($returnValue, true));
	// 		$returnValue['status']='FAIL';
	// 		$returnValue['message']='Error occurred in persistTemporaryFile';
	// 	} else {
	// 		$returnValue['status']='SUCCESS';
	// 	}
	// } else {
	// 	$contents=curl_get_file_contents($request['url']);
	// 	if ($contents===false){			
	// 		error_log('Error copying file: from ' . $request['url'] . ' to ' . $returnValue['newFileLocal']. ' request '. print_r($request, true) . ' returnValue ' . print_r($returnValue, true));
	// 		$returnValue['status']='FAIL';
	// 		$returnValue['message']='Error occurred in persistTemporaryFile';
	// 	} else {
	// 		file_put_contents($returnValue['newFileLocal'], $contents);
	// 		$returnValue['status']='SUCCESS';
	// 	}
	// }
	// if ($returnValue['status']=='SUCCESS' && ($config['fileCompression']=='1' || $config['fileCompression']=='2') && isset($request['targetTable'])){
	// 	$statusRequest=[];
	// 	$statusRequest['processingStatus']='NOTSTARTED';
	// 	$statusRequest['processingRequestJSON']=json_encode([
	// 		'fileToCompressLocal'=>$returnValue['newFileLocal'],
	// 		'fileToCompressURL'=>$returnValue['newFileURL'],
	// 		'fileById'=>$request['fileById'],
	// 		'baseTargetDirectory'=>$request['baseTargetDirectory'],
	// 		'targetTable'=>$request['targetTable']
	// 		]);
	// 	$statusRequest['processingFunction']='compressImage';
	// 	$putProcessingQueue=putProcessingQueueFunction($statusRequest);
	// }
	// return ($returnValue);
}

function stringToEpochTime(inStr, format='m-d-Y H:i:s', timeZoneName='UTC'){
	/*
	m-d-Y H:i:s
	*/
//	error_log('stringToEpochTime instr '. $inStr. ' format '. $format. ' timeZoneName '. $timeZoneName);
	// $epochDate=date_create_from_format($format, $inStr, new DateTimeZone($timeZoneName));
	// return date_format($epochDate, 'U');
}



function epochTimeToString(epochTimeStr, timeZoneName, format){
	/*
	m-d-Y h:i:s
	
	https://www.php.net/manual/en/datetime.format.php
	
	*/
	// $epochDate=date_create_from_format('U', $epochTimeStr);
	// $epochDate=date_timezone_set($epochDate, new DateTimeZone($timeZoneName));
	// return date_format($epochDate, $format);
}



function getDateRange(mode, timeZoneName, returnStart=true){
	// $now=new DateTime('now', new DateTimeZone($timeZoneName));
	// $month = $now->format('n');
	// $year = $now->format('Y');
	// $dayOfMonth = $now->format('j');
	// $day=24*60*60;
	// if ($returnStart){
	// 	switch ($mode){		
	// 		case 'LASTHOUR':
	// 			$now->modify('-1 hour');
	// 			return $now->format('U');
	// 			break;
	// 		case 'LAST12MONTHS':
	// 			$returnDate=date_create($year.'-'.$month.'-'.$dayOfMonth, new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('-12 month');
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'LAST6MONTHS':
	// 			$returnDate=date_create($year.'-'.$month.'-'.$dayOfMonth, new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('-6 month');
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'LAST3MONTHS':
	// 			$returnDate=date_create($year.'-'.$month.'-'.$dayOfMonth, new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('-3 month');
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'LAST60':
	// 			$returnDate=date_create($year.'-'.$month.'-'.$dayOfMonth, new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('-60 day');
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'LAST30':
	// 			$returnDate=date_create($year.'-'.$month.'-'.$dayOfMonth, new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('-30 day');
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'TODAY':
	// 			$returnDate=date_create($year.'-'.$month.'-'.$dayOfMonth, new DateTimeZone($timeZoneName));
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'THISWEEK':
	// 			$returnDate=date_create($year.'-'.$month.'-'.$dayOfMonth, new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('-6 day');
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'PREVMONTH':
	// 			$returnDate=date_create($year.'-'.$month.'-1', new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('-1 month');
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'PREVYEAR':
	// 			$returnDate=date_create($year.'-1-1', new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('-12 month');
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'THISMONTH':
	// 			$returnDate=date_create($year.'-'.$month.'-1', new DateTimeZone($timeZoneName));
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'THISQUARTER':
	// 			if ($month<4) {
	// 				$returnDate=date_create(date('Y').'-1-1', new DateTimeZone($timeZoneName));
	// 				return $returnDate->format('U');
	// 			}
	// 			if ($month<7) {
	// 				$returnDate=date_create(date('Y').'-4-1', new DateTimeZone($timeZoneName));
	// 				return $returnDate->format('U');
	// 			}
	// 			if ($month<10) {
	// 				$returnDate=date_create(date('Y').'-7-1', new DateTimeZone($timeZoneName));
	// 				return $returnDate->format('U');
	// 			} else {
	// 				$returnDate=date_create(date('Y').'-10-1', new DateTimeZone($timeZoneName));
	// 				return $returnDate->format('U');
	// 			}
	// 			break;
	// 		case 'YTD':
	// 			$returnDate=date_create(date('Y').'-1-1', new DateTimeZone($timeZoneName));
	// 			return $returnDate->format('U');
	// 			break;
	// 	}
	// } else {
	// 	switch ($mode){		
	// 		case 'LASTHOUR':
	// 			return $now->format('U');
	// 			break;
	// 		case 'TODAY':
	// 		case 'THISWEEK':
	// 		case 'LAST12MONTHS':
	// 		case 'LAST6MONTHS':
	// 		case 'LAST3MONTHS':
	// 		case 'LAST60':
	// 		case 'LAST30':
	// 			$returnDate=date_create($year.'-'.$month.'-'.$dayOfMonth. ' 23:59:59', new DateTimeZone($timeZoneName));
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'PREVMONTH':
	// 			$returnDate=date_create($year.'-'.$month.'-1', new DateTimeZone($timeZoneName));
	// 			return ($returnDate->format('U')-1);
	// 			break;
	// 		case 'PREVYEAR':
	// 			$returnDate=date_create($year.'-1-1', new DateTimeZone($timeZoneName));
	// 			return ($returnDate->format('U')-1);
	// 			break;
	// 		case 'THISMONTH':
	// 			$returnDate=date_create($year.'-'.$month.'-1', new DateTimeZone($timeZoneName));
	// 			$returnDate->modify('+1 month');
	// 			return ($returnDate->format('U')-1);
	// 			break;
	// 		case 'YTD':
	// 			$returnDate=date_create(date('Y').'-12-31 23:59:59', new DateTimeZone($timeZoneName));
	// 			return $returnDate->format('U');
	// 			break;
	// 		case 'THISQUARTER':
	// 			if ($month<4) {
	// 				$returnDate=date_create(date('Y').'-3-31 23:59:59', new DateTimeZone($timeZoneName));
	// 				return $returnDate->format('U');
	// 			}
	// 			if ($month<7) {
	// 				$returnDate=date_create(date('Y').'-6-30 23:59:59', new DateTimeZone($timeZoneName));
	// 				return $returnDate->format('U');
	// 			}
	// 			if ($month<10) {
	// 				$returnDate=date_create(date('Y').'-9-30 23:59:59', new DateTimeZone($timeZoneName));
	// 				return $returnDate->format('U');
	// 			} else {
	// 				$returnDate=date_create(date('Y').'-12-31 23:59:59', new DateTimeZone($timeZoneName));
	// 				return $returnDate->format('U');
	// 			}
	// 			break;
	// 	}
	// }
}




function generateUniquePermalink(permaLinkSeed, tableName='', startWith=0, PKColumnValue=''){
	// $permaLinkToTry=strtolower($permaLinkSeed);
	// $permaLinkToTry=str_replace('   ', ' ', $permaLinkToTry);
	// $permaLinkToTry=str_replace('  ', ' ', $permaLinkToTry);
	// $permaLinkToTry=str_replace(' ', '-', $permaLinkToTry);
	// $permaLinkToTry=preg_replace('/[^A-Za-z0-9\-_]/', '', $permaLinkToTry);
	// $permaLinkToTry=($startWith==0)?urlencode($permaLinkToTry):urlencode($permaLinkToTry. $startWith);
	// $count = 0;

	// // when adding new data types that have permalinks, add the table name here
	// $tableNames = ['staticContent'];
	// $columnNames = ['contentType'];
	
	// foreach($tableNames as $key=>$tableName) {
	// 	$sql='select count(*) cnt from '. $tableName. ' where permaLink = :permaLink';
	// 	$bind=[];
	// 	$bind['permaLink']=$permaLinkToTry;
	// 	if ($PKColumnValue>''){
	// 		$bind['PKColumnValue']=$PKColumnValue;
	// 		$sql.=' and '. $columnNames[$key]. ' != :PKColumnValue ';
	// 	}
	// 	$returnValue=get_table_rows_sql($sql, $bind);
	// 	$count = $count + $returnValue['reply'][0]['cnt'];
	// }
	// if ($count == 0){
	// 	return $permaLinkToTry;
	// } else {
	// 	$newStartWith=$startWith+1;
	// 	return generateUniquePermalink($permaLinkSeed, $tableName, $newStartWith, $PKColumnValue);
	// }
}



function generateSiteMap(request) {
// 	global $config;
// 	$lastMod=date('Y-m-d');
// 	$siteMap='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'. PHP_EOL;
// //	$sql='select activityId, permaLink from activityView where permaLink is not null and permaLink >\'\' and activityStatusCdMeaning = \'PUBLISHED\'';
// 	$returnValue=get_table_rows_sql($request['sql']);
// 	if ($returnValue['status']=='FAIL') return($returnValue);
// 	$siteMap='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'. PHP_EOL;
// 	foreach($returnValue['reply'] as $permaLink){
// 		$siteMap.='		<url>'. PHP_EOL;
// 		$siteMap.='			<loc>'. htmlspecialchars($config['basepath']. $permaLink['permaLink']).'</loc>'.PHP_EOL;
// 		$siteMap.='			<lastmod>'.$lastMod.'</lastmod>'.PHP_EOL;
// 		$siteMap.='		</url>'. PHP_EOL;
// 	}	
// 	$siteMap.='</urlset>'. PHP_EOL;
// 	file_put_contents($request['outputFile'], $siteMap);
// 	return $returnValue;
}


function generateTableFromTemplate($data) {
	// $tableHeading = htmlspecialchars('<tr>');
	// $tableBodyTemplate = htmlspecialchars('<tr %ROWDATASETREPLACE%>');
	// foreach ($data as $key => $value) {
	// 	//Build table template using key value pairs
	// 	$tableHeading.=htmlspecialchars('<th>'.$value['display'].'</th>');
	// 	$valueToInsert = '%'.$value['meaning'].'%';
	// 	if(isset($value['forcedValue'])) $valueToInsert = $value['forcedValue'];
	// 	$tableBodyTemplate.=htmlspecialchars('<td %'.$value['meaning'].'DATASET%>'.$valueToInsert.'</td>');
	// 	// var_dump($key);
	// 	// var_dump($value['display']);
	// }
	// $tableHeading .= htmlspecialchars('</tr>');
	// $tableBodyTemplate .= htmlspecialchars('</tr>');
	// $returnValue['tableHead']=$tableHeading;
	// $returnValue['tableBody']=$tableBodyTemplate;
	// return $returnValue;
}