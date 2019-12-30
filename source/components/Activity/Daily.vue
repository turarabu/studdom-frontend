<template lang='pug'>

    figure( class='highcharts-figure' )
        div#activity-3

</template>

<script>
const locale = ['ru', {
    month: 'short',
    day: 'numeric'
}]

export default {
    props: ['data', 'period'],
    methods: { update, getSignIns, getSignUps },
    mounted: start,
    data: function () {
        return {
            days: []
        }
    }
}

function getDays (period) {
    var list = []
    var begin = new Date(period[0])
    var end = new Date(period[1])
    var withMonth = begin.getMonth() != end.getMonth()
    var range = 0|(end-begin)/1000/60/60/24

    for ( let i = 0; i <= range; ++i ) {
        if ( withMonth === false )
            list.push( new Date(begin - 0 + 1000*60*60*24*i).getDate() )
        else list.push( new Date(begin - 0 + 1000*60*60*24*i).toLocaleDateString(...locale) )
    }
    
    // list.sort((a, b) => a - b)
    return list
}

function update () {
    Highcharts.chart('activity-3', {
        chart: { type: 'areaspline' },
        title: { text: '' },
        colors: ['#7cb5ec', '#f7a35c', '#90ed7d', '#8085e9', '#f44236'],
        exporting: { buttons: { contextButton: { enabled: false } } },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 60,
            y: 50,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            categories: this.days // Days
        },
        yAxis: { title: { text: '' } },
        tooltip: {
            shared: true
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [
            {
                name: 'Авторизации',
                data: this.getSignIns()
            },

            {
                name: 'Регистрации',
                data: this.getSignUps()
            },
        ]
    })
}

function getSignIns () {
    var list = []

    this.days.forEach(date => {
        let push = 0

        this.data.signIns.forEach(sign => {

            if ( typeof date === 'number' ) {
                if ( new Date(sign.date).getDate() === date )
                    ++push
            }

            else {
                if ( new Date(sign.date).toLocaleDateString(...locale) === date )
                    ++push
            }
            
        })

        list.push(push)
    })

    return list
}

function getSignUps () {
    var list = []

    this.days.forEach(date => {
        let push = 0

        this.data.signUps.forEach(sign => {
            if ( typeof date === 'number' ) {
                if ( new Date(sign.signUp).getDate() === date ) {

                    ++push
                }
            }

            else {
                if ( new Date(sign.signUp).toLocaleDateString(...locale) === date )
                    ++push
            }
        })

        list.push(push)
    })

    return list
}

function start () {
    this.$watch('data', (value) => {
        this.days = getDays(this.period)
        this.update()
    })
}
</script>