

var open_array = [];
var close_array = [];
var high_array = [];
var low_array = [];
var volume_array = [];
var date_array = [];
var symbol = 'MSFT';

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

var high_labels_1Day = [];
var low_labels_1Day = [];
var day = [];
var colorStock;

var today = new Date();              // Date
var yearly = today.getFullYear();    // Current Year 
var dAte = new Date();               // Current Day
var thisMonth = dAte.getMonth() + 1; //Current Month
var thisDate = dAte.getDate();       //Current Date
var prevMonths = thisMonth - 1;      //Previous Month
var prevDate = thisDate - 1;         //Previous Date
var curDay = dAte.getDate() - 1;
var numDay = dAte.getDay();
var numHour = dAte.getHours();

var Years = 0; // Counter
var CounterDay = 0; // Counter

//Change date from d to dd 
if (thisDate < 10) {

    thisDate = '0' + thisDate;
    prevDate = '0' + prevDate;

}

// Function getData wait Ajax function to retrieve data from Api
async function getData(symbol) {

    if (symbol == null) {

        symbol = 'MSFT';
    }

    // Send stocks name to server and waits to Retrieve data from Api 
    await $.ajax({

        url: '/getApi/' + symbol + '',    // Stocks symbol
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {

            const time = "Weekly Time Series";
            const json_length = Object.keys(data[time]).length;    // Length of json from Api call
            var length = json_length - 1;   // Length of the arrays

            // Fill arrays with data from servers json response
            for (var date in data["Weekly Time Series"]) {

                date_array.push(date);
                open_array.push(data[time][date]["1. open"]);
                close_array.push(data[time][date]["4. close"]);
                low_array.push(data[time][date]["3. low"]);
                high_array.push(data[time][date]["2. high"]);
                volume_array.push(data[time][date]["5. volume"]);
            };

            // Fill in reverse arrays 
            date_labels = date_array.reverse();
            open_labels = open_array.reverse();
            close_labels = close_array.reverse();
            low_labels = low_array.reverse();
            high_labels = high_array.reverse();
            volume_labels = volume_array.reverse();

            // Find current year in json andd put them to an array 
            for (var i = 0; i <= length; i++) { // problem

                if (date_labels[i].includes(yearly)) {

                    year_labels[Years] = date_labels[i];
                    Yearclose_labels[Years] = close_labels[i]
                    Years++;
                }
            };

            Years = 0;

            // Find last 5 years from json and put it to an array
            for (var j = 5; j >= 0; j--) {

                for (var i = 0; i <= length; i++) {

                    if (date_labels[i].includes(dAte.getFullYear() - j)) { // If includes year(2020-2015) push it to the array

                        fiveYear_labels[Years] = date_labels[i];
                        fiveYearclose_labels[Years] = close_labels[i]
                        Years++;
                    }
                }
            };
        },

        // If problem with Api call throw error
        error: function (xhr, status, errorThrown) {

            console.log('Error happens. Try again.');
            console.log(errorThrown);
        }
    });
};

//Function getDataDaily wait Ajax function to retrieve data from Api
async function getDataDaily(symbol) {

    if (symbol == null) {

        symbol = 'MSFT';
    }

    // Send stocks name to server and waits to Retrieve data from Api 
    await $.ajax({

        url: '/getAp/' + symbol + '',    // Stocks symbol
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {

            const time = "Time Series (Daily)";
            const symbol = data["Meta Data"]["2. Symbol"];
            const json_length = Object.keys(data[time]).length; // Length of json from Api call
            var length = json_length - 1;   // Length of the arrays

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
            date_labels_Daily = date_array_Daily.reverse();
            open_labels_Daily = open_array_Daily.reverse();
            close_labels_Daily = close_array_Daily.reverse();
            low_labels_Daily = low_array_Daily.reverse();
            high_labels_Daily = high_array_Daily.reverse();
            volume_labels_Daily = volume_array_Daily.reverse();

            CounterDay = 0;
            for (var i = 80; i <= length; i++) {

                date_labels_1Month_chart[CounterDay] = date_labels_Daily[i];
                close_labels_1Month_chart[CounterDay] = close_labels_Daily[i];
                CounterDay++;
            }

            for (var i = 0; i <= length; i++) {

                date_labels_4Months_chart[i] = date_labels_Daily[i];
                close_labels_4Months_chart[i] = close_labels_Daily[i];
            }

        },

        // If problem with Api call throw error
        error: function (xhr, status, errorThrown) {

            console.log('Error happens. Try again.');
            console.log(errorThrown);
        }
    });
}

