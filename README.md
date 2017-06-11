# hackfest-rede-de-conluios
Projeto rede de concluios apresentado no Hackfest



# Instalação

## Backend
- [Instalar o docker](https://www.docker.com)
- [Instalar neo4j através do docker](https://neo4j.com/developer/docker/)

### Análise de dados

O diretório `backend/analise-dados` contém scripts R para geração do gráfico através do RStudio.
A página [http://rpubs.com/marcuswac/conluios](http://rpubs.com/marcuswac/conluios) foi elaborada através do recurso de exportação HTML do gráfico gerado pelo RStudio.

Informações sobre o grafo: 

- Empresas que participam em muitas áreas diferentes (nós que ligam grupos separados)
- Empresas que elevam o valor das licitações mas perdem muito (nós laranja)
- Possível cartel (empresas que ganham e perdem)


## Frontend
- [Instalar o Greasemonkey](http://www.greasespot.net/)
- [Instalar o script no Greasemonkey](https://wiki.greasespot.net/Greasemonkey_Manual:Installing_Scripts): frontend/greasemonkey/rede-de-conluns.user.js

# Execução

Invocar executar neo4j:

    sudo docker run --publish=7474:7474 --publish=7687:7687 --volume=$HOME/neo4j/data:/data neo4j

Acessar página do neo4j: [http://localhost:7474/browser/](http://localhost:7474/browser/)




