

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


let draw = Chart.controllers.line.prototype.draw;
Chart.controllers.line = Chart.controllers.line.extend({
    draw: function () {
        draw.apply(this, arguments);
        let ctx = this.chart.chart.ctx;
        let _stroke = ctx.stroke;
        ctx.stroke = function () {
            ctx.save();


            ctx.shadowColor = 'rgb(76, 114, 38)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 4;
            _stroke.apply(this, arguments);
            ctx.restore();

        };
    }
});

// let activeTooltip = null;

// function showTooltipForPointEvenIfNotHoveringExactlyOverIt(chartInstance, evt) {
//     const helpers = Chart.helpers;
//     const eventPosition = helpers.getRelativePosition(evt, chartInstance.chart);

//     helpers.each(chartInstance.data.datasets, (dataset, datasetIndex) => {
//         if (chartInstance.isDatasetVisible(datasetIndex)) {
//             helpers.each(chartInstance.getDatasetMeta(datasetIndex).data, element => {
//                 if (element.inLabelRange(eventPosition.x, eventPosition.y)) {
//                     activeTooltip = element;
//                     return;
//                 }
//             });
//         }
//     });

//     if (activeTooltip) {
//         chartInstance.tooltipActive.push(activeTooltip);
//         chartInstance.tooltip.update(true);
//         chartInstance.render(0, true);
//     }
// }


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
            // responsive: true,
            // maintainAspectRatio: false,

            legend: {
                display: false
            },
            tooltips: {
                custom: function (tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: true,
                        // autoSkip: true,
                        // maxTicksLimit: 5,

                        maxRotation: 0,
                        minRotation: 0,
                        mirror: true,
                        fontSize: 10,
                        padding: 10,
                        callback: function (label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            } else {
                                return label;
                            }

                        }
                    }

                }]
            },

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
                label: 'Close',
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
                lineTension: 0,

            }]
        },
        options: {
            // responsive: true,
            // maintainAspectRatio: false,

            legend: {
                display: false
            },
            tooltips: {
                custom: function (tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: true,
                        // autoSkip: true,
                        // maxTicksLimit: 5,

                        maxRotation: 0,
                        minRotation: 0,
                        mirror: true,
                        fontSize: 10,
                        padding: 10,
                        callback: function (label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            } else {
                                return label;
                            }

                        }
                    }

                }]
            },

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
                label: 'Close',
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
            responsive: true,
            // maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                custom: function (tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                }
            },
            scales: {
                xAxes: [{

                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: true,
                        // autoSkip: true,
                        // maxTicksLimit: 5,

                        maxRotation: 0,
                        minRotation: 0,
                        mirror: true,
                        fontSize: 10,
                        padding: 10,
                        callback: function (label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            } else {
                                return label;
                            }

                        }
                    }

                }]
            },

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
            // responsive: true,
            // maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                custom: function (tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: true,
                        // autoSkip: true,
                        // maxTicksLimit: 5,

                        maxRotation: 0,
                        minRotation: 0,
                        mirror: true,
                        fontSize: 10,
                        padding: 10,
                        callback: function (label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            } else {
                                return label;
                            }

                        }
                    }

                }],

            },

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
            // responsive: true,
            // maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                custom: function (tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: true,
                        autoSkip: true,
                        maxTicksLimit: 7,

                        maxRotation: 0,
                        minRotation: 0,
                        mirror: true,
                        fontSize: 10,
                        padding: 10,
                        callback: function (label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            } else {
                                return label;
                            }

                        }
                    }

                }]
            },

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
                label: 'Close',
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
            // responsive: true,
            // maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                custom: function (tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: true,
                        autoSkip: true,
                        maxTicksLimit: 10,

                        maxRotation: 0,
                        minRotation: 0,
                        mirror: true,
                        fontSize: 10,
                        padding: 10,
                        callback: function (label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            } else {
                                return label;
                            }

                        }
                    }

                }]
            },

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
                label: 'Close',
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
            // responsive: true,
            // maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                custom: function (tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        display: true,
                        autoSkip: true,
                        maxTicksLimit: 10,

                        maxRotation: 0,
                        minRotation: 0,
                        mirror: true,
                        fontSize: 10,
                        padding: 10,
                        callback: function (label) {
                            if (/\s/.test(label)) {
                                return label.split(" ");
                            } else {
                                return label;
                            }

                        }
                    }

                }]
            },

        },
    });

}


