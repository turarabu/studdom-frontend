<template lang="pug">

div#students

    div( class='controls-div' )
            Button( icon='plus' title='Создать пользователя' background='blue' icon-top='2px' )
            input( class='user-search' placeholder='Поиск по имени...' v-model='search' )

    table( class='all-dormitories' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) Полное имя
                th( class='data' ) Должность
                th( class='data' ) Уровень доступа
                th( class='data' ) Посещений
            
        tbody( class='body' )
            tr( v-for='(user, id) in sorted' class='row' :key='id' )
                td( class='data' ) {{ user[0] }}
                td( class='data' ) {{ user[1] }}
                td( class='data' ) {{ user[2] }}
                td( class='data' ) {{ user[3] }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' colspan='3' ) Всего
                td( class='data' ) {{ all }}
</template>

<script>
import Button from ':src/components/UI/Button.vue'

export default {
    components: { Button },
    computed: { sorted, all },
    data: function () {
        return {
            search: '',
            useDor: '',
            users: [
                ['Попов Машрал', 'Президент', 'Администратор', 324],
                ['Алиев Берен', 'Зам. президент', 'Администратор', 234],
                ['Султанов Ахан', 'IT Администратор', 'Управляющий', 121],
                ['Амангельды Ордабай', 'Бухгалтер', 'Управляющий', 345],
                ['Абдуллаев Кайыргали', 'IT Администратор', 'Управляющий', 243],
                ['Ахметов Рашит', 'IT Администратор', 'Управляющий', 342],
                ['Калиев Медеу', 'Специалист', 'Пользователь', 124],
                ['Оспанов Мардан', 'Специалист', 'Пользователь', 123],
                ['Амангельды Дандай', 'Специалист', 'Пользователь', 215],
                ['Сулейменов Уали', 'Специалист', 'Пользователь', 142],
                ['Амангельды Бахыт', 'Специалист', 'Пользователь', 214],
                ['Сулейменов Нахып', 'Специалист', 'Пользователь', 124],
                ['Каримов Монке', 'Специалист', 'Пользователь', 451],
                ['Омаров Наби', 'Специалист', 'Пользователь', 683],
                ['Смагулов Асан', 'Специалист', 'Пользователь', 214],
                ['Искаков Азамат', 'Специалист', 'Пользователь', 351],
                ['Калиев Шона', 'Специалист', 'Пользователь', 241],
                ['Ибрагимов Сырым', 'Специалист', 'Пользователь', 335],
                ['Садыков Бактияр', 'Специалист', 'Пользователь', 222],
                ['Мурат Ахмет', 'Специалист', 'Пользователь', 453],
                ['Каримов Нурпейіс', 'Специалист', 'Пользователь', 251],
                ['Садыков Арыстан', 'Специалист', 'Пользователь', 345]
            ]
        }
    }
}

function sorted () {
    var list = []

    console.log('sorted')

    if ( this.users != undefined )
        this.users.forEach(user => {
            if ( user[0].toLowerCase().search( this.search.toLowerCase() || '' ) > -1 )
                list.push( user )
        })

    return list
}

function all () {
    var count = 0

    if ( this.sorted != undefined )
        this.sorted.forEach(user => {
            count += user[3]
        })

    return count
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