<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>
    <script src="js/jquery-2.1.3.min.js"></script>
    <!-- <script src="js/google-account.js"></script> -->
    <!-- <script src="js/userInfo.js"></script> -->
    <!-- <script src="js/map-control.js"></script> -->
    <script src="js/main.js"></script>
    <!-- <script src="js/signbord.js"></script> -->
    <link rel="stylesheet" href="css/style.css">
    <title>SIGN-B</title>
</head>

<body>
    <div id="header">
        <h1 id="title">SIGN-B</h1>
        <div id="menubar">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>
            <select id="mode">
                <option value="0">VIEW</option>
                <option value="1">ADD</option>
                <option value="2">DELETE</option>
            </select>
        </div>
        <div>
            <button id="logout">ログアウト</button>
        </div>
    </div>
    <!-- Loading画面 -->
    <!-- <div id="loading_start" style="height:100%;background-color:#e3f4fd;text-align:center;padding-top:80px">
        <img src="imgs/rain_animated_256.gif" alt="Loading...">
    </div> -->

    <!-- コンテンツ表示画面 -->
    <div id="main">
        <div id="loginmenu">
                <input id="email" type="text" placeholder="メールアドレス">
                <input id="pass" type="password" placeholder="パスワード">
                <button id="login">ログイン</button>
                <button id="makeaccount">アカウント作成</button>
        </div>
        <div id="sidebar">
            <div id="userinfo">
                <img id="userimage" src="https://images-na.ssl-images-amazon.com/images/I/61ZIUhzxcxL._SL500_SR160,120_.jpg" alt="">
                <div id="drop_zone">
                    <p id="drop_msg">ここにファイルをドラッグしてください</p>
                    <img id="drop_image" src="" alt="">
                </div>
                <p id="username"></p>
                <button id="uimage_change">イメージ変更</button>
                <button id="uimage_cancel">戻る</button>
                <button id="uimage_save">保存</button>
            </div>
            <div id="menu">
                <ul>
                    <li class="sidemenu">
                        <p>
                            <a id="menu1">マップアイコン</a>
                        </p>
                        <ul id="childmenu1">
                            <!-- <li class="childmenu"></li> -->
                            <div id="icon_drop_zone">
                                <p id="icon_msg">ここにファイルをドラッグしてください</p>
                                <img id="icon_image" src="" alt="">
                                <button id="icon_change">変更</button>
                                <button id="icon_save">保存</button>
                            </div>
                            <!-- <li class="childmenu">子メニュー 1-2</li> -->
                        </ul>
                    </li>
                    <li class="sidemenu">
                        <p>
                            <a id="menu2">SignBord一覧</a>
                        </p>
                        <ul id="childmenu2" class="childmenu">
                        </ul>
                    </li>
                    <li class="sidemenu">
                        <p>
                            <a id="menu3">メニュー3</a>
                        </p>
                        <ul id="childmenu3" class="childmenu">
                            <li class="childmenu">子メニュー 3-1</li>
                            <li class="childmenu">子メニュー 3-2</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <ul id="booklist" class="list">
            </ul>
            <ul id="bookmemo" class="memo">
            </ul>
        </div>
    </div>
    <button id="check">チャットボットあり</button>
    <button id="check2">チャットボットなし</button>
</body>

</html>
