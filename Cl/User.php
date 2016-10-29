<?php
/**
 * This User will have functions that handles user registeration,
 * login and forget password functionality
 * @author muni
 * @copyright www.smarttutorials.net
 */
class Cl_User
{
    /**
     * @var will going contain database connection
     */
    protected $_con;

    /**
     * it will initalize DBclass
     */
    public function __construct()
    {
        $db = new Cl_DBclass();
        $this->_con = $db->con;
    }
	
	public function getCon() {
		return $this->_con;
	}

    /**
     *  it is for collecting the spoken queries
     */

    public function spoken_queries( array $data, $filename )
    {
        if( !empty( $data ) ){

            // Trim all the incoming data:
            $trimmed_data = array_map('trim', $data);


            // escape variables for security
            $scontent = mysqli_real_escape_string( $this->_con, $trimmed_data['sqcollection'] );
            $audioname = mysqli_real_escape_string( $this->_con, $trimmed_data['filenames'] );
			$idInfoNeed = mysqli_real_escape_string( $this->_con, $trimmed_data['info_need'] );
			$name = mysqli_real_escape_string( $this->_con, $trimmed_data['username'] );
			$ASR = mysqli_real_escape_string( $this->_con, $trimmed_data['ASR'] );
			
			$ASRs = explode(";",$ASR);
			$audionames = explode(";",$audioname);
			
			$querySelect1 = "SELECT user_id FROM users WHERE name=?";
			$stmt=$this->_con->prepare($querySelect1);
			$stmt->bind_param('s', $name);
			$stmt->execute();
			$stmt->store_result();
			$stmt->bind_result($userid);
			$stmt->fetch();
			$stmt->close();
			
			/*if (isset($_POST['fileNumber']))
			{
				$filenumber = mysqli_real_escape_string( $this->_con, $trimmed_data['fileNumber']);
				$audioname=$audioname.$filenumber;
			}*/
				
			
			if(!$scontent) {
				throw new Exception( FIELDS_MISSING );
			}
			
			for($i=0;$i<count($ASRs)-1;$i++)
			{
				$ASRContent = $ASRs[$i];
				$audionameContent = $audionames[$i];

				// TODO : split the audio names, one row for each
				// add a written content (one for the ASR version, one for the corrected)
						
				$query = "INSERT INTO spoken_queries (id, idUser, ASR , finalcontent, audio_name, relevant_ids, irrelevant_ids, time) VALUES (NULL, '$userid', '$ASRContent', '$scontent', '$audionameContent', 1, 1, now())";
				if(mysqli_query($this->_con, $query)){
				};
				
				$idSpoken = mysqli_insert_id($this->_con);
				
				$querySelect2 = "SELECT q.id,q.idWritten FROM queries q, written_queries wq WHERE q.idInfoNeed = ".$idInfoNeed." AND wq.idUser= ".$userid." AND wq.id=q.idWritten AND q.idSpoken=0";
				if ($result = mysqli_query($this->_con, $querySelect2)){
					if ($row = mysqli_fetch_row($result)) {
						$idToInsert = $row[0];
						$idWrittenToInsert = $row[1];
						
						$query = "REPLACE INTO queries (id, idInfoNeed, idSpoken, idWritten) VALUES ('$idToInsert', '$idInfoNeed', '$idSpoken', '$idWrittenToInsert')";
						if(mysqli_query($this->_con, $query)){
							
						};
					}
				}
				$query = "REPLACE INTO queries (id, idInfoNeed, idSpoken, idWritten) VALUES (NULL, '$idInfoNeed', '$idSpoken', 0)";
				if(mysqli_query($this->_con, $query)){

					
				};	
			}
			return true;
			
        } else{
            throw new Exception( DATABASE_ERROR );
        }
    }


    /**
     *  it is for collecting the written queries
     */

