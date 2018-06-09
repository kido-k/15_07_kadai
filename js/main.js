//全体利用のグローバル変数
var files;
var iconfiles;

var pre_userimage_url;
var userimage_url;
var pre_signbord_url;
var userimage_url;
// var signbord_url;
// var signbordmsg;

var login = false;
var config;

$(function () {

    // Initialize Firebase
    config = {
        apiKey: "AIzaSyDybShiVah0D_qufhL3DlqqReyYrHY9Tpg",
        authDomain: "chatapp-e0a7e.firebaseapp.com",
        databaseURL: "https://chatapp-e0a7e.firebaseio.com",
        projectId: "chatapp-e0a7e",
        storageBucket: "chatapp-e0a7e.appspot.com",
        messagingSenderId: "491914417432"
    };
    firebase.initializeApp(config);

    // ログイン中かどうかの判定
    const login_user_id = localStorage.getItem("login_user_id");

    //LocalStrageにloginidを保存
    // googleLogin(firebase).done(function (result) {   //deferredを入れてみたもののうまく動かず、、現状問題なし
    // }).fail(function (e) {
    //     console.log(e);
    // });

    // MSGデータ受信
    // child_added:毎回１個
    // value:毎回すべてのデータを取得
    // ref.on("child_added", function (data) {
    //     var val = data.val();
    // });

    userinfo = firebase.database().ref('/userinfo/' + login_user_id);

    // userinfo.on("value", function (data) {
    //     receiveData(data);
    // });

    if (login_user_id != null) {
        loadUserData(login_user_id);
    } else {
        $("#imglist").empty();
        loadAllImage();
    };

    // Submit:MSG送信
    $("#check").on("click", function () {
        sendData(ref);
    });

    $("#test").on("click", function () {
        newsendData(login_user_id);
    });

    // //EnterKeyで送信する
    // $("#imglist").on("keydown", function () {
    //     sendData(ref);
    // });

    //EnterKeyで送信する
    $("#search").keyup(function (event) {
        event = event || window.event;
        if (event.keyCode == 13 || event.which == 13) {
            const searchword = $("#search").val();
            if (searchword != null) {
                $("#imglist").empty();
                loadSearchImage(searchword);
            };
        };
    });

    //メニューバーの表示・非表示の管理
    controlMenu();

    //ボタンアクションによる表示・非表示の管理
    btnAction(login_user_id);

    //画像データのアップロード
    // downloadImageData(firebase, login_user_id);

    //変更画像の読み込み保存
    dragFile();
    // icondragFile();

    //ログイン
    $("#login").on("click", function () {
        // const xmlhttp = createXmlHttpRequest();
        $.ajax({
            url: "select_userlogin.php",
            type: "POST",
            dataType: "text",
            data: { 'email': $('#email').val(), 'password': $('#pass').val() },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log("ajax通信に失敗しました");
            },
            success: function (res) {
                // console.log("ajax通信に成功しました");
                localStorage.setItem("login_user_id", res);
                $("#loginmenu").css({ display: 'none' });
                // $("#sidebar").css({ display: 'inline-block' });
                $("#logout").css({ display: 'inline-block' });
                loadUserData(res);
            }
        });
    });

    $("#makeaccount").on("click", function () {
        window.location.href = "entry.php";
    });

    //ログアウト
    $("#logout").on("click", function () {
        localStorage.removeItem("login_user_id");
        location.reload();
        $("#loginmenu").css({ display: 'inline-block' });
        $("#sidebar").css({ display: 'none' });
        login = false;
    });

    // $("#check2").on("click", function () {
    //     $("#dialogflow").css({ display: 'none' });
    //     $("#bord_content").css({ display: 'iniine' });
    //     $("#message").css({ display: 'iniine' });
    //     $("#command").css({ display: 'iniine' });
    // });
});

//データ受信処理
function receiveData(data) {
    if (data != null) {
        var data = data.val();
        $("#username").text(data.username);
        // console.log(data);
    } else {
        $("#username").text("999999")
    }

    // var str = '<dl id="' + k + '">';
    // str += '<dt>' + v.username + '</dt>';
    // str += '<dd>' + v.reserve + '</dd>';
    // str += '</dl>';
    // $("#output").prepend(str);
};

