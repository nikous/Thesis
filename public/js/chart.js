
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

// Chart for Max 
async function chartIt(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data
    await getData(symbol);

    // Take id from ejs file to find the container it will fit 
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {

        type: 'line',               // line chart
        data: {

            labels: date_labels,   //   x axis 
            datasets: [{

                label: 'Close',
                data: close_labels, //  y axis 
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

                display: false  // disable label at the top of the chart

            },

            tooltips: {

                mode: 'index',  // how to interact the mouse/line with the dots 
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;

                    tooltip.displayColors = false;  // disable displaying the color box;

                },

                callbacks: {
                    title: function (a, d) {

                        return a[0].xLabel;
                    },

                    label: function (i, d) {    // Customize label of every dot 

                        return (

                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)
                        );
                    }
                },

                // Shadow on line 
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{

                    display: true,
                    type: 'time',       // type of data at x axis 
                    position: 'bottom',
                    id: 'x-axis-0',
                    gridLines: {

                        display: false,
                        drawBorder: false
                    },
                }]
            },

            plugins: {

                crosshair: {    // add crosshair at chart 

                    line: {

                        color: '#808080',  // crosshair line color
                        width: 0.5        // crosshair line width
                    },

                    sync: {

                        enabled: false,            // Disable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,     // Disable zooming

                    },
                }
            }
        },
    });
}

async function chartIt1Day(symbol, destroy) {

    //ChartIt waits getData to complete and then starts to visualize data
    await getDataReal(symbol);

    // Take id from ejs file to find the container it will fit 
    const ctx = document.getElementById('myChart1Day').getContext("2d");

    // Generate data and put them to axis x nad y
    function generate(shift, label, color) {

        var datas = [];

        for (var i = 0; i <= date_labels_1Day_chart.length; i++) {

            datas.push({ x: date_labels_1Day_chart[i], y: close_labels_1Day_chart[i] });
        }

        //Settings for the chart
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

    // Chart for 1 Day 
    const myChart1Day = new Chart(ctx, {

        type: 'line',   // Line chart 

        data: {

            datasets: [generate(0, "close", colorStock)] //Put data and choose color for the chart
        },

        options: {

            legend: {

                display: false // Disable label at the top of the chart 
            },

            tooltips: {

                mode: 'index',  // How mouse/line interract with dots on the chart 
                intersect: false,

                custom: function (tooltip) {

                    if (!tooltip) return;

                    tooltip.displayColors = false;  // disable displaying the color box; 
                },

                callbacks: {

                    title: function (a, d) {

                        return a[0].xLabel;
                    },

                    label: function (i, d) {

                        return (

                            d.datasets[i.datasetIndex].label + ": " + i.yLabel.toFixed(2)     // label for every dot at chart 
                        );
                    }
                },

                //Add shadow 
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            scales: {

                xAxes: [{

                    display: true,
                    type: 'time',   // Type of data at x axis 
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

                crosshair: {    // add line( crosshair ) to chart 

                    line: {

                        color: '#808080',  // crosshair line color
                        width: 1           // crosshair line width
                    },

                    sync: {

                        enabled: false,   // disable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false, // disable zooming

                    },
                }
            }
        },
    });
};

// Chart 3 Days 
async function chartIt3Days(symbol, destroy) {

    const ctx = document.getElementById('myChart3Days').getContext('2d');
    const myChart3Days = new Chart(ctx, {

        type: 'line',
        data: {

            labels: date_labels_3Days_chart, // x axis 
            datasets: [{

                label: 'Chart',
                label: 'Close',
                data: close_labels_3Days_chart, // y axis 
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

                    tooltip.displayColors = false;   // Disable displaying the color box;

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

                        enabled: false,            // Disable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false, // Disable zooming
                    },
                }
            }
        },
    });
}

// Chart for 1 Month
async function chartIt1Month(symbol, destroy) {

    //ChartIt1Month waits getDataDaily to complete and then starts to visualize data
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

                    tooltip.displayColors = false;   // disable displaying the color box;
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

                        enabled: false,          // Disable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,         // Disable zooming
                    },
                }
            }
        },
    });
}



async function chartIt4Months(symbol, destroy) {

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

                    tooltip.displayColors = false;  // disable displaying the color box;
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
                        width: 1          // crosshair line width
                    },

                    sync: {

                        enabled: false,    // Disable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,    // Disable zooming
                    },
                }
            }
        },
    });
}

async function chartIt1Year(symbol, destroy) {

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

                    tooltip.displayColors = false;   // Disable displaying the color box;

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
                        width: 1           // crosshair line width
                    },

                    sync: {

                        enabled: false,      // Disable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,     // Disable zooming
                    },
                }
            }
        },
    });

}

async function chartIt5Years(symbol, destroy) {

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

                    tooltip.displayColors = false;     // disable displaying the color box;

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
                        width: 1           // crosshair line width
                    },

                    sync: {

                        enabled: false,    // Disable trace line syncing with other charts
                    },

                    zoom: {

                        enabled: false,    // Disable zooming
                    },
                }
            }
        },
    });

}


