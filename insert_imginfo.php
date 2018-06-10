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

//２. POSTデータ取得
// header('Content-Type: application/json');

// $data = ($_POST['img_name']);
// ChromePhp::log($_POST['img_name']);
// ChromePhp::log($_POST['img_data']);
// ChromePhp::log($_POST['user_id']);
// ChromePhp::log($_POST['category']);
// ChromePhp::log($_POST['abstract']);

//３．データ登録SQL作成

$sql = "INSERT INTO  img_info(img_id, img_name, img_data, user_id, category, abstract, sysdate) VALUES(NULL, :a1, :a2, :a3, :a4, :a5,sysdate())";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $_POST['img_name'], PDO::PARAM_STR);
$stmt->bindValue(':a2', $_POST['img_data'], PDO::PARAM_STR);
$stmt->bindValue(':a3', $_POST['user_id'], PDO::PARAM_INT);
$stmt->bindValue(':a4', $_POST['category'], PDO::PARAM_INT);
$stmt->bindValue(':a5', $_POST['abstract'], PDO::PARAM_STR);
$status = $stmt->execute();

//４．データ登録処理後
if($status==false){
  //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
  $error = $stmt->errorInfo();
  exit("sqlError:".$error[2]);
}
else{
  //５．index.phpへリダイレクト
  header("Location: main.php");
}
?>
