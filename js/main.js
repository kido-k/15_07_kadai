//全体利用のグローバル変数
var files;
var iconfiles;

var pre_userimage_url;
var userimage_url;

$(function () {

    // ログイン中かどうかの判定
    const login_user_id = sessionStorage.getItem("user_id");

    if (login_user_id != null) {
        loadUserData(login_user_id);
    } else {
        window.location.href = "demo_main.php";
    };

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

    //新規アカウント作成
    $("#makeaccount").on("click", function () {
        window.location.href = "entry.php";
    });

    //ログアウト
    $("#logout").on("click", function () {
        window.sessionStorage.clear();
        window.location.href = "demo_main.php";
    });
});

function controlMenu() {
    var displayMenuBar = false;
    $("#menubar").on("click", function () {
        if (displayMenuBar == true) {
            $("#sidebar").css({ display: 'none' });
            $("#imglist").css({ width: '100%' });
            displayMenuBar = false;
        } else {
            $("#sidebar").css({ display: 'inline' });
            $("#imglist").css({ width: '70%' });
            displayMenuBar = true;
        }
    });
};

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

    //動的classはこの書き方じゃないと反応しない
    $(document).on("click", ".follow", function () {
        const id = $(this).attr("id");
        if ($("#" + id).html() == 'Follow NOW') {
            $("#" + id).html("Follow ME");
            $("#" + id).css({ background: '#FFF', color: '#1da1f2' });
            const uid = id.replace('follow', 'user');
            const follow_user_id = $("#" + uid).html();
            delete_follower(login_user_id, follow_user_id);

        } else {
            $("#" + id).html("Follow NOW");
            $("#" + id).css({ background: '#1da1f2', color: '#FFF' });
            const uid = id.replace('follow', 'user');
            const follow_user_id = $("#" + uid).html();
            insert_imginfo(login_user_id, follow_user_id);
        }
    });

    //動的classはこの書き方じゃないと反応しない
    $(document).on("click", ".good", function () {
        const id = $(this).attr("id");
        src = $("#" + id).attr('src');
        const img_id = id.replace('good', '');

        if (src == 'img/heart_red.png') {
            $("#" + id).attr('src', 'img/heart_blank.png');
            delete_good(login_user_id, img_id);
        } else {
            $("#" + id).attr('src', 'img/heart_red.png');
            insert_good(login_user_id, img_id);
        };
    });

    $(".del_btn").on("click", function () {
        const id = $(this).attr("id");
        src = $("#" + id).attr('src');
        const img_id = id.replace('del_', '');

        delete_imginfo(img_id)

        window.location.href = "main.php";
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
            loadAllImage(login_user_id);
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

function uploadImageData(firebase, login_user_id, position) {
    // var mountainImagesRef = storageRef.child("imgs/monkey.png");
    if (files != null && position == "uimage") {
        const dragfile = files[0];
        const storageRef = firebase.storage().ref(login_user_id + "userimage");
        storageRef.put(dragfile).then(function (snapshot) {
            alert("保存しました");
        });
        userimage_url = pre_userimage_url;
    } else if (iconfiles != null && position == "iconimage") {
        const iconfile = iconfiles[0];
        const storageRef = firebase.storage().ref(login_user_id + "iconimage");
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
        // console.log(files);
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

//☆JSONでのやり取りに書き換える
function addImageData(login_user_id) {
    const img_name = $("#img_name").val();
    const img_data = $("#img_url").val();
    const category = $("#category").val();
    const abstract = $("#abstract").val();
    var senddata = { "img_name": img_name, "img_data": img_data, "user_id": login_user_id, "category": category, "abstract": abstract };
    insert_imginfo(senddata);
};

function loadUserData(login_user_id) {
    $("#imglist").empty();
    loadUserInfo(login_user_id);
    loadUserImageCount(login_user_id);
    loadAllImage();
    loadUserGoodCount(login_user_id);
    loadUserFollowCount(login_user_id);
};

function loadUserInfo(login_user_id) {
    select_userinfo(login_user_id);
};

function loadUserImageCount(login_user_id) {
    select_userimgcount(login_user_id);
};

function loadUserGoodCount(login_user_id) {
    select_usergoodcount(login_user_id);
};

function loadUserFollowCount(login_user_id) {
    select_userfollowcount(login_user_id)
};

function loadAllImage() {
    select_allimginfo();
};

function loadUserImage(login_user_id) {
    const searchword = "";
    select_userimginfo(login_user_id, searchword);
};

function loadSearchImage(searchword) {
    const login_user_id = "";
    select_userimginfo(login_user_id, searchword);
};
