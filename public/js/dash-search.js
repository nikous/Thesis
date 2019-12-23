let followed_stocks = [];
let id = [];
let symbols = [];
let define = [];
var symbolStock;

function setTimer() {

    var timer = new Timer();

    timer.start({ countdown: true, startValues: { seconds: 60 } });
    timer.addEventListener('secondsUpdated', function (e) {

        $('#gettingValuesExample .seconds').html(timer.getTimeValues().toString() + " until next search" + "&ensp;");
    });

    if (timer.getTimeValues().seconds == 00) {

        document.getElementById("listStocks").disabled = true;
    }

    timer.addEventListener('targetAchieved', function (e) {

        document.getElementById("listStocks").disabled = false;
        $('#gettingValuesExample .seconds').html('');
    });
};

async function DefineStock() {

    const response = await fetch('../public/data/data_stock.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);

    rows.forEach(elt => {

        const row = elt.split(',');
        const id = row[0];
        const def = row[1];

        symbols.push(row[0]);
        define.push(row[1]);
    });
}

$.ajax({

    url: '/getUser',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function (data) {

        var place;

        for (var Userstocks in data["stock"]) {

            if (data["stock"][Userstocks] != "null") {

                followed_stocks.push(data["stock"][Userstocks]);
            }
        }
        for (var i = 0; i <= symbols.length; i++) {

            if (symbols[i] == followed_stocks[0]) {

                place = i;
            };
        };

        var change = true;

        document.getElementById("holder").innerHTML = define[place];
        document.getElementById("holderSymbol").innerHTML = followed_stocks[0];

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

        console.log(followed_stocks);
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



document.getElementById("listStocks").addEventListener("click", function (e) {

    // e.target is our targetted element.
    // try doing console.log(e.target.nodeName), it will result LI
    if (e.target && e.target.nodeName == "LI") {

        symbolStock = e.target.id;
    }

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

    //Reload charts with new Data
    const findSymbol = symbols.indexOf(symbolStock);
    var number = findSymbol;

    reload();
    setTimer();

    //sleep function
    function sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async function reload() {

        $("#nav-tabContent").load(window.location.href + " #nav-tabContent");
        $("#stock").show();

        //Wait to refresh  div and then add the new charts
        sleep(1000).then(() => {

            $('.nav-tabs a:first').tab('show');
            console.log(symbolStock);

            chartIt1Day(symbolStock, change);
            chartIt3Days(symbolStock, change);
            chartIt1Month(symbolStock, change);
            chartIt4Months(symbolStock, change);
            chartIt(symbolStock, change);
            chartIt1Year(symbolStock, change);
            chartIt5Years(symbolStock, change);


            document.getElementById("holder").innerHTML = define[number];
            document.getElementById("holderSymbol").innerHTML = symbolStock;
        });
    };
});