//データ送信処理
function sendData(ref) {
    const account = $("#accountname").html();
    const image = "テスト";
    const msg = "メッセージ";
    if (account != null && image != null && msg != null && account != "" && image != "" && msg != "") {
        ref.push({
            account: account,
            image: image,
            msg: msg
        });
    }
    // $("#message").val("");
}

function newsendData(login_user_id) {
    const storageRef = firebase.storage().ref();
    const userimage = storageRef.child("106727328335850617879userimage");
    var userimage_url = "テスト";
    // if (userimage != null) {
    //     userimage.getDownloadURL().then(function (url) {
    //         // $('#userimage').attr('src', url);
    //         userimage_url = url;
    //     }).catch(function (error) {
    //         console.log(error);
    //     });
    // }

    const img_chat = firebase.database().ref('/chat/' + login_user_id + '/' + 'imgdata0');
    const account = $("#accountname").html();
    const image = userimage_url;
    const msg = $("#test_text").val();
    if (account != null && image != null && msg != null && account != "" && image != "" && msg != "") {
        img_chat.push({
            account: account,
            image: image,
            msg: msg
        });
    }
    // $("#message").val("");
}



function controlMenu() {
    var displayLoginBar = false;
    var displayMenuBar = false;
    $("#menubar").on("click", function () {
        if (login == false && displayLoginBar == true) {
            $("#loginmenu").css({ display: 'none' });
            $("#sidebar").css({ display: 'none' });
            $("#imglist").css({ width: '100%' });
            displayLoginBar = false;
            displayMenuBar = false;
        } else if (login == false && displayLoginBar == false) {
            $("#loginmenu").css({ display: 'inline' });
            $("#sidebar").css({ display: 'none' });
            $("#imglist").css({ width: '70%' });
            displayLoginBar = true;
            displayMenuBar = false;
        } else if (login == true && displayMenuBar == true) {
            $("#loginmenu").css({ display: 'none' });
            $("#sidebar").css({ display: 'none' });
            $("#imglist").css({ width: '100%' });
            displayLoginBar = false;
            displayMenuBar = false;
        } else {
            $("#loginmenu").css({ display: 'none' });
            $("#sidebar").css({ display: 'inline' });
            $("#imglist").css({ width: '70%' });
            displayLoginBar = false;
            displayMenuBar = true;
        }
    });

    var displayMenu1 = false;
    $("#menu1").on("click", function () {
        if (displayMenu1) {
            $("#childmenu1").css({ display: 'none' });
            displayMenu1 = false;
        } else {
            $("#childmenu1").css({ display: 'inline' });
            displayMenu1 = true;
        }
    });

    var displayMenu2 = false;
    $("#menu2").on("click", function () {
        if (displayMenu2) {
            $("#childmenu2").css({ display: 'none' });
            displayMenu2 = false;
        } else {
            $("#childmenu2").css({ display: 'inline' });
            displayMenu2 = true;
        }
    });

    var displayMenu3 = false;
    $("#menu3").on("click", function () {
        if (displayMenu3) {
            $("#childmenu3").css({ display: 'none' });
            displayMenu3 = false;
        } else {
            $("#childmenu3").css({ display: 'inline' });
            displayMenu3 = true;
        }
    });
}

