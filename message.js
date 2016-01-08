function cc1(i){ //色のデータリスト出力
  var data1 = document.getElementById('data1');
  var data2 = document.getElementById('data2');
  var data3 = document.getElementById('data3');
  var data4 = document.getElementById('data4');
  var data5 = document.getElementById('data5');
  var data6 = document.getElementById('data6');
  var data7 = document.getElementById('data7');
  var data8 = document.getElementById('data8');
  var kind = document.getElementById("pattern0").value;
  data1.innerHTML = "" ;
  data2.innerHTML = "" ;
  data3.innerHTML = "" ;
  data4.innerHTML = "" ;
  data5.innerHTML = "" ;
  data6.innerHTML = '<option value="#000000"></option><option value="#141414"></option><option value="#282828"></option><option value="#3c3c3c"></option><option value="#505050"></option><option value="#696969"></option><option value="#808080"></option><option value="#a9a9a9"></option><option value="#c0c0c0"></option><option value="#d3d3d3"></option><option value="#dcdcdc"></option><option value="#f5f5f5"></option><option value="#ffffff"></option>' ;
  data7.innerHTML = "" ;
  data8.innerHTML = "" ;
  data1.innerHTML = "<option value='#ffffff'></option>";
  for(i = 0; i < colorList.length; i++){
    b_color = color_b[i].childNodes[0].nodeValue;
    m_color = color_m[i].childNodes[0].nodeValue;
    a_color = color_a[i].childNodes[0].nodeValue;
    data1.innerHTML = data1.innerHTML + "<option value='"+b_color+"'></option>";
    data2.innerHTML = data2.innerHTML + "<option value='"+m_color+"'></option>";
    data3.innerHTML = data3.innerHTML + "<option value='"+m_color+"'></option>";
    data4.innerHTML = data4.innerHTML + "<option value='"+m_color+"'></option>";
    data5.innerHTML = data5.innerHTML + "<option value='"+m_color+"'></option>";
    data7.innerHTML = data7.innerHTML + "<option value='"+m_color+"'></option>";
    data8.innerHTML = data8.innerHTML + "<option value='"+a_color+"'></option>";
  }
}

function multi(i){　//プラスボタンを押したときの処理
  var xmlHttp = new XMLHttpRequest();
  var multi = document.getElementsByClassName("multi");
  var advice = document.getElementById("advice");
  var canvas = document.getElementById("i2");
  var ctx = canvas.getContext('2d');
  var hex = document.getElementsByClassName("hex");

  if (1 <= i+1 && i+1 < colorList.length){
    a2 = color_a[i+1].childNodes[0].nodeValue;
  }
  else if (i+1 == colorList.length){
    a2 = color_a[0].childNodes[0].nodeValue;
  }
  multi[0].innerHTML = '<li>ボタン2 <input class="plus" type="button" value="-" onclick="minus()"></li>';

  multi[1].innerHTML = '<li><input class="color" type="color" id="list9" name="btn2" list="data9" value="#ffffff" onchange="btn2_submit()" onmouseover="c1(9)"></li><datalist id="data9"></datalist>';

  advice.innerText = "ボタン２を追加してアクセントカラーを1色増やす場合は、全体のバランスが崩れないようにボタン1とボタン2の色を類似色にするよ！";
  var data9 = document.getElementById('data9');
  for(i = 0; i < colorList.length; i++){
    a_color = color_a[i].childNodes[0].nodeValue;
    data9.innerHTML = data9.innerHTML + "<option value='"+a_color+"'></option>";
  }
  String(btn2);
  var btn2 = a2.substring(1);
  hex[8].innerText = "#" + btn2;
  document.getElementById("list9").value = a2;
  ctx.fillStyle = a2; //button2
  ctx.fillRect(0, 240, 20, 20);

  xmlHttp.open('GET','/cgi-bin/mult.rb?btn2='+btn2,true);
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState==4){
      parent.main.location.reload();
    }
  }
  xmlHttp.send(null);
}

