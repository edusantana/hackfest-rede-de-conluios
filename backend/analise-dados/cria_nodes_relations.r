library(RMySQL)
library(RNeo4j)
library(dplyr)
library(purrr)
library(networkD3)
library(foreach)
library(doMC)
registerDoMC(cores = 8)

CriaCSVs <- function() {
  sagres_db <- src_mysql("sagres", "150.165.85.32", 22030, "hackfest", password = "H@ckfest")
  licitacao_db <- tbl(sagres_db, "licitacao")
  fornecedores_db <- tbl(sagres_db, "fornecedores")
  propostas_db <- tbl(sagres_db, "propostas")
  participantes_db <- tbl(sagres_db, "participantes")
  ugestora_db <- tbl(sagres_db, "codigo_ugestora", enconding = "latin1")
  
  sagres_db <- src_mysql("sagres", "150.165.85.32", 22030, "hackfest", password = "H@ckfest")
  licitacao_db <- tbl(sagres_db, "licitacao")
  licitacao_df <- licitacao_db %>%
    filter(dt_Ano >= 2013) %>%
    group_by(nu_Licitacao) %>%
    summarise(cd_ugestora, tp_licitacao, dt_homologacao, tp_objeto, vl_licitacao, de_obs) %>%
    collect(n = Inf)
  write.csv(licitacao_df, "licitacao.csv", row.names = F)
  
  sagres_db <- src_mysql("sagres", "150.165.85.32", 22030, "hackfest", password = "H@ckfest")
  fornecedores_db <- tbl(sagres_db, "fornecedores")
  fornecedores_df <- fornecedores_db %>%
    filter(dt_Ano >= 2013) %>%
    collect(n = Inf) %>%
    group_by(nu_CPFCNPJ) %>%
    summarise(no_Fornecedor = first(no_Fornecedor))
  write.csv(fornecedores_df, "fornecedores.csv", row.names = F)
  
  nomes_fornecedores <- fornecedores_df %>%
    collect(n = Inf) %>%
    group_by(nu_CPFCNPJ) %>%
    summarise(nome_fornecedor = trimws(first(no_Fornecedor)))
  
  sagres_db <- src_mysql("sagres", "150.165.85.32", 22030, "hackfest", password = "H@ckfest")
  propostas_db <- tbl(sagres_db, "propostas")
  propostas_df <- propostas_db %>%
    filter(nu_CPFCNPJ != "00000000000000", dt_Ano >= 2013) %>%
    group_by(cd_UGestora, nu_Licitacao, nu_CPFCNPJ, cd_Item, cd_SubGrupoItem) %>%
    summarise(qt_Ofertada, vl_Ofertado, st_Proposta) %>%
    collect(n = Inf)
  write.csv(propostas_df, "propostas.csv", row.names = F)
  
  sagres_db <- src_mysql("sagres", "150.165.85.32", 22030, "hackfest", password = "H@ckfest")
  participantes_db <- tbl(sagres_db, "participantes")
  participantes_df <- participantes_db %>%
    filter(nu_CPFCNPJ != "00000000000000", dt_Ano >= 2013) %>%
    group_by(cd_UGestora, dt_Ano, nu_Licitacao, nu_CPFCNPJ) %>%
    summarise() %>%
    collect(n = Inf)
  write.csv(participantes_df, "participantes.csv", row.names = F)
  
  sagres_db <- src_mysql("sagres", "150.165.85.32", 22030, "hackfest", password = "H@ckfest")
  ugestora_db <- tbl(sagres_db, "codigo_ugestora", enconding = "latin1")
  ugestora_df <- ugestora_db %>%
    group_by(cd_UGestora, de_Ugestora) %>%
    summarise() %>%
    collect(n = Inf)
  write.csv(ugestora_df, "ugestora.csv", row.names = F)
  
  sagres_db <- src_mysql("sagres", "150.165.85.32", 22030, "hackfest", password = "H@ckfest")
  tipo_modalidade_licitacao_db <- tbl(sagres_db, "tipo_modalidade_licitacao")
  
}

