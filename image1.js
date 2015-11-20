// JavaScript Document
function all_submit() {　//すべてのコンテンツを一括送信
  var xmlHttp = new XMLHttpRequest();　/*1.オブジェクトの生成*/
  var base = document.getElementById("list1").value;
  var logo = document.getElementById("list2").value;
  var head = document.getElementById("list3").value;
  var navi = document.getElementById("list4").value;
  var h_text = document.getElementById("list5").value;
  var m_text = document.getElementById("list6").value;
  var foot = document.getElementById("list7").value;
  var btn = document.getElementById("list8").value;

  base = base.substring(1);
  logo= logo.substring(1);
  head = head.substring(1);
  navi = navi.substring(1);
  h_text = h_text.substring(1);
  m_text = m_text.substring(1);
  foot = foot.substring(1);
  btn = btn.substring(1);

  xmlHttp.open('GET','/cgi-bin/c_color.rb?base='+base+'&logo='+logo+'&head='+head+'&navi='+navi+'&h_text='+h_text+'&m_text='+m_text+'&foot='+foot+'&btn='+btn,true);

  xmlHttp.onreadystatechange=function(){ /*小僧が持ってくる動作*/
    if(xmlHttp.readyState==4){
      value_diff();
      parent.main.location.reload();
      xml = xmlHttp.responseXML;
    }
  }
  xmlHttp.send(null);
}

function value_diff(){ //明度差の判定出力
  var xmlHttp = new XMLHttpRequest();　/*1.オブジェクトの生成*/

  str1 = document.getElementById("list1").value;
  str2 = document.getElementById("list6").value;
  str1 = str1.substring(1);
  str2 = str2.substring(1);

  xmlHttp.open('GET','/cgi-bin/output.rb?str1='+str1+'&str2='+str2);
  xmlHttp.onreadystatechange=function(){
  if(xmlHttp.readyState==4){
    xml = xmlHttp.responseXML;
//    put = xml.getElementsByTagName("put")[0].firstChild.nodeValue;
    hsv = xml.getElementsByTagName("hsv")[0].firstChild.nodeValue;
    value = xml.getElementsByTagName("value")[0].firstChild.nodeValue;
    score = xml.getElementsByTagName("score")[0].lastChild.nodeValue;
    var text = document.getElementById('text');
    text.innerText = value;
    console.log(hsv);
    var in_score = document.getElementById('score');
    in_score.innerText = score;
    //alert(score);

  }
  }
  xmlHttp.send(null);
}
