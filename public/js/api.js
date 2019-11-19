

let open_array = [];
let close_array = [];
let high_array = [];
let low_array = [];
let volume_array = [];
let date_array = [];
// let symbol = 'MFST';

async function getData(symbol) {

    console.log("2");

    if (symbol == null) {
        symbol = 'MSFT';
    }

    await $.ajax({

        url: '/getApi/' + symbol + '',
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (data) {

            console.log(symbol);
            const time = "Time Series (Daily)";
            const json_length = Object.keys(data[time]).length;
            var length = json_length - 1;

            //const date_array = JSON.stringify(data).match(/\d\d\d\d-\d\d-\d\d/g).slice(1); //find dates from json and put it in array 
            // const symbol = data["Meta Data"]["2. Symbol"];
            // const final_array = make2Darray(6, json_length);

            for (var date in data["Time Series (Daily)"]) {
                date_array.push(date);
                open_array.push(data[time][date]["1. open"]);
                close_array.push(data[time][date]["4. close"]);
                low_array.push(data[time][date]["3. low"]);
                high_array.push(data[time][date]["2. high"]);
                volume_array.push(data[time][date]["5. volume"]);

            };

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

            // console.log("Eginan oi pinakes gia kathe stoixeio tou json. Example: close_array[", json_length - 1, "]=", close_array[json_length - 1]);
            // console.log("Egine o pinakas 2D pou perilamvanei olous tous allous pinakes. Example: date_array[", json_length - 1, "]=", date_array[json_length - 1]);
            // console.log(date_array);
            //console.log(close_array);
            //console.log(close_labels);

        }

    });




};







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

