
$("#navbarDropdownMenuLink").click(function () {
    console.log("yes");
    $("#dot").remove();

})

$(document).ready(function () {
    $("a").click(function (event) {
        if (event.target.className == "closeSpan") {
            console.log(event.target.id);
            var target = 0;
            $.ajax({

                url: '/deleteNotif/' + target + '',
                dataType: 'text',
                type: 'post',
                cache: false,
            });
        }
    });
});



var minutes = 1, the_interval = minutes * 60 * 1000; //Define in how many minutes you want interval to run 
// Loop running every 5 minutes and call Apis
setInterval(function () {

    $("#navBarRefresh").load(window.location.href + " #navBarRefresh");

}, the_interval);