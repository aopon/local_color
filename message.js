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
  //data6.innerHTML = "" ;
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
  var canvas = document.getElementById("i2");
  var ctx = canvas.getContext('2d');

  if (1 <= i+1 && i+1 < colorList.length){
    a2 = color_a[i+1].childNodes[0].nodeValue;
  }
  else if (i+1 == colorList.length){
    a2 = color_a[0].childNodes[0].nodeValue;
  }
  multi[0].innerHTML = '<li>ボタン2 <input class="plus" type="button" value="-" onclick="minus()"></li>';

  multi[1].innerHTML = '<li><input class="color" type="color" id="list9" name="btn2" list="data9" value="#ffffff" onchange="btn2_submit()" onmouseover="c1(9)"></li><datalist id="data9"></datalist>';

  var data9 = document.getElementById('data9');
  for(i = 0; i < colorList.length; i++){
    a1 = color_a[i].childNodes[0].nodeValue;
    data9.innerHTML = data9.innerHTML + "<option value='"+a1+"'></option>";
  }
  String(btn2);
  var btn2 = a2.substring(1);
  xmlHttp.open('GET','/cgi-bin/mult.rb?btn2='+btn2,true);
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState==4){
      parent.main.location.reload();
      document.getElementById("list9").value = a2;
      ctx.fillStyle = a2; //button2
      ctx.fillRect(0, 240, 20, 20);
      btn2_submit();
    }
  }
  xmlHttp.send(null);
}

function btn2_submit(){　//ボタン２を送信したときの処理
  var xmlHttp = new XMLHttpRequest();
  var btn2 = document.getElementById("list9").value;
  var di_pict = document.getElementById("di_pict");
  var di_message = document.getElementById("di_message");
  btn2 = btn2.substring(1);
  xmlHttp.open('GET','/cgi-bin/diard.rb?btn2='+btn2+'&m1='+m1.substring(1),true);
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState==4){
      xml = xmlHttp.responseXML;
      judge = xml.getElementsByTagName("judge")[0].firstChild.nodeValue;
      diard = xml.getElementsByTagName("diard")[0].firstChild.nodeValue;
      console.log(judge);
      console.log(diard);
      text.innerText = judge;
      di_pict.innerHTML = '<canvas id= "di_canvas" width="45" height="45"></canvas>';
      di_message.innerText = "アクセントカラーをこの色に近づけると良くなるよ〜";
      var canvas = document.getElementById("di_canvas");
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = diard; //button
      ctx.fillRect(0,0,35,35);
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
  btn = btn.substring(1);
  multi[0].innerHTML = "";
  multi[1].innerHTML = "";
  ctx.fillStyle = "#ffffff"; //button
  ctx.fillRect(0,240,20,20);
  xmlHttp.open('GET','/cgi-bin/minus.rb?btn2='+btn,true);
  xmlHttp.onreadystatechange=function(){
    if(xmlHttp.readyState==4){
      parent.main.location.reload();
    }
  }
  xmlHttp.send(null);
}

function c1(c){ //マウスオーバーしたときの処理
  var text = document.getElementById('text');
  if (c == "1"){
  text.innerText="ベースカラーは背景に使われるよ！この色はメインカラーの薄い色や白を使うとにすると全体がまとまるよ！";
  mouseover(c);
  }
  else if (c == "2"){
  text.innerText="サイト全体をロゴの色に合わせるとまとまるよ！";
  mouseover(c);
  }
  else if (c == "3"){
  text.innerText="ロゴの色はメインになるカラーだよ。ハッキリ見える色にするために、ヘッダーの色とロゴは明度差を付けてあげよう";
  mouseover(c);
  }
  else if (c == "4"){
  text.innerText="ナビゲーションと背景のコントラストを大きくとる事を意識しよう！";
  mouseover(c);
  }
  else if (c == "5"){
  text.innerText="見出しはハッキリと目立つようにしよう！";
  mouseover(c);
  }
  else if (c == "6"){
  text.innerText="テキストは背景とのコントラストを付けよう";
  mouseover(c);
  }
  else if (c == "7"){
  text.innerText="フッターだよん";
  mouseover(c);
  }
  else if (c == "8"){
  text.innerText="ボタン１だよん";
  mouseover(c);
  }
  else if (c == "9"){
  text.innerText="ボタン２だよん";
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
