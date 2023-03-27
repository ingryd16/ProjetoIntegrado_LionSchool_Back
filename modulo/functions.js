/************************************************************************************
 * Objetivo: Realizar a programação de funções que serão usadas para consumir o json, 
 * e retorna o valor para o front-end.
 * Autor: Gustavo Henrique
 * Data: 03/03/2023
 * Versão: 1.0
 ************************************************************************************/

const courses = require('./json/cursos.js')
const students = require('./json/alunos.js')

//Função responsavel por retorna as informações dos cursos
const getInfoCourses = function (){

    coursesJson = {}
    coursesArray = []

    courses.forEach(function(course){
        infCourse = {}
        infCourse.nome = course.nome
        infCourse.sigla = course.sigla
        infCourse.icone = course.icone
        infCourse.carga = course.carga
        coursesArray.push(infCourse)
    })

    coursesJson.cursos = coursesArray
    console.log(coursesJson)

}

getInfoCourses()