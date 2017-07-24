const remote = require('electron').remote;
const exec = require('child_process').exec;
const path = require('path');
const os = require('os');

$(function () {
  $('#xbtn').on('click', function (e) {
    remote.getCurrentWindow().close();
  });
  $('#minbtn').on('click', function (e) {
    remote.getCurrentWindow().minimize();
  });
  initConsole();
});

function abspath (relative) {
  return path.normalize(relative.replace(/~/g, os.homedir()));
}

function PS1 () {
  if (process.env.PS1) return process.env.PS1;
  return '$ ';
}

function initConsole () {
  jQuery(function($, undefined) {
    window.cons = $('#cmdline').terminal(function (cmd) {
      if (cmd.length > 0) {
        if (cmd.startsWith('cd ')) process.chdir(abspath(cmd.substr(3)));
        else exec(cmd, {}, (a,b,c) => cons.echo(b.trimRight()));
      } else this.echo(cmd);
    }, {
      greetings: 'Welcome to JTerm (v0.0.1)!',
      name: 'jterm',
      height: 350,
      prompt: PS1,
    });
  });
}
