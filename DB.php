
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

$query = "SELECT * FROM video_recommendation";

$result = mysqli_query($db,$query);

while ($row = mysqli_fetch_array($result)) {


     echo "<span class='media-container center'>";
     echo "<iframe width='245' height='170' frameborder='0' allowfullscreen=''", "src=",($row['video_url']), "></iframe>";
     echo "<div class='content' style='background: none;
                                                       margin: 0em;
                                                       padding: 1.5em 1em;
                                                       box-shadow: none;
                                                         font-size: 1em;
                                                         border: none;
                                                         border-radius: 0em;'>";
        echo "<div name=title class='header' style='font-weight: bold;
                                                text-align: left;
                                                font-size: 1.0em;
                                                margin-top: -0.165em;
                                                line-height: 1.33em;'>",($row['title']),"</div>";
        echo " \n &nbsp;&nbsp;";
        echo "<div name='description' class='description' style='clear: both;
                                                            text-align: left;
                                                            color: rgba(0, 0, 0, 0.5);'>" , ($row['description']);
        echo "<a href='https://www.youtube.com/watch?v=czLI3oLDe8M'>More</a>";
        echo "</div>";
        echo "</div>";//content

}
mysqli_close($db);
?>