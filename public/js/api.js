var open_array = [];
var close_array = [];
var high_array = [];
var low_array = [];
var volume_array = [];
var date_array = [];
var symbol = 'MFST';

var date_array_Daily = [];
var open_array_Daily = [];
var close_array_Daily = [];
var low_array_Daily = [];
var high_array_Daily = [];
var volume_array_Daily = [];

var date_array_Real = [];
var open_array_Real = [];
var close_array_Real = [];
var low_array_Real = [];
var high_array_Real = [];
var volume_array_Real = [];

var year_labels = [];
var Yearclose_labels = [];

var fiveYear_labels = [];
var fiveYearclose_labels = [];
//GetData wait Ajax function to retrieve data from Api
async function getData(symbol) {

    if (symbol == null) {
        symbol = 'MSFT';
    }

    // Send stocks name to server and Retrieves data from Api 
    await $.ajax({
        url: '/getApi/' + symbol + '',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            console.log(data);
            const time = "Weekly Time Series";
            const json_length = Object.keys(data[time]).length;
            var length = json_length - 1;
            console.log("Weekly data length:", json_length);

            //const date_array = JSON.stringify(data).match(/\d\d\d\d-\d\d-\d\d/g).slice(1); //find dates from json and put it in array 
            // const symbol = data["Meta Data"]["2. Symbol"];
            // const final_array = make2Darray(6, json_length);

            var today = new Date();
            var yearly = today.getFullYear();
            console.log(yearly);

            //Fill arrays with data from servers json response
            for (var date in data["Weekly Time Series"]) {
                date_array.push(date);
                open_array.push(data[time][date]["1. open"]);
                close_array.push(data[time][date]["4. close"]);
                low_array.push(data[time][date]["3. low"]);
                high_array.push(data[time][date]["2. high"]);
                volume_array.push(data[time][date]["5. volume"]);


            };

            //Fill in reverse arrays to visualize stocks data
            for (var i = 0; i <= length; i++) {
                if (i == 0) {
                    date_labels[0] = date_array[json_length - 1];
                    open_labels[0] = open_array[json_length - 1];
                    close_labels[0] = close_array[json_length - 1];
                    low_labels[0] = low_array[json_length - 1];
                    high_labels[0] = high_array[json_length - 1];
                    volume_labels[0] = volume_array[json_length - 1];

                }
                else {
                    date_labels[i] = date_array[length - i];
                    open_labels[i] = open_array[length - i];
                    close_labels[i] = close_array[length - i];
                    low_labels[i] = low_array[length - i];
                    high_labels[i] = high_array[length - i];
                    volume_labels[i] = volume_array[length - i];

                }
            };

            var jx = 0;
            for (var i = 0; i <= length; i++) {

                if (date_labels[i].includes(yearly)) {
                    year_labels[jx] = date_labels[i];
                    Yearclose_labels[jx] = close_labels[i]
                    jx++;
                }

            };

            for (var i = 0; i < year_labels.length; i++) {
                date_labels_1Year_chart[i] = year_labels[i];
                close_labels_1Year_chart[i] = Yearclose_labels[i];

            }
            // console.log(date_labels_1Year_chart);

            var d = new Date();
            var fiveYears = d.getFullYear() - 4;
            var js = 0;
            for (var j = 5; j >= 0; j--) {
                for (var i = 0; i <= length; i++) {

                    if (date_labels[i].includes(d.getFullYear() - j)) {
                        fiveYear_labels[js] = date_labels[i];
                        fiveYearclose_labels[js] = close_labels[i]
                        js++;
                    }
                }
            };

            for (var i = 0; i < fiveYear_labels.length; i++) {
                date_labels_5Years_chart[i] = fiveYear_labels[i];
                close_labels_5Years_chart[i] = fiveYearclose_labels[i];
            }
        },
        error: function (xhr, status, errorThrown) {
            console.log('Error happens. Try again.');
            console.log(errorThrown);
            getData(symbol);
        }
    });

};

