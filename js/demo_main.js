//全体利用のグローバル変数
var files;
var iconfiles;

var pre_userimage_url;
var userimage_url;
var pre_signbord_url;
var userimage_url;

var displayLoginBar = false;

$(function () {
    // loadDemoAllImage();
    // loadDemoAllImage();
    //EnterKeyで送信する
    $("#search").keyup(function (event) {
        event = event || window.event;
        if (event.keyCode == 13 || event.which == 13) {
            const searchword = $("#search").val();
            if (searchword != null) {
                $("#imglist").empty();
                loadDemoSearchImage(searchword);
            };
        };
    });

    //メニューバーの表示・非表示の管理
    controlMenu();

    //ボタンアクションによる表示・非表示の管理
    btnAction();

    //ログイン
    $("#login").on("click", function () {
        // const xmlhttp = createXmlHttpRequest();
        $.ajax({
            url: "userlogin.php",
            type: "POST",
            dataType: "text",
            data: { 'email': $('#email').val(), 'password': $('#pass').val() },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log("ajax通信に失敗しました");
            },
            success: function (res) {
                // console.log("ajax通信に成功しました");
                sessionStorage.setItem(['user_id'], [res]);
                $("#loginmenu").css({ display: 'none' });
                $("#logout").css({ display: 'inline-block' });
            }
        });
        window.location.href = "main.php";
    });

    $("#makeaccount").on("click", function () {
        window.location.href = "entry.php";
    });

    $('.task').on('dragstart', f_dragstart);
    $('.task_grp').on('dragover', f_dragover);
    $('.task_grp').on('drop', f_drop);
});

/***** ドラッグ開始時の処理 *****/
function f_dragstart(event) {
    event = event.originalEvent;
    //ドラッグするデータのid名をDataTransferオブジェクトにセット
    event.dataTransfer.setData("text", event.target.id);
}

/***** ドラッグ要素がドロップ要素に重なっている間の処理 *****/
function f_dragover(event) {
    //dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
    event.preventDefault();
}

/***** ドロップ時の処理 *****/
function f_drop(event) {
    event = event.originalEvent;
    //ドラッグされたデータのid名をDataTransferオブジェクトから取得
    var id_name = event.dataTransfer.getData("text");
    //id名からドラッグされた要素を取得
    var drag_elm = document.getElementById(id_name);
    //ドロップ先にドラッグされた要素を追加
    event.currentTarget.appendChild(drag_elm);
    //エラー回避のため、ドロップ処理の最後にdropイベントをキャンセルしておく
    event.preventDefault();
}


function controlMenu() {
    $("#menubar").on("click", function () {
        if (displayLoginBar == true) {
            $("#loginmenu").css({ display: 'none' });
            $("#imglist").css({ width: '100%' });
            displayLoginBar = false;
        } else {
            $("#loginmenu").css({ display: 'inline' });
            $("#imglist").css({ width: '70%' });
            displayLoginBar = true;
        }
    });
}

function btnAction() {
    //homeボタン
    $("#home_button").on("click", function () {
        $("#imglist").css({ display: 'inline-block' });
        $("#add_img").css({ display: 'none' });
    });
};

function loadDemoAllImage() {
    for (i = 0; i < result.length; i++) {
        img_id = result[i].img_id;
        $("#todo").append('<div style="display:flex;"><h2 id="' + 'img_name' + img_id + '" style="height:30px;width:75%;margin:0;margin-left:20px;margin-top: 20px;">' + result[i].img_name + '</h2>'
            + '<h2 id="' + 'sysdate' + img_id + '" style="height:30px;width:20%;margin:0;text-align:right;margin-top: 20px;">' + result[i].sysdate + '</h2></div>');
        $("#finish").append('<div style="display:flex;"><h3 id="' + 'account' + img_id + '" style="margin:0;margin-left:20px;">' + 'by ' + result[i].account + '</h3>'
            + '<p id="' + 'follow' + img_id + '" class="follow" style="font-size:12px;margin:0;margin-left:50px;cursor:pointer;border-radius:50px;background-color:#FFF;border:1px solid #1da1f2;color:#1da1f2;width:90px; text-align:center">FOLLOW ME</p>'
            + '<p style="font-size:12px;margin:0;margin-left:50px">いいね</p><img id="' + 'good' + img_id + '"src="img/heart_blank.png" class="good" style="height:15px;width:15px;margin:0;margin-left:10px;cursor:pointer;"></div>');
        $("#confirm").append('<div id="' + 'img' + img_id + '" style="display:flex; height:220px;margin-left:15px;"></div>');
    };
};


function loadDemoSearchImage(searchword) {
    var result = "";
    $("#imglist").empty();
    $.ajax({
        url: "select_searchimginfo.php",
        type: "POST",
        dataType: "text",
        data: { 'searchword': searchword },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
            // console.log(res);
            result = JSON.parse(res);
            // console.log(result[0]);
            var img_id = "";
            for (i = 0; i < result.length; i++) {
                img_id = result[i].img_id;
                $("#imglist").append('<div style="display:flex;"><h2 id="' + 'img_name' + img_id + '" style="height:30px;width:75%;margin:0;margin-left:20px;margin-top: 20px;">' + result[i].img_name + '</h2>'
                    + '<h2 id="' + 'sysdate' + img_id + '" style="height:30px;width:20%;margin:0;text-align:right;margin-top: 20px;">' + result[i].sysdate + '</h2></div>');
                $("#imglist").append('<div style="display:flex;"><h3 id="' + 'account' + img_id + '" style="margin:0;margin-left:20px;">' + 'by ' + result[i].account + '</h3>'
                    + '<p id="' + 'follow' + img_id + '" class="follow" style="font-size:12px;margin:0;margin-left:50px;cursor:pointer;border-radius:50px;background-color:#FFF;border:1px solid #1da1f2;color:#1da1f2;width:90px; text-align:center">FOLLOW ME</p>'
                    + '<p style="font-size:12px;margin:0;margin-left:50px">いいね</p><img id="' + 'good' + img_id + '"src="img/heart_blank.png" class="good" style="height:15px;width:15px;margin:0;margin-left:10px;cursor:pointer;"></div>');
                $("#imglist").append('<div id="' + 'img' + img_id + '" style="display:flex; height:220px;"></div>');
                $("#" + 'img' + img_id).append('<div class="del" style="display:none;width:5%;"><p id="del_' + result[i].img_id + '" class="del_btn" style="cursor: pointer;font-size:30px;text-align:center;">☒</p></div>');
                $("#" + 'img' + img_id).append('<div style="width:15%;"><img id=imgdata"' + img_id + '" src="' + result[i].img_data + '" style="margin:10px 10px;object-fit:contain;max-width:90%;max-height:220px;"></div>');
                $("#" + 'img' + img_id).append('<text id="' + 'abstract' + img_id + '" style="height:195px; margin:10px 10px; width:45%;border-style:solid;border-width:0.5px;padding:5px;overflow: auto;" readonly>' + result[i].abstract + '</text>');
                $("#" + 'img' + img_id).append('<div id=msg' + img_id + '" style="height:175px; margin:10px 10px; width:35%;">' + '</div>');
                $("#" + 'img' + img_id).append('<div style="display:none"><p id="user' + img_id + '">' + result[i].user_id + '</p></div>');
            };
        }
    });
};