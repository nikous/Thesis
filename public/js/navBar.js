
document.getElementById("navbarDropdownMenuLink").addEventListener("click", function (e) {

    console.log("yes");
    $("#dot").removeClass("show");
    const target = 0;
    $.ajax({

        url: '/deleteDot/' + target + '',
        dataType: 'number',
        type: 'post',
        cache: false,
        timeout: 1000000,
        success: function (result) {
            console.log(result);
            if (result.status == 200) {
                console.log("Status:200");
            }
        },
        error: function (result) {
            console.log(result);
        }
    });


})

$(document).ready(function () {
    $("span").click(function (event) {
        if (event.target.className == "closeSpans") {
            //             console.log(event.target.id);
            //             var target = 0;
            //             $.ajax({

            //                 url: '/deleteNotif/' + target + '',
            //                 dataType: 'text',
            //                 type: 'post',
            //                 cache: false,
            //             });
            //         }
            //     });
            // });

            // document.querySelector('.close').click(() => {

            event.stopPropagation();
            var target = $(this).closest('span').attr('id');
            var parent = $(this).closest('button').parent().attr('id');
            console.log(target);
            console.log(parent);
            $(this).closest('button').parent().fadeTo(1000, 0.01, function () {
                $(this).slideUp(150, function () {
                    $(this).remove();
                });
            });

            $.ajax({

                url: '/deleteNotif/' + target + '',
                dataType: 'number',
                type: 'post',
                cache: false,
                timeout: 1000000,
                success: function (result) {
                    console.log(result);
                    if (result.status == 200) {
                        console.log("Status:200");
                    }
                },
                error: function (result) {
                    console.log(result);
                }
            });
        }
    });
});


// $(document).ready(function () {
//     $("a").click(function (event) {
//         if (event.target.className == "closeSpan") {
//             event.stopPropagation();
//             console.log(event.target.id);

//             $.ajax({

//                 url: '/deleteNotif/',
//                 dataType: 'number',
//                 type: 'post',
//                 cache: false,
//                 timeout: 1000000,
//                 success: function (result) {
//                     console.log(result);
//                     if (result.status == 200) {
//                         console.log("Status:200");
//                     }
//                 },
//                 error: function (result) {
//                     console.log(result);
//                 }
//             });
//         }
//     });
// });






var socket = io();
socket.on('new-notification', async function (msg) {

    // $('#messages').append($('<li>').text(msg["updateDescription"]["updatedFields"]["notification"]));

    let count;
    let express = false;
    console.log(msg);

    // const an = 1;
    // await $.ajax({

    //     url: '/getDBdata/' + an + '',
    //     dataType: 'json',
    //     type: 'get',
    //     cache: false,
    //     success: function (result) {


    var x = document.getElementsByClassName("notification-text");
    console.log("To length to array div einai", x.length);
    if (x.length == 0) {
        check();
    }
    else {
        await checka();
        async function checka() {
            await search();
            console.log("Checka", express);
            if (express != true) {
                check();
            }

        }
        async function find() {

            for (var i = 0; i <= 100; i++) {
                if (Array.isArray(msg["updateDescription"]["updatedFields"]["notification"]) == true) {
                    count = 10000;
                    console.log("TO i sth find einai sto array", count)
                    break;
                }
                else {
                    if ((msg["updateDescription"]["updatedFields"]['notification.' + i + ''] != undefined) && (msg["updateDescription"]["updatedFields"]['notification.' + i + ''] != "")) {

                        count = i;
                        console.log("TO i sth find einai", count)
                    }
                }
            }
        }
        async function search() {
            await find();

            console.log("TO x sth search einai", count)

            if (count == 10000) {
                express = true;
            }
            else {
                for (var i = 0; i <= x.length; x++) {
                    if (x[i].innerText == msg["updateDescription"]["updatedFields"]['notification.' + count + '']) {
                        express = true;
                    }

                }
            }
        }
        // if (msg["updateDescription"]["updatedFields"].length == 1) {


    }


    function check() {
        for (var i = 0; i <= 100; i++) {
            if ((msg["updateDescription"]["updatedFields"]["notification"] != undefined) && (msg["updateDescription"]["updatedFields"]["notification"] != "")) {
                if (msg["updateDescription"]["removedFields"].length == 0 && Array.isArray(msg["updateDescription"]["updatedFields"]["notification"]) == true) {

                    if (msg["fullDocument"]["notification"].length > 1) {
                        $("#dot").addClass("show");
                        console.log("1");
                        var element = document.createElement("a");
                        var text = document.createElement("p");
                        var btn = document.createElement("button");
                        var span = document.createElement("span");
                        var Deletarget = 0;

                        span.className = "closeSpan";
                        btn.className = "close";
                        text.className = "notification-text";
                        span.innerHTML = "&times;";
                        text.innerHTML = msg["updateDescription"]["updatedFields"]['notification'];
                        element.className = "dropdown-item notification";

                        element.appendChild(btn);
                        btn.appendChild(span);
                        element.appendChild(text);
                        document.getElementById('droDownMenu').appendChild(element);

                        element.id = "notifications"
                        btn.id = "notification";
                        btn.onclick = function (e) {
                            event.stopPropagation();
                            var target = $(this).closest('button').attr('id');
                            console.log(target);
                            $(this).parent().fadeTo(1000, 0.01, function () {
                                $(this).slideUp(150, function () {
                                    $(this).remove();
                                });
                            });

                            $.ajax({

                                url: '/deleteNotif/' + Deletarget + '',
                                dataType: 'number',
                                type: 'post',
                                cache: false,
                                timeout: 1000000,
                                success: function (result) {
                                    console.log(result);
                                    if (result.status == 200) {
                                        console.log("Status:200");
                                    }
                                },
                                error: function (result) {
                                    console.log(result);
                                }
                            });
                        }
                    }
                }
                break;

            }
            else if ((msg["updateDescription"]["updatedFields"]['notification.' + i + ''] != undefined) && (msg["updateDescription"]["updatedFields"]['notification.' + i + ''] != "")) {
                if (msg["updateDescription"]["removedFields"].length == 0 && Array.isArray(msg["updateDescription"]["updatedFields"]["notification"]) == false) {
                    $("#dot").addClass("show");
                    var element = document.createElement("a");
                    var text = document.createElement("p");
                    var btn = document.createElement("button");
                    var span = document.createElement("span");
                    var Deletarget = i;
                    console.log(Deletarget);
                    span.className = "closeSpan";
                    btn.className = "close";
                    text.className = "notification-text";
                    span.innerHTML = "&times;";
                    text.innerHTML = msg["updateDescription"]["updatedFields"]['notification.' + i + ''];
                    element.className = "dropdown-item notification";

                    element.appendChild(btn);
                    btn.appendChild(span);
                    element.appendChild(text);
                    document.getElementById('droDownMenu').appendChild(element);
                    console.log("2");

                    element.id = 'notifications.' + i + '';
                    btn.id = 'notification.' + i + '';
                    btn.onclick = function (e) {

                        event.stopPropagation();
                        var target = $(this).closest('button').attr('id');
                        console.log(target);
                        $(this).parent().fadeTo(1000, 0.01, function () {
                            $(this).slideUp(150, function () {
                                $(this).remove();
                            });
                        });

                        $.ajax({

                            url: '/deleteNotif/' + Deletarget + '',
                            dataType: 'number',
                            type: 'post',
                            cache: false,
                            timeout: 1000000,
                            success: function (result) {
                                console.log(result);
                                if (result.status == 200) {
                                    console.log("Status:200");
                                }
                            },
                            error: function (result) {
                                console.log(result);
                            }
                        });

                    }
                    break;
                }
            }
        }
    }
    //     },
    //     error: function (result) {
    //         console.log(result);
    //     }
    // });


});


