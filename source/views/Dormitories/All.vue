<template lang="pug">
    
    table( class='all-dormitories' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) Название
                th( class='data' ) Город
                th( class='data' ) Студентов
                th( class='data' ) Активность
                th( class='data' ) Посещений
            
        tbody( class='body' )
            router-link( v-for='(dor, id) of dors' tag='tr' class='row' :to='`/dormitories/id/${id}`' :key='id' )
                td( class='data' ) {{ dor[0] }}
                td( class='data' ) {{ dor[1] }}
                td( class='data' ) {{ dor[2] }}
                td( class='data' )
                    ProgressBar( :value='dor[3]' )
                td( class='data' ) {{ dor[4] }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' colspan='4' ) Всего
                td( class='data' ) {{ all }}
</template>

<script>
import ProgressBar from ':src/components/UI/ProgressBar.vue'

export default {
    components: { ProgressBar },
    computed: { all },
    data: function () {
        return {
            dors: [
                ['ВКГТУ', 'Усть-Каменогорск', 2456, 23, 14156],
                ['КАРГУ', 'Караганда', 1245, 43, 54861],
                ['СГРК', 'Семей', 6546, 61, 23156],
                ['МГУ', 'Москва', 7685, 11, 14167],
                ['СГПИ', 'Санкт-Петербугр', 2182, 23, 56441],
                ['МУА', 'Нур-Султан (Астана)', 2253, 23, 54646],
                ['ЕНУ', 'Нур-Султан (Астана)', 4223, 23, 4562]
            ]
        }
    }
}

function all () {
    var count = 0

    if ( this.dors != undefined ) {
        for (let dor of this.dors)
            count += dor[4]
    } 

    return count
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

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