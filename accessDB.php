<?php
	
	// TODO : delete (useless)
	
	$previous = $_SERVER['HTTP_REFERER'];	
	header("Refresh:10;url=".$previous);
			
	//echo "Previous address : ";
	//echo $previous,"<br>";
	
	require_once 'database.php';

	switch($previous)
	{
		case "http://127.0.0.1/projectIR/account.php" : {
			echo "Account";
			break;
		}
		
		case "http://127.0.0.1/projectIR/spoken.php" : {
			echo "Spoken";
			break;
		}
		
		case "http://127.0.0.1/projectIR/written.php" : {
			echo "Written";
			break;
		}
		
		case "http://127.0.0.1/projectIR/register.php" : {
			//echo "Register <br>";
			
			$requete1="INSERT INTO users VALUES (NULL,?,?,?,now())";
					  
			if( isset( $_POST['name'] ) && !empty($_POST['name']))
				$name = $_POST['name'];
			if( isset( $_POST['password'] ) && !empty($_POST['password']))
				$password = md5(trim($_POST['password']));
			if( isset( $_POST['email'] ) && !empty($_POST['email']))
				$email = $_POST['email'];
			
			/*
			echo $name,"<br>";
			echo $password,"<br>";
			echo $email,"<br>";
			*/
			
			if($stmt=$db->prepare($requete1))
			{
				$stmt->bind_param('sss',$name,$email,$password);			
				
				$stmt->execute();
				if($db->insert_id == 0){
					//echo $stmt->error;
				}
				//echo "Insertion successful ! <br>";
			}
			else
				echo "Error in stmt";
			// put the same design as the other js
			echo "<script>alert('User account created')</script>";
			break;
		}
		
		case "http://127.0.0.1/projectIR/forget_password.php" : {
			echo "Password";
			
			$requete1="INSERT INTO users VALUES (NULL,?,?,?,now())";
			
			if($stmt=$db->prepare($requete1))
			{
				$stmt->bind_param('sss',$name,$email,$password);			
				
				$stmt->execute();
				if($db->insert_id == 0){
					//echo $stmt->error;
				}
				//echo "Insertion successful ! <br>";
			}
			else
				echo "Error in stmt";
			
			break;
		}
	}
?>