function btn2_submit(c){　//ボタン２を送信したときの処理
  var xmlHttp = new XMLHttpRequest();
  var btn2;
  if(c == "8"){
    btn2 = document.getElementById("list8").value;
  }
  else {
    btn2 = document.getElementById("list9").value;
    var hex = document.getElementsByClassName("hex");
    hex[8].innerText = btn2;
  }
  btn2 = btn2.substring(1);
  xmlHttp.open('GET','/cgi-bin/diard.rb?btn2='+btn2+'&m1='+m1.substring(1),true);
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState==4){
      xml = xmlHttp.responseXML;
      var judge = xml.getElementsByTagName("judge")[0].firstChild.nodeValue;
      var judge2 = xml.getElementsByTagName("judge2")[0].firstChild.nodeValue;
      var score3 = xml.getElementsByTagName("score3")[0].lastChild.nodeValue;//視認性判定
      var score4 = xml.getElementsByTagName("score")[0].lastChild.nodeValue;//ダイアード判定
      var diard = xml.getElementsByTagName("diard")[0].firstChild.nodeValue;
      text.innerHTML = "<li>" + judge + "</li><li>" + judge2 + "</li>";
      score3_n = Number(score3);
      score4_n = Number(score4);
      multi3 = score3_n - 80;
      multi4 = score4_n - 80;
      set_chart(score1_n,score2_n,score3_n,score4_n,score5_n);
      get_score();
      parent.main.location.reload();
    }
  }
  xmlHttp.send(null);
}

function minus(){
  var xmlHttp = new XMLHttpRequest();
  var canvas = document.getElementById("i2");
  var ctx = canvas.getContext('2d');
  var multi = document.getElementsByClassName("multi");
  var btn = document.getElementById("list8").value;
  var hex = document.getElementsByClassName("hex");

  btn = btn.substring(1);
  multi[0].innerHTML = "";
  multi[1].innerHTML = "";
  ctx.fillStyle = "#ffffff"; //button
  ctx.fillRect(0,240,20,20);
  hex[8].innerText="";
  xmlHttp.open('GET','/cgi-bin/minus.rb?btn2='+btn,true);
  xmlHttp.onreadystatechange=function(){
    if(xmlHttp.readyState==4){
      parent.main.location.reload();
    }
  }
  xmlHttp.send(null);
}

function c1(c){ //マウスオーバーしたときの処理
  var advice = document.getElementById('advice');
  if (c == "1"){
  advice.innerHTML="背景は<a href='rule.html' target='main'>ベースカラー</a>に当たる部分だね。この色は<a href='rule.html' target='main'>メインカラー</a>を薄くした色や白などの淡い色を選ぶと全体がまとまるよ！";
  mouseover(c);
  }
  else if (c == "2"){
  advice.innerHTML="サイト全体をロゴの色に合わせるとまとまるよ！";
  mouseover(c);
  }
  else if (c == "3"){
  advice.innerHTML="ヘッダーは<a href='rule.html' target='main'>メインカラー</a>に当たる部分だね。調整する場合はその色の<a href='rule.html#con2' target='main'>類似色</a>を選ぶと全体の調和が保たれるよ！";
  mouseover(c);
  }
  else if (c == "4"){
  advice.innerHTML="ナビゲーションと背景の<a href='rule.html#con3' target='main'>明度差</a>を大きく付けて、見やすくしよう！";
  mouseover(c);
  }
  else if (c == "5"){
  advice.innerHTML="見出しは背景との<a href='rule.html#con3' target='main'>明度差</a>を大きく付けて、見やすくしよう！";
  mouseover(c);
  }
  else if (c == "6"){
  advice.innerHTML="テキストは背景との<a href='rule.html#con3' target='main'>明度差</a>を付けて、見やすくしよう！";
  mouseover(c);
  }
  else if (c == "7"){
  advice.innerHTML="<a href='rule.html' target='main'>メインカラー</a>に当たる部分だね。調整する場合はその色の<a href='rule.html#con2' target='main'>類似色</a>を選ぶと全体の調和が保たれるよ！";
  mouseover(c);
  }
  else if (c == "8"){
  advice.innerHTML="クリックボタンは<a href='rule.html' target='main'>アクセントカラー</a>だよ。<a href='rule.html' target='main'>メインカラー</a>と<a href='rule.html#con5' target='main'>補色</a>の関係にするとまとまるよ。目立たせるために、<a href='rule.html#con4' target='main'>彩度</a>を高くするよう心がけよう！";
  mouseover(c);
  }
  else if (c == "9"){
  advice.innerHTML="ボタン2を追加して<a href='rule.html' target='main'>アクセントカラー</a>を1色増やす場合は、全体のバランスが崩れないようにボタン1とボタン2の色を<a href='rule.html#con2' target='main'>類似色</a>にするよ！";
  mouseover(c);
  }
}

function mouseover(c){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET','/cgi-bin/mouseover.rb?c='+c,true);
  xmlHttp.onreadystatechange=function(){
    if(xmlHttp.readyState==4){
      parent.main.location.reload();
    }
  }
  xmlHttp.send(null);
}

function out(){
  mouseover(null);
}