function btnAction(login_user_id) {
    var delmode = false;

    //addボタン
    $("#add_button").on("click", function () {
        $("#imglist").css({ display: 'none' });
        $("#add_img").css({ display: 'inline-block' });
    });

    $("#delete_button").on("click", function () {
        if (delmode == true) {
            $("#imglist").css({ background: '#fff', opacity: '0.5' });
            $(".del").css({ display: 'none' });
            delmode = false;
        } else {
            $("#imglist").css({ background: 'rgb(168, 168, 169)', opacity: '0.5' });
            $(".del").css({ display: 'inline' });
            delmode = true;
        }
    });

    $(document).on("click", ".follow", function () {
        const id = $(this).attr("id");
        if ($("#" + id).html() == 'Follow NOW') {
            $("#" + id).html("Follow ME");
            $("#" + id).css({ background: '#FFF', color: '#1da1f2' });

            const uid = id.replace('follow', 'user');
            const follow_user_id = $("#" + uid).html();

            $.ajax({
                url: "delete_follower.php",
                type: "POST",
                dataType: "text",
                data: { "user_id": login_user_id, "follow_user_id": follow_user_id },
                scriptCharset: 'utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log("ajax通信に失敗しました");
                },
                success: function (res) {
                    console.log("ajax通信に成功しました");
                }
            });
        } else {
            $("#" + id).html("Follow NOW");
            $("#" + id).css({ background: '#1da1f2', color: '#FFF' });

            const uid = id.replace('follow', 'user');
            const follow_user_id = $("#" + uid).html();

            $.ajax({
                url: "insert_follower.php",
                type: "POST",
                dataType: "text",
                data: { "user_id": login_user_id, "follow_user_id": follow_user_id },
                scriptCharset: 'utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // console.log("ajax通信に失敗しました");
                },
                success: function (res) {
                    // console.log("ajax通信に成功しました");
                }
            });
        }
    });

    $(document).on("click", ".good", function () {
        const id = $(this).attr("id");
        src = $("#" + id).attr('src');

        const imgid = id.replace('good', '');

        if (src == 'img/heart_red.png') {
            $("#" + id).attr('src', 'img/heart_blank.png');
            $.ajax({
                url: "delete_good.php",
                type: "POST",
                dataType: "text",
                data: { "user_id": login_user_id, "img_id": imgid },
                scriptCharset: 'utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // console.log("ajax通信に失敗しました");
                },
                success: function (res) {
                    // console.log("ajax通信に成功しました");
                }
            });
        } else {
            $("#" + id).attr('src', 'img/heart_red.png');
            $.ajax({
                url: "insert_good.php",
                type: "POST",
                dataType: "text",
                data: { "user_id": login_user_id, "img_id": imgid },
                scriptCharset: 'utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // console.log("ajax通信に失敗しました");
                },
                success: function (res) {
                    // console.log("ajax通信に成功しました");
                }
            });
        }
    });

    $(document).on("click", ".del", function () {
        const id = $(this).attr("id");
        src = $("#" + id).attr('src');

        const imgid = id.replace('del_', '');

        $.ajax({
            url: "delete_imginfo.php",
            type: "POST",
            dataType: "text",
            data: { "img_id": imgid },
            scriptCharset: 'utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log("ajax通信に失敗しました");
            },
            success: function (res) {
                // console.log("ajax通信に成功しました");
            }
        });
    });



    //homeボタン
    $("#home_button").on("click", function () {
        $("#imglist").css({ display: 'inline-block' });
        $("#add_img").css({ display: 'none' });
    });

    //ユーザーイメージ画像の変更ボタン
    $("#uimage_change").on("click", function () {
        $("#drop_zone").css({ display: 'inline-block' });
        $("#drop_msg").css({ display: 'inline-block' });
        $("#userimage").css({ display: 'none' });
        $("#uimage_cancel").css({ display: 'inline' });
        $("#uimage_change").css({ display: 'none' });
    });

    //ユーザーイメージのキャンセルボタン
    $("#uimage_cancel").on("click", function () {
        $("#drop_zone").css({ display: 'none' });
        $("#drop_msg").css({ display: 'none' });
        $("#userimage").css({ display: 'inline' });
        $("#uimage_save").css({ display: 'none' });
        $("#uimage_cancel").css({ display: 'none' });
        $("#uimage_change").css({ display: 'inline' });
    });

    //ユーザーイメージの保存ボタン
    $("#uimage_save").on("click", function () {
        $("#drop_zone").css({ display: 'none' });
        $("#drop_msg").css({ display: 'none' });
        $("#userimage").css({ display: 'inline' });
        $("#uimage_save").css({ display: 'none' });
        $("#uimage_cancel").css({ display: 'none' });
        $("#uimage_change").css({ display: 'inline' });
        uploadImageData(firebase, user_id, "uimage");
    });

    $("#icon_change").on("click", function () {
        $("#icon_save").css({ display: 'inline' });
        $("#icon_change").css({ display: 'none' });
    });

    $("#icon_save").on("click", function () {
        uploadImageData(firebase, user_id, "iconimage");
        $("#icon_save").css({ display: 'none' });
        $("#icon_change").css({ display: 'inline' });
    });

    $("#mode").on("change", function () {
        if ($("#mode").val() == 0) {
            $("#imglist").empty();
            loadAllImage();
            $("#add_button").css({ display: 'none' });
            $("#delete_button").css({ display: 'none' });
        } else if ($("#mode").val() == 1) {
            $("#imglist").empty();
            loadUserImage(login_user_id);
            $("#add_button").css({ display: 'inline' });
            $("#delete_button").css({ display: 'inline' });
        } else if ($("#mode").val() == 2) {
            // $("#location").css({ display: 'none' });
            // $("#content").css({ display: 'none' });
        }
    });

    $("#post").on("click", function () {
        addImageData(login_user_id);
        window.location.href = "main.php";
    });
};

