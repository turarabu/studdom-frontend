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
                tr( v-for='(record, index) in records' class='row' :class='{ active: selected === record.id }' :key='record._id' @click='selected = record.id' )
                    td( class='data' ) {{ index+1 }}
                    td( class='data' ) {{ record.userName }}
                    td( class='data' ) {{ getDate(record.date) }}
                    td( class='data' ) {{ getType(record.recordType) }}
                    td( class='data' ) {{ record.dormitory }}
                    td( class='data' ) С {{ getPeriod(record.from) }}
                        br
                        span По {{ getPeriod(record.to) }}

        Button( v-if='selected !== false' icon='upload' title='Скачать формате PDF' background='green' icon-top='3px' @click.native='download' )


</template>

<script>
import Button from ':src/components/UI/Button.vue'
import OptionsList from ':src/components/UI/OptionsList.vue'

export default {
    components: { Button },
    methods: { download, getDate, getType, getPeriod },
    mounted: start,
    data: function () {
        return {
            active: 0,
            selected: false,
            records: []
        }
    }
}

function download () {
    window.open('https://api.studdom.host/record/download?id=' + this.selected, '_blank')
}

function getDate (date) {
    return new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}

function getType (type) {
    var types = {
        'sign-in': 'Статистика по авторизациям',
        'sign-up': 'Статистика по регистрациям',
        'consolidate': 'Сводный отчет по общежитиям',
        'turnstiles': 'Отчет по терминалам'
    }

    return types[type]
}

function getPeriod (from) {
    return new Date(from).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

async function start () {
    let { data } = await this.api.get('record/list')
    this.records = data
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