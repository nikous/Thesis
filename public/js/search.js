
//Arrays for symbols and definition of stocks 
let id = [];
let symbols = [];
let define = [];

// Search stocks name to csv file
async function searchStock() {

    const response = await fetch('../public/data/data_stock.csv');  // Fetch csv file 
    const data = await response.text(); // Response data 
    const rows = data.split('\n').slice(1); // Split to rows csv file

    // Push each row to an array ,Stock symbol array and Definition of the stock array
    rows.forEach(elt => {

        const row = elt.split(',');
        const id = row[0];
        const def = row[1];
        symbols.push(row[0]);
        define.push(row[1]);
    });

    // Autocomplete function ,Starts when writing on search input
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

// Timer 
function setTimer() {

    var timer = new Timer();

    // Start countdown for 1 minute
    timer.start({ countdown: true, startValues: { seconds: 60 } });

    // Show timer in the page 
    timer.addEventListener('secondsUpdated', function (e) {

        $('#gettingValuesExample .seconds').html(timer.getTimeValues().toString() + " until next search" + "&ensp;");
    });

    // If the countdown doesn't finish disable search btn
    if (timer.getTimeValues().seconds == 00) {

        document.getElementById("suButton").disabled = true;
    }

    // When countdown finish enable search btn 
    timer.addEventListener('targetAchieved', function (e) {

        document.getElementById("suButton").disabled = false;
        $('#gettingValuesExample .seconds').html('');
    });
};

// Execute function when someone clicks in the document
document.getElementById('suButton').addEventListener("click", function (e) {

    var number; // Counter

    setTimer(); // Start Timer when click search---> Countdown 1min 

    // Take stock name from search input
    symbol = document.getElementById('myInput').value;

    // If search doesn't have input make symbol MSFT
    if (symbol == '') {

        symbol = 'IBM'
    }

    // Search where is symbol in the array and take the  number 
    for (var i = 0; i <= symbols.length; i++) {

        if (symbols[i] == symbol) {

            number = i;
        };
    };

    var change = true;  // If change true update chart
    var stock = symbol; // Stocks symbol

    // Reset arrays 
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

    fiveYear_labels = [];
    fiveYearclose_labels = [];

    year_labels = [];
    Yearclose_labels = [];

    // Refresh charts with new Data
    reload();

    // Sleep function
    function sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));
    };

    // Refresh function
    async function reload() {

        // Refresh tabs and stock  without refreshing the page using jquery
        $("#nav-tabContent").load(window.location.href + " #nav-tabContent");
        $("#stock").show();

        // Wait to refresh  div and then add the new charts
        sleep(1000).then(() => {

            // When click search go back to the first Tab
            $('.nav-tabs a:first').tab('show');

            // Refresh charts without refreshing the page 
            chartIt1Day(symbol, change);
            chartIt3Days(symbol, change);
            chartIt1Month(symbol, change);
            chartIt4Months(symbol, change);
            chartIt(symbol, change);
            chartIt1Year(symbol, change);
            chartIt5Years(symbol, change);

            // Refresh cardBody without refreshing the page
            document.getElementById("holder").innerHTML = define[number];
            document.getElementById("holderSymbol").innerHTML = symbol;

        });
    };
}, { passive: true });

// Send stock to database and stops form to reload the page
$('#send').submit(function (e) {

    // Stop form from refreshing page
    e.preventDefault();

    // Send stock to server
    $.ajax({

        url: '/getStock/' + symbol + '',
        dataType: 'text',
        type: 'post',
        cache: false,
    });
});

// When click Follow stock hide btn 
$(document).ready(function () {

    $(document).on('click', '#stock', function () {

        $(this).hide();
        $('.FollowStock').css('min-height', "72px");
    });
});