async function getDataDaily(symbol) {
    if (symbol == null) {
        symbol = 'MSFT';
    }
    await $.ajax({
        url: '/getAp/' + symbol + '',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            console.log(data);
            const time = "Time Series (Daily)";
            const symbol = data["Meta Data"]["2. Symbol"];
            const json_length = Object.keys(data[time]).length;
            var length = json_length - 1;

            console.log(symbol);
            //const date_array = JSON.stringify(data).match(/\d\d\d\d-\d\d-\d\d/g).slice(1); //find dates from json and put it in array 
            console.log("Daily data length:", json_length);

            // const final_array = make2Darray(6, json_length);

            //Fill arrays with data from servers json response
            for (var date in data["Time Series (Daily)"]) {
                date_array_Daily.push(date);
                open_array_Daily.push(data[time][date]["1. open"]);
                close_array_Daily.push(data[time][date]["4. close"]);
                low_array_Daily.push(data[time][date]["3. low"]);
                high_array_Daily.push(data[time][date]["2. high"]);
                volume_array_Daily.push(data[time][date]["5. volume"]);
            };
            //Fill in reverse arrays to visualize stocks data
            for (var i = 0; i <= length; i++) {
                if (i == 0) {
                    date_labels_Daily[0] = date_array_Daily[json_length - 1];
                    open_labels_Daily[0] = open_array_Daily[json_length - 1];
                    close_labels_Daily[0] = close_array_Daily[json_length - 1];
                    low_labels_Daily[0] = low_array_Daily[json_length - 1];
                    high_labels_Daily[0] = high_array_Daily[json_length - 1];
                    volume_labels_Daily[0] = volume_array_Daily[json_length - 1];
                }
                else {
                    date_labels_Daily[i] = date_array_Daily[length - i];
                    open_labels_Daily[i] = open_array_Daily[length - i];
                    close_labels_Daily[i] = close_array_Daily[length - i];
                    low_labels_Daily[i] = low_array_Daily[length - i];
                    high_labels_Daily[i] = high_array_Daily[length - i];
                    volume_labels_Daily[i] = volume_array_Daily[length - i];
                }
            };

            var month = new Date();
            var thisMonth = month.getMonth() + 1;

            var jz = 0;
            for (var i = 0; i <= length; i++) {
                if (date_labels_Daily[i].endsWith(thisMonth, 7)) {
                    date_labels_1Month_chart[jz] = date_labels_Daily[i];
                    close_labels_1Month_chart[jz] = close_labels_Daily[i];
                    jz++;
                }
            }

            for (var i = 0; i <= length; i++) {
                date_labels_4Months_chart[i] = date_labels_Daily[i];
                close_labels_4Months_chart[i] = close_labels_Daily[i];

            }

        },
        error: function (xhr, status, errorThrown) {
            console.log('Error happens. Try again.');
            console.log(errorThrown);

        }

    });
}
//ONE DAY
async function getDataReal(symbol) {
    if (symbol == null) {
        symbol = 'MSFT';
    }
    await $.ajax({
        url: '/getAps/' + symbol + '',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {
            console.log(data);
            const time = "Time Series (15min)";
            const symbol = data["Meta Data"]["2. Symbol"];
            const json_length = Object.keys(data[time]).length;
            var length = json_length - 1;
            console.log("Real data length:", json_length);
            console.log(symbol);

            //Fill arrays with data from servers json response
            for (var date in data["Time Series (15min)"]) {
                date_array_Real.push(date);
                open_array_Real.push(data[time][date]["1. open"]);
                close_array_Real.push(data[time][date]["4. close"]);
                low_array_Real.push(data[time][date]["3. low"]);
                high_array_Real.push(data[time][date]["2. high"]);
                volume_array_Real.push(data[time][date]["5. volume"]);
            };
            //Fill in reverse arrays to visualize stocks data
            for (var i = 0; i <= length; i++) {
                if (i == 0) {
                    date_labels_Real[0] = date_array_Real[json_length - 1];
                    open_labels_Real[0] = open_array_Real[json_length - 1];
                    close_labels_Real[0] = close_array_Real[json_length - 1];
                    low_labels_Real[0] = low_array_Real[json_length - 1];
                    high_labels_Real[0] = high_array_Real[json_length - 1];
                    volume_labels_Real[0] = volume_array_Real[json_length - 1];
                }
                else {
                    date_labels_Real[i] = date_array_Real[length - i];
                    open_labels_Real[i] = open_array_Real[length - i];
                    close_labels_Real[i] = close_array_Real[length - i];
                    low_labels_Real[i] = low_array_Real[length - i];
                    high_labels_Real[i] = high_array_Real[length - i];
                    volume_labels_Real[i] = volume_array_Real[length - i];
                }
            };

            var day = new Date();
            var curDay = day.getDate() - 1;

            var ja = 0;
            for (var i = 0; i <= length; i++) {
                if (date_labels_Real[i].endsWith(curDay, 10)) {
                    date_labels_1Day_chart[ja] = date_labels_Real[i];
                    close_labels_1Day_chart[ja] = close_labels_Real[i];
                    ja++;
                }
            }

            var jq = 0;
            for (var j = 3; j >= 0; j--) {
                for (var i = 0; i <= length; i++) {

                    if (date_labels_Real[i].endsWith((curDay - j), 10)) {
                        date_labels_3Days_chart[jq] = date_labels_Real[i];
                        close_labels_3Days_chart[jq] = close_labels_Real[i];
                        jq++;
                    }
                }
            };

        },
        error: function (xhr, status, errorThrown) {
            console.log('Error happens. Try again.');
            console.log(errorThrown);
            getDataReal();
        }
    });
}


// document.getElementById('subButton').addEventListener('click', event => {

//     var alphaVantageApiKey = "Y9UA86U1XKPNI04J"; //fio:

//     const symbol = document.getElementById('userInput').value;
//     var time = "2019-10-10";

//     //const api_url = 'https://api.worldtradingdata.com/api/v1/history?symbol=' + symbol + '&date=2018-10-30&api_token=UXuQYzpm2MAQzDNLCgEcuC9Tna6gx2Tabo9ODNpkCsH9nfaK1BZxnjFUFrrV';

//     //'https://api.worldtradingdata.com/api/v1/stock?symbol=' + symbol + '&api_token=UXuQYzpm2MAQzDNLCgEcuC9Tna6gx2Tabo9ODNpkCsH9nfaK1BZxnjFUFrrV';
//     //'https://www.alphavantage.co/query?function=' + time + '&symbol=' + symbol + '&outputsize=full&apikey=' + alphaVantageApiKey + '';
//     async function getApi() {
//         const api_url = '/getApi/' + symbol + ' ';
//         const response = await fetch(api_url);

//         const data = await response.json();
//         console.log(data);

//     }

//     getApi();

// });

