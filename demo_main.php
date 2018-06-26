<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="js/jquery-2.1.3.min.js"></script>
    <script src="js/demo_main.js"></script>
    <!-- <link rel="shortcut icon" href="img/post.jpg"> -->
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
        <div id='group' style="width: 100%;display:flex;">
            <div id="todo" class='task_grp'>
                <div class='task_grp_header' style='display:flex;'>
                    <p class='task_grp_title' style='background-color:#f2af1d;'>ToDo</p>
                    <p class='grp_add'>＋</a>
                    <p class='grp_set'>◎</a>
                </div>
                <div id="todo1" class='task' dropzone="move" draggable="true">
                    <div class='task_title high'>
                        ログイン
                    </div>
                    <div>
                        メンバー
                    </div>
                    <div>
                        更新日付
                    </div>
                </div>
                <div id="todo2" dropzone="move" class='task' draggable="true">
                    <div class='task_title high'>
                        デモページ作成
                    </div>
                    <div>
                        メンバー
                    </div>
                    <div>
                        更新日付
                    </div>
                </div>
            </div>
            <div id="finish" class='task_grp'>
                <div class='task_grp_header' style='display:flex;'>
                    <p class='task_grp_title' style='background:#6091d3;'>Finish</p>
                    <p class='grp_add'>＋</a>
                    <p class='grp_set'>◎</a>
                </div>
                <div id="finish1" dropzone="move" class='task' draggable="true">
                    <div class='task_title middle'>
                        ログイン
                    </div>
                    <div>
                        メンバー
                    </div>
                    <div>
                        更新日付
                    </div>
                </div>
                <div id="finish2" dropzone="move" class='task' draggable="true">
                    <div class='task_title middle'>
                        デモページ作成
                    </div>
                    <div>
                        メンバー
                    </div>
                    <div>
                        更新日付
                    </div>
                </div>
            </div>
            <div id="confirm" class='task_grp'>
                <div class='task_grp_header' style='display:flex;'>
                    <p class='task_grp_title' style='background-color:#71ce88;'>Confirm</p>
                    <p class='grp_add'>＋</a>
                    <p class='grp_set'>◎</a>
                </div>
                <div id="confirm1" dropzone="move" class='task' draggable="true">
                    <div class='task_title low'>
                        ログイン
                    </div>
                    <div>
                        メンバー
                    </div>
                    <div>
                        更新日付
                    </div>
                </div>
                <div id="confirm2" dropzone="move" class='task' draggable="true">
                    <div class='task_title low'>
                        デモページ作成
                    </div>
                    <div>
                        メンバー
                    </div>
                    <div>
                        更新日付
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
