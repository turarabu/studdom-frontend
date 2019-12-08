<template lang='pug'>
    div( class='create-report' )
        p( class='bold-text' ) Пероид отчётности
        div( class='period-div' )
            input( class='datepicker' type='date' placeholder='С' )
            input( class='datepicker' type='date' placeholder='По' )

        div( class='blocks-div' )
            div( class='block' )
                div( class='bold-text-div' )
                    p( class='bold-text' ) Вид отчётности
                div( class='options-div' )
                    OptionsList( :list='reportTypes' name='reportType' v-model='selected.report' )

                Button( icon='upload' title='Выгрузить в формате PDF' background='green' icon-top='3px' )


            div( class='block' )
                div( class='bold-text-div' )
                    p( class='bold-text' ) Субъекты отчётности
                    input( class='search' placeholder='Поиск субъекта...' v-model='search' )

                div( class='options-div' )
                    OptionsList( v-if='sortedDormitories.length > 0' :list='sortedDormitories' name='dormitory' v-model='selected.report' )
                    span( v-else class='not-found' ) Не найдено

</template>

<script>
import Button from ':src/components/UI/Button.vue'
import OptionsList from ':src/components/UI/OptionsList.vue'

export default {
    components: { Button, OptionsList },
    computed: { sortedDormitories },
    mounted: start,
    data: function () {
        return {
            search: '',
            selected: {
                report: 0,
                dormitory: 0
            },

            reportTypes: [
                'Статистика по авторизациям',
                'Статистика по регистрациям',
                'Свободный отчет по общежитиям',
                'Отчет по терминалам',
            ],

            dormitories: [
                'Все общежития',
                'ВКГТУ',
                'КАЗАТУ',
                'ЕНУ',
                'ВКГТУ',
                'КАЗНТУ',
            ]
        }
    }
}

function sortedDormitories () {
    var list = []

    if ( this.dormitories !== undefined )
        this.dormitories.forEach(dormitory => {
            if ( dormitory.toLowerCase().search( (this.search || '').toLowerCase() ) > -1 )
                list.push(dormitory)
        })

    return list
}

function start () {
    this.$watch('search', () => {
        this.selected.dormitory = 0
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.create-report

    .bold-text
        font-size 18px
        font-weight 500
        margin 4px 0

    .datepicker
        border 1px solid $light-gray
        border-radius 3px
        font-size 18px
        padding 6px 12px
        margin-right 8px

    .blocks-div
        align-items flex-start
        display flex
        justify-content space-between
        margin 24px 0

        .block
            width calc(50% - 10px)

        .options-div
            border 1px solid $light-gray
            border-radius 5px
            margin-bottom 12px
            padding 16px

        .bold-text-div
            align-items flex-end
            display flex
            justify-content space-between
            height 40px
            margin-bottom 8px

        .search
            border 1px solid lighten($light-gray, 10)
            border-radius 3px
            font-size 18px
            outline none
            padding 8px 12px
            width 320px
            &:focus
                border-color darken($light-gray, 10)

        .not-found
            color darken($light-gray, 20)

</style>