<?php
//1.  DB接続します
try {
  $pdo = new PDO('mysql:dbname=gs_db;charset=utf8;host=localhost','root','');
} catch (PDOException $e) {
  exit('DbConnectError:'.$e->getMessage());
}

include 'ChromePhp.php';

$user_id=$_POST["user_id"];
ChromePhp::log($user_id);

//２．データ登録SQL作成
$sql = "SELECT user_id, account, email, name, gender, age FROM user_info WHERE user_id = :a1";
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
  $userData = array();
  while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
   $userData[]=array(
          'user_id' => $result['user_id'],
          'account' => $result['account'],
          'email' => $result['email'],
          'name' => $result['name'],
          'gender' => $result['gender'],
          'age' => $result['age']          
   );
  }
  // ChromePhp::log($userData);
  $jsonTest=json_encode($userData,JSON_UNESCAPED_UNICODE);
  echo $jsonTest;
}
?>
