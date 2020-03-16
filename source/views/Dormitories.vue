<template lang="pug">
    div#about
        div( v-if='dormitory === undefined' class='controls-div' )
            Button( icon='plus' title='Добавить общежитие' background='blue' icon-top='2px' @click.native='openModal(true)' )
            //- Button( icon='export-report' title='Выгрузить отчёт' background='green' )

        div( v-else class='controls-div' )
            div( class='block' )
                router-link( tag='label' to='/dormitories' )
                    Button( icon='arrow-back' title='Назад к общежитиям' background='blue' icon-top='3px' )
                span( class='current-der' ) Общежитие: {{ dormitory.name }}

            div( class='block' )
                input( class='range-datepicker' type='date' placeholder='C' )
                input( class='range-datepicker' type='date' placeholder='По' )
                Button( icon='edit' title='Редактировать' background='green' icon-top='1px' @click.native='openModal(false)' )
                Button( class='margin-left' icon='create' title='Добавить турникет' background='green' icon-top='1px' @click.native='openTurnstileModal(true)' )

        router-view
</template>

<script>
import Button from ':src/components/UI/Button.vue'

export default {
    components: { Button },
    computed: { dors, dormitory },
    methods: { back, openModal, openTurnstileModal },
    mounted: start
}

function dors () {
    return this.$store.state.dormitories.list
}

function dormitory () {
    return this.dors.find(d => d.code && d.code === this.$route.params.id)
}

function back () {
    this.$router.back()
}

function openModal (isNew) {
    if ( isNew === true ) {
        this.$store.commit('openModal', {
            name: 'createDormitory',
            data: {}
        })
    }

    else {
        this.$store.commit('openModal', {
            name: 'editDormitory',
            data: this.dormitory
        })
    }
}
function openTurnstileModal (isNew) {
    if ( isNew === true ) {
        this.$store.commit('openModal', {
            name: 'createTurnstile',
            data: {
                dormitory: this.dormitory.code
            }
        })
    }

    else {
        this.$store.commit('openModal', {
            name: 'editTurnstile',
            data: {}
        })
    }
}

async function start () {
    var { data } = await this.api.get('dormitory/list')
    this.$store.commit('dormitories-set', data)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#about

    .controls-div 
        align-items center
        display flex
        justify-content space-between

        .block
            align-items center
            display flex

        .current-der
            display block
            font-size 24px
            font-weight 500
            margin-left 64px

        .range-datepicker
            display none
            border 1px solid $light-gray
            border-radius 3px
            font-size 18px
            padding 6px 12px
            margin 0 8px
.margin-left
    margin-left 10px

</style>