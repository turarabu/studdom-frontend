<template lang='pug'>

    figure( class='highcharts-figure' )
        div#activity-3

</template>

<script>
export default {
    mounted: start
}

function start () {
    Highcharts.chart('activity-3', {
        chart: { type: 'areaspline' },
        title: { text: 'Просто красивый график, потому что нет данных' },
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
        series: [{
            name: 'Регистрации',
            data: [3, 4, 3, 5, 4, 10, 12, 1, 3, 4, 3, 3, 5, 4]
        }, {
            name: 'Авторизации',
            data: [1, 3, 4, 3, 3, 5, 4, 3, 4, 3, 5, 4, 2, 3, 4, 3, 3, 5, 4, 3, 4, 3, 5, 4]
        }]
    })
}
</script>