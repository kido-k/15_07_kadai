

//{ポイント名称、GPS位置（x座標、y座標）、掲示板の内容、レイヤー、いいね、フォロー}
var signbords = [
    { location: "デイリーヤマザキ", latlng: { lat: 35.673501, lng: 139.655598 }, contents: "いい店だったよ", good: 0, follow: 0 },
    { location: "スーパーつかさ 和泉店", latlng: { lat: 35.674668, lng: 139.655083 }, contents: "", good: 0, follow: 0 },
    { location: "永井歯科医院", latlng: { lat: 35.673668, lng: 139.657541 }, contents: "", good: 0, follow: 0 },
    { location: "杉並和泉郵便局", latlng: { lat: 35.675612, lng: 139.658297 }, contents: "", good: 0, follow: 0 },
];

var markers = [];

function create_signbord(options) {
    var m = new google.maps.Marker(options);
    return m;
}
//マーカーを落とす
function buildSignBords() {
    //既にあるマーカーを一旦削除
    removeSignBords();
    //新たに生成
    var i = 0;
    for (i = 0; i < signbords.length; i++) {
        marker = create_signbord({
            map: gmap_canvas,
            position: points[i].latlng,
            title: points[i].location
        });
        //ここで生成したマーカーを順次格納する
        markers.push(marker);
    }
}

//マーカーを削除する
function removeSignBords() {
    const idx = null;
    if (idx == null) {
        //生成済マーカーを順次すべて削除する
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];	//参照を開放
    } else {
        //生成済マーカーからID指定されたマーカーを削除
        for (var i = 0; i < markers.length; i++) {
            if (idx.indexOf(i) >= 0) {
                markers[i].setMap(null);
            }
        }
    }

};
