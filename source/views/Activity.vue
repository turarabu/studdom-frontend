<template lang="pug">
    div#activity
        div( class='first-line' )
            div( class='block' )
                SearchList( v-bind='{ list }' v-model='useDor' )
                div#calendar

            div( class='block' )
                h3( class='block-title' ) Активность по будням

                figure( class='highcharts-figure' )
                    div#activity-1

            div( class='block' )
                h3( class='block-title' ) Активность по выходным

                figure( class='highcharts-figure' )
                    div#activity-2

        div( class='second-line' )
            h3( class='block-title' ) Активность по дням
            DailyActivity

</template>

<script>
import SearchList from ':src/components/UI/SearchList.vue'
import DailyActivity from ':src/components/Activity/Daily.vue'

export default {
    components: { SearchList, DailyActivity },
    mounted: start,
    data: function () {
        return {
            datepicker: false,
            useDor: '',
            list: ['ВКГТУ', 'КАРГУ', 'СГРК', 'ЕНУ', 'КАЗНУ', 'ЮКГУ']
        }
    }
}

function start () {
    this.datepicker = $('#calendar').datepicker({
            range: true,
            toggleSelected: false,
        }).data('datepicker').selectDate([new Date(), new Date()])

    Highcharts.chart('activity-1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 340
        },
        title: {
            text: 'Декабрь',
            margin: 0
        },
        credits: { enabled: false },
        exporting: { buttons: { contextButton: { enabled: false } } },
        tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f}%',
                    distance: -50
                },
            }
        },
        
        series: [{
            colorByPoint: true,
            data: [
                { name: 'Входы', y: 1 },
                { name: 'Выходы', y: 0 },
                { name: 'Удаления', y: 0 },
                { name: 'Регистрации', y: 1 }
            ]
        }]
    })



    Highcharts.chart('activity-2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 340
        },
        title: { text: 'Декабрь' },
        credits: { enabled: false },
        exporting: { buttons: { contextButton: { enabled: false } } },
        tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f}%',
                    distance: -50
                },
            }
        },
        
        series: [{
            colorByPoint: true,
            data: [
                { name: 'Входы', y: 0 },
                { name: 'Выходы', y: 0 },
                { name: 'Удаления', y: 0 },
                { name: 'Регистрации', y: 0 }
            ]
        }]
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#activity

    .first-line
        align-items flex-start
        display flex
        justify-content space-between

    .second-line
        margin-top 32px

    .search-list-div
        width 382px

    .block
        width 380px

    .block-title
        background lighten($light-gray, 15)
        color darken($light-gray, 50)
        border-radius 5px
        font-size 24px
        font-weight 400
        margin-bottom 6px
        padding 18px 0
        text-align center
        text-transform uppercase

    #calendar
        margin 12px 0

        .datepicker
            width 100%

        .datepicker--nav
            font-size 20px
            font-weight 300
            padding 8px 4px

        .datepicker--cell
            margin 6px 0

        .datepicker--cell.-in-range-
            background RGBA(92, 196, 239, .25)
        
</style>