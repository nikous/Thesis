let date_labels = [];
let open_labels = [];
let close_labels = [];
let low_labels = [];
let high_labels = [];
let volume_labels = [];


let date_labels_Daily = [];
let open_labels_Daily = [];
let close_labels_Daily = [];
let low_labels_Daily = [];
let high_labels_Daily = [];
let volume_labels_Daily = [];

let date_labels_Real = [];
let open_labels_Real = [];
let close_labels_Real = [];
let low_labels_Real = [];
let high_labels_Real = [];
let volume_labels_Real = [];


let close_labels_1Day_chart = [];
let date_labels_1Day_chart = [];

let date_labels_4Months_chart = [];
let close_labels_4Months_chart = [];

let date_labels_3Days_chart = [];
let close_labels_3Days_chart = [];

let date_labels_1Month_chart = [];
let close_labels_1Month_chart = [];

let date_labels_1Year_chart = [];
let close_labels_1Year_chart = [];

let date_labels_5Years_chart = [];
let close_labels_5Years_chart = [];



async function chartIt(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data
    await getData(symbol);

    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
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
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        },

    });


}

async function chartIt1Day(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data
    await getDataReal(symbol);

    const ctx = document.getElementById('myChart1Day').getContext('2d');
    const myChart1Day = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels_1Day_chart,
            datasets: [{
                label: 'Chart',
                data: close_labels_1Day_chart,
                fill: false,
                backgroundColor:
                    'rgb(76, 114, 38)'
                ,
                borderColor:
                    'rgb(76, 114, 38)'
                ,
                borderWidth: 1,
                pointRadius: 2,
                lineTension: 0
            }]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        },
    });

}
async function chartIt3Days(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data

    const ctx = document.getElementById('myChart3Days').getContext('2d');
    const myChart3Days = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels_3Days_chart,
            datasets: [{
                label: 'Chart',
                data: close_labels_3Days_chart,
                fill: false,
                backgroundColor:
                    'rgb(76, 114, 38)'
                ,
                borderColor:
                    'rgb(76, 114, 38)'
                ,
                borderWidth: 1,
                pointRadius: 2,
                lineTension: 0
            }]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        },
    });

}
async function chartIt1Month(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data
    await getDataDaily(symbol);

    const ctx = document.getElementById('myChart1Month').getContext('2d');
    const myChart1Month = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels_1Month_chart,
            datasets: [{
                label: 'Chart',
                data: close_labels_1Month_chart,
                fill: false,
                backgroundColor:
                    'rgb(76, 114, 38)'
                ,
                borderColor:
                    'rgb(76, 114, 38)'
                ,
                borderWidth: 1,
                pointRadius: 2,
                lineTension: 0
            }]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        },
    });
}



async function chartIt4Months(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data

    const ctx = document.getElementById('myChart4Months').getContext('2d');
    const myChart4Months = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels_4Months_chart,
            datasets: [{
                label: 'Chart',
                data: close_labels_4Months_chart,
                fill: false,
                backgroundColor:
                    'rgb(76, 114, 38)'
                ,
                borderColor:
                    'rgb(76, 114, 38)'
                ,
                borderWidth: 1,
                pointRadius: 2,
                lineTension: 0
            }]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        },
    });

}

async function chartIt1Year(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data

    const ctx = document.getElementById('myChart1Year').getContext('2d');
    const myChart1Year = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels_1Year_chart,
            datasets: [{
                label: 'Chart',
                data: close_labels_1Year_chart,
                fill: false,
                backgroundColor:
                    'rgb(76, 114, 38)'
                ,
                borderColor:
                    'rgb(76, 114, 38)'
                ,
                borderWidth: 1,
                pointRadius: 2,
                lineTension: 0
            }]
        },
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        },
    });

}

async function chartIt5Years(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data

    const ctx = document.getElementById('myChart5Years').getContext('2d');
    const myChart5Years = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels_5Years_chart,
            datasets: [{
                label: 'Chart',
                data: close_labels_5Years_chart,
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
        options: {
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            }
        },
    });

}


