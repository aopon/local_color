var num = 0;
var b1;
var m1;
var a1;
var colorList;

var score1_n = 80;
var score2_n = 80;
var score3_n = 80;
var score4_n = 80;
var score5_n = 80;

var multi1 = 0;
var multi2 = 0;
var multi3 = 0;
var multi4 = 0;
var multi5 = 0;

var c;
window.onload = function(){
  out();
  document.getElementById("none2").style.display="none";
};

function ip_btn() {
  var xmlHttp = new XMLHttpRequest();　/*1.オブジェクトの生成*/
	var kind = document.getElementById("pattern0").value;
  xmlHttp.open('GET','/cgi-bin/get_bma.rb?k='+
  kind,true);
	xmlHttp.onreadystatechange=function(){ /*小僧が持ってくる動作*/
  	if(xmlHttp.readyState==4){
      xml = xmlHttp.responseXML;
      colorList = xml.getElementsByTagName('color');
      color_b = xml.getElementsByTagName('b');
      color_m = xml.getElementsByTagName('m');
      color_a = xml.getElementsByTagName('a');
      var num = 0;
      score1_n = 80;
      score2_n = 80;
      score3_n = 80;
      score4_n = 80;
      score5_n = 80;
      display(num);
      stroke(num);
      content(num);
      all_submit();
      cc1(num);
      minus();
      set_chart(score1_n,score2_n,score3_n,score4_n,score5_n);
      parent.main.location.reload();
  	  }
    }
  xmlHttp.send(null);
}

function stroke(num){
  var canvas = document.getElementById("i1");
  var ctx = canvas.getContext('2d');
    y = num * 30;
    ctx.strokeRect(2,y+2,200,22);
    ctx.lineWidth = 3;
}

function content(i){
  var canvas = document.getElementById("i2");
  var ctx = canvas.getContext('2d');
    var w = 20;
    var h = 20;
    var kind = document.getElementById("pattern0").value;
    b1 = color_b[i].childNodes[0].nodeValue;
    m1 = color_m[i].childNodes[0].nodeValue;
    a1 = color_a[i].childNodes[0].nodeValue;
    ctx.fillStyle = b1; //background
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff"; //logo
    ctx.fillRect(0, 30, w, h);
    ctx.fillStyle = m1; //header
    ctx.fillRect(0, 60, w, h);
    ctx.fillStyle = "#ffffff"; //navigation
    ctx.fillRect(0, 90, w, h);
    ctx.fillStyle = m1; //head text
    ctx.fillRect(0, 120, w, h);
    ctx.fillStyle = "#000000"; //text
    ctx.fillRect(0, 150, w, h);
    ctx.fillStyle = m1; //footer
    ctx.fillRect(0, 180, w, h);
    ctx.fillStyle = a1; //button
    ctx.fillRect(0, 210, w, h);
    document.getElementById("list1").value = b1;
    document.getElementById("list2").value = "#ffffff";
    document.getElementById("list3").value = m1;
    document.getElementById("list4").value = "#ffffff";
    document.getElementById("list5").value = m1;
    document.getElementById("list6").value = "#000000";
    document.getElementById("list7").value = m1;
    document.getElementById("list8").value = a1;
  }

function first(i){
  var flag = confirm("本当に初期化してもよろしいですか？\n");
  if (flag == true){
    first_content(i);
    minus();
    all_submit();
    score1_n = 80;
    score2_n = 80;
    score3_n = 80;
    score4_n = 80;
    score5_n = 80;
    multi1 = 0;
    multi2 = 0;
    multi3 = 0;
    multi4 = 0;
    multi5 = 0;
    set_chart(score1_n,score2_n,score3_n,score4_n,score5_n);
    get_score();
  }
}
function first_content(i){
  document.getElementById("list1").value = b1;
  document.getElementById("list2").value = "#ffffff";
  document.getElementById("list3").value = m1;
  document.getElementById("list4").value = "#ffffff";
  document.getElementById("list5").value = m1;
  document.getElementById("list6").value = "#000000";
  document.getElementById("list7").value = m1;
  document.getElementById("list8").value = a1;
}

function display(index){
  var canvas = document.getElementById("i1");
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 205, 200);
  bma_bar(index);
}

  function back(){
    if(num == 0){
      num = -(num-1) % colorList.length + (colorList.length-2) ;
    }
    else {
      num = (num-1) % colorList.length;
    }
    display(num);
    stroke(num);
    content(num);
    all_submit();
    minus();
  }

  function next(){
    num = (num + 1) % colorList.length;
    display(num);
    stroke(num);
    content(num);
    all_submit();
    minus();
  }

function bma_bar(i){
  var canvas = document.getElementById("i1");
  var ctx = canvas.getContext("2d");
  for(i = 0; i < colorList.length; i++) {
      b_color = color_b[i].childNodes[0].nodeValue;
      m_color = color_m[i].childNodes[0].nodeValue;
      a_color = color_a[i].childNodes[0].nodeValue;

      ctx.fillStyle = b_color;
      ctx.fillRect(0, i*30+2, 140, 20);
      ctx.fillStyle = a_color;
      ctx.fillRect(140, i*30+2, 10, 20);
      ctx.fillStyle = m_color;
      ctx.fillRect(150, i*30+2, 50, 20);
  }
}

function get_score(){ //点数表示
  var in_score = document.getElementById('score');
  total = multi1 + multi2 + multi3 + multi4 + multi5;
  in_score.innerText = total;
  console.log(multi1);
  console.log(multi2);
  console.log(multi3);
  console.log(multi4);
  console.log(multi5);
}

function finish(){
  out();
  parent.main.location.reload();
}

function none(n){
  if(n == 1){
    document.getElementById("none1").style.display="none";
    document.getElementById("none2").style.display="block";
    document.getElementById("message").style.display="none";
    document.getElementById("score").style.display="none";
    document.getElementById("pattern").style.display="none";
    var data1 = document.getElementById('data1');
    var data2 = document.getElementById('data2');
    var data3 = document.getElementById('data3');
    var data4 = document.getElementById('data4');
    var data5 = document.getElementById('data5');
    var data6 = document.getElementById('data6');
    var data7 = document.getElementById('data7');
    var data8 = document.getElementById('data8');
    data1.innerHTML = "" ;
    data2.innerHTML = "" ;
    data3.innerHTML = "" ;
    data4.innerHTML = "" ;
    data5.innerHTML = "" ;
    data6.innerHTML = "" ;
    data7.innerHTML = "" ;
    data8.innerHTML = "" ;

    var xmlHttp = new XMLHttpRequest();
    var base = "ffffff";
    var logo= "ffffff";
    var head = "000000";
    var navi = "ffffff";
    var h_text = "000000";
    var m_text = "000000";
    var foot = "000000";
    var btn = "000000";

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
  else if(n == 2){
    document.getElementById("none1").style.display="block";
    document.getElementById("none2").style.display="none";
    document.getElementById("message").style.display="block";
    document.getElementById("score").style.display="block";
    document.getElementById("pattern").style.display="block";
  }
}
