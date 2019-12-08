<template lang='pug'>
    div( class='concrette-dormitory' )
        div( class='tabs-div' )
            span( class='tab' :class='{ active: active === 0 }' @click='active = 0' ) Регистрации
            span( class='tab' :class='{ active: active === 1 }' @click='active = 1' ) Авторизации
            span( class='tab' :class='{ active: active === 2 }' @click='active = 2' ) Активность турникетов

        Table( :table='tables[active]' )
</template>

<script>
import Table from ':src/components/Dormitories/Table.vue'

export default {
    components: { Table },
    data: function () {
        return {
            active: 0,
            tables: [
                {
                    head: [{ value: 'ФИО' }, { value: 'Дата и время' }, { value: 'ИИН' }],
                    body: [
                        [{ value: 'Аманжолов Бахтияр'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }],
                        [{ value: 'Сериков Асет'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }],
                        [{ value: 'Жапарханов Алибек'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }],
                        [{ value: 'Мансуров Женис'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }],
                        [{ value: 'Алабаев Максат'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }],
                        [{ value: 'Жуспеков Жангур'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }],
                        [{ value: 'Алибеков Жасулан'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }]
                    ]
                },

                {
                    head: [{ value: 'ФИО' }, { value: 'Дата и время' }, { value: 'ИИН' }, { value: 'Турникет' }],
                    body: [
                        [{ value: 'Аманжолов Бахтияр'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Сериков Асет'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Жапарханов Алибек'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Мансуров Женис'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Алабаев Максат'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Жуспеков Жангур'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Аманжолов Бахтияр'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Сериков Асет'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Жапарханов Алибек'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Мансуров Женис'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Алабаев Максат'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Жуспеков Жангур'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Аманжолов Бахтияр'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Сериков Асет'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Жапарханов Алибек'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Мансуров Женис'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Алабаев Максат'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Жуспеков Жангур'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }],
                        [{ value: 'Алибеков Жасулан'}, { value: '25-12-2019 в 14:22' }, { value: '456145616551' }, { value: 'Главный вход' }]
                    ]
                },

                {
                    head: [{ value: 'Название' }, { value: 'Статус' }, { value: 'Дата и время последней авторизации' }],
                    body: [
                        [{ value: 'Главный вход'}, { value: 'Активный' }, { value: '25-12-2019 в 14:22' }],
                        [{ value: 'Черный вход'}, { value: 'Активный' }, { value: '25-12-2019 в 14:22' }],
                        [{ value: 'Боковой вход'}, { value: 'Активный' }, { value: '25-12-2019 в 14:22' }],
                        [{ value: 'Боковой вход 2'}, { value: 'Отключен' }, { value: '11-10-2019 в 14:22' }],
                        [{ value: 'Вход со спортплощадка'}, { value: 'Активный' }, { value: '25-12-2019 в 14:22' }]
                    ]
                }
            ]
        }
    }
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.concrette-dormitory

    .tabs-div
        border-bottom 1px solid $light-gray
        display flex
        margin 24px 0

        .tab
            border 1px solid transparent
            border-radius 5px 5px 0 0
            color $blue
            cursor pointer
            display block
            font-size 18px
            font-weight 300
            margin-bottom -1px
            padding 12px 72px
            text-transform uppercase
            &.active
                border 1px solid $light-gray
                border-bottom 1px solid $white
</style>