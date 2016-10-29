<?php
	require_once 'database.php';
	
	if(isset($_POST['content']))
	{
		$content=mysqli_real_escape_string($db, $_POST['content']);
		if (mysqli_query($db, "REPLACE INTO flags (id, record) VALUES (1, '$content')"))
		{
			//
		}
	}
?>