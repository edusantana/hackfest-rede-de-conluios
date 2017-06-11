// ==UserScript==
// @name        rede-de-conluns
// @namespace   edusantana
// @include     http://localhost:7474/browser/
// @version     1
// @grant       none
// ==/UserScript==

titulo = document.createElement('h1');
titulo.textContent = "Rede de Conluios";
document.getElementById('mount').parentElement.prepend(titulo);
