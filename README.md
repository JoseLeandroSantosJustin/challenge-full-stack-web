# Especificações Técnicas
- **Front End:** [Vuetifyjs](https://vuetifyjs.com/en/)  como framework de UI
- **API:** Express e NodeJS
- **Banco de Dados:** Postgress ou MySQL
- **Idioma de escrita do código:** Inglês

# Requisitos
## Contextualização
Considere que uma Instituição de Ensino Superior precisa de uma solução para cadastrar e gerenciar matrículas de usuários em turmas online. Para realizar a matrícula, é necessário que o cadastro de aluno tenha sido realizado.

O desafio consiste em criar uma aplicação para o cadastro de usuários conforme os critérios de aceitação.

## Histórias do Usuário
- **Sendo** um usuário administrativo da Instituição
- **Quero** gerenciar cadastros de alunos
- **Para** que eu possa realizar a matrícula do aluno

### Critérios de aceite: 

#### Cenário: cadastrar novo aluno
- **Dado** que estou na tela de Consulta de Alunos
- **Quando** clico em Cadastrar Aluno
- **Então** abre a tela de Cadastro do Aluno
- **E** exibe os campos obrigatórios vazios
####
- **Dado** que inseri dados válidos nos campos
- **Quando** clico em Salvar
- **Então** cria o novo aluno na base
- **E** retorna mensagem de sucesso
####
- **Dado** que inseri dados válidos nos campos
- **Quando** clico em Cancelar
- **Então** retorna para tela Consulta de Alunos
- **E** não persiste a gravação dos dados no banco 

#### Cenário: listar alunos cadastrados 
- **Dado** que estou no Módulo Acadêmico
- **Quando** clico no menu Alunos
- **Então** abre a tela de Consulta de Alunos 
- **E** exibe opção Cadastrar Aluno ao topo
- **E** lista dados dos alunos cadastrados
- **E** exibe opção Editar por aluno
- **E** exibe opção Excluir por aluno

#### Cenário editar cadastro de aluno
- **Dado** que estou na listagem de alunos
- **Quando** clico em Editar aluno
- **Então** abre a tela de Cadastro do Aluno 
- **E** exibe os campos do cadastro preenchidos
- **E** habilita alteração dos campos editáveis
####
- **Dado** que estou na tela de Cadastro do Aluno
- **Quando** clica em Salvar
- **Então** grava os dados editáveis na base
####
- **Dado** que estou na tela de Cadastro do Aluno
- **Quando** clica em Cancelar
- **Então** retorna para a tela de Consulta de Alunos
- **E** não persiste a gravação dos dados

#### Cenário: excluir cadastro de aluno
- **Dado** que estou na listagem de alunos
- **Quando** clico em Excluir aluno
- **Então** exibe a modal de confirmação de exclusão
####
- **Dado** que estou na modal de confirmação de exclusão 
- **Quando** clico em Confirmar
- **Então** então exclui o registro do aluno
####
- **Dado** que estou na modal de confirmação de exclusão
- **Quando** clico em Cancelar
- **Então** então fecha a modal e não persiste a exclusão

## Campos obrigatórios:
- **Nome** (editável)
- **Email** (editável)
- **RA** (não editável) (chave única)
- **CPF** (não editável)
