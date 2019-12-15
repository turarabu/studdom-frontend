<template lang='pug'>
    table( class='dormitories-table' )
        thead( class='not-body head' )
            tr( class='row' )
                th( class='data' ) Название
                th( class='data' ) Статус
                th( class='data' ) Дата и время последней авторизации

        tbody( class='body' )
            tr( v-for='(turnstile, id) in turnstiles' class='row' :key='id' )
                td( class='data' ) {{ turnstile.name }}
                td( class='data' ) {{ turnstile.active ? 'Активный' : 'Отключен' }}
                td( class='data' ) {{ getLastActive(turnstile.id) }}

        tfoot( class='not-body foot' )
            tr( class='row' )
                th( class='data' colspan='2' ) Всего
                td( class='data' ) {{ all }}
</template>

<script>
export default {
    props: ['dormitory'],
    computed: { turnstiles, all },
    methods: { getLastActive, toDate }
}

function turnstiles () {
    return this.dormitory.turnstiles || []
}

function getLastActive (id) {
    var last = 0

    for ( let sign of this.dormitory.signs ) {
        if ( sign.turnstile == id ) {
            let date = new Date(sign.date)

            if ( date > last )
                last = date
        }
    }

    return this.toDate(last)
}

function all () {
    return this.dormitory.signs.length || 0
}

function toDate (string) {
    if ( string == 0 )
        return 'Никогда'

    else return new Date(string).toLocaleDateString('ru', {
        year: 'numeric',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric'
    }).replace(' г.', '')
}
</script>