<template lang='pug'>

    div#create-dormitory( class='modal' )
        h3( class='modal-title' ) Редактирование общежития

        form#form( class='blocks-div' @submit='save' )
            div( class='inputs-div' )
                InputText( class='create-input' placeholder='Название общежития' v-model='dormitory.name' )
                Select( class='create-input' placeholder='Город' :list='cities' v-model='dormitory.city' )
                InputText( class='create-input' placeholder='Вместимость (Человек)' pattern='[0-9]{1,6}' v-model='dormitory.capacity' )
                InputText( class='create-input' placeholder='Координаты (Широта, Долгота)' v-model='dormitory.coordinates' )
                InputText( class='create-input' disabled placeholder='Логин пользователя' v-model='dormitory.login' )
                InputText( class='create-input' type='password' placeholder='Новый пароль пользователя' v-model='dormitory.password' )

            div( class='turns-div' )
                p( class='turns-title' ) Турникеты
                div( class='turns-list' )
                    div( class='head row' )
                        span( class='data' ) №
                        span( class='data' ) Название
                        span( class='data' ) Статус

                    div( class='row' )
                        span( class='data' ) 1
                        span( class='data' ) Главный вход
                        span( class='data' ) Активный

                    div( class='row' )
                        span( class='data' ) 2
                        span( class='data' ) Боковой вход
                        span( class='data' ) Активный

        div( class='buttons-div' )
            Button( title='Отменить' background='red' icon-top='2px' @click.native='cancel' )
            Button( icon='create' title='Сохранить' background='green' icon-top='2px' @click.native='save' )
                

</template>

<script>
import Button from ':src/components/UI/Button.vue'

import InputText from ':src/components/UI/Input/Text.vue'
import Select from ':src/components/UI/Input/Select.vue'

export default {
    props: ['id', 'data'],
    components: { InputText, Select, Button },
    computed: { cities },
    methods: { save, cancel },
    data: function () {
        function getCoordinates (coordinates) {
            if ( coordinates.x === undefined )
                return coordinates

            else return `${coordinates.x}, ${coordinates.y}`
        }

        return {
            dormitory: {
                code: this.data.code,
                name: this.data.name,
                city: this.data.city,
                capacity: this.data.capacity || this.data.limit,
                coordinates: getCoordinates(this.data.coordinates),
                login: this.data.login,
                password: ''
            }
        }
    }
}

function cities () {
    var list = {}

    this.$store.state.cities.forEach(city => {
        list[city.code] = city.name
    })

    return list
}

async function save (event) {
    if ( event && event.preventDefault )
        event.preventDefault()

    console.log(this.dormitory)

    let post = JSON.parse( JSON.stringify(this.dormitory) )
    let empty = Object.keys(post).find(key => {
        if ( key === 'password' && post[key] == false ) {
            delete post[key]
            return false
        }
        
        return post[key] == false
    })

    if ( empty === undefined ) {
        let { data, success } = await this.api.post('dormitory/update', post)

        if ( success === true ) {
            this.$store.commit('dormitories-set', data)
            
            return this.$store.commit("closeModal", this.id)
        }
    }

}

function cancel () {
    return this.$store.commit("closeModal", this.id)
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#create-dormitory
    padding 24px

    .create-input
        display block
        margin 12px 0

    .buttons-div
        border-top 1px solid lighten($light-gray, 15)
        display flex
        justify-content space-between
        margin-top 8px
        padding-top 16px

    #form
        align-items flex-start
        display flex
        justify-content space-between
        margin-top 18px

        .turns-div
            margin-left 16px
            position relative
            top -14px
            width 400px

        .turns-title
            color darken($light-gray, 25)
            font-size 16px
            font-weight 500

        .turns-list
            border 1px solid lighten($light-gray, 5)
            border-radius 5px
            margin-top 6px
            padding 6px 0

            .head
                padding-bottom 6px

                .data
                    font-weight 500

            .row
                display flex
                justify-content space-between

            .data
                padding 4px 12px
                text-align left
                width calc(100% - 40px - 140px - 3px)
                &:first-child
                    width 40px
                &:last-child
                    text-align right
                    width 140px

</style>