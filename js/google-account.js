

function googleLogin(firebase) {
    var dfd = new $.Deferred();
    var exsistData = false;
    firebase.auth().getRedirectResult().then(function (result) {
        if (!result.credential) {
            //ログインしていなければ認証画面へリダイレクト
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
            return d.resolve();
        } else {
            //ログイン成功時の処理
            const profile = result.additionalUserInfo.profile;
            const user_id = profile.id;
            localStorage.setItem('user_id', user_id);

            //google_idとアカウントのチェック
            userinfo = firebase.database().ref('/userinfo');
            userinfo.on("value", function (data) {
                const val = data.val();
                var length = Object.keys(val).length;
                var id = Object.keys(val);
                if (length != 0) {
                    for (var i = 0; i < length; i += 1) {
                        if (id[i] == user_id) {
                            $("#loading_start").fadeOut(100);  //ローディング修了
                            $("#loading_end").fadeIn(100);     //ローディング表示
                            $("#map").css({ display: 'inline' });     //ローディング表示
                            buildSignBords();
                            return dfd.resolve(true);
                        }
                    }
                    window.location.href = "entry.html";
                    return dfd.resolve(false);
                } else {
                    return dfd.resolve(true);
                }
            });

            $("#user_view").html("Login:	" + result.user.email);
            $("#username").val(result.user.displayName);
        }
        return dfd.resolve(true);
    }).catch(function (error) {
        console.log('Error', error);
        //ログイン失敗時の処理
        $("#user_view").html("Login Error.");
        return dfd.reject(error);
    });
    return dfd.promise();
}

//---------------------------------------------------------
//Googleログアウト
//---------------------------------------------------------
function googleLogout() {
    firebase.auth().signOut().then(function () {
        //Sign-out successful.
        alert("ログアウトしました");
        window.location.href = "logout.html";
    }, function (error) {
        // An error happened.
        alert("ログアウトに失敗しました");
    });
}