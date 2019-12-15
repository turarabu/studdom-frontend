<template lang="pug">

div#students

    div( class='controls-div' )
            Button( v-if='canCreate' icon='plus' title='Создать пользователя' background='blue' icon-top='2px' @click.native='openModal(true)' )
            span( v-else )
            input( class='user-search' placeholder='Поиск по имени...' v-model='search' )

    table( class='all-dormitories' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) Полное имя
                th( class='data' ) Должность
                th( class='data' ) Уровень доступа
                th( class='data' ) Посещений
            
        tbody( class='body' )
            tr( v-for='(user, id) in sorted' class='row' :key='id' @click='openModal(false, user)' )
                td( class='data' ) {{ user.fullName }}
                td( class='data' ) {{ user.position }}
                td( class='data' ) {{ getLevel(user.type) }}
                td( class='data' ) {{ user.signs }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' colspan='3' ) Всего
                td( class='data' ) {{ all }}
</template>

<script>
import Button from ':src/components/UI/Button.vue'

export default {
    components: { Button },
    computed: { list, sorted, all },
    methods: { getLevel, openModal },
    mounted: start,
    data: function () {
        return {
            search: '',
            users: this.$store.state.user.list,
            canCreate: this.$store.state.user.data.type === 'admin'
        }
    }
}

function list () {
    var list = []

    this.$store.state.user.list.forEach(user => {
        let push = JSON.parse( JSON.stringify(user) )

        push.fullName = `${user.lastName} ${user.firstName} ${user.patronymic}`
        list.push(push)
    })

    return list
}

function sorted () {
    var list = []

    if ( this.list != undefined )
        this.list.forEach((user) => {
            if ( user.fullName.toLowerCase().search( this.search.toLowerCase() || '' ) > -1 )
                list.push(user)
        })

    return list
}

function all () {
    var count = 0

    if ( this.sorted != undefined )
        this.sorted.forEach(user => {
            count += user.signs || 0
        })

    return count
}

function getLevel (type) {
    if ( type === 'admin' )
        return 'Администратор'

    else return 'Управляющий'
}

function openModal (isNew, user) {
    if ( isNew === true ) {
        this.$store.commit('openModal', {
            name: 'createUser',
            data: {}
        })
    }

    else {
        this.$store.commit('openModal', {
            name: 'editUser',
            data: user
        })
    }
}

function editUser (id) {
    var user = this.users[id]
    var name = user[0].split(0)

    this.$store.commit('openModal', {
        name: 'createUser',
        data: { id }
    })
}

async function start () {
    var { data } = await this.api.get('user/list')
    this.$store.commit('users-list-set', data)
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