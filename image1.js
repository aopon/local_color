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
      xml = xmlHttp.responseXML;
      parent.main.location.reload();
      out();
      input_hex();
    }
  }
  xmlHttp.send(null);
}

function input_hex(){
  var hex = document.getElementsByClassName("hex");
  hex[0].innerText = b1;//base
  hex[1].innerText = m1;//logo
  hex[2].innerText = m1;//header
  hex[3].innerText = m1;//navi
  hex[4].innerText = m1;//h_text
  hex[5].innerText = m1;//m_text
  hex[6].innerText = m1;//footer
  hex[7].innerText = a1;//btn1
}

function part_submit(c){ //各コンテンツの色塗り替え
  var xmlHttp = new XMLHttpRequest();
  var hex = document.getElementsByClassName("hex");

  if (c =="1"){
    var part = document.getElementById("list1").value;
    hex[0].innerText = part;
  }
  else if (c == "2") {
    var part = document.getElementById("list2").value;
    hex[1].innerText = part;
  }
  else if (c == "3") {
    var part = document.getElementById("list3").value;
    hex[2].innerText = part;
    main_color(c);
  }
  else if (c == "4") {
    var part = document.getElementById("list4").value;
    hex[3].innerText = part;
  }
  else if (c == "5") {
    var part = document.getElementById("list5").value;
    hex[4].innerText = part;
    value_diff(c);
  }
  else if (c == "6") {
    var part = document.getElementById("list6").value;
    hex[5].innerText = part;
    value_diff(c);
  }
  else if (c == "7") {
    var part = document.getElementById("list7").value;
    hex[6].innerText = part;
    main_color(c);
  }
  else if (c == "8") {
    var part = document.getElementById("list8").value;
    hex[7].innerText = part;
    btn2_submit(c);
  }

  part = part.substring(1);
  xmlHttp.open('GET','/cgi-bin/part_submit.rb?c='+c+'&part='+part,true);
  xmlHttp.onreadystatechange=function(){
    if(xmlHttp.readyState==4){
      parent.main.location.reload();
    }
  }
  xmlHttp.send(null);
}

function c3_first(){
  part_submit(null);
}

function main_color(c){　//類似色判定の処理
  var xmlHttp = new XMLHttpRequest();
  if(c == "3"){
    var main_1 = document.getElementById("list3").value;
  }
  else if(c == "5"){
    var main_1 = document.getElementById("list5").value;
  }
  else if(c == "7"){
    var main_1 = document.getElementById("list7").value;
  }
  var main = main_1.substring(1);
  xmlHttp.open('GET','/cgi-bin/similar.rb?main='+main+'&m1='+m1.substring(1),true);
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState==4){
      xml = xmlHttp.responseXML;
      var judge = xml.getElementsByTagName("judge")[0].firstChild.nodeValue;
      var score5 = xml.getElementsByTagName("score")[0].lastChild.nodeValue;
      console.log(judge);
      text.innerHTML = judge;
      var in_score = document.getElementById('score');
      score5_n = Number(score5);
      multi5 = score5_n - 80;
      set_chart(score1_n,score2_n,score3_n,score4_n,score5_n);
      get_score();
      parent.main.location.reload();
    }
  }
  xmlHttp.send(null);
}

function value_diff(c){ //明度差,色差の判定出力
  var xmlHttp = new XMLHttpRequest();　/*1.オブジェクトの生成*/
  var str22;
  if(c == "5"){
    str22 = document.getElementById("list5").value;
  }
  else if(c == "6"){
    str22 = document.getElementById("list6").value;
  }
  var str11 = document.getElementById("list1").value;

  str1 = str11.substring(1);
  str2 = str22.substring(1);

  xmlHttp.open('GET','/cgi-bin/output.rb?str1='+str1+'&str2='+str2);
  xmlHttp.onreadystatechange=function(){
  if(xmlHttp.readyState==4){
    xml = xmlHttp.responseXML;
    var hsv = xml.getElementsByTagName("hsv")[0].firstChild.nodeValue;
    var value = xml.getElementsByTagName("value")[0].firstChild.nodeValue;
    var text = document.getElementById('text');
    text.innerText = value;
    var in_score = document.getElementById('score');
    if (c == "5"){
      var score2 = xml.getElementsByTagName("score")[0].lastChild.nodeValue;
      score2_n = Number(score2);
    }
    else if(c == "6"){
      var score1 = xml.getElementsByTagName("score")[0].lastChild.nodeValue;
      score1_n = Number(score1);
    }
    multi2 = score2_n - 80;
    multi1 = score1_n - 80;
    set_chart(score1_n,score2_n,score3_n,score4_n,score5_n);
    get_score();
    }
  }
  xmlHttp.send(null);
}
