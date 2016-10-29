<?php require_once 'config.php'; ?>
<?php 
	if(!empty($_POST)){
		try {
			$user_obj = new Cl_User();
			$data = $user_obj->form( $_POST );
			if($data)$success = USER_REGISTRATION_SUCCESS;
		} catch (Exception $e) {
			$error = $e->getMessage();
		}
	}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Spoken and written queries collection</title>

    <link href='http://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/login.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </head>
  <body>
	<div class="container">
		<?php require_once 'templates/ads.php';?>
		<div >
			<?php require_once 'templates/message.php';?>
			
			<?php require_once 'templates/header.php'; ?>
			
			<div class="content" style="padding-top:40px; padding-bottom:250px" ng-app="plunker">
				<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>" class="form-register" role="form" id="register-form">
					<div>
						<input name="age" id="age" type="text" class="form-control" placeholder="Age">
						<span class="help-block"></span>
					</div>
					<!-- TODO : Implement Nationality or Hometown-->
					<div>
						<label style="font-weight: normal !important;" for="gender">Gender :</label>
						<select name="gender">
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
						<span class="help-block"></span>
					</div>
					<div>
						<input name="profession" id="profession" type="text" class="form-control" placeholder="Profession"> 
						<span class="help-block"></span>
					</div>
					<div>
						<table>
							<tr>
								<td>
									<td><label for="useComputer" style="font-weight: normal !important;">Does your profession involves using computers ?</label></td>
									<td><input type="checkbox" name="useComputer" id="useComputer" style="-webkit-transform: scale(0.5);"></td>
									<td><label for="useComputer" style="font-weight: normal !important;">Yes</label></td>
									<td><input type="checkbox" name="useComputerNo" id="useComputerNo" style="-webkit-transform: scale(0.5);"></td>
									<td><label for="useComputerNo" style="font-weight: normal !important;">No</label></td>
								</td>
							</tr>
						</table>
						<span class="help-block"></span>
					</div>
					<div>
						<label style="font-weight: normal !important;" for="timeSpent">How many hours a week do you spend on a computer :</label>
						<select name="timeSpent">
							<option value="-10">Less than 10 hours</option>
							<option value="10-20">From 10 to 20 hours</option>
							<option value="20-40">From 20 to 40 hours</option>
							<option value="40+">More than 40 hours</option>
						</select>
						<span class="help-block"></span>
					</div>
					<div>
						<table>
							<tr>
								<td>
									<td><label for="useVoiceSearch" style="font-weight: normal !important;">Do you use voice search applications ? (like Siri, Google Now, Cortana ...)</label></td>
									<td><input type="checkbox" name="useVoiceSearch" id="useVoiceSearch" style="-webkit-transform: scale(0.5);"></td>
									<td><label for="useVoiceSearch" style="font-weight: normal !important;">Yes</label></td>
									<td><input type="checkbox" name="useVoiceSearchNo" id="useVoiceSearchNo" style="-webkit-transform: scale(0.5);" checked></td>
									<td><label for="useVoiceSearchNo" style="font-weight: normal !important;">No</label></td>						
								</td>
							</tr>
						</table>
						<span class="help-block"></span>
					</div>
					<div name="toHide" id="toHide" hidden="true">
						<div>
							<label style="font-weight: normal !important;" for="frequency">How frequently do you use it ?</label>
							<select name="frequency">
								<option value="onceAMonth">Once a month</option>
								<option value="onceADay">Once a day</option>
								<option value="moreThanOnceADay">More than once a day</option>
							</select>
							<span class="help-block"></span>
						</div>
						<div>
							<label style="font-weight: normal !important;">In which everyday situation do you normally use voice search apps ?</label><br>
							<table>
								<tr>
									<td>
										<td><input type="checkbox" name="situationWork" id="situationWork" style="-webkit-transform: scale(0.3);"></td>
										<td><label for="situationWork" style="font-weight: normal !important;">At work</label> <br></td>
									</td>
								</tr>
								<tr>
									<td>
										<td><input type="checkbox" name="situationHome" id="situationHome" style="-webkit-transform: scale(0.3);"></td>
										<td><label for="situationHome" style="font-weight: normal !important;">At home</label> <br></td>
									</td>
								</tr>
								<tr>
									<td>
										<td><input type="checkbox" name="situationStreet" id="situationStreet" style="-webkit-transform: scale(0.3);"></td>
										<td><label for="situationStreet" style="font-weight: normal !important;">On the street</label> <br></td>
									</td>
								</tr>
								<tr>
									<td>
										<td><input type="checkbox" name="situationPublic" id="situationPublic" style="-webkit-transform: scale(0.3);"></td>
										<td><label for="situationPublic" style="font-weight: normal !important;">Other public place</label> <br></td>
									</td>
								</tr>
							</table>
							<span class="help-block"></span>
						</div>
						<div>
							<label style="font-weight: normal !important;">What device do you usually use when using voice search ?</label><br>
							<table>
								<tr>
									<td>
										<td><input type="checkbox" name="deviceTablet" id="deviceTablet" style="-webkit-transform: scale(0.3);"></td>
										<td><label for="deviceTablet" style="font-weight: normal !important;">Tablet</label> <br></td>
									</td>
								</tr>
								<tr>
									<td>
										<td><input type="checkbox" name="devicePC" id="devicePC" style="-webkit-transform: scale(0.3);"></td>
										<td><label for="devicePC" style="font-weight: normal !important;">PC</label> <br></td>
									</td>
								</tr>
								<tr>
									<td>
										<td><input type="checkbox" name="deviceLaptop" id="deviceLaptop" style="-webkit-transform: scale(0.3);"></td>
										<td><label for="deviceLaptop" style="font-weight: normal !important;">Laptop</label> <br></td>
									</td>
								</tr>
								<tr>
									<td>
										<td><input type="checkbox" name="devicePhone" id="devicePhone" style="-webkit-transform: scale(0.3);"></td>
										<td><label for="devicePhone" style="font-weight: normal !important;">Mobile Phone</label> <br></td>
									</td>
								</tr>
							</table>
							<span class="help-block"></span>
						</div>
						<div>
							<table>
								<tr>
									<td>
										<td><label for="externalMic" style="font-weight: normal !important;">Do you use an external microphone while using voice search ? </label></td>
										<td><input type="checkbox" name="externalMic" id="externalMic" style="-webkit-transform: scale(0.5);"></td>
										<td><label for="externalMic" style="font-weight: normal !important;">Yes</label></td>
										<td><input type="checkbox" name="externalMicNo" id="externalMicNo" style="-webkit-transform: scale(0.5);"></td>
										<td><label for="externalMicNo" style="font-weight: normal !important;">No</label></td>
									</td>
								</tr>
							</table>
							<span class="help-block"></span>
						</div>
					</div>
					<div>
						<label for="nbSearchQueries"  style="font-weight: normal !important;">How many search queries do you input on a daily basis ?</label>
						<select name="nbSearchQueries">
							<option value="-5">Less than 5</option>
							<option value="5-20">Between 5 and 20</option>
							<option value="20+">More than 20</option>
						</select>
						<span class="help-block"></span>
					</div>
					<div>
						<div class="col-xs-12"><label style="font-weight: normal !important;">For each of these categories of query, would you rather use a voice search or a written search ?</label></div>
						<div class="row">
							<div class="col-xs-3"><label style="font-weight: normal !important;" for="shopping">Shopping :</label></div>
							<div class="col-xs-9">
								<select name="shopping">
									<option value="voice">Voice search</option>
									<option value="written">Written search</option>
									<option value="both">Both</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-3"><label style="font-weight: normal !important;" for="food">Food & Drinks :</label></div>
							<div class="col-xs-9">
								<select name="food">
									<option value="voice">Voice search</option>
									<option value="written">Written search</option>
									<option value="both">Both</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-3"><label style="font-weight: normal !important;" for="games">Games</label></div>
							<div class="col-xs-9">
								<select name="games">
									<option value="voice">Voice search</option>
									<option value="written">Written search</option>
									<option value="both">Both</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-3"><label style="font-weight: normal !important;" for="electronics">Computers & Electronics</label></div>
							<div class="col-xs-9">
								<select name="electronics">
									<option value="voice">Voice search</option>
									<option value="written">Written search</option>
									<option value="both">Both</option>
								</select>
							</div>
						</div>
						<span class="help-block"></span>
					</div>

					<button class="btn btn-block bt-login" type="submit" id="submit_btn" data-loading-text="Signing Up....">Submit</button>
				</form>
			</div>
		</div>
	</div>
	<!-- /container -->
	
    <script src="js/jquery.validate.min.js"></script>
    <script src="js/form1.js"></script>
  </body>
</html>