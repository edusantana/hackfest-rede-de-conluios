// ==UserScript==
// @name        rede-de-conluns
// @namespace   edusantana
// @include     http://localhost:7474/browser/
// @version     1
// @grant       none
// ==/UserScript==

app = document.createElement('div');
topo = document.createElement('div');
app.appendChild(topo);
topo.id='topo';
topo.style = 'padding-bottom: 300px; padding-top: 300px; background-image: url(https://github.com/edusantana/hackfest-rede-de-conluios/raw/master/frontend/img/cover.png); background-size: cover;';

titulo = document.createElement('h1');
topo.appendChild(titulo);
titulo.textContent = "Rede de Conluios";
titulo.id = 'titulo';
titulo.style = "text-align: center; color: yellow; font-size: 550%; background-color: black; ";
// document.getElementById('mount')("head").append("<link rel='stylesheet' id='extracss' href='"+filename+"' type='text/css' />");

//document.getElementsByTagName("head")[0].append("<link rel='stylesheet' id='extracss' href='https://raw.githubusercontent.com/edusantana/hackfest-rede-de-conluios/master/frontend/greasemonkey/style.css' type='text/css' />");



document.getElementById('mount').parentElement.prepend(app);
