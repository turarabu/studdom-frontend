<template lang='pug'>

    div( class='download-report' )
        p( class='bold-text' ) Пероид отчётности
        div( class='period-div' )
            input( class='datepicker' type='date' placeholder='С' )
            input( class='datepicker' type='date' placeholder='По' )

        table( class='records-table' )
            thead( class='head' )
                tr( class='row' )
                    th( class='data' ) Номер отчёта
                    th( class='data' ) Пользователь
                    th( class='data' ) Дата
                    th( class='data' ) Вид отчёта
                    th( class='data' ) Субъект отчёта
                    th( class='data' ) Периоды

            tbody( class='body' )
                tr( v-for='(row, id) in records' class='row' :class='{ active: selected === id }' :key='id' @click='selected = id' )
                    td( v-for='(data, id) in row' class='data' :key='id' ) {{ data }}

        Button( v-if='selected !== false' icon='upload' title='Скачать формате PDF' background='green' icon-top='3px' )


</template>

<script>
import Button from ':src/components/UI/Button.vue'
import OptionsList from ':src/components/UI/OptionsList.vue'

export default {
    components: { Button },
    data: function () {
        return {
            active: 0,
            selected: false,
            records: [
                ['№1234', 'Ибраимов Аскар Изимбаевич', '25-12-2019', 'Статистика по авторизациям', 'ВКГТУ', 'С 20-12-2019, По 25-12-2019'],
                ['№1235', 'Ибраимов Аскар Изимбаевич', '25-12-2019', 'Статистика по регистрациям', 'ВКГТУ', 'С 20-12-2019, По 25-12-2019'],
                ['№1236', 'Ибраимов Аскар Изимбаевич', '25-12-2019', 'Свободный отчет по общежитиям', 'ВКГТУ', 'С 20-12-2019, По 25-12-2019'],
                ['№1237', 'Ибраимов Аскар Изимбаевич', '25-12-2019', 'Отчет по терминалам', 'ВКГТУ', 'С 20-12-2019, По 25-12-2019'],
            ]
        }
    }
}

</script>

<style lang='stylus'>
@import '~src/style/palette'

.download-report

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

    .records-table
        border 1px solid $light-gray
        border-radius 5px
        border-collapse collapse
        margin 24px 0
        width 100%

        .head .data
            border-bottom 1px solid $light-gray
            font-weight 500
            padding 12px

        .data
            font-size 18px
            padding 8px 12px
            text-align left
            &:last-child
                text-align right

        .body .row
            cursor pointer
            &:hover
                background lighten($light-gray, 25)
            &.active
                background lighten($light-gray, 20)

</style>