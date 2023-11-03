/*
###################################################################
# NOME:	script.js
# VERSÃO: 1.4
# DESCRIÇÃO: Código criado para aula sobre api;
Utilizado para consulta de Repositórios Públicos do GitHub
# DATA DA CRIAÇÃO:	31/10/2023
# ESCRITO POR: Luciano R. Nascimento
# E-MAIL: rovanni@gmail.com 			
# CÓDIGOS:	JAVASCRIPT
# LICENÇA:			GPLv3 			
###################################################################
*/       
        // Função para consultar os repositórios do GitHub
        function consultaRepositorios() {
            var username = document.getElementById('username').value;

            // Criando uma requisição para obter o perfil do usuário(a)
            var userEndpoint = 'https://api.github.com/users/' + username;
            var userRequest = new XMLHttpRequest();
            userRequest.open('GET', userEndpoint, true);

            userRequest.onload = function () {
                if (userRequest.status === 200) {
                    // Se a solicitação for bem-sucedida, exiba o perfil do usuário(a)
                    var user = JSON.parse(this.responseText);
                    var resultadoUser = document.getElementById('mostrar_user');
                    resultadoUser.innerHTML = '<h2>Sobre o usuário(a): ' + username + '.</h2>';
                    resultadoUser.innerHTML += '<h3>Foto do perfil:</h3>';
                    resultadoUser.innerHTML += '<img src="' + user.avatar_url + '" alt="imagem usuário(a)">';

                    // Criando uma requisição para obter a lista de repositórios
                    var endpoint = 'https://api.github.com/users/' + username + '/repos';
                    var request = new XMLHttpRequest();
                    request.open('GET', endpoint, true);

                    request.onload = function () {
                        if (request.status === 200) {
                            // Se a solicitação for bem-sucedida, exiba a lista de repositórios
                            var data = JSON.parse(this.responseText);
                            var resultadoRepos = document.getElementById('mostrar_repos');

                            if (data.length === 0) {
                                resultadoRepos.innerHTML = 'Nenhum repositório encontrado para o usuário(a) ' + username + '.';
                            } else {
                                resultadoRepos.innerHTML = '<h2>Repositórios públicos de ' + username + ':</h2>';

                                // Construindo uma tabela com os repositórios
                                var table = '<table id="customers"><thead><tr><th>Nº</th><th>Nome</th><th>Descrição</th><th>Link</th><th>Homepage</th></tr></thead><tbody>';
                                var cont = 0; // Inicialize a variável cont aqui
                                // Itera sobre os dados (assumindo que 'data' é um array de objetos)
                                data.forEach(function (repo) {
                                    table += '<tr>';// Inicia uma nova linha na tabela
                                    table += '<td>' + ++cont + '</td>';// Coluna "Número" com um contador incremental
                                    table += '<td>' + repo.name + '</td>';// Coluna "Nome" com o nome do repositório
                                    // Coluna "Descrição" com a descrição do repositório ou um link "N/A" se não houver descrição                                    
                                    table += '<td>' + (repo.description || '<a href="#text1">N/A</a>') + '</td>';
                                    // Coluna "Link" com um link para visualizar o repositório no GitHub                                    
                                    table += '<td><a href="' + repo.html_url + '">Ver</a></td>';
                                    // Coluna "Homepage" com um link para a página inicial do repositório ou "N/A" se não houver página inicial                                    
                                    if (repo.homepage !== null) {
                                        table += '<td><a href="' + repo.homepage + '">Ver</a></td>';
                                    } else {
                                        table += '<td><a href="#text1">N/A</a></td>';
                                    }
                                    // Fecha a linha da tabela                                    
                                    table += '</tr>';
                                });
                                table += '</tbody></table>';
                                resultadoRepos.innerHTML += table;
                            }
                        } else if (request.status === 404) {
                            // Se nenhum repositório for encontrado, exiba uma mensagem apropriada
                            resultadoRepos.innerHTML = 'Nenhum repositório encontrado para o usuário(a) ' + username + '.';
                        } else {
                            // Se ocorrer um erro na solicitação de repositórios, exiba uma mensagem de erro
                            resultadoRepos.innerHTML = 'Erro na solicitação de repositórios.';
                        }
                    }

                    request.send();
                } else if (userRequest.status === 404) {
                    // Se o usuário(a) não for encontrado, exiba uma mensagem apropriada
                    document.getElementById('mostrar_user').innerHTML = 'usuário(a) do GitHub não encontrado.';
                } else {
                    // Se ocorrer um erro na solicitação do perfil, exiba uma mensagem de erro
                    document.getElementById('mostrar_user').innerHTML = 'Erro na solicitação do perfil do usuário(a).';
                }
            }

            userRequest.send();
        }

        // Adicionando um ouvinte de eventos após o carregamento do DOM
        document.addEventListener('DOMContentLoaded', function () {
            // Adicionando um ouvinte de evento de teclado para a tecla "Enter"
            document.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Evita o comportamento padrão de envio do formulário
                    document.getElementById('botao').click(); // Clica no botão "Consultar Repositórios"
                }
            });
        });
