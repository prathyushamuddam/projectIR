<?php
/**
 * Created by PhpStorm.
 * User: Tintin
 * Date: 21/05/2015
 * Time: 11:30
 */
define ('HOSTNAME', 'localhost');
define ('USERNAME', 'root');
define ('PASSWORD', '');
define ('DATABASE_NAME', 'database');

$db = mysqli_connect(HOSTNAME, USERNAME, PASSWORD) or die ('I cannot connect to MySQL.');
mysqli_select_db($db,DATABASE_NAME);

?>