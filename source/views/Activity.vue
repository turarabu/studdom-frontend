<template lang="pug">
    div#activity
        div( class='first-line' )
            div( class='block' )
                SearchList( v-bind='{ list: dormitories }' v-model='useDor' )
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
            DailyActivity( :data='data' :period='period' )

</template>

<script>
import SearchList from ':src/components/UI/Input/Select.vue'
import DailyActivity from ':src/components/Activity/Daily.vue'

export default {
    components: { SearchList, DailyActivity },
    computed: { dormitories },
    methods: { update, updateFirst, updateSecond },
    mounted: start,
    data: function () {
        var to = new Date()
        var from = new Date( to - (1000 * 60 * 60 * 24 * 7) )
        
        return {
            period: [from, to],
            datepicker: false,
            useDor: 'vkgtu',
            data: {
                signUps: [],
                signIns: []
            },
        }
    }
}

function dormitories () {
    var list = {}

    this.$store.state.dormitories.list.forEach(dormitory => {
        list[ dormitory.code ] = dormitory.name
    })

    return list
}

async function update () {
    var { data } = await this.api.get('record/period', {
        from: this.period[0],
        to: this.period[1],
        dormitory: this.useDor
    })

    this.data = data

    this.updateFirst()
    this.updateSecond()
}

function updateFirst () {
    var months = []
    var signUps = 0
    var signIns = 0

    this.data.signUps.forEach(sign => {
        let date = new Date(sign.signUp)
        let month = date.toLocaleDateString('ru', { month: 'long' })
        let day = date.getDay()

        if ( months.includes( month ) === false )
            months.push(month)

        if ( (day === 0 || day === 6) === false )
            ++signUps
    })

    this.data.signIns.forEach(sign => {
        let date = new Date(sign.date).getDay()

        if ( (date === 0 || date === 6) === false )
            ++signIns
    })

    Highcharts.chart('activity-1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 340
        },

        title: { text: `${ months[0] } - ${ months[0] }` },
        credits: { enabled: false },
        exporting: { buttons: { contextButton: { enabled: false } } },
        tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b>' },
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
                { name: 'Авторизации', y: signIns },
                { name: 'Регистрации', y: signUps }
            ]
        }]
    })
}

function updateSecond () {
    var months = []
    var signUps = 0
    var signIns = 0

    this.data.signUps.forEach(sign => {
        let date = new Date(sign.signUp)
        let month = date.toLocaleDateString('ru', { month: 'long' })
        let day = date.getDay()

        if ( months.includes( month ) === false )
            months.push(month)

        if ( date === 0 || date === 6 )
            ++signUps
    })

    this.data.signIns.forEach(sign => {
        let date = new Date(sign.signUp).getDay()

        if ( date === 0 || date === 6 )
            ++signIns
    })

    Highcharts.chart('activity-2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 340
        },

        title: { text: `${ months[0] } - ${ months[ months.length - 1 ] }` },
        credits: { enabled: false },
        exporting: { buttons: { contextButton: { enabled: false } } },
        tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b>' },
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
                { name: 'Авторизации', y: signIns },
                { name: 'Регистрации', y: signUps }
            ]
        }]
    })
}

function start () {
    this.update()
    this.datepicker = $('#calendar').datepicker({
            range: true,
            toggleSelected: false,
            onSelect: (a, event) => {
                if ( event.length === 2 ) {
                    this.period = event
                    this.update()
                }
            }
        })

    this.datepicker.data('datepicker').selectDate(this.period)

    this.$watch('useDor', (...arg) => {
        this.update()
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
        min-width 322px

    .block
        width 320px

    .block-title
        background lighten($light-gray, 15)
        color darken($light-gray, 50)
        border-radius 5px
        font-size 18px
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
        
@media (min-width: 1600px)
    #activity

        .block-title
            font-size 24px

        .search-list-div
            min-width 382px

        .block
            width 380px

</style>