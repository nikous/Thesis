let date_labels = [];
let open_labels = [];
let close_labels = [];
let low_labels = [];
let high_labels = [];
let volume_labels = [];
var myChart;

async function chartIt(symbol, destroy) {
    console.log("1");
    console.log(destroy);
    await getData(symbol);


    const ctx = document.getElementById('myChart').getContext('2d');
    //console.log("ON chart");
    //console.log(date_labels[0]);
    //console.log(close_labels[0]);

    // if (destroy == true) { myChart.update(); }

    const myChart = new Chart(ctx, {

        type: 'line',
        data: {
            labels: date_labels,
            datasets: [{
                label: 'Chart',
                data: close_labels,
                fill: false,
                backgroundColor:
                    'rgb(76, 114, 38)'
                ,
                borderColor:
                    'rgb(76, 114, 38)'
                ,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0
            }]

        },

    });



}





// window.onload = function () {// Our labels along the x-axis
//   function BuildChart(labels, values, chartTitle) {
//     var data = {
//       labels: labels,
//       datasets: [{
//         label: chartTitle, // Name the series
//         data: values,
//         backgroundColor: ['rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//           'rgb(54, 162, 235)',
//         ],
//       }],
//     };
//     var ctx = document.getElementById("myChart").getContext('2d');
//     var myChart = new Chart(ctx, {
//       type: 'horizontalBar',
//       data: data,
//       options: {
//         responsive: true, // Instruct chart JS to respond nicely.
//         maintainAspectRatio: false, // Add to prevent default behavior of full-width/height 
//         scales: {
//           xAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: '$ Billion'
//             }
//           }],
//           yAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: 'Name'
//             }
//           }]
//         },
//       }
//     });
//     return myChart;
//   }



// }
