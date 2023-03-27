/************************************************************************************
 * Objetivo: Realizar a programação de funções que serão usadas para consumir o json, 
 * e retorna o valor para o front-end.
 * Autor: Gustavo Henrique
 * Data: 03/03/2023
 * Versão: 1.0
 ************************************************************************************/

//A função require do Node.js é para importar arquivos JSON 
const courses = require('./json/cursos.js')
const students = require('./json/alunos.js')

//Função responsavel por retorna as informações de uma lista de todos os cursos da escola
const getInfoCourses = function () {

    const coursesJson = {}
    const coursesArray = []
    let status = false

    courses.forEach(function (course) {
        status = true
        const infCourse = {}
        infCourse.nome = course.nome
        infCourse.sigla = course.sigla
        infCourse.icone = course.icone
        infCourse.carga = course.carga
        coursesArray.push(infCourse)
    })

    coursesJson.cursos = coursesArray

    if (status) {
        return coursesJson
    } else {
        return status
    }
}
//console.log(getInfoCourses())

//Função responsavel por recuperar uma lista de todos os dados dos alunos matriculados na escola
const getAllStudentsMatriculate = function () {
    const studentsJson = {}
    const studentsArray = []

    let status = false

    students.forEach(function (infStudents) {
        status = true
        const infStudentJson = {
            foto: infStudents.foto,
            nome: infStudents.nome,
            matricula: infStudents.matricula,
            sexo: infStudents.sexo
        }

        infStudents.curso.forEach(function (infCourse){
            const infCourseArray = []
            const infCourseJson = {
                nome: infCourse.nome,
                sigla: infCourse.sigla,
                icone: infCourse.icone,
                carga: infCourse.carga,
                conclusao: infCourse.conclusao
            }
            infCourseArray.push(infCourseJson)
            infStudentJson.curso = infCourseArray
            infStudentJson.status = infStudents.status

            const infDisciplineArray = []
            infCourse.disciplinas.forEach(function(infDiscipline){
                const infDisciplineJson = {
                    nome: infDiscipline.nome,
                    carga: infDiscipline.carga,
                    media: infDiscipline.media,
                    status: infDiscipline.status
                }
                infDisciplineArray.push(infDisciplineJson)
                infCourseJson.disciplinas = infDisciplineArray
            })
        })
        studentsArray.push(infStudentJson)
    })
    studentsJson.alunos = studentsArray
    
    if(status){
        return studentsJson
    }else{
        return status
    }
}
//console.log(getAllStudentsMatriculate())

const getStudentMatriculate = function ($matriculate){
    const student = $matriculate
    const dateStudentJson = {}
    const dateStudentArray = []
    const infDisciplineArray = []
    const infCourseArray = []
    
    let status = false

    students.forEach(function(matriculate){
        if(student == matriculate.matricula){
            status = true
            let allDateStudent = {
                foto: matriculate.foto,
                nome: matriculate.nome,
                matricula: matriculate.matricula,
                sexo: matriculate.sexo
            }
            matriculate.curso.forEach(function(dateCourse){
                let infCourseJson = {
                    nome: dateCourse.nome,
                    sigla: dateCourse.sigla,
                    icone: dateCourse.icone,
                    carga: dateCourse.carga,
                    conclusao: dateCourse.conclusao
                }
                dateCourse.disciplinas.forEach(function(discipline){
                    let infDiscipline = {
                        nome: discipline.nome,
                        carga: discipline.carga,
                        media: discipline.media,
                        status: discipline.status
                    }
                    infDisciplineArray.push(infDiscipline)
                })
                infCourseJson.disciplinas = infDisciplineArray
                infCourseArray.push(infCourseJson)
                allDateStudent.curso = infCourseArray
            })
            allDateStudent.status = matriculate.status
            dateStudentArray.push(allDateStudent)
        }
    })
    dateStudentJson.aluno = dateStudentArray
    if(status){
        return dateStudentJson
    }else{
        return status
    }
}

//console.log(getStudentMatriculate('20151001007'))
module.exports = {
    getInfoCourses,
    getAllStudentsMatriculate,
    getStudentMatriculate
}