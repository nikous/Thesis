

var open_array = [];
var close_array = [];
var high_array = [];
var low_array = [];
var volume_array = [];
var date_array = [];
var symbol = 'IBM';

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
var day = [];
var high_labels_1Day = [];
var low_labels_1Day = [];
var colorStock;
var pricetoBook = [];

//GetData wait Ajax function to retrieve data from weekly Api
async function getData(symbol) {

    if (symbol == null) {

        symbol = 'IBM';
    }

    // Send stocks name to server and Retrieves data from Api 
    await $.ajax({

        url: '/getApi/' + symbol + '',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {

            const time = "Weekly Time Series";
            const json_length = Object.keys(data[time]).length; // Length of json 

            var length = json_length - 1;   // Length of arrays
            var today = new Date();         // Current Date
            var counter = 0;                // Counter
            var curMonth = today.getMonth() + 1;  // Current Month 
            var prvMonth = today.getMonth();

            if (curMonth < 10) {    //Add 0 before month if <10 

                curMonth = '0' + curMonth;
            }

            if (prvMonth < 10) {    //Add 0 before month if <10 

                prvMonth = '0' + prvMonth;
            }

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

            // Find index of the current month in current  year ---> END
            var endMonth = date_labels.findIndex(element => element.includes(today.getFullYear()) && element.endsWith(curMonth, 7));

            // If month doesn't exist go to previous month 
            if (endMonth == -1) {

                // Find index of previous month in current year ---> END
                endMonth = date_labels.findIndex(element => element.includes(today.getFullYear()) && element.endsWith(prvMonth, 7));
            }

            // Find index of current month in previous year ---> START
            var startMonth = date_labels.findIndex(element => element.includes(today.getFullYear() - 1) && element.endsWith(curMonth, 7));

            // Fill array from START index to END index 
            for (var i = startMonth; i <= endMonth; i++) {

                year_labels[counter] = date_labels[i];
                Yearclose_labels[counter] = close_labels[i]
                counter++;
            }

            counter = 0 // set counter to 0

            // Fill the array with data for 5 year 
            for (var j = 5; j >= 0; j--) {

                for (var i = 0; i <= length; i++) {

                    //if date includes year(2020) or previous 5 years push to the array
                    if (date_labels[i].includes(today.getFullYear() - j)) {

                        fiveYear_labels[counter] = date_labels[i];
                        fiveYearclose_labels[counter] = close_labels[i]
                        counter++;
                    }
                }
            };
        },

        error: function (xhr, status, errorThrown) {

            console.log('Error happens. Try again.');
            console.log(errorThrown);
        }
    });
};

