<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>POST</title>
    <link rel="stylesheet" href="css\sanitize.css">
    <link rel="stylesheet" href="css\entry.css">
    <script src="js/jquery-2.1.3.min.js"></script>
    <!-- <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script> -->
    <!-- <script src="js/newaccount.js"></script> -->
</head>

<body>
    <div id="header">
        <!-- <img id="icon" src="imgs/SignBoard.jpg" alt=""> -->
        <h1 id="title">
            <a href="main.php" style="cursor: pointer;text-decoration:none;color:white;">Image投稿アプリ POST</a>
        </h1>
    </div>
    <form method="post" action="insert_userinfo.php">
        <div id="main">
            <div class="input-box">
                <input id="account" name="account" class="" type="text" autocomplete="off" maxlength="50" required="true" placeholder="アカウント名">
            </div>
            <div class="input-box">
                <input id="password" name="password" class="" type="password" required="true" placeholder="パスワード">
            </div>
            <div class="input-box">
                <input id="email" name="email" class="email-input"  type="mail" autocomplete="off" required="true" placeholder="メールアドレス">
            </div>
            <div class="input-box">
                <input id="name" name="name" class="" type="text" autocomplete="off"  value="" maxlength="50" required="true" placeholder="フルネーム">
            </div>
            <div class="radio-box">
                <input class="gender" name="gender" type="radio" value="0" required>男性
                <input id ="gender2" class="gender" name="gender" type="radio" value="1">女性
            </div>
            <div class="input-box">
                <input id="age" class="" name="age" type="number" autocomplete="off"  value="" maxlength="5" required="true" placeholder="年齢">
            </div>
            <div class="submit-box">
                <input type="submit" id="submit_button" value="アカウント作成">
            </div>
        </div>
    </form>
</body>

</html>
