let open_array = [];
let close_array = [];
let high_array = [];
let low_array = [];
let volume_array = [];
let date_array = [];
let symbol = 'MFST';

let date_array_Realtime = [];
let open_array_Realtime = [];
let close_array_Realtime = [];
let low_array_Realtime = [];
let high_array_Realtime = [];
let volume_array_Realtime = [];

let date_array_Real = [];
let open_array_Real = [];
let close_array_Real = [];
let low_array_Real = [];
let high_array_Real = [];
let volume_array_Real = [];

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
            const time = "Weekly Time Series";
            const json_length = Object.keys(data[time]).length;
            var length = json_length - 1;

            //const date_array = JSON.stringify(data).match(/\d\d\d\d-\d\d-\d\d/g).slice(1); //find dates from json and put it in array 
            // const symbol = data["Meta Data"]["2. Symbol"];
            // const final_array = make2Darray(6, json_length);

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
        }
    });



};

async function getDataRealtime(symbol) {
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
            console.log(data["Time Series (Daily)"]);
            console.log(symbol);
            //const date_array = JSON.stringify(data).match(/\d\d\d\d-\d\d-\d\d/g).slice(1); //find dates from json and put it in array 

            // const final_array = make2Darray(6, json_length);

            //Fill arrays with data from servers json response
            for (var date in data["Time Series (Daily)"]) {
                date_array_Realtime.push(date);
                open_array_Realtime.push(data[time][date]["1. open"]);
                close_array_Realtime.push(data[time][date]["4. close"]);
                low_array_Realtime.push(data[time][date]["3. low"]);
                high_array_Realtime.push(data[time][date]["2. high"]);
                volume_array_Realtime.push(data[time][date]["5. volume"]);
            };
            //Fill in reverse arrays to visualize stocks data
            for (var i = 0; i <= length; i++) {
                if (i == 0) {
                    date_labels_Realtime[0] = date_array_Realtime[json_length - 1];
                    open_labels_Realtime[0] = open_array_Realtime[json_length - 1];
                    close_labels_Realtime[0] = close_array_Realtime[json_length - 1];
                    low_labels_Realtime[0] = low_array_Realtime[json_length - 1];
                    high_labels_Realtime[0] = high_array_Realtime[json_length - 1];
                    volume_labels_Realtime[0] = volume_array_Realtime[json_length - 1];
                }
                else {
                    date_labels_Realtime[i] = date_array_Realtime[length - i];
                    open_labels_Realtime[i] = open_array_Realtime[length - i];
                    close_labels_Realtime[i] = close_array_Realtime[length - i];
                    low_labels_Realtime[i] = low_array_Realtime[length - i];
                    high_labels_Realtime[i] = high_array_Realtime[length - i];
                    volume_labels_Realtime[i] = volume_array_Realtime[length - i];
                }
            };
        }
    });
}

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
            const time = "Time Series (5min)";
            const symbol = data["Meta Data"]["2. Symbol"];
            const json_length = Object.keys(data[time]).length;
            var length = json_length - 1;
            console.log(data["Time Series (5min)"]);
            console.log(symbol);
            //const date_array = JSON.stringify(data).match(/\d\d\d\d-\d\d-\d\d/g).slice(1); //find dates from json and put it in array 

            // const final_array = make2Darray(6, json_length);

            //Fill arrays with data from servers json response
            for (var date in data["Time Series (5min)"]) {
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

