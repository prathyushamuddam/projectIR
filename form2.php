<?php require_once 'config.php'; ?>
<?php 
	if(!empty($_POST)){
		try {
			$user_obj = new Cl_User();
			//$data = $user_obj->form2( $_POST );
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
						<input name="age" id="age" type="text" class="form-control" placeholder="According to you, how could we improve the experiment ?">
						<span class="help-block"></span>
					</div>
					
					<button class="btn btn-block bt-login" type="submit" id="submit_btn" data-loading-text="Signing Up....">Submit</button>
				</form>
			</div>
		</div>
	</div>
	<!-- /container -->
	
    <script src="js/jquery.validate.min.js"></script>
    <script src="js/form2.js"></script>
  </body>
</html>