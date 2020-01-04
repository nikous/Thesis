// Arrays of followed stocks ,definition and symbol of stocks 
let followed_stocks = [];
let id = [];
let symbols = [];
let define = [];
var symbolStock;

// Set timer to start countdown until next search 
function setTimer() {

    var timer = new Timer();

    // Start countdown for 1 minute
    timer.start({ countdown: true, startValues: { seconds: 60 } });
    timer.addEventListener('secondsUpdated', function (e) {

        // Add timer to Userpage 
        $('#gettingValuesExample .seconds').html(timer.getTimeValues().toString() + " until next search" + "&ensp;");
    });

    // Disable clicking stocks on list at userpage until countdown finish
    if (timer.getTimeValues().seconds == 00) {

        document.getElementById("listStocks").disabled = true;
    }

    // Enable clicking stocks on list at userpage when countdown finish
    timer.addEventListener('targetAchieved', function (e) {

        document.getElementById("listStocks").disabled = false;
        $('#gettingValuesExample .seconds').html('');
    });
};

// Find Definition and symbol of the stock which clicked at list on userpage
async function DefineStock() {

    const response = await fetch('../public/data/data_stock.csv');  // Wait to fetch data 
    const data = await response.text();
    const rows = data.split('\n').slice(1); //Split csv to rows

    // For each row split them to two arrays symbols and define 
    rows.forEach(elt => {

        const row = elt.split(',');
        const id = row[0];
        const def = row[1];

        symbols.push(row[0]);
        define.push(row[1]);
    });
}
// Get user data from server
$.ajax({

    url: '/getUser',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function (data) {

        var place; // Counter 

        // Put User's stocks to the list on userpage
        for (var Userstocks in data["stock"]) {

            if (data["stock"][Userstocks] != "null") {

                followed_stocks.push(data["stock"][Userstocks]);
            }
        }

        // Find stocks symbol 
        for (var i = 0; i <= symbols.length; i++) {

            if (symbols[i] == followed_stocks[0]) {

                place = i;
            };
        };

        var change = true; // If charts change 

        // Put stocks symbol and definition to cardBody at userpage
        document.getElementById("holder").innerHTML = define[place];
        document.getElementById("holderSymbol").innerHTML = followed_stocks[0];

        // When go to userpage show charts from the first stock at list 
        // Wait first to call the chart1Day,chart1Month and chartIt because they have the Api calls
        $.when(chartIt1Day(followed_stocks[0], change)).done(function () {

            chartIt3Days(followed_stocks[0], change);
        });

        $.when(chartIt1Month(followed_stocks[0], change)).done(function () {

            chartIt4Months(followed_stocks[0], change);
        });

        $.when(chartIt(followed_stocks[0], change)).done(function () {

            chartIt1Year(followed_stocks[0], change);
            chartIt5Years(followed_stocks[0], change);
        });

        // Create elements at list. Add stock which user follows 
        for (var i = 0; i < followed_stocks.length; i++) {

            var x = document.createElement("LI");
            var t = document.createTextNode(followed_stocks[i]);

            x.appendChild(t);
            x.id = followed_stocks[i];
            document.getElementById("listStocks").appendChild(x);
            document.getElementById(x.id).className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";
        }
    }
});


// When clicking a stock at list search for the stock and visualize it with the charts 
document.getElementById("listStocks").addEventListener("click", function (e) {

    // e.target is our targetted element.
    if (e.target && e.target.nodeName == "LI") {

        symbolStock = e.target.id;
    }

    // Clear arrays to use them again 
    var change = true;
    open_array = [];
    close_array = [];
    high_array = [];
    low_array = [];
    volume_array = [];
    date_array = [];

    date_labels = [];
    open_labels = [];
    close_labels = [];
    low_labels = [];
    high_labels = [];
    volume_labels = [];

    date_array_Real = [];
    open_array_Real = [];
    close_array_Real = [];
    low_array_Real = [];
    high_array_Real = [];
    volume_array_Real = [];

    date_labels_Real = [];
    open_labels_Real = [];
    close_labels_Real = [];
    low_labels_Real = [];
    high_labels_Real = [];
    volume_labels_Real = [];

    date_array_Daily = [];
    open_array_Daily = [];
    close_array_Daily = [];
    low_array_Daily = [];
    high_array_Daily = [];
    volume_array_Daily = [];

    date_labels_Daily = [];
    open_labels_Daily = [];
    close_labels_Daily = [];
    low_labels_Daily = [];
    high_labels_Daily = [];
    volume_labels_Daily = [];

    close_labels_1Day_chart = [];
    date_labels_1Day_chart = [];

    date_labels_3Days_chart = [];
    close_labels_3Days_chart = [];

    date_labels_1Month_chart = [];
    close_labels_1Month_chart = [];

    date_labels_4Months_chart = [];
    close_labels_4Months_chart = [];

    date_labels_1Year_chart = [];
    close_labels_1Year_chart = [];

    date_labels_5Years_chart = [];
    close_labels_5Years_chart = [];

    // Reload charts with new Data
    const findSymbol = symbols.indexOf(symbolStock);     // Find the index of the symbol in symbols array 
    var number = findSymbol;    // Index of current symbol in symbols array

    reload();   // Refresh charts with new data 
    setTimer(); // Start counter after clicking a stock at list ---> 1 min

    // Sleep function
    function sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async function reload() {

        // Reload nav-tab container
        $("#nav-tabContent").load(window.location.href + " #nav-tabContent");

        //Wait to refresh  div and then add the new charts
        sleep(1000).then(() => {

            // Go to the first tab after searching stock
            $('.nav-tabs a:first').tab('show');

            // Call the chart functions
            chartIt1Day(symbolStock, change);
            chartIt3Days(symbolStock, change);
            chartIt1Month(symbolStock, change);
            chartIt4Months(symbolStock, change);
            chartIt(symbolStock, change);
            chartIt1Year(symbolStock, change);
            chartIt5Years(symbolStock, change);

            // Add new data at CardBody for the new stock which user clicked at list 
            document.getElementById("holder").innerHTML = define[number];
            document.getElementById("holderSymbol").innerHTML = symbolStock;
        });
    };
});

