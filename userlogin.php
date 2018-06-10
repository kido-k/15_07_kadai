<?php
//1.  DB接続します
session_start();

//0.外部ファイル読み込み
include("functions.php");
include('ChromePhp.php');

$email = $_POST["email"];
$password = $_POST["password"];

$pdo = db_con();

//２．データ登録SQL作成
$sql = "SELECT user_id FROM user_info WHERE email= :a1 and user_id = (select distinct user_id from user_login where password = :a2)";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $email, PDO::PARAM_STR);
$stmt->bindValue(':a2', $password, PDO::PARAM_STR);
$status = $stmt->execute();

//３．データ表示
$res = "";
if ($status == false) {
    //execute（SQL実行時にエラーがある場合）
    queryError($stmt);
} else {
    while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $res = $result["user_id"];
    }
    ChromePhp::log($res);
    if ($res == "") {
        // ChromePhp::log("false");
        echo "false";
    } else {
        $_SESSION["chk_ssid"]  = session_id();
        $_SESSION["user_id"] = $res;
        echo $res;
    }
}
