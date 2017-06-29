var $ = require('jquery');
var cmd = '';
const remote = require('electron').remote;
const os = require('os');
const uinfo = os.userInfo();
const console = {
  clear : function () {
    $('#cmdline').html('');
  },
  log : function (obj) {
    var strobj = obj+'';
    appendtohtml('<pre class="log">'+strobj+'</pre>');
  },
  warn : function (obj) {
    var strobj = obj+'';
    appendtohtml('<pre class="warn">'+strobj+'</pre>');
  },
  error : function (obj) {
    var strobj = obj+'';
    appendtohtml('<pre class="err">'+strobj+'</pre>');
  }
};
let HOST = os.hostname();

$(function () {
  $('#xbtn').on('click', function (e) {
    remote.getCurrentWindow().close();
  });
  $('#minbtn').on('click', function (e) {
    remote.getCurrentWindow().minimize();
  });
  $(window).on('keydown', function (e) {
    if (e.key == 'd' && e.ctrlKey) {
      remote.getCurrentWindow().close();
    } else if (e.keyCode == 13) { //enter is pressed. fire!
      if (e.shiftKey) {
        typekey(c);
        return;
      }
      firecommand();
    } else if (e.key.length == 1) {
      typekey(e.key);
    } else if (e.keyCode == 8) { //backspace
      var rmcharlen = $('<p/>').text(cmd[cmd.length-1]).html().length;
      if (cmd.length > 0) cmd = cmd.substr(0, cmd.length-1);
      var html = $('#cmdline').html();
      $('#cmdline').html(html.substr(0, html.length-rmcharlen));
    }
  });
  initConsole();
});
function appendtohtml (str) {
  $('#cmdline').html($('#cmdline').html()+str);
}
function cmdprompt () {
  appendtohtml('<strong>'+uinfo.username+'@'+HOST+'$'+'</strong> ');
}

function initConsole () {
  cmdprompt();
}

function typekey (c) {
  cmd += c;
  c = $('<p/>').text(c).html();
  appendtohtml(c);
}
function firecommand () {
  try {
    console.log(eval(cmd));
  } catch (e) {
    console.error(e);
  }
  appendtohtml('<br />');
  cmd = '';
  cmdprompt();
}
