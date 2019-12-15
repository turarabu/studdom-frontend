<template lang='pug'>
    table( class='dormitories-table' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) ФИО
                th( class='data' ) Дата и время
                th( class='data' ) ИИН
            
        tbody( class='body' )
            tr( v-for='(student, id) in filtered' class='row' :key='id' )
                td( class='data' ) {{ student.lastName }} {{ student.firstName }}
                td( class='data' ) {{ toDate(student.signUp) }}
                td( class='data' ) {{ student.iin }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' colspan='2' ) Всего
                td( class='data' ) {{ all }}
</template>

<script>
export default {
    name: 'StudentsTable',
    props: ['dormitory'],
    computed: { students, filtered, all },
    methods: { toDate }
}

function students () {
    return this.$store.state.students.list
}

function filtered () {
    var list = this.$store.state.students.list
    var result = {}

    if ( this.students )
        Object.keys(list).forEach(id => {
            if ( list[id].dormitory === this.dormitory.code )
                result[id] = list[id]
        })

    return result
}

function all () {
    if ( this.students == undefined )
        return 0

    else return Object.keys(this.students).length
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