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
$sql = "SELECT ui.img_id, ui.faborate, ui.sort, ui.row, ui.coumn, ii.img_name,ii.img_data,ii.auther,ii.category,ii.abstract FROM user_img ui INNER JOIN img_info ii ON ui.img_id = ii.img_id where ui.user_id=:a1";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1', $user_id, PDO::PARAM_STR);
$status = $stmt->execute();

//３．データ表示
$view="";
if($status==false) {
    //execute（SQL実行時にエラーがある場合）
  $error = $stmt->errorInfo();
  ChromePhp::log("false");
  exit("ErrorQuery:".$error[2]);
}else{
  ChromePhp::log("true");  
  //Selectデータの数だけ自動でループしてくれる
  //FETCH_ASSOC=http://php.net/manual/ja/pdostatement.fetch.php
  $userData = array();
  while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
   $imgData[]=array(
          'img_id' => $result['img_id'],
          'faborate' => $result['faborate'],
          'sort' => $result['sort'],
          'row' => $result['row'],
          'coumn' => $result['coumn'],
          'img_name' => $result['img_name'],
          'img_data' => $result['img_data'],
          'auther' => $result['auther'],
          'category' => $result['category'],
          'abstract' => $result['abstract']
   );
  }
  ChromePhp::log($imgData);
  $jsonTest=json_encode($imgData,JSON_UNESCAPED_UNICODE);
  echo $jsonTest;
}
?>
