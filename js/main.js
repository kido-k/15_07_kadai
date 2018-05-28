//全体利用のグローバル変数
var files;
var iconfiles;

var pre_userimage_url;
var pre_signbord_url;
var userimage_url;
var signbord_url;
var signbordmsg;

$(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDybShiVah0D_qufhL3DlqqReyYrHY9Tpg",
        authDomain: "chatapp-e0a7e.firebaseapp.com",
        databaseURL: "https://chatapp-e0a7e.firebaseio.com",
        projectId: "chatapp-e0a7e",
        storageBucket: "chatapp-e0a7e.appspot.com",
        messagingSenderId: "491914417432"
    };
    firebase.initializeApp(config);

    //MSG送受信準備
    ref = firebase.database().ref();

    //LocalStrageにloginidを保存
    // googleLogin(firebase).done(function (result) {   //deferredを入れてみたもののうまく動かず、、現状問題なし
    // }).fail(function (e) {
    //     console.log(e);
    // });

    //MSGデータ受信
    // child_added:毎回１個//value:毎回すべてのデータを取得
    // ref.on("child_added", function (data) {
    //     var val = data.val();
    // });

    // userinfo = firebase.database().ref('/userinfo/' + user_id);

    // userinfo.on("value", function (data) {
    //     receiveData(data);
    // });

    const user_id = localStorage.getItem("user_id");

    const xmlhttp = createXmlHttpRequest();

    if (xmlhttp != null) {
        xmlhttp.open("POST", "php/question1.php", true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        const data = "user_id=" + user_id;
        xmlhttp.send(data);
        var res = xmlhttp.responseText;
        q1finish = true;

        if (user_id != null) {
            //ログインボタンの非表示

            //user_infoテーブルから情報を取得
        }
    }

    // Submit:MSG送信
    $("#send").on("click", function () {
        sendData();
    });

    //EnterKeyで送信する
    $("#text").on("keydown", function () {
        sendData();
    });

    //メニューバーの表示・非表示の管理
    controlMenu();

    //ボタンアクションによる表示・非表示の管理
    btnAction(user_id);

    //画像データのアップロード
    downloadImageData(firebase, user_id);

    //変更画像の読み込み保存
    dragFile();
    icondragFile();

    // //Googleログアウト
    $("#logout").on("click", function () {
        googleLogout();
    });

    //チェックボタンによるアクション確認用
    $("#check").on("click", function () {
        $("#dialogflow").css({ display: 'inline' });
        $("#bord_content").css({ display: 'none' });
        $("#message").css({ display: 'none' });
        $("#command").css({ display: 'none' });
    });

    $("#check2").on("click", function () {
        $("#dialogflow").css({ display: 'none' });
        $("#bord_content").css({ display: 'iniine' });
        $("#message").css({ display: 'iniine' });
        $("#command").css({ display: 'iniine' });
    });
});

//データ受信処理
function receiveData(data) {
    if (data != null) {
        var data = data.val();
        $("#username").text(data.username);
        console.log(data);
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
function sendData() {
    username = $("#username").val();
    text = $("#message").val();
    if (username != null && text != null && username != "" && text != "") {
        signbordmsg.push({
            username: username,
            text: text,
        });
    }
    $("#message").val("");
}

function controlMenu() {
    var displayMenuBar = false;
    $("#menubar").on("click", function () {
        if (displayMenuBar) {
            $("#sidebar").css({ display: 'none' });
            displayMenuBar = false;
        } else {
            $("#sidebar").css({ display: 'inline' });
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

function btnAction(user_id) {
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
            $("#location").css({ display: 'none' });
            $("#content").css({ display: 'none' });
        } else if ($("#mode").val() == 1) {
            $("#location").css({ display: 'inline' });
            $("#content").css({ display: 'inline' });
        } else if ($("#mode").val() == 2) {
            $("#location").css({ display: 'none' });
            $("#content").css({ display: 'none' });
        }
    });

}

function downloadImageData(firebase, user_id) {
    var storageRef = firebase.storage().ref();
    const userimage = storageRef.child(user_id + "userimage");
    if (userimage != null) {
        userimage.getDownloadURL().then(function (url) {
            $('#userimage').attr('src', url);
            userimage_url = url;
        }).catch(function (error) {
            console.log(error);
        });
    }
    const signbordimage = storageRef.child(user_id + "iconimage");
    if (signbordimage != null) {
        signbordimage.getDownloadURL().then(function (url) {
            $('#icon_image').attr('src', url);
            $('#icon_image').css({ display: 'inline-block' });
            $('#icon_msg').css({ display: 'none' });
            signbord_url = url;
        }).catch(function (error) {
            console.log(error);
        });
    }
}

function uploadImageData(firebase, user_id, position) {
    // var mountainImagesRef = storageRef.child("imgs/monkey.png");
    if (files != null && position == "uimage") {
        const dragfile = files[0];
        const storageRef = firebase.storage().ref(user_id + "userimage");
        storageRef.put(dragfile).then(function (snapshot) {
            alert("保存しました");
        });
        userimage_url = pre_userimage_url;
    } else if (iconfiles != null && position == "iconimage") {
        const iconfile = iconfiles[0];
        const storageRef = firebase.storage().ref(user_id + "iconimage");
        storageRef.put(iconfile).then(function (snapshot) {
            alert("保存しました");
        });
        signbord_url = pre_signbord_url;
    }
}

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

function createXmlHttpRequest() {
    var xmlhttp = null;
    if (window.ActiveXObject) {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e2) {
            }
        }
    }
    else if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
};