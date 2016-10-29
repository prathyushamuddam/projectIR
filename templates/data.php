<?php
/**
 * Created by PhpStorm.
 * User: Tintin
 * Date: 13/05/2015
 * Time: 11:25
 */

$str=$_GET['wcontent'];
$fp=fopen("web.txt","w");
fwrite($fp,$write_array);
fclose($fp);

$write_array = array('content'=>$_GET['wcontent'],'name'=>'tintin');

?>

















