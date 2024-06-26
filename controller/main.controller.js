sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],

/** 
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */

function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("prjbr.controller.main", {

        onInit: function () {

            var dadosGerais = {};
            var classificacao = {};
            var partidas = {};

            var dadosModel = new JSONModel(dadosGerais);
            var classificacaoModel = new JSONModel(classificacao);
            var partidasModel = new JSONModel(partidas);

            this.getView().setModel(dadosModel, "ModeloDadosGerais");
            this.getView().setModel(classificacaoModel, "ModeloClassificacao");
            this.getView().setModel(partidasModel, "ModeloPartidas");

            this.buscarDadosGerais();
            this.buscarClassificacao();
        
        }, 
        
        buscarDadosGerais: function(){
            var dadosModel2 = this.getView().getModel("ModeloDadosGerais");
            const configuracoes = {
                url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                method: "GET",
                async: true,
                crossDomain: true,
                headers: {
                    "Authorization" : "Bearer live_8024e9ae04d8f9e46ee451c913f4c3"
                }
            };

            $.ajax(configuracoes)
            .done(function(resposta){
                dadosModel2.setData(resposta);
                this.buscarPartidas(resposta.rodada_atual.rodada);
                
            }.bind(this) )

            .fail(function(resposta){
                
            });
        },
        
        buscarClassificacao: function(){
            var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");
            const configuracoes = {
                url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                method: "GET",
                async: true,
                crossDomain: true,
                headers: {
                    "Authorization" : "Bearer live_8024e9ae04d8f9e46ee451c913f4c3"
                }
            };

            $.ajax(configuracoes)
            .done(function(resposta){
                classificacaoModel2.setData({"Classificacao" : resposta});
                
            })

            .fail(function(resposta){
                
            });
        },

        buscarPartidas: function(partida){
            var partidasModel2 = this.getView().getModel("ModeloPartidas");
            const configuracoes = {
                url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodada/" + rodada,
                method: "GET",
                async: true,
                crossDomain: true,
                headers: {
                    "Authorization" : "Bearer live_8024e9ae04d8f9e46ee451c913f4c3"
                }
            };

            $.ajax(configuracoes)
            .done(function(resposta){
                partidasModel2.setData("Partidas");
                
            })

            .fail(function(resposta){
                
            });
        }
    
    })
                        });
            
