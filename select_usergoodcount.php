<?php
include 'ChromePhp.php';
include 'functions.php';

session_start();
//0.外部ファイル読み込み
include("functions.php");
chk_ssid();

//1.  DB接続します
$pdo = db_con();

$user_id=$_POST["user_id"];

//２．データ登録SQL作成
$sql = "SELECT count(user_id) AS num FROM user_good WHERE img_id in (select distinct img_id from img_info where user_id = :a1)";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $user_id, PDO::PARAM_STR);
$status = $stmt->execute();

//３．データ表示
$view="";
if($status==false) {
    //execute（SQL実行時にエラーがある場合）
  $error = $stmt->errorInfo();
  // ChromePhp::log("false");
  exit("ErrorQuery:".$error[2]);
}else{
  // ChromePhp::log("true");
  //Selectデータの数だけ自動でループしてくれる
  //FETCH_ASSOC=http://php.net/manual/ja/pdostatement.fetch.php
  $data = array();
  while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
   $data[]=array(
          'num' => $result['num'],
   );
  }
  // ChromePhp::log($imgData);
  $jsonTest=json_encode($data,JSON_UNESCAPED_UNICODE);
  echo $jsonTest;
}
?>
