// ==UserScript==
// @name        rede-de-conluns
// @namespace   edusantana
// @include     http://localhost:7474/browser/
// @version     1
// @grant       none
// ==/UserScript==

app = document.createElement('div');
topo = document.createElement('div');
meio = document.createElement('div');
meio.style = "text-align: center;";
app.appendChild(topo);
app.appendChild(meio);
topo.id='topo';
topo.style = 'padding-bottom: 300px; padding-top: 300px; background-image: url(https://github.com/edusantana/hackfest-rede-de-conluios/raw/master/frontend/img/cover.png); background-size: cover;';

titulo = document.createElement('h1');
topo.appendChild(titulo);
titulo.textContent = "Rede de Conluios";
titulo.id = 'titulo';
titulo.style = "text-align: center; color: white; font-size: 550%; background-color: black; ";
// document.getElementById('mount')("head").append("<link rel='stylesheet' id='extracss' href='"+filename+"' type='text/css' />");

//document.getElementsByTagName("head")[0].append("<link rel='stylesheet' id='extracss' href='https://raw.githubusercontent.com/edusantana/hackfest-rede-de-conluios/master/frontend/greasemonkey/style.css' type='text/css' />");

var unidades = ["Água Branca", "Aguiar", "Alagoa Grande", "Alagoa Nova", "Alagoinha", "Alcantil", "Algodão de Jandaíra", "Alhandra", "Amparo", "Aparecida", "Araçagi", "Arara", "Araruna", "Areia", "Areia de Baraúnas", "Areial", "Aroeiras", "Assunção", "Baía da Traição", "Bananeiras", "Baraúna", "Barra de Santa Rosa", "Barra de Santana", "Barra de São Miguel", "Bayeux", "Belém", "Belém do Brejo do Cruz", "Bernardino Batista", "Boa Ventura", "Boa Vista", "Bom Jesus", "Bom Sucesso", "Bonito de Santa Fé", "Boqueirão", "Borborema", "Brejo do Cruz", "Brejo dos Santos", "Caaporã", "Cabaceiras", "Cabedelo", "Cachoeira dos Índios", "Cacimba de Areia", "Cacimba de Dentro", "Cacimbas", "Caiçara", "Cajazeiras", "Cajazeirinhas", "Caldas Brandão", "Camalaú", "Campina Grande", "Campo de Santana", "Capim", "Caraúbas", "Carrapateira", "Casserengue", "Catingueira", "Catolé do Rocha", "Caturité", "Conceição", "Condado", "Conde", "Congo", "Coremas", "Coxixola", "Cruz do Espírito Santo", "Cubati", "Cuité", "Cuité de Mamanguape", "Cuitegi", "Curral de Cima", "Curral Velho", "Damião", "Desterro", "Diamante", "Dona Inês", "Duas Estradas", "Emas", "Esperança", "Fagundes", "Frei Martinho", "Gado Bravo", "Guarabira", "Gurinhém", "Gurjão", "Ibiara", "Igaracy", "Imaculada", "Ingá", "Itabaiana", "Itaporanga", "Itapororoca", "Itatuba", "Jacaraú", "Jericó", "João Pessoa", "Juarez Távora", "Juazeirinho", "Junco do Seridó", "Juripiranga", "Juru", "Lagoa", "Lagoa de Dentro", "Lagoa Seca", "Lastro", "Livramento", "Logradouro", "Lucena", "Mãe  d'Água", "Malta", "Mamanguape", "Manaíra", "Marcação", "Mari", "Marizópolis", "Massaranduba", "Mataraca", "Matinhas", "Mato Grosso", "Maturéia", "Mogeiro", "Montadas", "Monte Horebe", "Monteiro", "Mulungu", "Natuba", "Nazarezinho", "Nova Floresta", "Nova Olinda", "Nova Palmeira", "Olho d'Água", "Olivedos", "Ouro Velho", "Parari", "Passagem", "Patos", "Paulista", "Pedra Branca", "Pedra Lavrada", "Pedras de Fogo", "Pedro Régis", "Piancó", "Picuí", "Pilar", "Pilões", "Pilõezinhos", "Pirpirituba", "Pitimbu", "Pocinhos", "Poço Dantas", "Poço de José de Moura", "Pombal", "Prata", "Princesa Isabel", "Puxinanã", "Queimadas", "Quixabá", "Remígio", "Riachão", "Riachão do Bacamarte", "Riachão do Poço", "Riacho de Santo Antônio", "Riacho dos Cavalos", "Rio Tinto", "Salgadinho", "Salgado de São Félix", "Santa Cecília", "Santa Cruz", "Santa Helena", "Santa Inês", "Santa Luzia", "Santa Rita", "Santa Teresinha", "Santana de Mangueira", "Santana dos Garrotes", "Santarém", "Santo André", "São Bentinho", "São Bento", "São Domingos", "São Domingos do Cariri", "São Francisco", "São João do Cariri", "São João do Rio do Peixe", "São João do Tigre", "São José da Lagoa Tapada", "São José de Caiana", "São José de Espinharas", "São José de Piranhas", "São José de Princesa", "São José do Bonfim", "São José do Brejo do Cruz", "São José do Sabugi", "São José dos Cordeiros", "São José dos Ramos", "São Mamede", "São Miguel de Taipu", "São Sebastião de Lagoa de Roça", "São Sebastião do Umbuzeiro", "São Vicente do Seridó", "Sapé", "Serra Branca", "Serra da Raiz", "Serra Grande", "Serra Redonda", "Serraria", "Sertãozinho", "Sobrado", "Solânea", "Soledade", "Sossêgo", "Sousa", "Sumé", "Taperoá", "Tavares", "Teixeira", "Tenório", "Triunfo", "Uiraúna", "Umbuzeiro", "Várzea", "Vieirópolis", "Vista Serrana", "Zabelê"];

