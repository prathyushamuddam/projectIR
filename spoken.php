<?php
	require_once 'config.php';
	//require_once 'database.php';
	
	$filename = "test";//intval($_POST['q']);
	if(!empty($_POST)){
		try {
			$user_obj = new Cl_User();
			$data = $user_obj->spoken_queries($_POST,$filename);
			if($data)$success = DATABASE_INSERTION;
		}
		catch (Exception $e) {
			$error = $e->getMessage();
		}
		// TODO : redirect after submission to DB
		//header('Location: newWritten.php');
	}
	
	function isMobile() {
		if (preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]))
			return "mobile";
		else
			return "computer";
	}
	
	/* DEBUG ONLY
		function debug_to_console( $data ) {

			if ( is_array( $data ) )
				$output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
			else
				$output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

			echo $output;
		}
	*/
	
	function getFileCount($nom, $device) {
		$nb_fichier = 0;
		if($dossier = opendir('uploads'))
		{
			while(false !== ($fichier = readdir($dossier)))
			{
				if($fichier != '.' && $fichier != '..')
				{
					$split = explode('.',$fichier);
					$parts = explode('-',$split[0]);
					
					if ($parts[0]==$device && $parts[3]==$nom) {
						$nb_fichier++; 
					}
						
				}
			}
			closedir($dossier);
			$nb_fichier++;
			return $nb_fichier;
		}
		else
			echo 'Le dossier n\' a pas pu être ouvert';
	}	
	
	
	
	if (isset($_POST['mode'])) {
		$mode = $_POST['mode'];
		
		if ($mode = 'test')
			echo "<h1>OOOOOOOOOOOOOOOOOOOOOOOO</h1>";
	}
	
	$written_array = array('content'=>(isset($_POST['sqcollection']) ? $_POST['sqcollection'] : null));
	file_put_contents( "web.txt",$written_array, FILE_APPEND);
	
	$user_obj = new Cl_User();
	$db = $user_obj->getCon();
	
	$requete = "SELECT * FROM information_need";
	$result=$db->query($requete);
	
	
	 	
	// HEADER
	require_once 'templates/header.php'; 
	$name = $_SESSION['name'];
	$device = isMobile();
	$nb = getFileCount($name,$device);
	$device = $device."-";
	
	
	$infoDB = $_SESSION['info_need'];
	$info_needs = explode("-",$infoDB);