// function downloadImageData(firebase, login_user_id) {
//     var storageRef = firebase.storage().ref();
//     const userimage = storageRef.child(login_user_id + "userimage");
//     if (userimage != null) {
//         userimage.getDownloadURL().then(function (url) {
//             $('#userimage').attr('src', url);
//             userimage_url = url;
//         }).catch(function (error) {
//             console.log(error);
//         });
//     }
// }

// function uploadImageData(firebase, login_user_id, position) {
//     // var mountainImagesRef = storageRef.child("imgs/monkey.png");
//     if (files != null && position == "uimage") {
//         const dragfile = files[0];
//         const storageRef = firebase.storage().ref(login_user_id + "userimage");
//         storageRef.put(dragfile).then(function (snapshot) {
//             alert("保存しました");
//         });
//         userimage_url = pre_userimage_url;
//     } else if (iconfiles != null && position == "iconimage") {
//         const iconfile = iconfiles[0];
//         const storageRef = firebase.storage().ref(login_user_id + "iconimage");
//         storageRef.put(iconfile).then(function (snapshot) {
//             alert("保存しました");
//         });
//         signbord_url = pre_signbord_url;
//     }
// }

function dragFile() {
    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';

        files = evt.dataTransfer.files; // FileList object.
        console.log(files);
        var file = files[0];
        var reader = new FileReader();
        //dataURL形式でファイルを読み込む
        reader.readAsDataURL(file);
        //ファイルの読込が終了した時の処理
        reader.onload = function () {
            // readImage(reader);
            var result_DataURL = reader.result;
            pre_userimage_url = reader.result;
            $('#drop_image').attr('src', result_DataURL);
            $("#drop_image").css({ display: 'inline' });
            $("#drop_msg").css({ display: 'none' });
            $("#drop_zone").css({ border: '2px dashed #ff8952' });
        }
        //ファイルの読込が終了した時の処理

        // files is a FileList of File objects. List some properties.
        // var output = [];
        // for (var i = 0, f; f = files[i]; i++) {
        //     output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
        //         f.size, ' bytes, last modified: ',
        //         f.lastModifiedDate.toLocaleDateString(), '</li>');
        // }
        // document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        if (files != null) {
            $("#uimage_cancel").css({ display: 'none' });
            $("#uimage_save").css({ display: 'inline' });
        }
    }
}

function icondragFile() {
    // Setup the dnd listeners.
    var icondropZone = document.getElementById('icon_drop_zone');
    icondropZone.addEventListener('dragover', handleDragOver, false);
    icondropZone.addEventListener('drop', handleFileSelect, false);

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
        // console.log(evt);

        iconfiles = evt.dataTransfer.files; // FileList object.
        var file = iconfiles[0];

        var reader = new FileReader();
        //dataURL形式でファイルを読み込む
        reader.readAsDataURL(file);
        //ファイルの読込が終了した時の処理
        reader.onload = function () {
            // readImage(reader);
            var result_DataURL = reader.result;
            pre_signbord_url = reader.result;
            $('#icon_image').attr('src', result_DataURL);
            $("#icon_image").css({ display: 'inline-block' });
            $("#icon_msg").css({ display: 'none' });
            $("#icon_save").css({ 'background-color': "#ffa653" });
            $("#icon_save").css({ border: "1px solid #ffa653" });
        }
    }
}

