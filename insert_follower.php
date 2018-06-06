<?php
//1.  DB接続します
try {
  $pdo = new PDO('mysql:dbname=gs_db;charset=utf8;host=localhost','root','');
} catch (PDOException $e) {
  exit('DbConnectError:'.$e->getMessage());
}

include 'ChromePhp.php';

//２. POSTデータ取得

//３．データ登録SQL作成

$sql = "INSERT INTO  user_follower(user_id, follow_user_id, sysdate) VALUES(:a1, :a2, sysdate())";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $_POST['user_id'], PDO::PARAM_INT);
$stmt->bindValue(':a2', $_POST['follow_user_id'], PDO::PARAM_INT);
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