    public function written_queries( array $data )
    {
        if( !empty( $data ) ){

            // Trim all the incoming data:
            $trimmed_data = array_map('trim', $data);
			
            // escape variables for security
            $wcontent = mysqli_real_escape_string( $this->_con, $trimmed_data['wcontent'] );
			$name = mysqli_real_escape_string( $this->_con, $trimmed_data['username'] );
			$idInfoNeed = mysqli_real_escape_string( $this->_con, $trimmed_data['info_need'] );

			$requete = "SELECT user_id FROM users WHERE name=?";
			$stmt=$this->_con->prepare($requete);
			$stmt->bind_param('s', $name);
			$stmt->execute();
			$stmt->store_result();
			$stmt->bind_result($userid);
			$stmt->fetch();
			$stmt->close();
			
            if(!$wcontent) {
				
                throw new Exception( FIELDS_MISSING );
            }
			
            $query = "INSERT INTO written_queries (id, idUser, wcontent, time) VALUES (NULL, '$userid', '$wcontent', now())";
            if(mysqli_query($this->_con, $query)){
            };
			
			$idWritten= mysqli_insert_id($this->_con);
			
			$querySelect2 = "SELECT q.id,q.idSpoken FROM queries q, spoken_queries sq WHERE q.idInfoNeed = ".$idInfoNeed." AND sq.idUser= ".$userid." AND sq.id=q.idSpoken AND q.idWritten=0";
			if ($result = mysqli_query($this->_con, $querySelect2)){
				if ($row = mysqli_fetch_row($result)) {
					$idToInsert = $row[0];
					$idSpokenToInsert = $row[1];
					
					$query = "REPLACE INTO queries (id, idInfoNeed, idSpoken, idWritten) VALUES ('$idToInsert', '$idInfoNeed', '$idSpokenToInsert', '$idWritten')";
					if(mysqli_query($this->_con, $query)){
						mysqli_close($this->_con);
						return true;
					};
				}
			}
			
			$query = "REPLACE INTO queries (id, idInfoNeed, idSpoken, idWritten) VALUES (NULL, '$idInfoNeed', 0, '$idWritten')";
            if(mysqli_query($this->_con, $query)){
                mysqli_close($this->_con);
                return true;
            };
        } else{
            throw new Exception( DATABASE_ERROR );
        }
    }



    /**
     * this will handles user registration process
     * @param array $data
     * @return boolean true or false based success
     */
    public function registration( array $data )
    {
        if( !empty( $data ) ){

            // Trim all the incoming data:
            $trimmed_data = array_map('trim', $data);



            // escape variables for security
            //$insert = MYSQLI_real_escape_string ($this->con, $trimmed_data['spoken']
            //$spoken = mysqli_real_escape_string ($this->con, $trimmed_data['written']);
            $name = mysqli_real_escape_string( $this->_con, $trimmed_data['name'] );
            $password = mysqli_real_escape_string( $this->_con, $trimmed_data['password'] );
            $cpassword = mysqli_real_escape_string( $this->_con, $trimmed_data['confirm_password'] );
			$info_need = mysqli_real_escape_string( $this->_con, $trimmed_data['info_need']);

            if((!$name) || (!$info_need) || (!$password) || (!$cpassword) ) {
                throw new Exception( FIELDS_MISSING );
            }
            if ($password !== $cpassword) {
                throw new Exception( PASSWORD_NOT_MATCH );
            }
            $password = md5( $password );
            $query = "INSERT INTO users (user_id, name, password, created, info_need) VALUES (NULL, '$name', '$password', CURRENT_TIMESTAMP, '$info_need')";
            if(mysqli_query($this->_con, $query)){
                mysqli_close($this->_con);
                return true;
            };
        } else{
            throw new Exception( USER_REGISTRATION_FAIL );
        }
    }
	