function readImage(reader) {
    //ファイル読み取り後の処理
    var result_DataURL = reader.result;
    //読み込んだ画像とdataURLを書き出す
    // var img = document.getElementById('drop_image');
    $('#drop_image').attr('src', result_DataURL);
    $("#drop_image").css({ display: 'inline' });
    $("#drop_msg").css({ display: 'none' });
    $("#drop_zone").css({ border: '2px dashed #ff8952' });
    $("#icon_image").css({ display: 'inline' });
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function controlMassege(id) {
    signbordmsg = firebase.database().ref('/signbord/' + id);
    const imgsrc = $("#userimage").attr('src');
    // var image = {
    //     url: imgsrc,
    //     scaledSize: new google.maps.Size(42, 42)
    // };
    signbordmsg.on("child_added", function (data) {
        var v = data.val();
        var k = data.key;

        var str = '<dl id="' + k + '">';
        str += '<img src=' + imgsrc + '" width="50"><br>';
        str += '<dt>' + v.username + '</dt>';
        str += '<dd>' + v.text + '</dd>';
        str += '</dl>';
        $("#bord_content").prepend(str);
    });
};

//☆JSONでのやり取りに書き換える
function loadUserInfo(login_user_id) {
    // const login_user_id = localStorage.getItem("login_user_id");
    // const login_user_id = "2";
    $.ajax({
        url: "select_userinfo.php",
        type: "POST",
        dataType: "text",
        data: { 'user_id': login_user_id },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
            const result = JSON.parse(res);
            $("#accountname").html(result[0].account);
            // localStorage.setItem("login_user_id",res);
            $("#loginmenu").css({ display: 'none' });
            // $("#sidebar").css({ display: 'inline-block' });
            $("#logout").css({ display: 'inline-block' });
            login = true;
        }
    });
};

function loadUserImageCount(login_user_id) {
    // const login_user_id = localStorage.getItem("login_user_id");
    // const login_user_id = "2";
    $.ajax({
        url: "select_userimgcount.php",
        type: "POST",
        dataType: "text",
        data: { 'user_id': login_user_id },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
            const result = JSON.parse(res);
            $("#imagenum").html(result[0].num);
        }
    });
};

function loadUserGoodCount(login_user_id) {
    // const login_user_id = localStorage.getItem("login_user_id");
    // const login_user_id = "2";
    $.ajax({
        url: "select_usergoodcount.php",
        type: "POST",
        dataType: "text",
        data: { 'user_id': login_user_id },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
            const result = JSON.parse(res);
            $("#good").html(result[0].num);
        }
    });
};

function loadUserFollowCount(login_user_id) {
    // const login_user_id = localStorage.getItem("login_user_id");
    // const login_user_id = "2";
    $.ajax({
        url: "select_userfollowcount.php",
        type: "POST",
        dataType: "text",
        data: { 'user_id': login_user_id },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
            const result = JSON.parse(res);
            $("#follower").html(result[0].num);
        }
    });
};

function loadAllImage() {
    var result = "";
    $.ajax({
        url: "select_allimginfo.php",
        type: "POST",
        dataType: "text",
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
                $("#imglist").append('<div id="' + 'img' + img_id + '" style="display:flex; height:220px;margin-left:15px;"></div>');
                $("#" + 'img' + img_id).append('<div class="del" style="display:none;width:5%;"><p id="del_' + result[i].img_id + '" class="del_btn" style="cursor: pointer;font-size:30px;text-align:center;">☒</p></div>');
                $("#" + 'img' + img_id).append('<div style="width:15%;"><img id=imgdata"' + img_id + '" src="' + result[i].img_data + '" style="margin:10px 10px;object-fit:contain;max-width:90%;max-height:200px;"></div>');
                $("#" + 'img' + img_id).append('<text id="' + 'abstract' + img_id + '" style="height:195px; margin:10px 10px; width:45%;border-style:solid;border-width:0.5px;padding:5px;overflow: auto;" readonly>' + result[i].abstract + '</text>');
                $("#" + 'img' + img_id).append('<div id=msg"' + img_id + '" style="height:175px; margin:10px 10px; width:35%;">' + '</div>');
                $("#" + 'img' + img_id).append('<div style="display:none"><p id="user' + img_id + '">' + result[i].user_id + '</p></div>');
                // loadMsg(login_user_id, img_id, i);
            };
        }
    });
};

