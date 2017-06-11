// ==UserScript==
// @name        rede-de-conluns
// @namespace   edusantana
// @include     http://localhost:7474/browser/
// @version     1
// @grant       none
// ==/UserScript==

topo = document.createElement('topo');
titulo = document.createElement('h1');
titulo.textContent = "Rede de Conluios";


topo.appendChild(titulo);
document.getElementById('mount').parentElement.prepend(topo);
