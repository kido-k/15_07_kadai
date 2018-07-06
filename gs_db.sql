-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 
-- サーバのバージョン： 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gs_db`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `img_info`
--

CREATE TABLE `img_info` (
  `img_id` int(11) NOT NULL,
  `img_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `img_data` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `category` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `abstract` text COLLATE utf8_unicode_ci NOT NULL,
  `sysdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- テーブルのデータのダンプ `img_info`
--

INSERT INTO `img_info` (`img_id`, `img_name`, `img_data`, `user_id`, `category`, `abstract`, `sysdate`) VALUES
(1, 'スラムダンクが新装されていたから買ってみた！', 'https://images-na.ssl-images-amazon.com/images/I/51B-8QRJsqL._SL500_SR160,160_.jpg', 2, '0', 'なつかしい', '2018-05-31'),
(2, '落合洋一からの挑戦状！？理解できる人などいるのだろうか！', 'https://images-na.ssl-images-amazon.com/images/I/81AlSE9iN6L._SL500_SR160,160_.jpg', 2, '1', '超絶難しい', '2018-05-31'),
(3, '乃木坂の写真集が売れすぎているがその中でも一番おすすめのやつ', 'https://images-na.ssl-images-amazon.com/images/I/51eMdfEvYQL._SL500_SR160,160_.jpg', 2, '2', '可愛かった', '2018-05-31'),
(4, 'ただただグラブル攻略本', 'https://images-na.ssl-images-amazon.com/images/I/61H9DrlFXLL._SX345_BO1,204,203,200_.jpg', 2, '0', 'めっちゃ参考になった！！', '2018-06-03'),
(5, '密室ミステリーアクションという名の新境地へ', 'https://images-na.ssl-images-amazon.com/images/I/51OeTRL6RnL._SX312_BO1,204,203,200_.jpg', 8, '0', 'まあ、ハンターハンターの新刊なのですが、、', '2017-04-01'),
(6, '羽生結弦が嫌いな人など日本にいない説', 'https://images-na.ssl-images-amazon.com/images/I/51T7RO7CFhL._SX376_BO1,204,203,200_.jpg', 8, '0', 'ただただ大好き', '2017-05-03'),
(7, 'MHWはこれ一本で十分！！', 'https://images-na.ssl-images-amazon.com/images/I/51S4AIejaWL._SX406_BO1,204,203,200_.jpg', 8, '2', 'レベル200を超えまして、、', '2017-09-30'),
(8, '金塊アクションサバイバル！', 'https://images-na.ssl-images-amazon.com/images/I/61H078TU6vL._SX351_BO1,204,203,200_.jpg', 8, '1', '案外、飯の描写がいいのです。', '2017-10-31'),
(9, '近年で一番のハートフルエッセイ', 'https://images-fe.ssl-images-amazon.com/images/I/41uPbPkH3qL._AC_US400_FMwebp_QL65_.jpg', 9, '0', '多才ですね～', '2017-04-01'),
(10, 'ニートの妄想感動劇', 'https://images-na.ssl-images-amazon.com/images/I/61H9DrlFXLL._SX345_BO1,204,203,200_.jpg', 9, '0', '学校での居場所をなくし、閉じこもっていた“こころ”の目の前で、ある日突然部屋の鏡が光り始めた。　輝く鏡をくぐり抜けた先にあったのは、城のような不思議な建物。　そこにはちょうど“こころ”と似た境遇の7人が集められていた――　なぜこの7人が、なぜこの場所に。　すべてが明らかになるとき、驚きとともに大きな感動に包まれる。　生きづらさを感じているすべての人に贈る物語。', '2017-08-03'),
(11, 'トトロファンよ！見るのだーー', 'https://images-na.ssl-images-amazon.com/images/I/51UAoE4w9eL._SY447_BO1,204,203,200_.jpg', 9, '2', '映画『となりのトトロ』の舞台となった所沢。この本では、所沢に住む草好きの宮崎朱美さんが四季折々の自然の魅力や植生を、繊細で美しいスケッチと日記を通じて紹介。また、宮崎駿監督が所沢の地を歩くなかで思い描いたトトロの世界が、そのまま映し出されたイメージボードを、所沢への今の想いを語った監督へのインタビューとともにお届けする。〔4色刷', '2018-04-17'),
(12, '映画化楽しみ！！', 'https://images-na.ssl-images-amazon.com/images/I/41cjMOB2JCL._SX341_BO1,204,203,200_.jpg', 9, '1', 'この本が届いてから数時間で読み終わってしまいました。とても読みやすく、情景をイメージしやすい本。ただ、終わり方が少しインパクトに欠けるかなと思いました。', '2017-12-31'),
(13, '家のカレーが一番なんですよね', 'https://images-na.ssl-images-amazon.com/images/I/41CxQTJZ9iL._SX347_BO1,204,203,200_.jpg', 10, '0', 'これはあかん。電車内で涙が垂れた。最近、涙もろくてね。\r\n早くに夫をなくしてギフとともに住み続ける女性。といってもお涙頂戴の話では全然なくて、どちらかと言うとコミカルな感じです。\r\nなんとなく肩の力が緩む感じの一冊ですね。\r\n\r\n作者は夫婦の共同執筆なんですね。執筆始めてから9年かけて完成！って編集者の泣きそうな顔が浮かびます（＾＾；　ドラマにもなっている作品なんですね。しかし特に事件が起きるわけでもない作品なので、ドラマは盛り上がったのかなあ。', '2016-04-01'),
(14, 'なんだかんだ名作だと思うのです', 'https://images-na.ssl-images-amazon.com/images/I/51Uw2Uig0yL._SX350_BO1,204,203,200_.jpg', 10, '0', 'ガネーシャのアドバイスから個人的に重要だと思った事をメモ代わりに抜粋\r\n\r\n・人が欲しがっている物を先取りする\r\n\r\n・会った人を笑わせる\r\n\r\n・決めたことを続ける環境を作る\r\n\r\n・人気店に入り、人気の理由を観察する\r\n\r\n・毎日、感謝する。\r\n\r\n意識を変えるのではなく、行動を変える。\r\nその事を意識していこうと思います。', '2017-09-06'),
(15, 'デザインも中身も引き込まれた、、猫、、', 'https://images-na.ssl-images-amazon.com/images/I/711S8EYWaRL._SL500_SR160,160_.jpg', 10, '2', '色鉛筆で描きこまれた猫毛から伝わるふわふわ感、肉球の湿度まで感じさせるむっちり感、野良育ちの猫がお持ち帰りする土埃や日向の匂いも立ち上るワイルドさ。リアルだけどきちんとしすぎない絵で、適度に力を抜いた生活感あふれる劇画が、とても味わい深いです。ちょっとマニアックな漫画や映画のネタ、猫のまわりにいる生きものたち（主に嫌われもの）の丁寧すぎる描写も、ひねくれた私のような読者にはむしろ好ましいのですが、油断しているとその濃密な描線が、こちらの涙腺にも突き刺さります。猫それぞれの個性が宝物のようにいとしく、どこか切なく描かれています。ツーさんのハードボイルドな魅力はもちろん、姐さんの東北なまり、ちゃーちゃんの座り方、ツキノワの目、等々のユニークで丁寧な描写から、すべての猫に幸あれと願う作者の深い愛情が伝わって来ます。ヒトが猫との別れをとてつもなく悲しむのに比べて、猫はヒトをこんな風に環境の一部として淡々と扱い、ヒトが思っている以上に各々の生を満喫して幸せに去って行くのかもしれないと思うと、少し気持ちが救われました。', '2018-04-17'),
(16, 'テレビで見て即買い、志麻さん！！', 'https://images-na.ssl-images-amazon.com/images/I/61pY5uzU4xL._SX351_BO1,204,203,200_.jpg', 10, '1', '著者は元フランス料理のシェフですが、フランス人のご夫君に美味しいものを食べてほしいと思ったら、プロ用の設備の整った厨房ではなくても、自分の部屋にあった鍋とフライパンで結構なものができることに気が付き…ということで、この本には特別な材料や道具は必要とせずに、シンプルで手間いらずのものが紹介されています。', '2018-06-14'),
(17, '日本沈没が現実に！？', 'https://images-na.ssl-images-amazon.com/images/I/512ujInfOTL._SX305_BO1,204,203,200_.jpg', 2, '0', '　前作「未来の年表」が国家・政府の未来図だとすると、本書は「個人の予定表」といったところだろうか。\n　もともとベースとなる「未来」のデータが同じなので、内容がやや二番煎じになるのはやむを得ないところだろう。\n\n　第1部では、人口減少に伴う事象を「個人の生活」レベルに特化して解説しているが、戸建てやマンションの幽霊屋敷化や\n老齢化による自宅でのケガ、低所得の高齢者の増加などは、他の高齢化問題を扱った書籍でも触れられており、目新しさは\nなかった。もう少しテーマの掘り下げ方にひと工夫あればよかったのだが。\n\n　新たな発見と思ったのは、高齢者の増加で、「スーパーなど小売店の店員の対応がより複雑化」「バスや電車の乗降に時間が\nかかりダイヤが乱れる」「地方在住の親が亡くなると遺産の資金移動が起きて地方金融機関が消滅」などだ。\n　確かに現時点でも、お年寄りがスーパーのレジで小銭を財布から取り出して精算に時間がかかる場面に直面すると、「早く\n無人レジが普及すればいいのに」と思うし、都会に出て就職、結婚、住居を構えた子供たちが、地元の田舎にしか店舗がない\n地方銀行や信用金庫などに受け継いだ資産をそのまま置いておくとは考えにくい。\n\n　続く第2部では、具体的に個人や企業ができる対応策に言及している。ただ、こちらも「働けるうちは働く」「年金の受給年齢\nを繰り下げる」「テレワークの拡充」など、よく聞く内容が中心だった。\n\n　そのなかで、なるほどと思ったのは、高齢者の仕事について。筆者は、会社が新人などに任せている雑務に近いような仕事は\n再雇用の高齢者に移管して、若い人にはそれに見合った仕事を任せることを提案している。\n　確かに新人の即戦力化が求められつつあるとはいえ、「雑務は若い世代の仕事」という旧態依然とした会社はまだ多いだろうし、\nそういった細かい実務を経験してきた高齢者の方が「社内手続きの要領や勝手」を知っていて効率的な面もあるだろう。少なくと\nも、仕事らしい仕事もなく机に張り付かせて、肩身の狭い思いをさせるよりはマシだ。\n\n　最後に本書では、年配者に対して「自分たちは『逃げ切り世代』だから関係ない」は許されないと指摘している。\n　その理由の一つとして1990年の出生率「1.57」ショックを挙げている。当時バブル経済に浮かれて人口減に対して真剣な対策を\n講じなかった結果が今の状況を招いたとしており、若者が減れば、警察、消防などの社会的な基盤も揺らぎ、低所得の無・低年金\n受給者を生活保護でサポートすることになれば、「逃げ切り世代」の税負担増加は免れないとの分析だ。\n\n　私自身、筆者とはほぼ同世代で、ある意味「逃げ切れる」と思っていた節もあったのだが、その認識は「ちょっと甘い」かも\nしれないと感じている。かと言ってこの年ではできることは限られるのだが。\n\n【追記】どうも筆者は本書に続く第三弾の「未来の年表」を企画しているらしい。ただ、第二弾の本書がこの内容だと、\n　　　　よほど目新しいデータや切り口がないと第三弾の売れ行きは「厳しい」ような気がする。', '2018-06-09'),
(19, 'ついに漫画家！！', 'https://images-na.ssl-images-amazon.com/images/I/61NVQjKu6fL._SX351_BO1,204,203,200_.jpg', 2, '0', '発売半年あまりで、超速200万部突破! \n\n子ども、親、祖父母…\nすべての世代で一番読まれている本! \n\n『世界一受けたい授業』『おはよう日本』『クローズアップ現代+』『サンデーモーニング』などで大反響! ! \n\nおかげ様でamazon売れ筋ランキング総合第1位(2017/11~)\n\n\n「いまは亡き著者と、これをいま出版しようと考えた編集者と、\nこの本に正面からぶつかろうと思った漫画家に、\nカーテンコールのように拍手を続けています」\n糸井重里さん コピーライター(2017/8/26のtwitterより)\n\n「逆境や苦しみを感じるのは、前進している証だ。\n考える、悩むことに価値がある、と励まされている気がしました」\n松浦弥太郎さん エッセイスト\n\n丸善日本橋店 フィクション部門第1位(8/17から8/23集計)\n\nアマゾン売れ筋ランキング書籍総合「倫理学」「児童文学」第1位(2017/8/31調べ)\n\n\n人間としてあるべき姿を求め続ける\nコペル君とおじさんの物語。\n出版後80年経った今も輝き続ける\n歴史的名著が、初のマンガ化! \n\n1937年に出版されて以来、\n数多くの人に読み継がれてきた、\n吉野源三郎さんの名作「君たちはどう生きるか」。\n人間としてどう生きればいいのか、\n楽しく読んでいるうちに\n自然と考えるように書かれた本書は、\n子供はもちろん\n多くの大人たちにも\n共感をもって迎えられてきました。\n勇気、いじめ、貧困、格差、教養、、、\n昔も今も変わらない人生のテーマに\n真摯に向き合う\n主人公のコペル君と叔父さん。\n二人の姿勢には、生き方の指針となる言葉が\n数多く示されています。\nそんな時代を超えた名著が、\n原作の良さをそのままに、\nマンガの形で、今に蘇りました。\n初めて読む人はもちろん、\n何度か読んだことのある人も、\n一度手にとって、\n人生を見つめ直すきっかけに\nしてほしい一冊です。\n《全国学校図書館協議会選定図書》', '2018-06-09');

-- --------------------------------------------------------

--
-- テーブルの構造 `user_follower`
--

CREATE TABLE `user_follower` (
  `user_id` int(11) NOT NULL,
  `follow_user_id` int(11) NOT NULL,
  `sysdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- テーブルのデータのダンプ `user_follower`
