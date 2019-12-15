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

                span( class='value red' ) +{{ allSigns() }}

            div( class='home-data-line' )
                span( class='key-title' ) Посещений
                    span( class='key-subtitle' ) Студента в среднем за неделю

                span( class='value purple' ) {{ allSigns() }}

        div( class='diag-size-1' )
            figure( class='highcharts-figure' )
                div#first-level-2

        div( class='diag-size-1' )
            figure( class='highcharts-figure' )
                div#first-level-3
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
        width: 420,
        fSize: '18px',
        lWidth: 220
    }
}

export default {
    props: ['use'],
    methods: { getSigns, allSigns, getByDays, firstLevel2, firstLevel3 },
    mounted: start,
    data: function () {
        return {
            byDate: false
        }
    }
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

async function firstLevel2 () {
    var series = await this.getByDays('week')

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
            height: screens[use].height,
            width: screens[use].width
        },

        plotOptions: {
            areaspline: { fillOpacity: 0.25 }
        },

        xAxis: {
            categories: [
                'ВС',
                'ПН',
                'ВТ',
                'СР',
                'ЧТ',
                'ПТ',
                'СБ'
            ]
        },

        series: [{
            name: 'Авторизации',
            data: series
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
            name: 'Авторизации',
            colorByPoint: true,
            data: this.getSigns()
        }]
    })
}

function getSigns () {
    var result = []
    var dormitories = JSON.parse( JSON.stringify(this.$store.state.dormitories.list))
    dormitories.sort((a, b) => b.signs - a.signs)

    for (let i = 0; i != dormitories.length; ++i) {
        if ( i >= 4 ) {
            if ( result[4] === undefined )
                result[4] = { y: 0 }
                
            result[4].name = 'Другие'
            result[4].y += dormitories[i].signs || 0
        }

        else {
            result.push({
                name: dormitories[i].name,
                y: dormitories[i].signs
            })
        }
    }

    return result
}

function allSigns () {
    var dormitories = JSON.parse( JSON.stringify(this.$store.state.dormitories.list))
    var count = 0

    dormitories.forEach(dormitory => {
        count += (dormitory.signs.length === undefined)
            ? dormitory.signs
            : dormitory.signs.length
    })

    return count
}

async function getByDays (type) {
    return new Promise(async resolve => {
        let result = []

        if ( this.byDate === false ) {
            var { data } = await this.api.get('sign/list')
            this.byDate = data
            result = data[type]
        }

        else result = this.byDate[type]

        result.forEach((value, index) => {
            if (value === null)
                result[index] = 0
        })

        resolve(result)
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