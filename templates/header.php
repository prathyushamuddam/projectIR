<?php 
ob_start();
session_start();
header('Access-Control-Allow-Origin: *');
require_once 'config.php'; 
if(!isset($_SESSION['logged_in'])){
    header('Location: index.php');
}
?>
<!DOCTYPE html>
<html ng-app="plunker" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="DCU">
    <title>Spoken and written queries collection</title>
    <link href='http://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
    <link href=" https://www,google.com/speech_api/v1/recognize"
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">

    <!-- semantic UI -->
    <link href="css/semantic.css" rel="stylesheet" type="text/css" />
    <!--
		<link href="css/button.css" rel="stylesheet" type="text/css" />
		<link href="css/button.min.css" rel="stylesheet" type="text/css" />
	-->
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="js/http.js"></script>


    <link rel="stylesheet" href="css/speech.css"/>
    <link rel="stylesheet" href="css/base.css"/>

    <!-- voice record -->
    <script src="https://cdn.webrtc-experiment.com/RecordRTC.js"></script>
    <script src="https://cdn.webrtc-experiment.com/commits.js" defer>
    </script>
    <!-- <script type="text/javascript" src="../js/audio.js"></script> -->


    <!-- angular js and coffeescript-->
    <!-- <link rel="stylesheet" href="style.css" /> -->
    <script data-require="jquery@2.0.3" data-semver="2.0.3" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script data-require="angular.js@1.0.x" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min.js" data-semver="1.0.8"></script>
    <script src="js/jsSpeechFactory.js"></script>
    <script src="js/speech_angularjs.js"></script>
    <script src="js/app.js"></script>

    <!--tab css-->
    <link rel="stylesheet" href="css/tab.css"/>
    <!--<script type="text/javascript" src="//code.jquery.com/jquery-2.0.2.js"></script>-->
    <!-- <link rel="stylesheet" type="text/css" href="/css/result-light.css"> -->
    <script type="text/javascript" src="js/semantic.js"></script>
    <link rel="stylesheet" type="text/css" href="css/semantic.css">
    <script type="text/javascript">//<![CDATA[
        $(window).load(function(){
        $(document).ready(function(){
        $('.demo.menu .item').tab({history:false});
        });
    });//]]> 
    </script>

 <!-- this is the js for search 
    <script src="http://code.jquery.com/jquery-latest.js"></script>
 <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
-->



    <!-- jQuery (necessary for Bootstrap's JavaScript plugins)
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>-->
    <!-- Include all compiled plugins (below), or include individual files as needed 
    <script src="js/jquery.flexslider.js"></script>
    <script src="js/scripts.js"></script>
    <script src="js/modernizr.js"></script>
    <script src="js/waypoints.min.js"></script>-->
</head>
<body>  
  
<header role="navigation" class="navbar navbar-inverse navbar-fixed-top row">
      <div class="sqcontainer">
        <div class="row"> 
                <div class="responsive-logo"></div>
                <div class="pullcontainer">
                        <a href="#" id="pull"><i class="fa fa-bars fa-2x"></i></a>
                </div>
        </div>
        <div class="row">
			<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
				<nav>
					<div class="main-logo" style="padding-left:0px"> 
						<div class="collapse navbar-collapse navbar-left">
							<div class="nav navbar-nav">
								<img src="imgs/nlogo.png" style="width:50%; height:50%; padding-top: 5px; padding-bottom:9px ; padding-left:20px;" />
							</div>
						</div>
					</div>
					<div>
						<ul class="clearfix">
							<li><a href="spoken.php">Spoken</a></li>
							<li class="dot">.</li>
							<li><a href="newWritten.php" class="r_spacer">Written</a></li>
						</ul>
					</div>
				</nav>
			</div>
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<ul >
					<li><a href="account.php">Account</a></li>
					<li><a href="logout.php">Logout</a></li>
					<li><a href="form1.php">Form</a></li>
					<li><a href="test.php">Form 2</a></li>
					<li><a href="written.php">Old</a></li>
				</ul>
			</div>
        </div>
    </div>            
</header>