AcessaBanco <- function() {
  participantes_nodes_n4j <- createNode(graph, "participante", participantes_nodes)
  licitacoes_nodes_n4j <- createNode(graph, "licitacao", licitacoes_nodes)
  
  participacoes_rlns_n4j <- with(participacoes_rlns, createRel(graph, from, "tem_participante", to))
  
  graph <- startGraph("http://localhost:7474/db/data", username = "neo4j", password = "conluios")
  #clear(graph)
  
  participantes <- participantes_df %>%
    filter(nu_CPFCNPJ != "00000000000000", dt_Ano >= 2016)
  
  query <- "
  MERGE (licitacao:Licitacao {id: {nu_Licitacao}, tp_licitacao: {tp_licitacao}, vl_licitacao: {vl_licitacao}})
  MERGE (participante:Participante {id: {nu_CPFCNPJ}, nome: {nome_fornecedor}})
  MERGE (ugestora:UGestora {id: {cd_UGestora}, de_Ugestora: {de_Ugestora} })  
  
  CREATE (participante)-[:PARTICIPA{qt_Ofertada: {qt_Ofertada}, vl_Ofertado: {vl_Ofertado},
  st_Proposta: {st_Proposta}}]->(licitacao)
  CREATE (licitacao)-[:PERTENCE]->(ugestora)
  "
  
  tx <- newTransaction(graph)
  
  for (i in 1:nrow(participantes)) {
    row <- participantes[i, ] %>%
      left_join(propostas_df,
                by = c("cd_UGestora", "nu_Licitacao", "nu_CPFCNPJ" = "nu_cpfcnpj")) %>%
      left_join(licitacao_df, by = c("cd_UGestora" = "cd_ugestora", "nu_Licitacao")) %>%
      left_join(nomes_fornecedores, by = "nu_CPFCNPJ")
    
    appendCypher(tx, query, nu_Licitacao = row$nu_Licitacao, tp_licitacao = row$tp_licitacao,
                 vl_licitacao = row$vl_licitacao, nu_CPFCNPJ = row$nu_CPFCNPJ,
                 nome_fornecedor = row$nome_fornecedor, cd_UGestora = row$cd_UGestora,
                 de_Ugestora = row$cd_UGestora, qt_Ofertada = row$qt_Ofertada,
                 vl_Ofertado = row$vl_Ofertado, st_Proposta = row$st_Proposta)
  }
  
  commit(tx)
  
  summary(graph)
  
  
  query <- "
MATCH (p1:Participante)-[:PARTICIPA]->(lic:Licitacao)<-[:PARTICIPA]-(p2:Participante)
RETURN p1.id, p2.id, count(distinct lic) as frequency
ORDER BY frequency DESC
"
  
  coparticipacoes <- cypher(graph, query)
  write.csv(coparticipacoes, "coparticipacoes.csv")
  
}

licitacao_df <- read.csv("licitacao.csv", stringsAsFactors = F)
fornecedores_df <- read.csv("fornecedores.csv", stringsAsFactors = F)
propostas_df <- read.csv("propostas.csv", stringsAsFactors = F)
participantes_df <- read.csv("participantes.csv", stringsAsFactors = F)
#coparticipacoes <- read.csv("coparticipacoes.csv") 1k
coparticipacoes <- read.csv("coparticipacoes_10k.csv") 

empresas_participantes <- unique(participantes_df$nu_CPFCNPJ)
nu_licitacoes <- unique(participantes_df$nu_Licitacao)

participantes_df <- participantes_df %>%
  group_by(nu_CPFCNPJ) %>%
  mutate(n_licitacoes = length(unique(nu_Licitacao)))
participantes_df <- select(participantes_df, -n_licitacoes)
  
propostas_df <- propostas_df %>%
  group_by(nu_CPFCNPJ, cd_UGestora, nu_Licitacao) %>%
  mutate(vencedora = any(st_Proposta == 1)) %>%
  group_by(nu_CPFCNPJ) %>%
  summarise(n_licitacoes = n(), n_vencedora = sum(vencedora))

cnpjs <- as.character(sort(unique(participantes_df$nu_CPFCNPJ)))

empresas_nodes <- participantes_df %>%
  left_join(propostas_df, by = "nu_CPFCNPJ") %>%
  left_join(licitacao_df, by = c("cd_UGestora", "nu_Licitacao")) %>%
  left_join(nomes_fornecedores, by = "nu_CPFCNPJ") %>%
  group_by(nu_CPFCNPJ) %>%
  summarise(id = which(nu_CPFCNPJ == cnpjs) - 1, nome = first(nome_fornecedor),
            n_licitacoes = first(n_licitacoes),
            prop_vencedoras = first(n_vencedora) / n_licitacoes)

coparticipacoes_filt <- coparticipacoes %>%
  filter(frequency >= 5) %>%
  mutate(p1.cpfCnpj = as.character(p1.cpfCnpj),
         p2.cpfCnpj = as.character(p2.cpfCnpj))
  
cnpjs_filt <- unique(c(coparticipacoes_filt$p1.cpfCnpj, coparticipacoes_filt$p2.cpfCnpj))

coparticipacao_links <- coparticipacoes_filt %>%
  rowwise() %>%
  transmute(source = which(p1.cpfCnpj == cnpjs_filt) - 1,
            target = which(p2.cpfCnpj == cnpjs_filt) - 1,
            value = frequency / 2)

nodes <- empresas_nodes %>%
  ungroup() %>%
  filter(nu_CPFCNPJ %in% cnpjs_filt) %>%
  mutate(group = ifelse(prop_vencedoras < .25, "perde muito",
                        ifelse(prop_vencedoras < .75, "intermediario", "vence muito")),
         node_id = paste(nome, " (CNPJ: ", nu_CPFCNPJ, " / Venceu ",
                         round(prop_vencedoras * n_licitacoes), " de ", n_licitacoes, ")", 
                         sep = ""))
  
forceNetwork(Links = coparticipacao_links, Nodes = nodes, Source = "source",
             Target = "target", Value = "value", NodeID = "node_id", Nodesize = "prop_vencedoras",
             Group = "group", legend = TRUE, zoom = TRUE)
