<?php 
require_once 'DB/dbconnect.php';



$db = new Db();
$sql = "SELECT * FROM `markers`;// ORDER BY `articles`.`id` DESC";
$markers = $db->row($sql, $params);
die(json_encode($markers));
?>