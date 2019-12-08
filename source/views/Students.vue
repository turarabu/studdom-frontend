<template lang="pug">

div#students

    div( class='controls-div' )
        span 
        SearchList( v-bind='{ list }' v-model='useDor' )

    table( class='all-dormitories' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) Полное имя
                th( class='data' ) Общежитие
                th( class='data' ) Регистрация
                th( class='data' ) Активный
                th( class='data' ) Посещений
            
        tbody( class='body' )
            tr( v-for='(stud, id) in sorted' class='row' :key='id' )
                td( class='data' ) {{ stud[0] }}
                td( class='data' ) {{ stud[1] }}
                td( class='data' ) {{ stud[2] }}
                td( class='data' )
                    Switcher( :value='stud[4]' )
                td( class='data' ) {{ stud[4] }}

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
    components: { Button, Switcher, SearchList },
    computed: { all, sorted, list },
    data: function () {
        return {
            useDor: '',
            studs: [
                ['Амантай Аубакиров', 'ВКГТУ', '25-12-2019', true, 4213],
                ['Калиев Жарылкасын', 'ВКГТУ', '25-12-2019', true, 1241],
                ['Попов Машрал', 'ВКГТУ', '25-12-2019', true, 3242],
                ['Алиев Берен', 'ВКГТУ', '25-12-2019', true, 2341],
                ['Султанов Ахан', 'ВКГТУ', '25-12-2019', true, 1251],
                ['Амангельды Ордабай', 'ВКГТУ', '25-12-2019', true, 3451],
                ['Абдуллаев Кайыргали', 'ВКГТУ', '25-12-2019', true, 2431],
                ['Ахметов Рашит', 'ВКГТУ', '25-12-2019', true, 3412],
                ['Калиев Медеу', 'ВКГТУ', '25-12-2019', true, 1324],
                ['Оспанов Мардан', 'ВКГТУ', '25-12-2019', true, 1243],
                ['Амангельды Дандай', 'ЕНУ', '25-12-2019', true, 2145],
                ['Сулейменов Уали', 'ЕНУ', '25-12-2019', true, 1422],
                ['Амангельды Бахыт', 'ЕНУ', '25-12-2019', true, 2144],
                ['Сулейменов Нахып', 'ЕНУ', '25-12-2019', true, 1244],
                ['Каримов Монке', 'ВКГТУ', '25-12-2019', true, 4512],
                ['Омаров Наби', 'ВКГТУ', '25-12-2019', true, 6831],
                ['Смагулов Асан', 'ВКГТУ', '25-12-2019', true, 2154],
                ['Искаков Азамат', 'ВКГТУ', '25-12-2019', true, 3541],
                ['Калиев Шона', 'ВКГТУ', '25-12-2019', true, 2414],
                ['Ибрагимов Сырым', 'ВКГТУ', '25-12-2019', true, 3351],
                ['Садыков Бактияр', 'ВКГТУ', '25-12-2019', true, 2522],
                ['Мурат Ахмет', 'ВКГТУ', '25-12-2019', true, 4531],
                ['Каримов Нурпейіс', 'ВКГТУ', '25-12-2019', true, 2541],
                ['Садыков Арыстан', 'ВКГТУ', '25-12-2019', true, 3452]
            ]
        }
    }
}

function sorted () {
    var list = []

    if ( this.studs != undefined )
        this.studs.forEach(stud => {
            if ( stud[1].startsWith(this.useDor || '') )
                list.push(stud)
        })

    return list
}

function all () {
    var count = 0

    if ( this.sorted != undefined )
        this.sorted.forEach(stud => {
            count += stud[4]
        })

    return count
}

function list () {
    var all = []

    if ( this.studs != undefined )
        this.studs.forEach(stud => {
            if ( all.includes( stud[1] ) === false )
                all.push( stud[1] )
        })

    return all
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