<?php
// session_start();
//0.外部ファイル読み込み
include("functions.php");
// chk_ssid();

//1.  DB接続します
$pdo = db_con();

// $user_id=$_POST["user_id"];

//２．データ登録SQL作成
$sql = "SELECT ii.img_id, ii.img_name, ii.img_data, ii.user_id, ii.category, ii.abstract, ii.sysdate, ui.account FROM img_info ii INNER JOIN user_info ui ON ii.user_id = ui.user_id order by ii.sysdate desc LIMIT 0, 30";
$stmt = $pdo->prepare($sql);
// $stmt->bindValue(':a1', $user_id, PDO::PARAM_STR);
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
  $imgData = array();
  while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
   $imgData[]=array(
          'img_id' => $result['img_id'],
          'img_name' => $result['img_name'],
          'img_data' => $result['img_data'],
          'user_id' => $result['user_id'],
          'category' => $result['category'],
          'abstract' => $result['abstract'],
          'sysdate' => $result['sysdate'],
          'account' => $result['account'],          
   );
  }
  // ChromePhp::log($imgData);
  $jsonTest=json_encode($imgData,JSON_UNESCAPED_UNICODE);
  echo $jsonTest;
}
?>
