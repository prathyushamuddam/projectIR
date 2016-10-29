<?php
	require_once 'config.php';
?>
<?php
	if(!empty($_POST)){
		try {
			$user_obj = new Cl_User();
			$data = $user_obj->written_queries($_POST);
			if($data)$success = DATABASE_INSERTION;
			} catch (Exception $e) {
			$error = $e->getMessage();
		}
		// TODO : redirect after submission to DB
		//header('Location: spoken.php');
	}

	$written_array = array('content'=>(isset($_POST['username']) ? $_POST['username'] : null));
	file_put_contents( "web.txt",$written_array, FILE_APPEND);
	
	$user_obj = new Cl_User();
	$db = $user_obj->getCon();
	$requete = "SELECT * FROM information_need";
	$result=$db->query($requete);
	
	// HEADER
	require_once 'templates/header.php';
	$infoDB = $_SESSION['info_need'];
	$info_needs = explode("-",$infoDB);
?>

<div class="content" style="padding-top:40px; padding-bottom:250px" ng-app="plunker">
	<div class="one wide column"></div>
	<div class="fourteen wide column">
		<div ng-controller="MainCtrl" ng-cloak>
			<div class="container ">
				<div class="row">
					<div class="">
						<?php require_once 'templates/message.php';?>
						<h1 class="ui header center"  style="padding-top:20px">Written queries</h1>
						<!-- <js-speech ng-model="speech"></js-speech> -->
						<div>&nbsp;</div>
						<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>"  role="search">
						
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
													if ($cpt==1000)
														echo " selected";
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
						
							<input name="wcontent" id="textbox1" type="text" class="form-control" placeholder="Please enter a query">
							<div>&nbsp;</div>
							<input hidden="true" id="username" name="username" value=<?php echo $_SESSION['name'];?>>
							<button type="button" id="search" class="ui green submit button">Search</button>
							<button type="submit" id="submitwritten" class="ui green submit button">Submit</button>
						</form>
						
						<div class="row">
							
						</div>
						
						<div id="search-content">
							<div class="ui pointing secondary demo menu">
								<a class="red item active" data-tab="web">WEB</a>
								<a class="blue item" data-tab="new">NEW</a>
								<a class="green item" data-tab="link">Related links</a>
							</div>
							<div id="results_1" class="ui tab segment active" data-tab="web"></div>
							<div id="results_21" class="ui tab segment" data-tab="new"></div>
							<div id="results_31" class="ui tab segment" data-tab="link"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>              
	<div class="one wide column"></div>
</div>					

<!-- JS files -->
<script src="js/jquery.validate.min.js"></script>

<?php require_once 'templates/sidebar.php';?>
<?php require_once 'templates/footer.php';?>
		
		
			