let date_labels = [];
let open_labels = [];
let close_labels = [];
let low_labels = [];
let high_labels = [];
let volume_labels = [];


// let date_labels_Realtime = [];
// let open_labels_Realtime = [];
// let close_labels_Realtime = [];
// let low_labels_Realtime = [];
// let high_labels_Realtime = [];
// let volume_labels_Realtime = [];

let date_labels_Real = [];
let open_labels_Real = [];
let close_labels_Real = [];
let low_labels_Real = [];
let high_labels_Real = [];
let volume_labels_Real = [];



async function chartIt(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data
    await getData(symbol);

    const ctx = document.getElementById('myChart').getContext('2d');
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

// async function chartItRealtime(symbol, destroy) {
//     //ChartIt waits getData to complete and then starts to visualize data
//     await getDataRealtime(symbol);

//     const ctx = document.getElementById('myChartRealtime').getContext('2d');
//     const myChartRealtime = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: date_labels_Realtime,
//             datasets: [{
//                 label: 'Chart',
//                 data: close_labels_Realtime,
//                 fill: false,
//                 backgroundColor:
//                     'rgb(76, 114, 38)'
//                 ,
//                 borderColor:
//                     'rgb(76, 114, 38)'
//                 ,
//                 borderWidth: 1,
//                 pointRadius: 0,
//                 lineTension: 0
//             }]
//         },
//     });
//     if (destroy == true) { myChart.update(); }
// }

async function chartItReal(symbol, destroy) {
    //ChartIt waits getData to complete and then starts to visualize data
    await getDataReal(symbol);

    const ctx = document.getElementById('myChartReal').getContext('2d');
    const myChartReal = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels_Real,
            datasets: [{
                label: 'Chart',
                data: close_labels_Real,
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
    if (destroy == true) { myChart.update(); }
}