<template lang='pug'>
    div( class='first-level' )
        div( class='diag-size-1 texts' )
            div( class='home-data-line' )
                span( class='key-title' ) Рост студентов
                    span( class='key-subtitle' ) За неделю

                span( class='value blue' ) +1

            div( class='home-data-line' )
                span( class='key-title' ) Рост посещений
                    span( class='key-subtitle' ) За неделю

                span( class='value red' ) +1

            div( class='home-data-line' )
                span( class='key-title' ) Посещений
                    span( class='key-subtitle' ) Студента в среднем за неделю

                span( class='value purple' ) 1

        div( class='diag-size-1' )
            figure( class='highcharts-figure' )
                div#first-level-2

        div( class='diag-size-1' )
            figure( class='highcharts-figure' )
                div#first-level-3
</template>

<script>
export default {
    methods: { firstLevel2, firstLevel3 },
    mounted: start
}

function start () {
    this.firstLevel2()
    this.firstLevel3()
}

function firstLevel2 () {
    Highcharts.chart('first-level-2', {
        title: { text: 'Динамика авторизации' },
        subtitle: { text: new Date().toLocaleDateString('ru', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}) },
        credits: { enabled: false },
        legend: { enabled: false },
        yAxis: { title: { text: '' } },
        exporting: {
            buttons: { contextButton: { enabled: false } }
        },
        chart: {
            type: 'areaspline',
            height: 220,
            width: 420
        },

        plotOptions: {
            areaspline: { fillOpacity: 0.25 }
        },

        xAxis: {
            categories: [
                'ПН',
                'ВТ',
                'СР',
                'ЧТ',
                'ПТ',
                'СБ',
                'ВС'
            ]
        },

        series: [{
            name: 'Авторизации',
            data: [1, 0]
        }]
    })
}

function firstLevel3 () {
    Highcharts.chart('first-level-3', {
        title: {
            text: 'Активность за неделю',
            margin: 16
        },
        credits: { enabled: false },
        exporting: {
            buttons: { contextButton: { enabled: false } }
        },
        legend: {
            useHTML: true,
            layout: 'vertical',
            enabled: true,
            align: 'right',
            labelFormat: '<span class="legend-line"><span>{name}</span> <span class="value">{percentage:.2f}%</span></span>',
            verticalAlign: 'middle',
            width: 220,
            title: {
                text: '<span class="legend-line title"><span>Общежитие</span> <span class="value">Посещений</span></span>'
            },
            itemStyle: {
                display: 'inline-block',
                fontSize: '18px',
                fontWeight: 400,
                width: 200
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 200,
            width: 420,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: { enabled: false },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'ВКГТУ',
                y: 1
            }, {
                name: 'КАРГУ',
                y: 0
            }, {
                name: 'СГРК',
                y: 0
            }, {
                name: 'ЕНУ',
                y:0
            }, {
                name: 'Другие',
                y:0
            }]
        }]
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.first-level
    align-items center
    display flex
    justify-content space-between
    margin 24px 0
</style>