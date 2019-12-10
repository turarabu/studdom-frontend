<template lang='pug'>

    form( class='create-dormitory-modal modal-window' @submit='save' )
        div( class='modal-head' )
            p( class='modal-title' ) Создание/Редактирование общежития
            i( class='icon icon-plus' @click='$store.commit("closeModal", id)' )

        div( class='blocks-div' )
            div( class='block' )
                input( class='input' placeholder='Название общежития' v-model='dormitory.name' )

                select( class='select' required v-model='dormitory.city' )
                    option( v-for='(city, key) in cities' :value='key' ) {{ city }}

                input( class='input' type='number' min='1' v-model='dormitory.max' placeholder='Вместимость' )
                input( class='input' placeholder='Координаты' )
                input( class='input' placeholder='Токен для регистрации' )
                input( class='input' placeholder='Пароль для регистрации' )

            div( class='block right' )
                p( class='turns-text' ) Турникеты
                div( class='turns-list' )
                    div( class='thead' )
                        span( class='data' ) №
                        span( class='data name' ) Название
                        span( class='data status' ) Статус

                    div( v-for='(turn, id) in turns' class='tbody' :key='id' )
                        span( class='data' ) {{ turn.index }}
                        span( class='data name' ) {{ turn.name }}
                        span( class='data status' ) {{ getStatus(turn.status) }}
                
        div( class='buttons-div' )
            Button( type='button' title='Отмена' background='red' icon-top='2px' @click.native='$store.commit("closeModal", id)' )
            Button( icon='create' title='Сохранить' background='green' icon-top='2px' )

                    
    
</template>

<script>
import Button from ':src/components/UI/Button.vue'

export default {
    components: { Button },
    props: ['id', 'data'],
    computed: { cities, dormitories },
    methods: { getStatus, save },
    data: function () {
        console.log(this.dormitories, 'dormitories', this)
        var dors = this.$store.state.list.dormitories

        return {
            dormitory: JSON.parse( JSON.stringify(dors[this.data.id] || {}) ),
            turns: [
                { index: '101', name: 'Главный вход', status: true },
                { index: '102', name: 'Вход с корпуса', status: true },
                { index: '103', name: 'Чёрный вход', status: true },
                { index: '104', name: 'Боковой вход', status: true }
            ]
        }
    }
}

function getStatus (status) {
    return status === true ? 'Активный' : 'Отключен'
}

function cities () {
    return this.$store.state.list.cities
}

function dormitories () {
    return this.$store.state.list.dormitories
}

function save (event) {
    event.preventDefault()

    if ( this.data.id === undefined ) {
        this.$store.commit('editList', {
            list: 'dormitories',
            id: `${Object.keys(this.dormitories).length}`,
            value: this.dormitory
        })
    }

    else {
        this.$store.commit('editList', {
            list: 'dormitories',
            id: this.data.id,
            value: this.dormitory
        })   
    }
    
    return this.$store.commit("closeModal", this.id)


}
</script>

<style lang='stylus'>
@import '~src/style/palette'

$select-icon = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+'

.create-dormitory-modal
    
    .blocks-div
        align-items flex-start
        display flex
        justify-content space-between
        margin-top 16px

    .block.right
        margin-left 24px

    .input
        border 1px solid lighten($light-gray, 15)
        border-radius 5px
        display block
        font-size 18px
        margin 16px 0
        outline none
        padding 12px 16px
        width 320px
        &:hover
            border-color $light-gray

    .select
        appearance none
        background-image url($select-icon)
        background-position calc(100% - 6px) center
        background-repeat no-repeat
        border 1px solid lighten($light-gray, 15)
        border-radius 5px
        display block
        font-size 18px
        margin 16px 0
        outline none
        padding 12px 16px
        width 320px
        &:focus
            border-color $light-gray

    .turns-text
        color darken($light-gray, 15)
        display block
        font-size 18px
        font-weight 500
        margin -12px 0 6px 0

    .turns-list
        border 1px solid $light-gray
        border-radius 5px
        padding 8px 0

        .data
            display inline-block
            font-size 18px
            padding 4px 16px
            min-width 64px
            &:last-child
                padding-right 20px
                text-align right
            &.name
                width 200px
            &.status
                width 120px

        .thead
            border-bottom 1px solid lighten($light-gray, 10)
            margin-bottom 4px
            padding-bottom 4px

            .data
                font-weight 500
</style>