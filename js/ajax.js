/**
 * Created by Tintin on 02/06/2015.
 */
var xmlhttp;
function loadXMLDoc(url,cfunc){
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHttp");
    }
    xmlhttp.onreadystatechange = cfunc;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

/*function myFunction()
{
    loadXMLDoc("/test.txt",function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
        }
    });
}
*/
function xmlFunction(){
    loadXMLDoc("xml",function(){
        var txt,x,i;
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                    xmlDoc=xmlhttp.responseXML;
                    txt="";
                    x=xmlDoc.getElementsByTagName("title");
                    for (i=0;i<x.length;i++)
                    {
                        txt=txt + x[i].childNodes[0].nodeValue + "<br />";
                    }
                    document.getElementById("myDiv").innerHTML=txt;
                }
    })
}

function showHint(str){
    if(str.length==0){
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
    loadXMLDoc("hint.php?q="+str,function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
        }
    })
}



