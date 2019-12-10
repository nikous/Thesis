
let id = [];
let symbols = [];
let define = [];

async function searchStock() {
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

    autocomplete(document.getElementById("myInput"), symbols, rows, define);
};


function autocomplete(inp, arr, arr1, arr2) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, c, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();

        if (!val) { return false; }

        currentFocus = -1;

        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");

        a.setAttribute("id", this.id + "autocomplete-list");

        a.setAttribute("class", "autocomplete-items");

        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);

        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {

            /*check if the item starts with the same letters as the text field value:*/

            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {



                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");

                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";

                b.innerHTML += arr1[i].substr(val.length);

                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {

                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;

                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();

                });

                a.appendChild(b);
            }

            else if (arr2[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

                /*create a DIV element for each matching element:*/
                c = document.createElement("DIV");

                /*make the matching letters bold:*/
                c.innerHTML = "<strong>" + arr2[i].substr(0, val.length) + "</strong>";

                c.innerHTML += arr2[i].substr(val.length);

                /*insert a input field that will hold the current array item's value:*/
                c.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                /*execute a function when someone clicks on the item value (DIV element):*/
                c.addEventListener("click", function (e) {

                    /*insert the value for the autocomplete text field:*/

                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/

                    closeAllLists();
                });

                a.appendChild(c);
            }

        }

    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {

        var x = document.getElementById(this.id + "autocomplete-list");

        if (x) x = x.getElementsByTagName("div");

        if (e.keyCode == 40) {

            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;

            /*and and make the current item more visible:*/
            addActive(x);

        } else if (e.keyCode == 38) { //up

            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;

            /*and and make the current item more visible:*/
            addActive(x);

        } else if (e.keyCode == 13) {

            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();

            if (currentFocus > -1) {

                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }

    });
    function addActive(x) {

        /*a function to classify an item as "active":*/
        if (!x) return false;

        /*start by removing the "active" class on all items:*/
        removeActive(x);

        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);

        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");

    }
    function removeActive(x) {

        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {

            x[i].classList.remove("autocomplete-active");

        }
    }
    function closeAllLists(elmnt) {

        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");

        for (var i = 0; i < x.length; i++) {

            if (elmnt != x[i] && elmnt != inp) {

                x[i].parentNode.removeChild(x[i]);
            }

        }

    }

};
function setTimer() {
    var timer = new Timer();
    timer.start({ countdown: true, startValues: { seconds: 60 } });
    timer.addEventListener('secondsUpdated', function (e) {
        $('#gettingValuesExample .seconds').html(timer.getTimeValues().toString() + " until next search" + "&ensp;");
    });

    if (timer.getTimeValues().seconds == 00) {
        document.getElementById("suButton").disabled = true;
    }
    timer.addEventListener('targetAchieved', function (e) {
        document.getElementById("suButton").disabled = false;
        $('#gettingValuesExample .seconds').html('');
    });

};



/*execute function when someone clicks in the document:*/
document.getElementById('suButton').addEventListener("click", function (e) {
    var number;

    setTimer();
    //Take stock name from search input
    symbol = document.getElementById('myInput').value;
    console.log(symbol);
    ;
    for (var i = 0; i <= symbols.length; i++) {

        if (symbols[i] == symbol) {

            number = i;
        };
    };

    //if change true update chart
    var change = true;
    var stock = symbol;

    //Reset arrays 
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
    reload();

    //sleep function
    function sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    };

    async function reload() {
        $('.nav-tabs a:first').tab('show');
        $("#nav-tabContent").load(window.location.href + " #nav-tabContent");


        //Wait to refresh  div and then add the new charts
        sleep(1000).then(() => {

            chartIt1Day(symbol, change);
            chartIt3Days(symbol, change);
            chartIt1Month(symbol, change);
            chartIt4Months(symbol, change);
            chartIt(symbol, change);
            chartIt1Year(symbol, change);
            chartIt5Years(symbol, change);

            document.getElementById("holder").innerHTML = define[number];
            document.getElementById("holderSymbol").innerHTML = symbol;



        });

    };


    // $("#cardBody").attr("value", function (i, origValue) { return stock; })
}, { passive: true });

//send stock to database and stops form to reload the page
$('#send').submit(function (e) {
    e.preventDefault();
    $.ajax({
        url: '/getStock/' + symbol + '',
        dataType: 'text',
        type: 'post',
        cache: false,
    });
});