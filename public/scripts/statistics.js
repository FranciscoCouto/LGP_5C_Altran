 
      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var x = document.getElementById("datas").innerHTML.split(",")[0];
        var y = document.getElementById("datas").innerHTML.split(",")[1];
        var z = document.getElementById("datas").innerHTML.split(",")[2];
        var w = document.getElementById("datas").innerHTML.split(",")[3];
        
        var best1 = document.getElementById("datas").innerHTML.split(",")[4];
        var name1 = document.getElementById("datas").innerHTML.split(",")[5];
        var best2 = document.getElementById("datas").innerHTML.split(",")[6];
        var name2 = document.getElementById("datas").innerHTML.split(",")[7];
        var best3 = document.getElementById("datas").innerHTML.split(",")[8];
        var name3 = document.getElementById("datas").innerHTML.split(",")[9];
        var best4 = document.getElementById("datas").innerHTML.split(",")[10];
        var name4 = document.getElementById("datas").innerHTML.split(",")[11];
        
        if(typeof best1 != 'undefined'){
        var best1 = best1.replace(/[^\w\s]/gi, '');
        var name1 = name1.replace(/[^\w\s]/gi, '');
        best1 = best1.slice(21,best1.length);
        name1 = name1.slice(4,name1.length);
        best1 = eval(best1);
      }
      if(typeof best2 != 'undefined'){
        var best2 = best2.replace(/[^\w\s]/gi, '');
        var name2 = name2.replace(/[^\w\s]/gi, '');
        best2 = best2.slice(21,best2.length);
        name2 = name2.slice(4,name2.length);
        best2 = eval(best2);
      }
      if(typeof best3 != 'undefined'){
        var best3 = best3.replace(/[^\w\s]/gi, '');
        var name3 = name3.replace(/[^\w\s]/gi, '');
        best3 = best3.slice(21,best3.length);
        name3 = name3.slice(4,name3.length);
        best3 = eval(best3);
      }
      if(typeof best4 != 'undefined'){
        var best4 = best4.replace(/[^\w\s]/gi, '');
        var name4 = name4.replace(/[^\w\s]/gi, '');
        best4 = best4.slice(21,best4.length);
        name4 = name4.slice(4,name4.length);
        best4 = eval(best4);
      }   
        
         x= eval(x);
         y= eval(y);
         z= eval(z);
         w= eval(w);
         
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Aprovadas',     x],
          ['Inativas',      y],
          ['Rejeitadas',  z],
          ['Submetidas',  w],
        ]);

        var data2 = google.visualization.arrayToDataTable([
        ["Element", "Total", { role: "style" } ],
        [name1, best1, "#b87333"],
        [name2, best2, "silver"],
        [name3, best3, "gold"],
        [name4, best4, "#e5e4e2"]
      ]);

        var view = new google.visualization.DataView(data2);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

        var options = {
       titleTextStyle: {
          color: 'white',
        },
      legend: {textStyle: {color: 'white'}},
          title: 'Lessons Learned By State',
          backgroundColor: '#344770',
          fontName: 'corbertregular',
          color:'white',
          is3D: true,
        };
        /*
 var options2 = {
        title: "Density of Precious Metals, in g/cm^3",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
*/
      var options2 = {
             titleTextStyle: {
          color: 'white',
      },
      legend: {textStyle: {color: 'white'}},
      vAxis:{textStyle: {color: 'white'}},
                title: 'Top Submitters By Lessons Learned',
                backgroundColor: '#344770',
                fontName: 'corbertregular',
                color:'white',
          
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
      chart.draw(view, options2);

        var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);

      }
$(window).resize(function(){
  drawChart();
});