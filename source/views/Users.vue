<template lang="pug">

div#students

    div( class='controls-div' )
            Button( icon='plus' title='Создать пользователя' background='blue' icon-top='2px' @click.native='addUser()' )
            input( class='user-search' placeholder='Поиск по имени...' v-model='search' )

    table( class='all-dormitories' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) Полное имя
                th( class='data' ) Должность
                th( class='data' ) Уровень доступа
                th( class='data' ) Посещений
            
        tbody( class='body' )
            tr( v-for='(user, id) in sorted' v-if='user' class='row' :key='id' @click='editUser(id)' :q='id' )
                td( class='data' ) {{ user[0] }} {{ user[1] }}
                td( class='data' ) {{ user[3] }}
                td( class='data' ) {{ user[4] }}
                td( class='data' ) {{ user[6] }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' colspan='3' ) Всего
                td( class='data' ) {{ all }}
</template>

<script>
import Button from ':src/components/UI/Button.vue'

export default {
    components: { Button },
    computed: { last, sorted, all },
    methods: { addUser, editUser },
    mounted: start,
    data: function () {
        return {
            lastU: 0,
            search: '',
            useDor: '',
            users: this.$store.state.list.users
        }
    }
}

function last () {
    return this.$store.state.last
}

function sorted () {
    if ( this.lastU ) {}

    var list = []

    if ( this.users != undefined )
        this.users.forEach((user, index) => {
            if ( user[0].toLowerCase().search( this.search.toLowerCase() || '' ) > -1 )
                list[index] = user
        })

    return list
}

function all () {
    var count = 0

    if ( this.sorted != undefined )
        this.sorted.forEach(user => {
            count += user[6] || 0
        })

    return count
}

function addUser () {
    this.$store.commit('openModal', {
        name: 'createUser',
        data: {}
    })
}

function editUser (id) {
    var user = this.users[id]
    var name = user[0].split(0)

    this.$store.commit('openModal', {
        name: 'createUser',
        data: { id }
    })
}

function start () {
    this.$watch('last', (last) => {
        this.users = this.$store.state.list.users
        this.lastU = last
        this.$forceUpdate()
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

        .user-search
            border 1px solid lighten($light-gray, 10)
            border-radius 3px
            font-size 18px
            outline none
            padding 10px 14px
            width 320px
            &:focus
                border-color darken($light-gray, 10)

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