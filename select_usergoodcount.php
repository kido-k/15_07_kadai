<?php

//0.外部ファイル読み込み
include 'ChromePhp.php';
include 'functions.php';

//1.  DB接続します
$pdo = db_con();
$user_id = $_POST["user_id"];
// ChromePhp::log($user_id);

//２．データ登録SQL作成
$sql = "SELECT count(user_id) AS num FROM user_good WHERE img_id in (select distinct img_id from img_info where user_id = :a1)";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $user_id, PDO::PARAM_STR);
$status = $stmt->execute();

//３．データ表示
$view = "";
if ($status == false) {
    //execute（SQL実行時にエラーがある場合）
    $error = $stmt->errorInfo();
    exit("ErrorQuery:" . $error[2]);
} else {
    $data = array();
    while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = array(
            'num' => $result['num'],
        );
    }
    // ChromePhp::log($data);
    $jsonTest = json_encode($data, JSON_UNESCAPED_UNICODE);
    echo $jsonTest;
}
