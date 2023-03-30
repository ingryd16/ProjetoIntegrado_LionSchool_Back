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
const getInfoAllStudentsMatriculate = function () {
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

        infStudents.curso.forEach(function (infCourse) {
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
            infCourse.disciplinas.forEach(function (infDiscipline) {
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

    if (status) {
        return studentsJson
    } else {
        return status
    }
}
//console.log(getInfoAllStudentsMatriculate())

const getNameImageAllStudents = function () {
    const studentsJson = {}
    const studentsArray = []
    let status = false

    students.forEach(function ($infStudents) {
        status = true
        let infStudent = {}
        infStudent.foto = $infStudents.foto
        infStudent.nome = $infStudents.nome
        studentsArray.push(infStudent)
    })

    studentsJson.alunos = studentsArray

    if (status) {
        return studentsJson
    } else {
        return status
    }
}
//console.log(getNameImageAllStudents())

const getStudentMatriculation = function ($matriculate) {
    const student = $matriculate
    const dateStudentJson = {}
    const dateStudentArray = []
    const infDisciplineArray = []
    const infCourseArray = []

    let status = false

    students.forEach(function (matriculate) {
        if (student == matriculate.matricula) {
            status = true
            let allDateStudent = {
                foto: matriculate.foto,
                nome: matriculate.nome,
                matricula: matriculate.matricula,
                sexo: matriculate.sexo
            }
            matriculate.curso.forEach(function (dateCourse) {
                let infCourseJson = {
                    nome: dateCourse.nome,
                    sigla: dateCourse.sigla,
                    icone: dateCourse.icone,
                    carga: dateCourse.carga,
                    conclusao: dateCourse.conclusao
                }
                dateCourse.disciplinas.forEach(function (discipline) {
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
    if (status) {
        return dateStudentJson
    } else {
        return status
    }
}
//console.log(getStudentMatriculate('20151001007'))

const getStudentsCourseEspecific = function ($siglaCourse) {
    const allStudentsJson = {}
    const allStudentsArray = []
    let status = false

    students.forEach(function ($course) {

        $course.curso.forEach(function ($date) {
            if ($siglaCourse.toUpperCase() == $date.sigla.toUpperCase()) {
                status = true
                infStudent = {
                    foto: $course.foto,
                    nome: $course.nome,
                    matricula: $course.matricula,
                    sexo: $course.sexo
                }
                $course.curso.forEach(function ($dateCourse) {
                    infCourseArray = []
                    infCourse = {
                        nome: $dateCourse.nome,
                        sigla: $dateCourse.sigla,
                        icone: $dateCourse.icone,
                        carga: $dateCourse.carga,
                        conclusao: $dateCourse.conclusao
                    }

                    infDisciplineArray = []
                    $dateCourse.disciplinas.forEach(function ($dateDiscipline) {
                        const infDisciplineJson = {} //
                        infDisciplineJson.nome = $dateDiscipline.nome,
                            infDisciplineJson.carga = $dateDiscipline.carga,
                            infDisciplineJson.media = $dateDiscipline.media,
                            infDisciplineJson.status = $dateDiscipline.status

                        infDisciplineArray.push(infDisciplineJson)
                    })
                    infCourse.disciplinas = infDisciplineArray
                    infCourseArray.push(infCourse)
                    infStudent.curso = infCourseArray
                    infStudent.status = $course.status
                })
                allStudentsArray.push(infStudent)
            }
        })
    })


    allStudentsJson.alunos = allStudentsArray
    if (status) {
        return allStudentsJson
    } else {
        return status
    }
}
//getStudentsCourseEspecific('ds')

const getStudentsStatusEspecific = function ($status) {
    const allStudentsJson = {}
    const allStudentsArray = []
    let status = false

    students.forEach(function ($course) {
        if ($status.toUpperCase() == $course.status.toUpperCase()) {
                status = true
                infStudent = {
                    foto: $course.foto,
                    nome: $course.nome,
                    matricula: $course.matricula,
                    sexo: $course.sexo
                }
                $course.curso.forEach(function ($dateCourse) {
                    infCourseArray = []
                    infCourse = {
                        nome: $dateCourse.nome,
                        sigla: $dateCourse.sigla,
                        icone: $dateCourse.icone,
                        carga: $dateCourse.carga,
                        conclusao: $dateCourse.conclusao
                    }

                    infDisciplineArray = []
                    $dateCourse.disciplinas.forEach(function ($dateDiscipline) {
                        const infDisciplineJson = {} //
                        infDisciplineJson.nome = $dateDiscipline.nome,
                            infDisciplineJson.carga = $dateDiscipline.carga,
                            infDisciplineJson.media = $dateDiscipline.media,
                            infDisciplineJson.status = $dateDiscipline.status

                        infDisciplineArray.push(infDisciplineJson)
                    })
                    infCourse.disciplinas = infDisciplineArray
                    infCourseArray.push(infCourse)
                    infStudent.curso = infCourseArray
                    infStudent.status = $course.status
                })
                allStudentsArray.push(infStudent)
        }
    })


    allStudentsJson.alunos = allStudentsArray
    if (status) {
        return allStudentsJson
    } else {
        return status
    }
}
//console.log(getStudentsStatusEspecific('Finalizado'))
module.exports = {
    getInfoCourses,
    getInfoAllStudentsMatriculate,
    getNameImageAllStudents,
    getStudentMatriculation,
    getStudentsCourseEspecific,
    getStudentsStatusEspecific
}