	public function form( array $data )
    {
        if( !empty( $data ) ){

            // Trim all the incoming data:
            $trimmed_data = array_map('trim', $data);

            // escape variables for security
            $age = mysqli_real_escape_string( $this->_con, $trimmed_data['age'] );
            $gender = mysqli_real_escape_string( $this->_con, $trimmed_data['gender'] );
            $profession = mysqli_real_escape_string( $this->_con, $trimmed_data['profession'] );
			$useComputer = "";$useVoiceSearch = "";
			if (isset($trimmed_data['useComputer']))
				$useComputer = "yes";
			else
				$useComputer = "no";
			$timeSpent = mysqli_real_escape_string( $this->_con, $trimmed_data['timeSpent'] );
			if (isset($trimmed_data['useVoiceSearch']))
			{
				$useVoiceSearch = "yes";
			}
				
			else
				$useVoiceSearch = "no";
			$nbSearchQueries = mysqli_real_escape_string( $this->_con, $trimmed_data['nbSearchQueries'] );
			$shopping = mysqli_real_escape_string( $this->_con, $trimmed_data['shopping'] );
			$food = mysqli_real_escape_string( $this->_con, $trimmed_data['food'] );
			$games = mysqli_real_escape_string( $this->_con, $trimmed_data['games'] );
			$electronics = mysqli_real_escape_string( $this->_con, $trimmed_data['electronics'] );
            
			if((!$age) || (!$profession)) {
                throw new Exception( FIELDS_MISSING );
            }
			
			/* Test
				echo "<h1>".$age."</h1>";
				echo "<h1>".$gender."</h1>";
				echo "<h1>".$profession."</h1>";
				echo "<h1>".$useComputer."</h1>";
				echo "<h1>".$timeSpent."</h1>";
				echo "<h1>".$useVoiceSearch."</h1>";
				echo "<h1>".$nbSearchQueries."</h1>";
				echo "<h1>".$shopping."</h1>";
				echo "<h1>".$food."</h1>";
				echo "<h1>".$games."</h1>";
				echo "<h1>".$electronics."</h1>";
			*/
			
            $query = "INSERT INTO users () VALUES ()";
            if(mysqli_query($this->_con, $query)){
                mysqli_close($this->_con);
                return true;
            };
        } else{
            throw new Exception( USER_REGISTRATION_FAIL );
        }
    }
	
	
    /**
     * This method will handle user login process
     * @param array $data
     * @return boolean true or false based on success or failure
     */
    public function login( array $data )
    {
        $_SESSION['logged_in'] = false;
        if( !empty( $data ) ){

            // Trim all the incoming data:
            $trimmed_data = array_map('trim', $data);

            // escape variables for security
            $name = mysqli_real_escape_string( $this->_con,  $trimmed_data['name'] );
            $password = mysqli_real_escape_string( $this->_con,  $trimmed_data['password'] );

            if((!$name) || (!$password) ) {
                throw new Exception( LOGIN_FIELDS_MISSING );
            }
            $password = md5( $password );
            $query = "SELECT user_id, name, created, info_need FROM users where name = '$name' and password = '$password' ";
            $result = mysqli_query($this->_con, $query);
            $data = mysqli_fetch_assoc($result);
            $count = mysqli_num_rows($result);
            mysqli_close($this->_con);
            if( $count == 1){
                $_SESSION = $data;
                $_SESSION['logged_in'] = true;
                return true;
            }else{
                throw new Exception( LOGIN_FAIL );
            }
        } else{
            throw new Exception( LOGIN_FIELDS_MISSING );
        }
    }

    /**
     * This will shows account information and handles password change
     * @param array $data
     * @throws Exception
     * @return boolean
     */

    public function account( array $data )
    {
        if( !empty( $data ) ){
            // Trim all the incoming data:
            $trimmed_data = array_map('trim', $data);

            // escape variables for security
            $password = mysqli_real_escape_string( $this->_con, $trimmed_data['password'] );
            $cpassword = $trimmed_data['confirm_password'];
            $user_id = mysqli_real_escape_string( $this->_con, $trimmed_data['user_id'] );

            if((!$password) || (!$cpassword) ) {
                throw new Exception( FIELDS_MISSING );
            }
            if ($password !== $cpassword) {
                throw new Exception( PASSWORD_NOT_MATCH );
            }
            $password = md5( $password );
            $query = "UPDATE users SET password = '$password' WHERE user_id = '$user_id'";
            if(mysqli_query($this->_con, $query)){
                mysqli_close($this->_con);
                return true;
            }
        } else{
            throw new Exception( FIELDS_MISSING );
        }
    }

    /**
     * This handle sign out process
     */
    public function logout()
    {
        session_unset();
        session_destroy();
        header('Location: index.php');
    }

    /**
     * This reset the current password and send new password to mail
     * @param array $data
     * @throws Exception
     * @return boolean
     */
    public function forgetPassword( array $data )
    {
        if( !empty( $data ) ){

            // escape variables for security
            $email = mysqli_real_escape_string( $this->_con, trim( $data['email'] ) );

            if((!$email) ) {
                throw new Exception( FIELDS_MISSING );
            }
            $password = $this->randomPassword();
            $password1 = md5( $password );
            $query = "UPDATE users SET password = '$password1' WHERE email = '$email'";
            if(mysqli_query($this->_con, $query)){
                mysqli_close($this->_con);
                $to = $email;
                $subject = "New Password Request";
                $txt = "Your New Password ".$password;
                $headers = "From: admin@smarttutorials.net" . "\r\n" .
                    "CC: admin@smarttutorials.net";
				
                mail($to,$subject,$txt,$headers);
                return true;
            }
        } else{
            throw new Exception( FIELDS_MISSING );
        }
    }

    /**
     * This will generate random password
     * @return string
     */

    private function randomPassword() {
        $alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }
}