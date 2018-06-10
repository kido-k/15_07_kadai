<?php
/** 共通で使うものを別ファイルにしておきましょう。*/
// include 'ChromePhp.php';

//DB接続関数（PDO）
function db_con(){
  $dbname='gs_db';
  try {
    $pdo = new PDO('mysql:dbname='.$dbname.';charset=utf8;host=localhost','root','');
  } catch (PDOException $e) {
    exit('DbConnectError:'.$e->getMessage());
  }
  return $pdo;
}

//SQL処理エラー
function queryError($stmt){
  //SQL実行時にエラーがある場合（エラーオブジェクト取得して表示）
  $error = $stmt->errorInfo();
  exit("QueryError:".$error[2]);
}

/**
* XSS
* @Param:  $str(string) 表示する文字列
* @Return: (string)     サニタイジングした文字列
*/
function h($str){
  return htmlspecialchars($str, ENT_QUOTES, "UTF-8");
}

//SESSIONチェック&リジェネレイト
function chk_ssid(){
  if(!isset($_SESSION["chk_ssid"]) || $_SESSION["chk_ssid"] != session_id()){
    // ChromePhp::log("失敗");
    // ChromePhp::log($_SESSION["chk_ssid"]);
    // ChromePhp::log($_SESSION[session_id()]);
    exit("Login Error.");
  }else{
    // ChromePhp::log("成功");
    session_regenerate_id(true);
    $_SESSION["chk_ssid"]=session_id();
  }
}

?>
