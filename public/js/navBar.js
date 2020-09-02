document
  .getElementById('navbarDropdownMenuLink')
  .addEventListener('click', function (e) {
    $('#dot').removeClass('show');
    const target = 0;
    $.ajax({
      url: '/deleteDot/' + target + '',
      dataType: 'number',
      type: 'post',
      cache: false,
      timeout: 1000000,
      success: function (result) {
        if (result.status == 200) {
          console.log('Status:200');
        }
      },
      error: function (result) {
        console.log(result);
      },
    });
  });

$(document).ready(function () {
  $('span').click(function (event) {
    if (event.target.className == 'closeSpans') {
      event.stopPropagation();
      var target = $(this).closest('span').attr('id');
      var parent = $(this).closest('button').parent().attr('id');
      $(this)
        .closest('button')
        .parent()
        .fadeTo(1000, 0.01, function () {
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
            console.log('Status:200');
          }
        },
        error: function (result) {
          console.log(result);
        },
      });
    }
  });
});

var socket = io();
socket.on('new-notification', async function (msg) {
  let count;
  let express = false;
  var x = document.getElementsByClassName('notification-text');
  if (x.length == 0) {
    check();
  } else {
    await checka();
    async function checka() {
      await search();
      console.log('Checka', express);
      if (express != true) {
        check();
      }
    }
    async function find() {
      for (var i = 0; i <= 100; i++) {
        if (
          Array.isArray(
            msg['updateDescription']['updatedFields']['notification']
          ) == true
        ) {
          count = 10000;
          break;
        } else {
          if (
            msg['updateDescription']['updatedFields'][
              'notification.' + i + ''
            ] != undefined &&
            msg['updateDescription']['updatedFields'][
              'notification.' + i + ''
            ] != ''
          ) {
            count = i;
          }
        }
      }
    }
    async function search() {
      await find();
      if (count == 10000) {
        express = true;
      } else {
        for (var i = 0; i <= x.length; x++) {
          if (
            x[i].innerText ==
            msg['updateDescription']['updatedFields'][
              'notification.' + count + ''
            ]
          ) {
            express = true;
          }
        }
      }
    }
  }

  function check() {
    for (var i = 0; i <= 100; i++) {
      console.log(msg);
      if (
        msg['updateDescription']['updatedFields']['notification'] !=
          undefined &&
        msg['updateDescription']['updatedFields']['notification'] != ''
      ) {
        if (
          msg['updateDescription']['removedFields'].length == 0 &&
          Array.isArray(
            msg['updateDescription']['updatedFields']['notification']
          ) == true
        ) {
          if (msg['fullDocument']['notification'].length > 1) {
            $('#dot').addClass('show');
            var element = document.createElement('a');
            var text = document.createElement('p');
            var btn = document.createElement('button');
            var span = document.createElement('span');
            var Deletarget = 0;

            span.className = 'closeSpan';
            btn.className = 'close';
            text.className = 'notification-text';
            span.innerHTML = '&times;';
            text.innerHTML =
              msg['updateDescription']['updatedFields']['notification'];
            element.className = 'dropdown-item notification';

            element.appendChild(btn);
            btn.appendChild(span);
            element.appendChild(text);
            document.getElementById('droDownMenu').appendChild(element);

            element.id = 'notifications';
            btn.id = 'notification';
            btn.onclick = function (e) {
              event.stopPropagation();
              var target = $(this).closest('button').attr('id');
              $(this)
                .parent()
                .fadeTo(1000, 0.01, function () {
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
                    console.log('Status:200');
                  }
                },
                error: function (result) {
                  console.log(result);
                },
              });
            };
          }
        }
        break;
      } else if (
        msg['updateDescription']['updatedFields']['notification.' + i + ''] !=
          undefined &&
        msg['updateDescription']['updatedFields']['notification.' + i + ''] !=
          ''
      ) {
        if (
          msg['updateDescription']['removedFields'].length == 0 &&
          Array.isArray(
            msg['updateDescription']['updatedFields']['notification']
          ) == false
        ) {
          $('#dot').addClass('show');

          var element = document.createElement('a');
          var text = document.createElement('p');
          var btn = document.createElement('button');
          var span = document.createElement('span');
          var Deletarget = i;

          span.className = 'closeSpan';
          btn.className = 'close';
          text.className = 'notification-text';
          span.innerHTML = '&times;';
          text.innerHTML =
            msg['updateDescription']['updatedFields']['notification.' + i + ''];
          element.className = 'dropdown-item notification';
          element.appendChild(btn);
          btn.appendChild(span);
          element.appendChild(text);
          document.getElementById('droDownMenu').appendChild(element);
          element.id = 'notifications.' + i + '';
          btn.id = 'notification.' + i + '';
          btn.onclick = function (e) {
            event.stopPropagation();
            var target = $(this).closest('button').attr('id');
            $(this)
              .parent()
              .fadeTo(1000, 0.01, function () {
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
                  console.log('Status:200');
                }
              },
              error: function (result) {
                console.log(result);
              },
            });
          };
          break;
        }
      }
    }
  }
});

