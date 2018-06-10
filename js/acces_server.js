

function select_userimginfo(login_user_id, searchword) {
    var result = "";
    var php = "";
    var senddata = "";
    if (searchword != null) {
        php = "select_searchimginfo.php";
        senddata = { 'searchword': searchword };
    } else {
        php = "select_userimginfo.php";
        senddata = { 'user_id': login_user_id };
    }

    $.ajax({
        url: php,
        type: "POST",
        dataType: "text",
        data: senddata,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
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
                $("#" + 'img' + img_id).append('<div id=msg' + img_id + '" style="height:175px; margin:10px 10px; width:35%;">' + '</div>');
            };
        }
    });
}

function select_allimginfo() {
    var result = "";
    $.ajax({
        url: "select_allimginfo.php",
        type: "POST",
        dataType: "text",
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
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
                $("#" + 'img' + img_id).append('<div id=msg' + img_id + '" style="height:175px; margin:10px 10px; width:35%;">' + '</div>');
                $("#" + 'img' + img_id).append('<div style="display:none"><p id="user' + img_id + '">' + result[i].user_id + '</p></div>');
            };
        }
    });
};

function select_userfollowcount(login_user_id) {
    $.ajax({
        url: "select_userfollowcount.php",
        type: "POST",
        dataType: "text",
        data: { 'user_id': login_user_id },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
            const result = JSON.parse(res);
            $("#follower").html(result[0].num);
        }
    });
};

function select_userimgcount(login_user_id) {
    $.ajax({
        url: "select_userimgcount.php",
        type: "POST",
        dataType: "text",
        data: { 'user_id': login_user_id },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
            const result = JSON.parse(res);
            $("#imagenum").html(result[0].num);
        }
    });
};

function select_usergoodcount(login_user_id) {
    $.ajax({
        url: "select_usergoodcount.php",
        type: "POST",
        dataType: "text",
        data: { 'user_id': login_user_id },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
            const result = JSON.parse(res);
            $("#good").html(result[0].num);
        }
    });
};

function select_userinfo(login_user_id) {
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
            $("#logout").css({ display: 'inline-block' });
        }
    });
};



function insert_imginfo(senddata) {
    $.ajax({
        url: "insert_imginfo.php",
        type: "POST",
        dataType: "text",
        data: senddata,
        scriptCharset: 'utf-8',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ajax通信に失敗しました");
        },
        success: function (res) {
        }
    });
};

function insert_imginfo(login_user_id, follow_user_id) {
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
};

function insert_good(login_user_id, img_id) {
    $.ajax({
        url: "insert_good.php",
        type: "POST",
        dataType: "text",
        data: { "user_id": login_user_id, "img_id": img_id },
        scriptCharset: 'utf-8',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
        }
    });
};






function delete_follower(login_user_id, follow_user_id) {
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
            // console.log("ajax通信に成功しました");
        }
    });
};


function delete_good(login_user_id, img_id) {
    $.ajax({
        url: "delete_good.php",
        type: "POST",
        dataType: "text",
        data: { "user_id": login_user_id, "img_id": img_id },
        scriptCharset: 'utf-8',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
        }
    });
};

function delete_imginfo(img_id) {
    $.ajax({
        url: "delete_imginfo.php",
        type: "POST",
        dataType: "text",
        data: { "img_id": img_id },
        scriptCharset: 'utf-8',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // console.log("ajax通信に失敗しました");
        },
        success: function (res) {
            // console.log("ajax通信に成功しました");
        }
    });
}