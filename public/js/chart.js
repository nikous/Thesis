
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


async function chartIt(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data
    await getData(symbol);

    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels,
            datasets: [{
                label: 'Close',
                data: close_labels,
                fill: false,
                backgroundColor:
                    'green',
                borderColor:
                    'green'
                ,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'green',
            }]
        },


        options: {

            legend: {

                display: false

            },
            tooltips: {
                mode: 'index',
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;

                },

                callbacks: {
                    title: function (a, d) {
                        return a[0].xLabel;
                    },
                    label: function (i, d) {
                        return (
                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                        );
                    }
                },
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{
                    display: true,
                    type: 'time',
                    position: 'bottom',
                    id: 'x-axis-0',
                    gridLines: {
                        display: false,
                        drawBorder: false

                    },
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 160
                        }
                    }],

                }]
            },
            plugins: {

                crosshair: {

                    line: {

                        color: '#808080',  // crosshair line color
                        width: 0.5        // crosshair line width
                    },
                    sync: {

                        enabled: false,            // enable trace line syncing with other charts
                    },
                }
            }
        },
    });
}

async function chartIt1Day(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data
    await getDataReal(symbol);

    const ctx = document.getElementById('myChart1Day').getContext("2d");

    function generate(shift, label, color) {

        var datas = [];

        for (var i = 0; i <= date_labels_1Day_chart.length; i++) {

            datas.push({ x: date_labels_1Day_chart[i], y: close_labels_1Day_chart[i] });
        }

        var dataset = {
            backgroundColor: color,
            borderColor: color,
            showLine: true,
            fill: false,
            pointRadius: 0,
            label: "close",
            data: datas,
            lineTension: 0,
            interpolate: true,
            xAxisID: 'x-axis-0',
            borderWidth: 1,
            shadowOffsetX: 3,
            shadowOffsetY: 3,
            shadowBlur: 10,
            shadowColor: color,

        };

        return dataset;
    }

    const myChart1Day = new Chart(ctx, {

        type: 'line',

        data: {

            datasets: [generate(0, "close", colorStock)]
        },

        options: {

            legend: {

                display: false
            },

            tooltips: {

                mode: 'index',
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                },

                callbacks: {

                    title: function (a, d) {

                        return a[0].xLabel;
                    },

                    label: function (i, d) {

                        return (
                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                        );
                    }
                },

                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{

                    display: true,
                    type: 'time',
                    distribution: 'series',
                    position: 'bottom',
                    id: 'x-axis-0',
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                }]
            },

            plugins: {

                crosshair: {
                    line: {

                        color: '#808080',  // crosshair line color
                        width: 1        // crosshair line width
                    },
                    sync: {

                        enabled: false,            // enable trace line syncing with other charts
                    },
                    zoom: {

                        enabled: false,                                      // enable zooming

                    },
                }
            }
        },
    });

};

async function chartIt3Days(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data

    const ctx = document.getElementById('myChart3Days').getContext('2d');
    const myChart3Days = new Chart(ctx, {
        type: 'line',
        data: {
            labels: date_labels_3Days_chart,
            datasets: [{
                label: 'Chart',
                label: 'Close',
                data: close_labels_3Days_chart,
                fill: false,
                backgroundColor:
                    "green"
                ,
                borderColor:
                    "green"
                ,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: "green",
            }]
        },

        options: {

            legend: {

                display: false
            },

            tooltips: {

                mode: 'index',
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;

                },

                callbacks: {

                    title: function (a, d) {

                        return a[0].xLabel;
                    },
                    label: function (i, d) {

                        return (
                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                        );
                    }
                },

                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{

                    display: true,
                    type: 'time',
                    distribution: 'series',
                    position: 'bottom',
                    id: 'x-axis-0',
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                }]
            },

            plugins: {

                crosshair: {

                    line: {

                        color: '#808080',  // crosshair line color
                        width: 1      // crosshair line width
                    },

                    sync: {

                        enabled: false,            // enable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,                                      // enable zooming
                        // reset zoom button class
                    },
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
                label: 'Close',
                data: close_labels_1Month_chart,
                fill: false,
                backgroundColor:
                    'green'
                ,
                borderColor:
                    'green'
                ,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'green',
            }]
        },

        options: {

            legend: {

                display: false
            },

            tooltips: {

                mode: 'index',
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;

                },

                callbacks: {

                    title: function (a, d) {

                        return a[0].xLabel;
                    },
                    label: function (i, d) {

                        return (
                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                        );
                    }
                },

                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{

                    display: true,
                    type: 'time',
                    // distribution: 'series',
                    position: 'bottom',
                    id: 'x-axis-0',
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                }]
            },

            plugins: {

                crosshair: {

                    line: {

                        color: '#808080',  // crosshair line color
                        width: 1      // crosshair line width
                    },

                    sync: {

                        enabled: false,            // enable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,                                      // enable zooming
                        // reset zoom button class
                    },
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
                label: 'Close',
                data: close_labels_4Months_chart,
                fill: false,
                backgroundColor:
                    'green'
                ,
                borderColor:
                    'green'
                ,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'green',
            }]
        },

        options: {

            legend: {

                display: false
            },

            tooltips: {

                mode: 'index',
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                },

                callbacks: {

                    title: function (a, d) {

                        return a[0].xLabel;
                    },

                    label: function (i, d) {

                        return (
                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                        );
                    }
                },

                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{

                    display: true,
                    type: 'time',
                    position: 'bottom',
                    id: 'x-axis-0',
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                }]
            },

            plugins: {

                crosshair: {
                    line: {

                        color: '#808080',  // crosshair line color
                        width: 1      // crosshair line width
                    },

                    sync: {

                        enabled: false,            // enable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,                                      // enable zooming
                        // reset zoom button class
                    },
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
            labels: year_labels,
            datasets: [{
                label: 'Close',
                data: Yearclose_labels,
                fill: false,
                backgroundColor:
                    'green'
                ,
                borderColor:
                    'green'
                ,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'green',
            }]
        },

        options: {

            legend: {

                display: false
            },

            tooltips: {

                mode: 'index',
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;

                },

                callbacks: {

                    title: function (a, d) {
                        return a[0].xLabel;
                    },

                    label: function (i, d) {

                        return (
                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                        );
                    }
                },

                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{

                    display: true,
                    type: 'time',
                    position: 'bottom',
                    id: 'x-axis-0',
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                }]
            },

            plugins: {

                crosshair: {

                    line: {

                        color: '#808080',  // crosshair line color
                        width: 1      // crosshair line width
                    },

                    sync: {

                        enabled: false,            // enable trace line syncing with other charts
                    },
                    zoom: {

                        enabled: false,                                      // enable zooming

                    },
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
            labels: fiveYear_labels,
            datasets: [{
                label: 'Close',
                data: fiveYearclose_labels,
                fill: false,
                backgroundColor:
                    'green'
                ,
                borderColor:
                    'green'
                ,
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'green',
            }]
        },

        options: {

            legend: {

                display: false
            },

            tooltips: {

                mode: 'index',
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;

                },

                callbacks: {

                    title: function (a, d) {

                        return a[0].xLabel;
                    },

                    label: function (i, d) {

                        return (
                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                        );
                    }
                },

                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{

                    display: true,
                    type: 'time',
                    position: 'bottom',
                    id: 'x-axis-0',
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                }]
            },

            plugins: {

                crosshair: {

                    line: {

                        color: '#808080',  // crosshair line color
                        width: 1      // crosshair line width
                    },

                    sync: {

                        enabled: false,            // enable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,                                      // enable zooming
                        // reset zoom button class
                    },
                }
            }
        },
    });

}


