<?php
require_once 'DB/dbconnect.php';



$db = new Db();
$params = [
            'lng'=> $_POST['lng'],
            'lat'=> $_POST['lat'],
            'comment'=> $_POST['comment'],
        ];
$sql = "INSERT INTO markers (lng, lat, comment) VALUES ( :lng, :lat, :comment)";
$db->query($sql, $params);
/*
if ($_POST['method'] == 'render') {
    $onPage = 5;
    $start = (int) $_POST['start'];
    $sql = "SELECT * FROM `articles` ORDER BY `articles`.`id` DESC LIMIT $start, $onPage";// ORDER BY `articles`.`id` DESC";
    $articles = $db->row($sql, $params);

    $sql = "SELECT count(*) AS all_articles FROM `articles`";
    $pages = $db->row($sql, $params);

    $count = $pages[0]["all_articles"];
    $pages = ceil($count / $onPage);
    $articles[0]['pageCount'] = $pages;
    die(json_encode($articles));
}else if($_POST['method'] == 'parse') {
    $habr = new habr;
    $res = $habr->parseLastFiveArticles();
    foreach ($res as $article) {
        $params = [
            'title'=> $article['title'],
            'description'=> $article['description'],
            'href' => $article['href'],
        ];
        $sql = "INSERT INTO articles (title, description, href) VALUES ( :title, :description, :href)";
        $db->query($sql, $params);
    }
    die (json_encode('success'));
}else {
    'hello';
    die();
}
*/
?>