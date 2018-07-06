<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="js/jquery-2.1.3.min.js"></script>
    <script src="js/demo_main.js"></script>
    <link rel="shortcut icon" href="img/post.jpg">
    <link rel="stylesheet" href="css/style.css">
    <title>POST</title>
</head>

<body>
    <div id="header">
        <h1 id="title">
            <a href="demo_main.php" style="cursor: pointer;text-decoration:none;color:white;">POST</a>
        </h1>
        <div id="menubar">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>
            <select id="mode" readonly>
                <option value="0">みんなの投稿</option>
            </select>
        </div>
        <div id="tool_bar" style="display:flex">
            <input id="search" type="text" placeholder="  検索はここから">
            <p id="add_button" style="display:none">⊕</p>
            <p id="delete_button" style="display:none">⊖</p>
        </div>
    </div>

    <!-- コンテンツ表示画面 -->
    <div id="main">
        <div id="loginmenu">
            <div><input id="email" type="text" placeholder="メールアドレス"></div>
            <div><input id="pass" type="password" placeholder="パスワード"></div>
            <div><button id="login">ログイン</button></div>
            <div><button id="makeaccount">アカウント作成</button></div>
        </div>
        <div id="imglist">
        </div>
    </div>
</body>

</html>
