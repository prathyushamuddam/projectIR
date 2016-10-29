<?php
 $json = file_get_contents("php://input");
 $file = fopen('/cl/qcollection.json','wt');
 fwrite($file,$json);
 fclose($file);
?>

