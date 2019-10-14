<?php
$servername = "localhost:3306";
$username = "root";
$password = "root";
$dbname = "PHPTest";

$conn = new mysqli($servername, $username, $password,$dbname);

$sql = "select id,import,export from calculate";
$result = $conn->query($sql);


$data = array();//初始化数组;

class Alteration
{
    public $import;
    public $export;
    public $id;
}
while ($row = mysqli_fetch_assoc($result)) {
    $alter = new Alteration();//实例化对象;
    $alter->import= $row['import'];
    $alter->export = $row['export'];
    $alter->id = $row['id'];
    $data[] = $alter;
}
echo json_encode($data);
