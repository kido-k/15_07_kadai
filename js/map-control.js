
var map;

var initial = true;
var marker = [];
var infowindow = [];

// var firebase;

var markers = [
    { id:"1000", location: "デイリーヤマザキ", latLng: { lat: 35.673501, lng: 139.655598 }, content: "いい店だったよ", good: 0, follow: 0 },
    { id:"1001", location: "スーパーつかさ 和泉店", latLng: { lat: 35.674668, lng: 139.655083 }, content: "鳥肉特売！！<br>野菜高騰", good: 0, follow: 0 },
    { id:"1002", location: "永井歯科医院", latLng: { lat: 35.673668, lng: 139.657541 }, content: "治療が痛くない<br>水曜は休み", good: 0, follow: 0 },
    { id:"1003", location: "杉並和泉郵便局", latLng: { lat: 35.675612, lng: 139.658297 }, content: "鬼早で届く", good: 0, follow: 0 },
];

//1．位置情報の取得に成功した時の処理
function mapsInit(position) {
    //lat=緯度、lon=経度 を取得
    // const lat = position.coords.latitude;
    // const lon = position.coords.longitude;

    const lat = 35.671255;
    const lon = 139.658804;

    const latLng = { lat: lat, lng: lon };
    // if (initial) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: latLng,
        zoom: 15
    });
    // }

    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        // icon: 'm.png'
        title: '現在地'
    });

    //マップのクリックイベント
    map.addListener('click', function (e) {
        if ($("#mode").val() == 0) {
            // placeMarkerAndPanTo(e.latLng, map);
            hideMessageBox();
        } else if ($("#mode").val() == 1) {
            placeMarkerAndPanTo(e.latLng, map);
            hideMessageBox();
        } else if ($("#mode").val() == 2) {
            // placeMarkerAndPanTo(e.latLng, map);
            hideMessageBox();
        }
    });

    // マーカーのクリックイベント
    // marker.addListener('click', function (e) {
    //     if ($("#mode").val() == 0) {
    //         // placeMarkerAndPanTo(e.latLng, map);
    //         console.log(e);
    //     } else if ($("#mode").val() == 1) {
    //         placeMarkerAndPanTo(e.latLng, map);
    //     } else if ($("#mode").val() == 2) {
    //         removeSignBords();
    //     }
    // });

    $("#check").on('click', function () {
        // buildSignBords();
    });

    // $("#check2").on('click', function () {
    //     makeMarerList(markers);
    // });

    makeMarerList(markers);
};

//2． 位置情報の取得に失敗した場合の処理
function mapsError(error) {
    let e = "";
    if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
        e = "位置情報が許可されてません";
    }
    if (error.code == 2) { //2＝現在地を特定できない
        e = "現在位置を特定できません";
    }
    if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
        e = "位置情報を取得する前にタイムアウトになりました";
    }
    alert("エラー：" + e);
};

//3.位置情報取得オプション
const set = {
    enableHighAccuracy: true, //より高精度な位置を求める
    maximumAge: 20000,        //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
    timeout: 10000            //10秒以内に現在地情報を取得できなければ、処理を終了
};

function initMap() {
    //Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition
    navigator.geolocation.getCurrentPosition(mapsInit, mapsError, set);
}

function placeMarkerAndPanTo(latLng, map) {
    var location = $("#location").val();
    var content = $("#content").val();
    var newmarker = { location: location, latLng: latLng, content: content, good: 0, follow: 0 };
    const imgsrc = $("#icon_image").attr('src');
    var image = {
        url: imgsrc,
        scaledSize: new google.maps.Size(42, 42)
    };

    if(location =="" || content=="") {
        alert("テキストボックスに入力してください");
    } else {
        var marker = new google.maps.Marker({
            location: location,
            content: content,
            position: latLng,
            map: map,
            icon: image
        });
        markers.push(newmarker);
        map.panTo(latLng);
        $("#location").val("");
        $("#content").val("");
        // console.log(marker);
    }
}

// function rmMarker(map, marker) {
//     map.removeOverlay(marker);
// }

// var markers = [];

//マーカーを落とす
function buildSignBords() {
    //既にあるマーカーを一旦削除
    // removeSignBords();
    //新たに生成
    const imgsrc = $("#icon_image").attr('src');
    var image = {
        url: imgsrc,
        scaledSize: new google.maps.Size(42, 42)
    };

    for (var i = 0; i < markers.length; i++) {
        marker[i] = create_signbord({
            map: map,
            position: markers[i].latLng,
            title: markers[i].location,
            icon: image
        });
        var content = '<h2>' + markers[i].location + '</h2><br><p>' + markers[i].content + '</p>';
        infowindow[i] = create_infoview({
            content: content,
            maxWidth: 200
        });
        // ここで生成したマーカーを順次格納する
        clickSignbord(i);
        infowindow[i].addListener('closeclick', function () {
            openedInfowindow = '';
        });
    }
}

function create_signbord(param) {
    var marker = new google.maps.Marker(param);
    return marker;
}

function create_infoview(param) {
    var infoview = new google.maps.InfoWindow(param);
    return infoview;
}

function clickSignbord(n) {
    marker[n].addListener('click', function () {
        if ($("#mode").val() == 0) {
            // placeMarkerAndPanTo(e.latLng, map);
            infowindow[n].open(map, marker[n]);
            displayMessageBox(n);
            setMessage(n);
        } else if ($("#mode").val() == 1) {
            // placeMarkerAndPanTo(e.latLng, map);
            displayMessageBox(n);
            setMessage(n);
        } else if ($("#mode").val() == 2) {
            removeSignBords(n);
        }
    });
}

//マーカーを削除する
function removeSignBords(n) {
    markers.splice(n, 1); // 二番目から一つ削除
    for (var i = 0; i < markers.length; i++) {
        // marker[n].setMap(null);
        marker.splice(n, 1);
    };
    clearMarkers(n);
    // buildSignBords();
    // const idx = null;
    // if (idx == null) {
    //     //生成済マーカーを順次すべて削除する
    //     for (var i = 0; i < signbords.length; i++) {
    //         signbords[i].setMap(null);
    //     }
    //     signbords = [];	//参照を開放
    // } else {
    //     //生成済マーカーからID指定されたマーカーを削除
    //     for (var i = 0; i < signbords.length; i++) {
    //         if (idx.indexOf(i) >= 0) {
    //             signbords[i].setMap(null);
    //         }
    //     }
    // }
};


function clearMarkers(n) {
    marker[n].setMap(null);
    marker[n] = null;
}


function makeMarerList(markers) {
    for (var i = 0; i < markers.length; i++) {
        $('#childmenu2').append("<li>" + markers[i].location + "</li>");
    }
}

function displayMessageBox(n){
    $("#bord_title").css({ display: 'inline' });
    $("#bord_content").css({ display: 'inline' });
    $("#message").css({ display: 'inline' });
    $("#command").css({ display: 'inline' });
    $("#bord_title_h2").html(markers[n].location);
    $("#bord_content_p").html(markers[n].content);
}

function hideMessageBox(){
    $("#bord_title").css({ display: 'none' });
    $("#bord_content").css({ display: 'none' });
    $("#message").css({ display: 'none' });
    $("#command").css({ display: 'none' });    
    $("#h1_title").html("");
    $("bord_content_p").html("");
}

function setMessage(n){
    $("#bord_content").empty();
    const id = markers[n].id;
    controlMassege(id);
}