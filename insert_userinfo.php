<?php

include 'ChromePhp.php';

if(
  !isset($_POST["account"]) || $_POST["account"]=="" ||
  !isset($_POST["password"]) || $_POST["password"]=="" ||
  !isset($_POST["email"]) || $_POST["email"]=="" ||
  !isset($_POST["name"]) || $_POST["name"]=="" ||
  !isset($_POST["gender"]) || $_POST["gender"]=="" ||
  !isset($_POST["age"]) || $_POST["age"]==""
){
  exit('ParamError');
}

//1. POSTデータ取得
$account = $_POST["account"];
$password = $_POST["password"];
$email = $_POST["email"];
$name = $_POST["name"];
$gender = $_POST["gender"];
$age = $_POST["age"];

//2. DB接続します
try {
  $pdo = new PDO('mysql:dbname=gs_db;charset=utf8;host=localhost','root','');
} catch (PDOException $e) {
  exit('DbConnectError:'.$e->getMessage());
}


//３．データ登録SQL作成
$sql1 ="INSERT INTO user_info(user_id, account, email, name, gender, age, createdate, sysdate) VALUES(NULL, :a1, :a2, :a3, :a4, :a5, sysdate(), sysdate())";

$stmt1 = $pdo->prepare($sql1);
$stmt1->bindValue(':a1', $account, PDO::PARAM_STR);
$stmt1->bindValue(':a2', $email, PDO::PARAM_STR);
$stmt1->bindValue(':a3', $name, PDO::PARAM_STR);
$stmt1->bindValue(':a4', $gender, PDO::PARAM_INT);
$stmt1->bindValue(':a5', $age, PDO::PARAM_INT);
$status1 = $stmt1->execute();

//４．データ登録処理後
if($status1==false){
  //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
  $error = $stmt1->errorInfo();
  exit("sqlError:".$error[2]);
}

$sql2 ="INSERT INTO user_login(user_id, password, sysdate) VALUES(NULL, :a6, sysdate())";

$stmt2 = $pdo->prepare($sql2);
$stmt2->bindValue(':a6', $password, PDO::PARAM_STR);
$status2 = $stmt2->execute();

if($status2==false){
  //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
  $error = $stmt2->errorInfo();
  exit("sqlError:".$error[2]);
}
else{
  //５．index.phpへリダイレクト
  header("Location: entry.php");
}
?>