function check(div) {
    for (var i = 0; i <= 100; i++) {
        if ((msg["updateDescription"]["updatedFields"]["notification"] != undefined) && (msg["updateDescription"]["updatedFields"]["notification"] != "")) {
            if (msg["updateDescription"]["removedFields"].length == 0 && Array.isArray(msg["updateDescription"]["updatedFields"]["notification"]) == true) {

                if (msg["fullDocument"]["notification"].length > 1) {
                    $("#dot").addClass("show");
                    console.log("1");
                    var element = document.createElement("a");
                    var text = document.createElement("p");
                    var btn = document.createElement("button");
                    var span = document.createElement("span");
                    var Deletarget = 0;

                    span.className = "closeSpan";
                    btn.className = "close";
                    text.className = "notification-text";
                    span.innerHTML = "&times;";
                    text.innerHTML = msg["updateDescription"]["updatedFields"]['notification'];
                    element.className = "dropdown-item notification";

                    element.appendChild(btn);
                    btn.appendChild(span);
                    element.appendChild(text);
                    document.getElementById('droDownMenu').appendChild(element);

                    element.id = "notifications"
                    btn.id = "notification";
                    btn.onclick = function (e) {
                        event.stopPropagation();
                        var target = $(this).closest('button').attr('id');
                        console.log(target);
                        $(this).parent().fadeTo(1000, 0.01, function () {
                            $(this).slideUp(150, function () {
                                $(this).remove();
                            });
                        });

                        $.ajax({

                            url: '/deleteNotif/' + Deletarget + '',
                            dataType: 'number',
                            type: 'post',
                            cache: false,
                            timeout: 1000000,
                            success: function (result) {
                                console.log(result);
                                if (result.status == 200) {
                                    console.log("Status:200");
                                }
                            },
                            error: function (result) {
                                console.log(result);
                            }
                        });
                    }
                }
            }
            break;

        }
        else if ((msg["updateDescription"]["updatedFields"]['notification.' + i + ''] != undefined) && (msg["updateDescription"]["updatedFields"]['notification.' + i + ''] != "")) {
            if (msg["updateDescription"]["removedFields"].length == 0 && Array.isArray(msg["updateDescription"]["updatedFields"]["notification"]) == false) {
                $("#dot").addClass("show");
                var element = document.createElement("a");
                var text = document.createElement("p");
                var btn = document.createElement("button");
                var span = document.createElement("span");
                var Deletarget = i;
                console.log(Deletarget);
                span.className = "closeSpan";
                btn.className = "close";
                text.className = "notification-text";
                span.innerHTML = "&times;";
                text.innerHTML = msg["updateDescription"]["updatedFields"]['notification.' + i + ''];
                element.className = "dropdown-item notification";

                element.appendChild(btn);
                btn.appendChild(span);
                element.appendChild(text);
                document.getElementById('droDownMenu').appendChild(element);
                console.log("2");

                element.id = 'notifications.' + i + '';
                btn.id = 'notification.' + i + '';
                btn.onclick = function (e) {

                    event.stopPropagation();
                    var target = $(this).closest('button').attr('id');
                    console.log(target);
                    $(this).parent().fadeTo(1000, 0.01, function () {
                        $(this).slideUp(150, function () {
                            $(this).remove();
                        });
                    });

                    $.ajax({

                        url: '/deleteNotif/' + Deletarget + '',
                        dataType: 'number',
                        type: 'post',
                        cache: false,
                        timeout: 1000000,
                        success: function (result) {
                            console.log(result);
                            if (result.status == 200) {
                                console.log("Status:200");
                            }
                        },
                        error: function (result) {
                            console.log(result);
                        }
                    });

                }
                break;
            }
        }
    }
}