function loadUserImage(login_user_id) {
    var result = "";
    $.ajax({
        url: "select_userimginfo.php",
        type: "POST",
        dataType: "text",
        data: { 'user_id': login_user_id },
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
                $("#imglist").append('<div style="display:flex;"><h3 id="' + 'account' + img_id + '" style="margin:0;margin-left:20px;">' + 'by ' + result[i].account + '</h3>');
                $("#imglist").append('<div id="' + 'img' + img_id + '" style="display:flex; height:220px;"></div>');
                $("#" + 'img' + img_id).append('<div class="del" style="display:none;width:5%;"><p id="del_' + result[i].img_id + '" class="del_btn" style="cursor: pointer;font-size:30px;text-align:center;">☒</p></div>');
                $("#" + 'img' + img_id).append('<div style="width:15%;"><img id=imgdata"' + img_id + '" src="' + result[i].img_data + '" style="margin:10px 10px;object-fit:contain;max-width:90%;max-height:220px;"></div>');
                $("#" + 'img' + img_id).append('<text id="' + 'abstract' + img_id + '" style="height:195px; margin:10px 10px; width:45%;border-style:solid;border-width:0.5px;padding:5px;overflow: auto;" readonly>' + result[i].abstract + '</text>');
                $("#" + 'img' + img_id).append('<div id=msg"' + img_id + '" style="height:175px; margin:10px 10px; width:35%;">' + '</div>');
                // loadMsg(login_user_id, img_id, i);
            };
        }
    });
    // $('.del_btn').on('click', function () {
    //     const id = $(this).attr("id");
    //     alert(id);
    // });
};

function loadSearchImage(searchword) {
    var result = "";
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
                $("#" + 'img' + img_id).append('<div id=msg"' + img_id + '" style="height:175px; margin:10px 10px; width:35%;">' + '</div>');
                $("#" + 'img' + img_id).append('<div style="display:none"><p id="user' + img_id + '">' + result[i].user_id + '</p></div>');
                // loadMsg(login_user_id, img_id, i);
            };
        }
    });
};

function loadMsg(login_user_id, img_id, i) {
    var storageRef = firebase.storage().ref();
    const userimage = storageRef.child("106727328335850617879userimage");
    if (userimage != null) {
        userimage.getDownloadURL().then(function (url) {
            userimage_url = url;
        }).catch(function (error) {
            console.log(error);
        });
    }
    const img_chat = firebase.database().ref('/chat/' + login_user_id + '/' + img_id);
    img_chat.on("child_added", function (data) {
        const param = data.val();
        $("#" + 'msg' + i).append('<div style="display:flex; overflow: auto;"><img style="margin: 0; height:20px; widht:20px;" src="' + userimage_url + '>' + '<p style="margin: 0; font-size:14px;">' + param.account + '</p></div>');
        // $("#" + 'msg' + i).append('<div style="display:flex;"><img style="margin: 0;" src="' + param.image + '" style="height:50px; widht:50px;">');
        // $("#" + 'msg' + i).append('<p style="margin: 0; font-size:10px;">' + param.account + '</p></div>');
        $("#" + 'msg' + i).append('<p style="margin: 0; background-color: #bfe3f5;">' + param.msg + '</p>');
    });
};

//☆JSONでのやり取りに書き換える
function addImageData(login_user_id) {
    const img_name = $("#img_name").val();
    const img_data = $("#img_url").val();
    const category = $("#category").val();
    const abstract = $("#abstract").val();

    var data = { "img_name": img_name, "img_data": img_data, "user_id": login_user_id, "category": category, "abstract": abstract };

    // var jsondata = JSON.stringify(data);

    $.ajax({
        url: "insert_imginfo.php",
        type: "POST",
        dataType: "text",
        data: { "img_name": img_name, "img_data": img_data, "user_id": login_user_id, "category": category, "abstract": abstract },
        scriptCharset: 'utf-8',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            console.log("ajax通信に成功しました");
        }
    });
};

function loadUserData(login_user_id) {
    $("#imglist").empty();
    loadUserInfo(login_user_id);
    loadUserImageCount(login_user_id);
    loadAllImage(login_user_id);
    loadUserGoodCount(login_user_id);
    loadUserFollowCount(login_user_id);
    // loadUserImage(user_id);
}


// function createXmlHttpRequest() {
//     var xmlhttp = null;
//     if (window.ActiveXObject) {
//         try {
//             xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
//         } catch (e) {
//             try {
//                 xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//             } catch (e2) {
//             }
//         }
//     } else if (window.XMLHttpRequest) {
//         xmlhttp = new XMLHttpRequest();
//     }
//     return xmlhttp;
// };
