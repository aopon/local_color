function cc1(i){
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

  for(i = 0; i < colorList.length; i++){
    b_color = color_b[i].childNodes[0].nodeValue;
    m_color = color_m[i].childNodes[0].nodeValue;
    a_color = color_a[i].childNodes[0].nodeValue;
    data1.innerHTML = data1.innerHTML + "<option value='"+b_color+"'></option>";
    data2.innerHTML = data2.innerHTML + "<option value='"+m_color+"'></option>";
    data3.innerHTML = data3.innerHTML + "<option value='"+m_color+"'></option>";
    data4.innerHTML = data4.innerHTML + "<option value='"+m_color+"'></option>";
    data5.innerHTML = data5.innerHTML + "<option value='"+m_color+"'></option>";
    //data6.innerHTML = data6.innerHTML + "<option value='#000000'></option>";
    data7.innerHTML = data7.innerHTML + "<option value='"+m_color+"'></option>";
    data8.innerHTML = data8.innerHTML + "<option value='"+a_color+"'></option>";
  }
}

function multi(i){
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

  multi[1].innerHTML = '<li><input type="color" id="list9" name="btn2" list="data9" value="#ffffff" onchange="btn2_submit()" onclick="c9()"></li><datalist id="data9"></datalist>';

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
    }
  }
  xmlHttp.send(null);
}

function btn2_submit(){
  var xmlHttp = new XMLHttpRequest();
  var btn2 = document.getElementById("list9").value;
  btn2 = btn2.substring(1);
  xmlHttp.open('GET','/cgi-bin/mult.rb?btn2='+btn2,true);
  xmlHttp.onreadystatechange = function(){
    if(xmlHttp.readyState==4){
      parent.main.location.reload();
      //alert(btn2);
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

function c1(){ //base
  var text = document.getElementById('text');
  text.innerText="ベースカラーは背景に使われるよ！この色はメインカラーの薄い色や白を使うとにすると全体がまとまるよ！";
}

function c2(){ //logo
  var text = document.getElementById('text');
  console.log(this);
  text.innerText ="サイト全体をロゴの色に合わせるとまとまるよ！";
}
function c3(){
  var text = document.getElementById('text');
  console.log(this);
  text.innerText ="ロゴの色はメインになるカラーだよ。ハッキリ見える色にするために、ヘッダーの色とロゴは明度差を付けてあげよう";
}
function c4(){
}
function c5(){
}
function c6(){
  var text = document.getElementById('text');
  value = xml.getElementsByTagName("value")[0].firstChild.nodeValue;
  text.innerText = value;
}
function c7(){ //
}
function c8(){
}
function c9(){
}