//GetDataDaily wait Ajax function to retrieve data from daily Api
async function getDataDaily(symbol) {

    if (symbol == null) {

        symbol = 'MSFT';
    }

    // Send stocks name to server and Retrieves data from Api 
    await $.ajax({

        url: '/getAp/' + symbol + '',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {

            const time = "Time Series (Daily)";
            const json_length = Object.keys(data[time]).length; // Length of json 
            var length = json_length - 1;                       // Length of arrays

            var month = new Date();                 // Current date
            var thisMonth = month.getMonth() + 1;   // Current month
            var thisDate = month.getDate();         // Current day
            var prevDate = thisDate - 1;            // Previous day
            var counter = 0;

            if (thisDate < 10) {    //Add 0 before day if <10 

                thisDate = '0' + thisDate;
                prevDate = '0' + prevDate;
            }

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

            // Fill array with data for 1Months
            for (var i = 80; i <= length; i++) {

                date_labels_1Month_chart[counter] = date_labels_Daily[i];
                close_labels_1Month_chart[counter] = close_labels_Daily[i];
                counter++;
            }

            // Fill array with data for 4 Months
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
//GetDataReal wait Ajax function to retrieve data from intraday Api
async function getDataReal(symbol) {

    if (symbol == null) {

        symbol = 'IBM';
    }

    // await $.ajax({

    //     url: '/getApiPriceToBook/' + symbol + '',
    //     dataType: 'json',
    //     type: 'get',
    //     cache: false,
    //     success: function (data) {

    //         const json_lengths = Object.keys(data["historical_data"]).length; // Length of json
    //         var lengths = json_lengths - 1;
    //         for (var date in data["historical_data"]) {
    //             pricetoBook.push(data["historical_data"][date]["value"]);

    //         }

    //     }
    // })

    // Send stocks name to server and Retrieves data from Api 
    await $.ajax({

        url: '/getAps/' + symbol + '',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {

            const time = "Time Series (5min)";
            const json_length = Object.keys(data[time]).length; // Length of json
            var length = json_length - 1;                       // Length of arrays
            var day = new Date();                               // Current date                      
            var curDay = day.getDate() - 1;                     // Current Day
            var numDay = day.getDay();                          // Number of day in the week 
            var numHour = day.getHours();                       // Current Hour
            var curMin = day.getMinutes();                      // Current Minutes
            var counter = 0;                                    // Counter
            var dateStock = 0;                                  // Counter for 3days

            //Fill arrays with data from servers json response
            for (var date in data["Time Series (5min)"]) {

                date_array_Real.push(date);
                open_array_Real.push(data[time][date]["1. open"]);
                close_array_Real.push(data[time][date]["4. close"]);
                low_array_Real.push(data[time][date]["3. low"]);
                high_array_Real.push(data[time][date]["2. high"]);
                volume_array_Real.push(data[time][date]["5. volume"]);
            };

            //Fill in reverse arrays to visualize stock's data
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
            console.log(numDay);
            // If its a day of the week except saturday, sunday and the hour is bigger than 16:35
            if ((numHour == 16 && curMin >= 35) && (numDay != 6 || numDay != 0)) {

                curDay = curDay + 1;
            }

            // If its a day of the week except saturday, sunday and the hour is bigger than 16
            if ((numHour > 16) && (numDay != 6 || numDay != 0)) {

                curDay = curDay + 1;
            }

            // If its Monday and hour<16:35 go to friday
            if (numDay == 1 && numHour < 16) {

                curDay = curDay - 2;
            }

            // If Sunday go to friday
            if (numDay == 0) {

                curDay = curDay - 2;
            }

            if (numDay == 6) {

                curDay = curDay - 1;
            }

            // If date of the month is smaller than 10 add a 0. 3-->03
            if (curDay < 10) {

                curDay = '0' + curDay;
            }

            // Fill array with data for 1 Day
            for (var i = 0; i <= length; i++) {

                if (date_labels_Real[i].endsWith(curDay, 10)) {

                    high_labels_1Day[counter] = high_labels_Real[i];
                    low_labels_1Day[counter] = low_labels_Real[i];
                    date_labels_1Day_chart[counter] = date_labels_Real[i];
                    close_labels_1Day_chart[counter] = close_labels_Real[i];
                    counter++;
                }
            }

            // If it's Monday and hour is bigge than 16:35 so data for Monday,friday thursday
            if (numDay == 1 && numHour >= 16) {

                dateStock = 4;
            }

            // If it's Tuesday and before 16:35 show data for Monday,Friday,Thursday
            else if (numDay == 2 && numHour <= 16) {

                dateStock = 4;
            }

            // If it's Tuesday and after 16:35 show data for Tuesday,Monday,Friday
            else if (numDay == 2 && numHour > 16) {

                dateStock = 4;
            }

            // If it's Wednesday and before 16:35 show data for Tuesday,Monday,Friday
            else if (numDay == 3 && numHour <= 16) {

                dateStock = 4;
            }

            // Else show current day if it's after 16:35 and the previous 2 days if it's before 16:35
            //Show the previous 3 days
            else {

                dateStock = 2;
            }

            counter = 0;  // Set counter to 0

            var aDays;  // current Day - days to find data for the last 2Days

            // Fill array with data for 3 Days 
            for (dateStock; dateStock >= 0; dateStock--) {

                //Add 0 before number if tis <10 1 --> 01
                if (dateStock < 10) {

                    dateStock = '0' + dateStock;
                }

                aDays = curDay - dateStock;

                //Add 0 before number if tis <10 1 --> 01
                if (aDays < 10) {

                    aDays = '0' + aDays;
                }

                for (var i = 0; i <= length; i++) {

                    // If date ends with current date or previous 2 days add to array
                    if (date_labels_Real[i].endsWith((aDays), 10)) {

                        date_labels_3Days_chart[counter] = date_labels_Real[i];
                        close_labels_3Days_chart[counter] = close_labels_Real[i];
                        counter++;
                    }
                }
            };

            var getIndex = 0;   // Counter
            var secIndex = date_array_Real.findIndex(element => element.endsWith("16:00:00")); // End hour
            var openIndex = date_array_Real.findIndex(element => element.endsWith("09:45:00")); // Start hour

            // If end hour is same with index search for the other end hour and track it's place in the array
            if (secIndex == getIndex) {

                for (i = 1; i <= length; i++) {

                    if (date_array_Real[i].endsWith("16:00:00")) {

                        secIndex = i;
                        break;
                    }
                }
            }

            // Function to find max of array 
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

            // Function to find minimum of array 
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

            // Difference for current close and previous close 
            var difference = close_array_Real[getIndex] - close_array_Real[secIndex];

            // Percentage Change in Stock Price
            var percentage = ((difference / close_array_Real[secIndex]) * 100);

            // Add open,high,low,previous close to cardBody at stocks and userpage
            document.getElementById("open").innerHTML = " " + open_array_Real[openIndex];
            document.getElementById("high").innerHTML = " " + high_labels_1Day[indexOfMax(close_labels_1Day_chart)];
            document.getElementById("low").innerHTML = " " + low_labels_1Day[indexOfMin(close_labels_1Day_chart)];
            document.getElementById("PrevClose").innerHTML = " " + close_array_Real[secIndex];
            // document.getElementById("PriceToBook").innerHTML = " " + pricetoBook[0];


            // If Percentage Change is increased add + symbol ,green color and up arrow
            if (close_array_Real[getIndex] >= close_array_Real[secIndex]) {

                document.getElementById("diference").innerHTML = " +" + difference.toFixed(2) + "&ensp;(" + percentage.toFixed(2) + "%)&nbsp;" + "&#8593;";
                document.getElementById("diference").style.color = "green";
                colorStock = "green";
            }

            // If Percentage Change is decreased red color and down arrow
            else {

                document.getElementById("diference").innerHTML = difference.toFixed(2) + "&ensp;(" + percentage.toFixed(2) + "%)&nbsp;" + "&darr;";
                document.getElementById("diference").style.color = "red";
                colorStock = "red";
            }
        },

        error: function (xhr, status, errorThrown) {

            console.log('Error happens. Try again.');
            console.log(errorThrown);
        }
    });
}

// async function getDataPriceToBook(symbol) {

//     if (symbol == null) {

//         symbol = 'MSFT';
//     }

//     // Send stocks name to server and Retrieves data from Api 

// }