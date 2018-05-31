<?php
//1.  DB接続します
try {
    $pdo = new PDO('mysql:dbname=gs_db;charset=utf8;host=localhost', 'root', '');
} catch (PDOException $e) {
    exit('DbConnectError:' . $e->getMessage());
}

include 'ChromePhp.php';

$email = $_POST["email"];
$password = $_POST["password"];

//２．データ登録SQL作成
$sql = "SELECT user_id FROM user_info WHERE email= :a1 and user_id = (select distinct user_id from user_login where password = :a2)";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $email, PDO::PARAM_STR);
$stmt->bindValue(':a2', $password, PDO::PARAM_STR);
$status = $stmt->execute();

ChromePhp::log("$email");
ChromePhp::log("$password");

//３．データ表示
$view = "";
if ($status == false) {
    //execute（SQL実行時にエラーがある場合）
    $error = $stmt->errorInfo();
    exit("ErrorQuery:" . $error[2]);

} else {
    //Selectデータの数だけ自動でループしてくれる
    //FETCH_ASSOC=http://php.net/manual/ja/pdostatement.fetch.php
    while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $view .= $result["user_id"];
    }
    ChromePhp::log($view);
    if ($view == "") {
    ChromePhp::log("false");        
        echo "false";
    } else{
    ChromePhp::log("true");                
    //   return $view;
      echo $view;      
    }
}