//Function getDataReal wait Ajax function to retrieve data from Api
async function getDataReal(symbol) {

    if (symbol == null) {

        symbol = 'MSFT';
    }

    // Send stocks name to server and waits to Retrieve data from Api 
    await $.ajax({

        url: '/getAps/' + symbol + '',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {

            const time = "Time Series (5min)";
            const json_length = Object.keys(data[time]).length; // Length of json from Api call
            var length = json_length - 1;   // Length of the arrays

            //Fill arrays with data from servers json response
            for (var date in data["Time Series (5min)"]) {

                date_array_Real.push(date);
                open_array_Real.push(data[time][date]["1. open"]);
                close_array_Real.push(data[time][date]["4. close"]);
                low_array_Real.push(data[time][date]["3. low"]);
                high_array_Real.push(data[time][date]["2. high"]);
                volume_array_Real.push(data[time][date]["5. volume"]);
            };

            // Fill in reverse arrays to visualize stocks data
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

            // If its after 4 and not Sunday or Saturday change numday 
            if (numHour >= 16 && numDay != 6 && numDay != 0) {

                curDay = curDay + 1;
            }

            // If its Monday before Stock Market opens go back to Friday
            if (numDay == 1 && numHour <= 16) {

                curDay = curDay - 2;
            }

            // If its Sunday go back to Friday
            if (numDay == 0) {

                curDay = curDay - 1;
            }

            // If its Saturday go to Friday
            if (numDay == 6) {

                curDay = day.getDate();
            }

            //If curDay is smaller than 10 add 0 next to number
            if (curDay < 10) {

                curDay = '0' + curDay;
            }

            // If date from json ends with the current date choose them and pass them to the chart arrays
            for (var i = 0; i <= length; i++) {

                if (date_labels_Real[i].endsWith(curDay, 10)) {

                    high_labels_1Day[CounterDay] = high_labels_Real[i];
                    low_labels_1Day[CounterDay] = low_labels_Real[i];
                    date_labels_1Day_chart[CounterDay] = date_labels_Real[i];
                    close_labels_1Day_chart[CounterDay] = close_labels_Real[i];
                    CounterDay++;
                }
            }

            var _day = 0; // Counter 
            var dateStock; // Counter for 3 Days

            // If it sunday go back to thursay
            if (numDay == 1 && numHour > 16) {

                dateStock = 4;
            }

            // If its Monday and before opens StockMarket go back to thursday
            else if (numDay == 2 && numHour <= 16) {

                dateStock = 4;
            }

            // If its Monday and StockMarket opens go back thursday
            else if (numDay == 2 && numHour > 16) {

                dateStock = 5;
            }

            // If its Thueday and stockMarket is closed go back to thursday
            else if (numDay == 3 && numHour <= 16) {

                dateStock = 4;
            }

            // If its Thuesday and StockMarket opens go back friday 
            else if (numDay == 3 && numHour > 16) {

                dateStock = 5;
            }

            // If its thursday and stockMarket is closed go back to friday
            else if (numDay == 4 && numHour <= 16) {

                dateStock = 5;
            }

            // If its thursday and StockMarket opens go back Monday
            else if (numDay == 4 && numHour > 16) {

                dateStock = 3;
            }

            // Else go back two days
            else {

                dateStock = 2;
            }

            // Find data from the array for the 3 days
            for (dateStock; dateStock >= 0; dateStock--) {

                for (var i = 0; i <= length; i++) {

                    if (date_labels_Real[i].endsWith((curDay - dateStock), 10)) {

                        date_labels_3Days_chart[_day] = date_labels_Real[i];
                        close_labels_3Days_chart[_day] = close_labels_Real[i];
                        _day++;
                    }
                }
            };

            var getIndex = 0;
            var secIndex = date_array_Real.findIndex(element => element.endsWith("16:00:00")); // End
            var openIndex = date_array_Real.findIndex(element => element.endsWith("09:45:00")); // Start

            // If end = 0 seach where is the time Stock Market Close
            if (secIndex == getIndex) {

                for (i = 1; i <= length; i++) {

                    if (date_array_Real[i].endsWith("16:00:00")) {

                        secIndex = i;

                        break;
                    }
                }
            }

            // Find max value of Close
            function indexOfMax(arr) {

                if (arr.length === 0) {

                    return -1;
                }

                var max = arr[0];
                var maxIndex = 0;

                for (var i = 1; i < arr.length; i++) {

                    if (arr[i] > max) {

                        maxIndex = i;
                        max = arr[i];
                    }
                }

                return maxIndex;
            }

            // Find minimum value of close
            function indexOfMin(arr) {

                if (arr.length === 0) {

                    return -1;
                }

                var min = arr[0];
                var minIndex = 0;

                for (var i = 1; i < arr.length; i++) {

                    if (arr[i] < min) {

                        minIndex = i;
                        min = arr[i];
                    }
                }

                return minIndex;
            }

            // Find Percentage Change in Stock Price
            var difference = close_array_Real[getIndex] - close_array_Real[secIndex];
            var percentage = ((difference / close_array_Real[secIndex]) * 100);

            // Add values to elements open,high,low,Previous Close on ejs Stocks page
            document.getElementById("open").innerHTML = " " + open_array_Real[openIndex];
            document.getElementById("high").innerHTML = " " + high_labels_1Day[indexOfMax(close_labels_1Day_chart)];
            document.getElementById("low").innerHTML = " " + low_labels_1Day[indexOfMin(close_labels_1Day_chart)];
            document.getElementById("PrevClose").innerHTML = " " + close_array_Real[secIndex];

            // If Stocks value increased add + symbol and add green color to chart and text
            if (close_array_Real[getIndex] >= close_array_Real[secIndex]) {

                document.getElementById("diference").innerHTML = " +" + difference.toFixed(2) + "&ensp;(" + percentage.toFixed(2) + "%)&nbsp;" + "&#8593;";
                document.getElementById("diference").style.color = "green";
                colorStock = "green";
            }

            // If Stocks value decreased add red color to chart and text
            else {

                document.getElementById("diference").innerHTML = difference.toFixed(2) + "&ensp;(" + percentage.toFixed(2) + "%)&nbsp;" + "&darr;";
                document.getElementById("diference").style.color = "red";
                colorStock = "red";
            }
        },

        // If problem with Api call throw error
        error: function (xhr, status, errorThrown) {

            console.log('Error happens. Try again.');
            console.log(errorThrown);
        }
    });
}

