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
//app.get('/v1/lion-school/cursos', cors(), async function (request, response, next) {
app.get('https://lionschool.onrender.com/v1/lion-school/cursos', cors(), async function (request, response, next) {
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

//EndPoint para listar as informações todos os alunos matriculados na escola e os dados
//app.get('/v1/lion-school/informacoes/alunos', cors(), async function (request, response, next) {
app.get('https://lionschool.onrender.com/v1/lion-school/informacoes/alunos', cors(), async function (request, response, next) {
    let infStudents = dateJson.getInfoAllStudentsMatriculate()
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

//EndPoint responsavel por recuperar uma lista com o nome e a foto de todos os estudantes matriculados na escola
//app.get('/v1/lion-school/alunos', cors(), async function(request, response,next){
app.get('https://lionschool.onrender.com/v1/lion-school/alunos', cors(), async function(request, response,next){
    let infStudents = dateJson.getNameImageAllStudents()
    let infStudentsJson = {}
    let statusCode

    if(infStudents){
        infStudentsJson = infStudents
        statusCode = 200
    }else{
        statusCode = 400
        infStudentsJson.message = "Erro, não foi localizado nenhuma informação de alunos"
    }
    response.status(statusCode)
    response.json(infStudentsJson)
})
//EndPoint para listar os dados do aluno de acordo com a matricula
//app.get('/v1/lion-school/aluno', cors(), async function (request, response, next) {
app.get('https://lionschool.onrender.com/v1/lion-school/aluno', cors(), async function (request, response, next) {
    let matriculate = request.query.matricula
    let infStudentJson = {}
    let statusCode
    console.log(matriculate)

    if (matriculate == '' || matriculate == undefined || isNaN(matriculate)) {
        statusCode = 400
        infStudentJson.message = 'Não é possivel processar a requisição pois a matricula não foi informada de forma correta, tente novamente.'
    }else{
        let student = dateJson.getStudentMatriculation(matriculate)
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

//EndPoint para listar todos os alunos de um curso especifico
//app.get('/v1/lion-school/alunos/curso', cors(), async function(request, response, next){
app.get('https://lionschool.onrender.com/v1/lion-school/alunos/curso', cors(), async function(request, response, next){
    let nameCourse = request.query.curso 
    let studentsCourseJson = {}
    let statusCode
    
    if(nameCourse == '' || nameCourse == undefined || !isNaN(nameCourse)){
        statusCode = 400
        studentsCourseJson.message = 'Não foi possivel processar a requisição pois o nome do curso não foi informado de forma certa, tente novamente'
    }else{
        let courseEspecific = dateJson.getStudentsCourseEspecific(nameCourse)

        if(courseEspecific){
            statusCode = 200
            studentsCourseJson = courseEspecific
        }else{
            statusCode = 400
            studentsCourseJson.message = 'Curso não encontrado, Erro 404'
        }
    }

    response.status(statusCode)
    response.json(studentsCourseJson)
})

//EndPoint para listar todos os alunos de um status especifico
//app.get('/v1/lion-school/alunos/status', cors(), async function(request, response, next){
app.get('https://lionschool.onrender.com/v1/lion-school/alunos/status', cors(), async function(request, response, next){
    let statusStudent = request.query.status 
    let statusStudentsJson = {}
    let statusCode

    if(statusStudent == '' || statusStudent == undefined || !isNaN(statusStudent)){
        statusCode = 400
        statusJson.message = 'Não foi possivel processar a requisição pois o status do aluno não foi informado de forma certa, tente novamente'
    }else{
        let statusEspecific = dateJson.getStudentsStatusEspecific(statusStudent)

        if(statusEspecific){
            statusCode = 200
            statusStudentsJson = statusEspecific
        }else{
            statusCode = 400
            statusStudentsJson.message = 'Curso não encontrado, Erro 404'
        }
    }

    response.status(statusCode)
    response.json(statusStudentsJson)
})

//EndPoint para listar as Informações referentes a nota do aluno em determinadas matérias
//app.get('/v1/lion-school/aluno/notas', cors(), async function(request, response, next){
app.get('https://lionschool.onrender.com/v1/lion-school/aluno/notas', cors(), async function(request, response, next){
    let nameStudent = request.query.nome
    let gradesStudent = {}
    let statusCode

    if(nameStudent == '' || nameStudent == undefined || !isNaN(nameStudent)){
        statusCode = 400
        gradesStudent.message = 'Não foi possivel processar a requisição pois o nome do aluno não foi informado de forma certa, tente novamente'
    }else{
        let listGrades = dateJson.studentSelectedInfGrades(nameStudent)
        if(listGrades){
            statusCode = 200
            gradesStudent = listGrades
        }else{
            statusCode = 404
            gradesStudent.message = 'Aluno não localizado, verifique e tente novamente'
        }
    }
    response.status(statusCode)
    response.json(gradesStudent)
})

//EndPoint retorna os alunos que estao cursando ou finalizarão o curso de Programming
//app.get('/v1/lion-school/alunos/status/ds', cors(), async function(request, response, next){
app.get('https://lionschool.onrender.com/v1/lion-school/alunos/status/ds', cors(), async function(request, response, next){
    let statusCourse = request.query.status
    let courseStatusJson = {}
    let statusCode 

    if(statusCourse == '' || statusCourse == undefined || !isNaN(statusCourse)){
        statusCode = 400
        courseStatusJson.message = 'Não foi possivel processar a requisição pois os status do curso não foi informado de forma certa.'
    }else{
        let course = dateJson.getStatusCourseDs(statusCourse)
        if(course){
            statusCode = 200
            courseStatusJson = course
        }else{
            statusCode = 400
            courseStatusJson = 'Status não localizado.'
        }
    }

    response.status(statusCode)
    response.json(courseStatusJson)
})

//EndPoint para listar todos os alunos de programação deacordo com o ano espeficico 
//app.get('/v1/lion-school/alunos/curso/ds/ano-finalizacao', cors(), async function(request,response,next){
app.get('https://lionschool.onrender.com/v1/lion-school/alunos/curso/ds/ano-finalizacao', cors(), async function(request,response,next){
    let year = request.query.ano
    let studentsJson = {}
    let statusCode

    if(year == undefined || year == '' || isNaN(year)){
        statusCode = 400
        studentsJson.message = 'Não foi possivel localizar os alunos de determinada data, pois a data não foi informada de forma certa'
    }else{
        let students = dateJson.getConclusionCourseDs(year)
        if(students){
            statusCode = 200
            studentsJson = students
        }else{
            statusCode = 400
            studentsJson.message = 'Alunos não localizados, tente novamente'
        }

    }

    response.status(statusCode)
    response.json(studentsJson)
})

//EndPoint retorna os alunos que estao cursando ou finalizarão o curso de Redes
//app.get('/v1/lion-school/alunos/status/rds', cors(), async function(request, response, next){
app.get('https://lionschool.onrender.com/v1/lion-school/alunos/status/rds', cors(), async function(request, response, next){
    let statusCourse = request.query.status
    let courseStatusJson = {}
    let statusCode 

    if(statusCourse == '' || statusCourse == undefined || !isNaN(statusCourse)){
        statusCode = 400
        courseStatusJson.message = 'Não foi possivel processar a requisição pois os status do curso não foi informado de forma certa.'
    }else{
        let course = dateJson.getStatusCourseRDS(statusCourse)
        if(course){
            statusCode = 200
            courseStatusJson = course
        }else{
            statusCode = 400
            courseStatusJson = 'Status não localizado.'
        }
    }

    response.status(statusCode)
    response.json(courseStatusJson)
})

//EndPoint para listar todos os alunos de redes deacordo com o ano espeficico 
//app.get('/v1/lion-school/alunos/curso/rds/ano-finalizacao', cors(), async function(request,response,next){
app.get('https://lionschool.onrender.com/v1/lion-school/alunos/curso/rds/ano-finalizacao', cors(), async function(request,response,next){
    let year = request.query.ano
    let studentsJson = {}
    let statusCode

    if(year == undefined || year == '' || isNaN(year)){
        statusCode = 400
        studentsJson.message = 'Não foi possivel localizar os alunos de determinada data, pois a data não foi informada de forma certa'
    }else{
        let students = dateJson.getConclusionCourseRDS(year)
        if(students){
            statusCode = 200
            studentsJson = students
        }else{
            statusCode = 400
            studentsJson.message = 'Alunos não localizados, tente novamente'
        }

    }

    response.status(statusCode)
    response.json(studentsJson)
})

app.listen(8080, function () {
    console.log('Servidor Aguardando requisições')
})