function check(div) {
  for (var i = 0; i <= 100; i++) {
    if (
      msg['updateDescription']['updatedFields']['notification'] != undefined &&
      msg['updateDescription']['updatedFields']['notification'] != ''
    ) {
      if (
        msg['updateDescription']['removedFields'].length == 0 &&
        Array.isArray(
          msg['updateDescription']['updatedFields']['notification']
        ) == true
      ) {
        if (msg['fullDocument']['notification'].length > 1) {
          $('#dot').addClass('show');
          var element = document.createElement('a');
          var text = document.createElement('p');
          var btn = document.createElement('button');
          var span = document.createElement('span');
          var Deletarget = 0;

          span.className = 'closeSpan';
          btn.className = 'close';
          text.className = 'notification-text';
          span.innerHTML = '&times;';
          text.innerHTML =
            msg['updateDescription']['updatedFields']['notification'];
          element.className = 'dropdown-item notification';
          element.appendChild(btn);
          btn.appendChild(span);
          element.appendChild(text);
          document.getElementById('droDownMenu').appendChild(element);
          element.id = 'notifications';
          btn.id = 'notification';
          btn.onclick = function (e) {
            event.stopPropagation();
            var target = $(this).closest('button').attr('id');
            $(this)
              .parent()
              .fadeTo(1000, 0.01, function () {
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
                  console.log('Status:200');
                }
              },
              error: function (result) {
                console.log(result);
              },
            });
          };
        }
      }
      break;
    } else if (
      msg['updateDescription']['updatedFields']['notification.' + i + ''] !=
        undefined &&
      msg['updateDescription']['updatedFields']['notification.' + i + ''] != ''
    ) {
      if (
        msg['updateDescription']['removedFields'].length == 0 &&
        Array.isArray(
          msg['updateDescription']['updatedFields']['notification']
        ) == false
      ) {
        $('#dot').addClass('show');
        var element = document.createElement('a');
        var text = document.createElement('p');
        var btn = document.createElement('button');
        var span = document.createElement('span');
        var Deletarget = i;
        span.className = 'closeSpan';
        btn.className = 'close';
        text.className = 'notification-text';
        span.innerHTML = '&times;';
        text.innerHTML =
          msg['updateDescription']['updatedFields']['notification.' + i + ''];
        element.className = 'dropdown-item notification';
        element.appendChild(btn);
        btn.appendChild(span);
        element.appendChild(text);
        document.getElementById('droDownMenu').appendChild(element);
        element.id = 'notifications.' + i + '';
        btn.id = 'notification.' + i + '';
        btn.onclick = function (e) {
          event.stopPropagation();
          var target = $(this).closest('button').attr('id');
          $(this)
            .parent()
            .fadeTo(1000, 0.01, function () {
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
                console.log('Status:200');
              }
            },
            error: function (result) {
              console.log(result);
            },
          });
        };
        break;
      }
    }
  }
}
