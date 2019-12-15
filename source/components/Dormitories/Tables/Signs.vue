<template lang='pug'>
    table( class='dormitories-table' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) ФИО
                th( class='data' ) Дата и время
                th( class='data' ) ИИН
                th( class='data' ) Турникет

        tbody( class='body' )
            tr( v-for='(sign, id) in signs' class='row' :key='id' )
                td( class='data' ) {{ getStudentNames(sign.student) }}
                td( class='data' ) {{ toDate(sign.date) }}
                td( class='data' ) {{ sign.student }}
                td( class='data' ) {{ getTurnstile(sign.turnstile) }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' colspan='3' ) Всего
                td( class='data' ) {{ all }}
</template>

<script>
export default {
    props: ['dormitory'],
    computed: { signs, all },
    methods: { getStudentNames, getTurnstile, toDate }
}

function signs () {
    return this.dormitory.signs.length
        ? this.dormitory.signs : []
}

function getStudentNames (iin) {
    for ( let student of this.dormitory.students ) {
        if ( student.iin == iin )
            return `${ student.lastName } ${ student.firstName }`
    }
}

function getTurnstile (id) {
    for ( let turnstile of this.dormitory.turnstiles ) {
        if ( turnstile.id == id )
            return turnstile.name
    }
}

function all () {
    return this.dormitory.signs.length || 0
}

function toDate (string) {
    return new Date(string).toLocaleDateString('ru', {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric'
    }).replace(' г.', '')
}
</script>