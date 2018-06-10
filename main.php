<?php
session_start();
//0.外部ファイル読み込み
include("functions.php");
chk_ssid();
?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>
    <script src="js/jquery-2.1.3.min.js"></script>
    <script src="js/main.js"></script>
    <link rel="shortcut icon" href="img/post.jpg">
    <link rel="stylesheet" href="css/style.css">
    <title>POST</title>
</head>

<body>
    <div id="header">
        <h1 id="title">
            <a href="main.php" style="cursor: pointer;text-decoration:none;color:white;">POST</a>
        </h1>
        <div id="menubar">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>
            <select id="mode">
                <option value="0">みんなの投稿</option>
                <option value="1">自分の投稿</option>
                <!-- <option value="2">DELETE</option> -->
            </select>
        </div>
        <div id="tool_bar" style="display:flex">
            <input id="search" type="text" placeholder="  検索はここから">
            <p id="add_button" style="display:none">⊕</p>
            <p id="delete_button" style="display:none">⊖</p>
        </div>
    </div>
    <!-- Loading画面 -->
    <!-- <div id="loading_start" style="height:100%;background-color:#e3f4fd;text-align:center;padding-top:80px">
        <img src="imgs/rain_animated_256.gif" alt="Loading...">
    </div> -->

    <!-- コンテンツ表示画面 -->
    <div id="main">
        <div id="sidebar">
            <div id="userinfo">
                <img id="userimage" src="img/monkey.png" alt="">
                <div id="drop_zone">
                    <p id="drop_msg">ここにファイルをドラッグしてください</p>
                    <img id="drop_image" src="" alt="">
                </div>
                <p id="accountname"></p>
                <button id="uimage_change">イメージ変更</button>
                <button id="uimage_cancel">戻る</button>
                <button id="uimage_save">保存</button>
            </div>
            <div id="menu">
                <div style="display:flex;">
                    <p>　　いいね：　</p>
                    <p id="good">0</p>
                </div>
                <div style="display:flex;">
                    <p>フォロワー：　</p>
                    <p id="follower">0</p>
                </div>
                <div style="display:flex;">
                    <p>　　　投稿：　</p>
                    <p id="imagenum">0</p>
                </div>
            </div>
            <div style="text-align:center">
                    <button id="logout">ログアウト</button>
            </div>
        </div>
        <div id="imglist">
        </div>
        <div id="add_img" style="display:none;margin-top:15px;width:100%;height:100%">
            <div style="display:flex;height:100%">
                <div id="img_drop_zone">
                    <p id="img_drop_msg">ここにローカルファイルをドラッグしてください</p>
                    <img id="img_drop" src="" alt="">
                    <input id="img_url" name="img_url" type="text" placeholder="または画像URLを&#13;&#10;貼付してください">
                </div>
                <div style="width:50%;height:70%">
                    <input id="img_name" type="text" style="width:100%;height:10%;margin-bottom:5px" placeholder="タイトルを入力してください"><br>
                    <textarea id="abstract" name="abstract"></textarea><br>
                    <input id="category" type="text" style="width:100%;height:10%;" placeholder="#を付けてキーワードを入力してください"><br>
                    <button id="post" style="float:right;">投稿</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <button id="check">チェック</button> -->
    <div>
        <!-- <textarea name="" id="test_text" cols="30" rows="10"></textarea> -->
        <!-- <button id="test">送信</button> -->
    </div>
</body>

</html>
