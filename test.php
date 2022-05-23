<?php

$json = $_GET["data"];
// $myfile = fopen("/test.txt", "w") or die("Unable to open file!");
// fwrite($myfile, $json);
// fclose($myfile);
file_put_contents("text.txt", $json);

echo $json;