/*
<form action="/action_page.php">
  <input list="browsers" name="browser">
  <datalist id="browsers">
    <option value="Internet Explorer">
    <option value="Firefox">
    <option value="Chrome">
    <option value="Opera">
    <option value="Safari">
  </datalist>
  <input type="submit">
</form>
*/

/*
Unidade gestora:
CNPJ:
Período: Inínio, Fim
Valor: Mínimo, Máximo
*/

unidade_gestora_label = document.createElement('label');
unidade_gestora_label.textContent = 'Unidade gestora:';
meio.appendChild(unidade_gestora_label);
unidade_gestora = document.createElement('input');
unidade_gestora.name = 'unidade_gestora';
unidade_gestora.id = 'unidade_gestora';
meio.appendChild(unidade_gestora);

CNPJ_label = document.createElement('label');
CNPJ_label.textContent = 'CNPJ:';
meio.appendChild(CNPJ_label);
CNPJ = document.createElement('input');
CNPJ.name = 'CNPJ';
CNPJ.id = 'CNPJ';
meio.appendChild(CNPJ);

ano_inicial_label = document.createElement('label');
ano_inicial_label.textContent = 'Ano inicial:';
meio.appendChild(ano_inicial_label);
ano_inicial = document.createElement('input');
ano_inicial.size = 5;
ano_inicial.name = 'ano_inicial';
ano_inicial.id = 'ano_inicial';
meio.appendChild(ano_inicial);

ano_final_label = document.createElement('label');
ano_final_label.textContent = 'Ano final:';
meio.appendChild(ano_final_label);
ano_final = document.createElement('input');
ano_final.size = 5;
ano_final.name = 'ano_final';
ano_final.id = 'ano_final';
meio.appendChild(ano_final);

valor_minimo_label = document.createElement('label');
valor_minimo_label.textContent = 'Valor mínimo:';
meio.appendChild(valor_minimo_label);
valor_minimo = document.createElement('input');
valor_minimo.size = 10;
valor_minimo.name = 'valor_minimo';
valor_minimo.id = 'valor_minimo';
meio.appendChild(valor_minimo);

valor_maximo_label = document.createElement('label');
valor_maximo_label.textContent = 'Valor mínimo:';
meio.appendChild(valor_maximo_label);
valor_maximo = document.createElement('input');
valor_maximo.size = 10;
valor_maximo.name = 'valor_maximo';
valor_maximo.id = 'valor_maximo';
meio.appendChild(valor_maximo);


document.getElementById('mount').parentElement.prepend(app);
