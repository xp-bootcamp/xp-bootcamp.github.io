$(document).ready(function () {
  var initial = 0;
  var show = true;

  var toggleSearch = function (visible) {
    initial = 0;
    show = !visible;
    var visibility = visible ? 'block' : 'none';

    $("#search-content").val("");
    $(".search-tool").css("display", visibility);
  };

  var shouldToggle = function (time) {
    var gap = time - initial;
    initial = time;
    return gap < 500;
  };

  $(document).keyup(function (e) {
    var now = new Date().getTime();
    if (e.keyCode == 17 && shouldToggle(now)) {
      toggleSearch(show);
      $("#search-content").focus();
    } else if (e.keyCode == 27) {
      toggleSearch(false);
    }
  });

  $("#search-content").keyup(function (e) {
    var now = new Date().getTime();
    if (e.keyCode == 17 && shouldToggle(now)) {
      toggleSearch(show);
      $("#search-content").focus();
    }
  });

  $("#close-btn").click(function () {
    toggleSearch(false);
  });

  $("#search-btn").click(function () {
    toggleSearch(true);
    $("#search-content").focus();
  });

  $.getJSON("/assets/search.json")
    .done(function (data) {
      if (data.code == 0) {
        $("#search-content").typeahead({
          source: data.data,
          displayText: function (item) {
            return item.title;
          },
          afterSelect: function (item) {
            window.location.href = item.url;
          }
        });
      }
    });
});
