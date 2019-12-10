<template lang='pug'>
    div( class='second-level' )
        div( class='block' )
            div( class='diag-size-1 diag-size-3 texts' )
                div( class='home-data-line' )
                    span( class='key-title' ) Рост студентов
                        span( class='key-subtitle' ) За месяц

                    span( class='value blue' ) +1

                div( class='home-data-line' )
                    span( class='key-title' ) Рост посещений
                        span( class='key-subtitle' ) За месяц

                    span( class='value red' ) +1

                div( class='home-data-line' )
                    span( class='key-title' ) Посещений
                        span( class='key-subtitle' ) Студента в среднем за месяц

                    span( class='value purple' ) 1

            div( class='diag-size-1 diag-size-3' )
                figure( class='highcharts-figure' )
                    div#second-level-3

        div( class='diag-size-2' )
            figure( class='highcharts-figure' )
                div#second-level-2
</template>

<script>
var use = 1600
var screens = {
    1366: {
        height: 180,
        width: 300,
        fSize: '12px',
        lWidth: 140
    },

    1600: {
        height: 220,
        width: 440,
        fSize: '18px',
        lWidth: 220
    }
}


var screens2 = {
    1366: {
        height: 390,
        width: 670,
        fSize: '18px',
        lWidth: 140
    },

    1600: {
        height: 440,
        width: 850,
        fSize: '18px',
        lWidth: 220
    }
}

export default {
    props: ['use'],
    methods: { firstLevel2, firstLevel3 },
    mounted: start
}

function start () {
    use = this.use
    
    this.firstLevel2()
    this.firstLevel3()

    this.$watch('use', newUse => {
        use = newUse

        this.firstLevel2()
        this.firstLevel3()
    })
}

function firstLevel2 () {
    Highcharts.chart('second-level-2', {
        title: { text: 'Динамика авторизации за месяц' },
        subtitle: { text: new Date().toLocaleDateString('ru', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}) },
        credits: { enabled: false },
        legend: { enabled: false },
        yAxis: { title: { text: '' } },
        exporting: {
            buttons: { contextButton: { enabled: false } }
        },
        chart: {
            type: 'areaspline',
            height: screens2[use].height,
            width: screens2[use].width
        },

        plotOptions: {
            areaspline: { fillOpacity: 0.25 }
        },

        xAxis: {
            categories: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                '14',
                '15',
                '16',
                '17',
                '18',
                '19',
                '20',
                '21',
                '22',
                '23',
                '24',
                '25',
                '26',
                '27',
                '28',
                '29',
                '30',
                '31',
            ]
        },

        series: [{
            name: 'Авторизации',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
        }]
    })
}

function firstLevel3 () {
    Highcharts.chart('second-level-3', {
        title: {
            text: 'Активность за месяц',
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
            width: screens[use].lWidth,
            title: {
                text: '<span class="legend-line title"><span>Общежитие</span> <span class="value">Посещений</span></span>'
            },
            itemStyle: {
                display: 'inline-block',
                fontSize: screens[use].fSize,
                fontWeight: 400,
                width: screens[use].lWidth
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: screens[use].height,
            width: screens[use].width
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

.second-level
    align-items stretch
    display flex
    justify-content space-between

    .block
        width 33.3333%

.diag-size-2
    align-items center
    border 1px solid $light-gray
    display flex
    justify-content center
    height 400px
    width 66.6666%

.diag-size-3
    border-bottom none !important
    border-right none !important
    width 100% !important
    &:last-child
        border-bottom 1px solid $light-gray !important

@media (min-width: 1600px)

    .diag-size-2
        height 480px
    
</style>