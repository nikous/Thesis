

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
var day = [];
var high_labels_1Day = [];
var low_labels_1Day = [];
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

            //const date_array = JSON.stringify(data).match(/\d\d\d\d-\d\d-\d\d/g).slice(1); //find dates from json and put it in array 
            // const symbol = data["Meta Data"]["2. Symbol"];
            // const final_array = make2Darray(6, json_length);

            var today = new Date();
            var yearly = today.getFullYear();

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

            const time = "Time Series (Daily)";
            const symbol = data["Meta Data"]["2. Symbol"];
            const json_length = Object.keys(data[time]).length;
            var length = json_length - 1;

            var month = new Date();
            var thisMonth = month.getMonth() + 1;
            var thisDate = month.getDate();
            var prevMonths = thisMonth - 1;
            var prevDate = thisDate - 1;

            if (thisDate < 10) {

                thisDate = '0' + thisDate;
                prevDate = '0' + prevDate;

            }

            // let myReg = new RegExp("-" + thisMonth + "-" + thisDate, "g");
            // let secReg = new RegExp("-" + prevMonths + "-" + prevDate, "g");
            // day = JSON.stringify(data).match(myReg); //find dates from json and put it in array 
            // var start = data.indexOf(day);

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

            var jz = 0;
            for (var i = 80; i <= length; i++) {

                date_labels_1Month_chart[jz] = date_labels_Daily[i];
                close_labels_1Month_chart[jz] = close_labels_Daily[i];
                jz++;
            }

            for (var i = 0; i <= length; i++) {

                date_labels_4Months_chart[i] = date_labels_Daily[i];
                close_labels_4Months_chart[i] = close_labels_Daily[i];

            }

        },

        error: function (xhr, status, errorThrown) {
            console.log('Error happens. Try again.');
            console.log(errorThrown);
            getDataDaily();
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

            const time = "Time Series (15min)";
            const symbol = data["Meta Data"]["2. Symbol"];
            const json_length = Object.keys(data[time]).length;
            var length = json_length - 1;

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
            var numDay = day.getDay();
            var numHour = day.getHours();
            if (numHour > 16 && numDay != 6 && numDay != 7) {
                curDay = curDay + 1;

            }
            if (numDay == 1 && numHour <= 16) {
                curDay = curDay - 2;

            }
            if (numDay == 7) {
                curDay = curDay - 1;

            }

            if (curDay < 10) {

                curDay = '0' + curDay;


            }



            var ja = 0;

            for (var i = 0; i <= length; i++) {

                if (date_labels_Real[i].endsWith(curDay, 10)) {
                    high_labels_1Day[ja] = high_labels_Real[i];
                    low_labels_1Day[ja] = low_labels_Real[i];
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

            var getIndex = 0;
            var secIndex = date_array_Real.findIndex(element => element.endsWith("16:00:00"));
            var openIndex = date_array_Real.findIndex(element => element.endsWith("09:45:00"));
            if (secIndex == getIndex) {
                for (i = 1; i <= length; i++) {
                    if (date_array_Real[i].endsWith("16:00:00")) {
                        secIndex = i;
                        break;
                    }
                }
            }

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


            var difference = close_array_Real[getIndex] - close_array_Real[secIndex];
            var percentage = ((difference / close_array_Real[secIndex]) * 100);

            document.getElementById("open").innerHTML = " " + open_array_Real[openIndex];
            document.getElementById("high").innerHTML = " " + high_labels_1Day[indexOfMax(close_labels_1Day_chart)];
            document.getElementById("low").innerHTML = " " + low_labels_1Day[indexOfMin(close_labels_1Day_chart)];
            document.getElementById("PrevClose").innerHTML = " " + close_array_Real[secIndex];

            if (close_array_Real[getIndex] >= close_array_Real[secIndex]) {
                document.getElementById("diference").innerHTML = " +" + difference.toFixed(2) + "&ensp;(" + percentage.toFixed(2) + "%)&nbsp;" + "&#8593;";
                document.getElementById("diference").style.color = "green";
            }
            else {
                document.getElementById("diference").innerHTML = difference.toFixed(2) + "&ensp;(" + percentage.toFixed(2) + "%)&nbsp;" + "&darr;";
                document.getElementById("diference").style.color = "red";
            }





        },

        error: function (xhr, status, errorThrown) {

            console.log('Error happens. Try again.');
            console.log(errorThrown);
            getDataReal();

        }
    });
}

