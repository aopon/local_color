function set_chart(s1,s2,s3,s4,s5){
  var radarChartData = {
    labels : ["テキストの可読性","見出しの可読性","ボタンの視認性","ボタンの調和性","メインCの調和性"],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : [80,80,80,80,80]
      },
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : [s1,s2,s3,s4,s5]
      }
    ]
  }
  var myRadar = new Chart(document.getElementById("radar").getContext("2d")).Radar(radarChartData,{scaleShowLabels : true, pointLabelFontSize : 10});
}
