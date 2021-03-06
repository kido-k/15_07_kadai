<?php

//0.外部ファイル読み込み
include 'ChromePhp.php';
include 'functions.php';

//1.  DB接続します
$pdo = db_con();

//２. POSTデータ取得

//３．データ登録SQL作成

$sql = "DELETE FROM user_good WHERE user_id = :a1 AND img_id = :a2";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $_POST['user_id'], PDO::PARAM_INT);
$stmt->bindValue(':a2', $_POST['img_id'], PDO::PARAM_INT);
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
