<?php
	require_once 'database.php';
	// Requête DB 
	$querySelect = "SELECT record FROM flags";
	if ($result = mysqli_query($db, $querySelect)){
		$row = mysqli_fetch_row($result);
		echo $row[0];
	}
	else
		echo "0";
	
?>