--

INSERT INTO `user_follower` (`user_id`, `follow_user_id`, `sysdate`) VALUES
(2, 2, '2018-06-09'),
(8, 2, '2018-06-07');

-- --------------------------------------------------------

--
-- テーブルの構造 `user_good`
--

CREATE TABLE `user_good` (
  `user_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `sysdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- テーブルのデータのダンプ `user_good`
--

INSERT INTO `user_good` (`user_id`, `img_id`, `sysdate`) VALUES
(2, 1, '2018-06-09'),
(9, 1, '2018-06-07'),
(9, 2, '2018-06-07'),
(9, 3, '2018-06-07'),
(9, 16, '2018-06-07'),
(9, 17, '2018-06-09'),
(9, 19, '2018-06-09');

-- --------------------------------------------------------

--
-- テーブルの構造 `user_img`
--

CREATE TABLE `user_img` (
  `user_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `faborate` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '0',
  `row` int(11) NOT NULL DEFAULT '0',
  `coumn` int(11) NOT NULL DEFAULT '0',
  `sysdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- テーブルのデータのダンプ `user_img`
--

INSERT INTO `user_img` (`user_id`, `img_id`, `faborate`, `sort`, `row`, `coumn`, `sysdate`) VALUES
(2, 1, 0, 0, 0, 0, '2018-05-31'),
(2, 2, 0, 1, 0, 0, '2018-05-31'),
(2, 3, 1, 2, 0, 0, '2018-05-31');

-- --------------------------------------------------------

--
-- テーブルの構造 `user_info`
--

CREATE TABLE `user_info` (
  `user_id` int(7) NOT NULL,
  `account` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `gender` int(1) NOT NULL,
  `age` int(3) NOT NULL,
  `createdate` date NOT NULL,
  `sysdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- テーブルのデータのダンプ `user_info`
--

INSERT INTO `user_info` (`user_id`, `account`, `email`, `name`, `gender`, `age`, `createdate`, `sysdate`) VALUES
(2, 'うどんが主食', 'udon@gmail.com', '田中太郎', 0, 35, '2018-05-27', '2018-05-27'),
(8, '食べるより作る', 'cook@gmail.com', '佐藤太郎', 0, 25, '2018-05-27', '2018-05-27'),
(9, 'そばが主食', 'soba@gmail.com', '田中花子', 1, 28, '2018-05-27', '2018-05-27'),
(10, '作るより食べる', 'eat@gmail.com', '佐藤花子', 1, 40, '2018-05-27', '2018-05-27'),
(12, 'Mr.インフルエンサー', 'influenser@gmail.com', '佐々木和夫', 0, 55, '2018-05-28', '2018-05-28');

-- --------------------------------------------------------

--
-- テーブルの構造 `user_login`
--

CREATE TABLE `user_login` (
  `user_id` int(7) NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `sysdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- テーブルのデータのダンプ `user_login`
--

INSERT INTO `user_login` (`user_id`, `password`, `sysdate`) VALUES
(2, 'udon', '2018-05-27'),
(8, 'cook', '2018-05-27'),
(9, 'soba', '2018-05-27'),
(10, 'eat', '2018-05-27'),
(12, 'influenser', '2018-05-28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `img_info`
--
ALTER TABLE `img_info`
  ADD UNIQUE KEY `img_id` (`img_id`),
  ADD UNIQUE KEY `img_id_2` (`img_id`,`user_id`);

--
-- Indexes for table `user_follower`
--
ALTER TABLE `user_follower`
  ADD UNIQUE KEY `user_id` (`user_id`,`follow_user_id`);

--
-- Indexes for table `user_good`
--
ALTER TABLE `user_good`
  ADD PRIMARY KEY (`user_id`,`img_id`);

--
-- Indexes for table `user_img`
--
ALTER TABLE `user_img`
  ADD UNIQUE KEY `img_id` (`img_id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`user_id`,`account`,`email`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `img_info`
--
ALTER TABLE `img_info`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `user_id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `user_id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
