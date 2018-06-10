<?php
//1.  DB接続します
include 'ChromePhp.php';
include 'functions.php';

session_start();
//0.外部ファイル読み込み
include("functions.php");
chk_ssid();

//1.  DB接続します
$pdo = db_con();

$img_id=$_POST["img_id"];

//２．データ登録SQL作成
$sql = "DELETE FROM img_info WHERE img_id = :a1";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $img_id, PDO::PARAM_STR);
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
  // ChromePhp::log($imgData);
}
?>
