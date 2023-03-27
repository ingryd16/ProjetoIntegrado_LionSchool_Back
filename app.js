/**************************************************************************
 * Objetivo: Criar uma API para manipulação de dados sobre alunos e cursos.
 * Autor: Gustaco Henrique
 * Data: 27/03/2023
 * Versão: 1.0
 **************************************************************************/
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { response } = require('express')

//Importe do arquivo de funções
const dateJson = require('./modulo/functions.js')

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT,DELETE,OPTIONS')
    app.use(cors())
    next()
})

//EndPoint para listar todos os cursos da escola
app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {
    let infCourses = dateJson.getInfoCourses()
    let infCourseJson = {}
    let statusCode

    if (infCourses) {
        infCourseJson = infCourses
        statusCode = 200
    } else {
        statusCode = 400
        infCourseJson.message = "Erro, não foi localizado nenhum curso"
    }
    response.status(statusCode)
    response.json(infCourseJson)
})

//EndPoint para listar todos os alunos matriculados na escola e os dados
app.get('/v1/lion-school/alunos', cors(), async function (request, response, next) {
    let infStudents = dateJson.getAllStudentsMatriculate()
    let infStudentsJson = {}
    let statusCode

    if (infStudents) {
        infStudentsJson = infStudents
        statusCode = 200
    } else {
        statusCode = 400
        infStudentsJson.message = "Erro, não foi localizado nenhuma informação de alunos"
    }
    response.status(statusCode)
    response.json(infStudentsJson)
})

//EndPoint para listar os dados do aluno de acordo com a matricula
app.get('/v1/lion-school/aluno', cors(), async function (request, response, next) {
    let matriculate = request.query.matricula
    let infStudentJson = {}
    let statusCode
    console.log(matriculate)

    if (matriculate == '' || matriculate == undefined || isNaN(matriculate)) {
        statusCode = 400
        infStudentJson.message = 'Não é possivel processar a requisição pois a matricula não foi informada de forma correta, tente novamente.'
    }else{
        let student = dateJson.getStudentMatriculate(matriculate)
        if(student){
            statusCode = 200
            infStudentJson = student
        }else{
            statusCode = 404
            infStudentJson.message = 'Erro 404'
        }
    }
    response.status(statusCode)
    response.json(infStudentJson)
})
app.listen(8080, function () {
    console.log('Servidor Aguardando requisições')
})