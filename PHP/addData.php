<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost:3306";
$username = "root";
$password = "root";
$dbname = "PHPTest";

$conn = new mysqli($servername, $username, $password,$dbname);

// 存入数据
$import=$_POST['textBox'];
$export=$_POST['count'];

$sql = "insert into calculate (import,export) values ('$import','$export')";

if ($conn->query($sql) === true) {
    echo "增加历史记录成功";
}else{
    echo '请求失败';
}
