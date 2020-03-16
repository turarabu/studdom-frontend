<template lang="pug">

div#students

    div( class='controls-div' )
        SearchList( v-bind='{ list: getDNames() }' v-model='searchBy.dormitory' )

    table( class='all-dormitories' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) Полное имя
                th( class='data' ) Общежитие
                th( class='data' ) Регистрация
                th( class='data' ) Активный
                th( class='data' ) Посещений
            
        tbody( class='body' )
            tr( v-for='(student, id) in sorted' class='row' :key='id' )
                td( class='data' ) {{ student.lastName }} {{ student.firstName }}
                td( class='data' ) {{ getDormitory(student.dormitory) }}
                td( class='data' ) {{ toDate(student.signUp) }}
                td( class='data' )
                    Switcher( @input='setStatus(student.iin, $event)' :value='student.active' )
                td( class='data' ) {{ student.signs }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' colspan='4' ) Всего
                td( class='data' ) {{ all }}

</template>

<script>
import Button from ':src/components/UI/Button.vue'
import Switcher from ':src/components/UI/Switcher.vue'
import SearchList from ':src/components/UI/SearchList.vue'

export default {
    name: 'Students',
    components: { Button, Switcher, SearchList },
    computed: { students, dormitories, all, sorted },
    methods: { setStatus, getDormitory, getDNames, toDate },
    beforeCreate: init,
    mounted: start,
    data: function () {
        return {
            searchBy: {
                dormitory: '',
                dormitoryCode: ''
            }
        }
    }
}

function init () {
    if ( this.$store.state.students.loaded === false )
        (async () => {
            var { data } = await this.api.get('student/all')

            this.$store.commit('students-set', data)
            this.$store.commit('students-loaded', true)
        })()

    if ( this.$store.state.dormitories.loaded === false )
        (async () => {
            var { data } = await this.api.get('dormitory/list')

            this.$store.commit('dormitories-set', data)
            this.$store.commit('dormitories-loaded', true)
            this.$forceUpdate()
        })()
}

function students () {
    return this.$store.state.students.list
}

function dormitories () {
    var list = []

    this.$store.state.dormitories.list.forEach(dormitory => {
        list.push(dormitory)
    })

    return list
}

function sorted () {
    var list = []

    if ( this.students != undefined )
        this.students.forEach(studend => {
            if ( studend.dormitory.startsWith(this.searchBy.dormitoryCode || '') )
                list.push(studend)
        })

    return list
}

function all () {
    var count = 0

    if ( this.sorted != undefined )
        this.sorted.forEach(studend => {
            count += studend.signs
        })

    return count
}

async function setStatus (student, { value, lock }) {
    lock(true)

    var { success } = await this.api.post('student/set', {
        iin: student,
        active: value
    })

    if ( success === true ) {
        this.$store.commit('student-update', {
            iin: student,
            assign: {
                active: value
            }
        })

        return lock(false)
    }
}

function getDormitory (code) {
    if ( this.dormitories == undefined )
        return ''
    
    for ( let dormitory of this.dormitories ) {
        if ( dormitory.code === code ) {
            return dormitory.name
        }
    }
}

function getDNames () {
    var list = []

    this.dormitories.forEach(dormitory => {
        list.push(dormitory.name)
    })

    return list
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

function start () {
    this.$watch('searchBy.dormitory', name => {
        if ( name === '' )
            return this.searchBy.dormitoryCode = ''

        else for ( let dormitory of this.dormitories ) {
            if ( dormitory.name == name )
                return this.searchBy.dormitoryCode = dormitory.code
        }
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#students

    .controls-div 
        align-items center
        display flex
        justify-content space-between

    .all-dormitories
        border-collapse collapse
        margin 42px 0
        width 100%

        .not-body
            &.head
                border-bottom 1px solid $light-gray
            &.foot
                border-top 1px solid $light-gray

                .data
                    padding-top 4px

            .data
                font-weight 500
                padding 8px 12px

        .body
            &:before, &:after
                content ''
                display block
                height 8px

            .data:last-child
                font-weight 500

            .row
                cursor pointer
                &:hover
                    background lighten($light-gray, 25)

        .data
            font-size 24px   
            padding 4px 12px
            text-align left
            &:last-child
                text-align right
</style>