?>
<!-- content -->
<div class="content" style="padding-top:40px; padding-bottom:250px" ng-app="plunker">
	<div class="one wide column"></div>
	<div class="fourteen wide column">
		<div ng-controller="MainCtrl" ng-cloak>
			<div class="container ">
				<div class="row">
					<div class="">
						<h1 class="ui header center"  style="padding-top:60px">Spoken queries</h1>
						<?php require_once 'templates/message.php';?>
						<b>{{Date.Now}}</b>
						<form method="post" id="idform" action="<?php echo $_SERVER['PHP_SELF'];?>">
							<label for="info_need">Information Need :</label>
							<?php $tab = array(); ?>
							<select name="info_need" id="info_need">
								<?php 
									if ($result->num_rows > 0) {
									$cpt=1;
										while($row = mysqli_fetch_row($result)) {
											
											for ($i = 0; $i < count($info_needs); $i++)
											{
												if ($cpt == $info_needs[$i])
												{
													echo "<option value=".$row[0];
													echo ">".$row[0]."</option>";
													
												}
											}
											array_push($tab,$row[1]);
											$cpt++;
										}
									}								
								?>
							</select>
							<label id="lblInfoNeed"><?php print $tab[0];?></label>
							<script type="text/javascript">
								var info_need = document.getElementById('info_need');
								var tabjs = <?php echo json_encode($tab); ?>;
								info_need.onchange = function() {
									var index = info_need.options[info_need.selectedIndex].value;
									document.getElementById('lblInfoNeed').innerHTML = tabjs[index-1];
								};
								info_need.onchange();
							</script>
							
							
							<js-speech ng-model="speech"></js-speech>
							
							<!--  
								<button id="" type="submit" class="centered ui green submit button" style="text-align: center;">SEARCH</button>
								<input type="textbox" id="textbox1" size="45" width="48" height="48"></input> 
							--> 
							<!-- </form> -->
							
							<!--
								<div class="jsSpeechFactory-container">
									<div class="center aligned column">
										<button style='margin-top: 7px' type='button' onclick="startButton(event)" href="" class="jsSpeechFactory-btn ui green submit button" ng-click="toggleStartStop()">Start</button>
										<input name="sqcollection" type="textbox" id="textbox1" class="ui center search-control" ng-model="ngModel.value"/>
										<p class="text-muted jsSpeechFactory-hint" ng-bind-html-unsafe="speech.msg"></p>
									</div>
								</div>
							-->

							<div class="voice_record"></div>
							<div class="field">
								<div class="ui left labeled icon">
									<section class="experiment">
										<input hidden="true" value=<?php echo $device."audio-record-".$name."-";?> id="filename" name="filename">
										<input hidden="true" id="filenames" name="filenames">
										<input hidden="true" id="ASR" name="ASR">
										<input hidden="true" id="fileNumber" name="fileNumber" value=<?php echo $nb;?>>
										<input hidden="true" id="username" name="username" value=<?php echo $name;?>>
										<input hidden="true" id="poll" value="0">
										<p style="text-align:center;">
											<audio id="preview" controls style="width:50%"></audio>
										</p>
										<hr />
										<div id="voice_icon" class="ui voice center"> 
											<!-- the record button -->   
											<!-- 
												<button type="button" id="record" onclick="startButton(event)" name="record" class="ui green submit button">Record</button>
												<button onchange="getFileName()" id="stop" type="button" class="ui green submit button" alt="Stop">Stop the recording</button>
											-->
											<button onchange="getFileName()" id="search" type="button" class="ui green submit button" alt="Stop">Search using the query</button>
											<button id="submitSpoken" type="submit" class="ui green button">Submit</button>
										</div>
										<hr/>
										<div id="container" style="padding:1em 2em;"></div>
									</section>
								</div>
							</div>
							
							<button type="button" id="help" name="help" onclick="getElementById('help-content').hidden" class="ui green submit button">Help/Instructions</button>
						</form>
						
						<!-- ------------------------------------------- -->
						
						<div style="text-align: right;" hidden>
							<button type="button" id="next" class="ui green submit button">Next</button>
						</div>
						
						<button hidden type="button" id="test" onclick="sendTest()">TEST</button>
						
						<div id="help-content">
							<div class="ui segment">
								<p>
									Choose an information need via the select box and formulate a query to answer it.<br>
									Click the <b>Start</b> button to start recording your query. <br>
									If you want to erase your record and retry it, press the <b>Record</b> button. <br>
									Be sure to stop the recording via the <b>Stop</b> button before recording anything else. <br>
									Once you are done recording, you can modify the written query if there are any errors. <br>
									Clicking the <b>Search</b> button will activate a search using your query. <br>
									Once everything is ok, simply press <b>Submit</b> to send it to the database.
								<p>
							</div>
						</div>
						
						<div id="search-content">
							<!-- TODO : check which doc has been clicked by the user and send it to the DB -->
							<div class="ui pointing secondary demo menu">
								<a class="red item active" data-tab="web">WEB</a>
								<a class="blue item" data-tab="new">NEW</a>
								<a class="green item" data-tab="link">Related links</a>
							</div>
							<div id="results_1" class="ui tab segment active" data-tab="web"></div>
							<div id="results_21" class="ui tab segment" data-tab="new"></div>
							<div id="results_31" class="ui tab segment" data-tab="link"></div>
						</div>
						
						<div id="messages">
						</div>
						<form action="" method="post" name="flag">
							<input hidden="true" name="flagValue" id="flagValue" value=1>
							<button type="submit" onclick="setFlag()" name="setflag" id="setflag">SET FLAG</button>
						</form>
						
						<!-- ------------------------------------------- -->
					</div>
				</div>
			</div>
		</div><!-- /.controller -->
	</div>              
	<div class="one wide column"></div>
</div>

<!-- JS files -->
<script src="js/jquery.validate.min.js"></script>
<!-- <script src="js/spoken.js"></script> -->
<script type="text/javascript" src="js/speech_angularjs.js"></script>
<script type="text/javascript" src="js/speech.js"></script>
<script type="text/javascript" src="js/spoken.js"></script>

<!-- end content -->
<?php require_once 'templates/sidebar.php';?>
<?php require_once 'templates/footer.php';?>
