<template lang='pug'>

    div#create-dormitory( class='modal' )
        h3( class='modal-title' ) Создание общежития

        form#form( class='blocks-div' @submit='save' )
            div( class='inputs-div' )
                InputText( class='create-input' placeholder='Название общежития' v-bind='{required: true}' v-model='dormitory.name' )
                Select( class='create-input' placeholder='Город' :list='cities' v-bind='{required: true}' v-model='dormitory.city' )
                InputText( class='create-input' placeholder='Вместимость (Человек)' pattern='[0-9]{1,6}' v-bind='{required: true}' v-model='dormitory.capacity' )
                InputText( class='create-input' placeholder='Координаты (Широта, Долгота)' v-bind='{required: true}' v-model='dormitory.coordinates' )
                InputText( class='create-input' placeholder='Логин пользователя' v-bind='{required: true}' v-model='dormitory.login' )
                InputText( class='create-input' type='password' placeholder='Пароль пользователя' v-bind='{required: true}' v-model='dormitory.password' )

            div( class='buttons-div' )
                Button( title='Отменить' background='red' icon-top='2px' @click.native='cancel' )
                Button( icon='create' title='Создать' background='green' icon-top='2px' )
                

</template>

<script>
import Button from ':src/components/UI/Button.vue'

import InputText from ':src/components/UI/Input/Text.vue'
import Select from ':src/components/UI/Input/Select.vue'

export default {
    props: ['id', 'data'],
    components: { InputText, Select, Button },
    computed: { cities },
    methods: { defaults, save, cancel },
    data: function () {
        return {
            dormitory: {
                name: '',
                city: 'astana',
                capacity: '',
                coordinates: '',
                login: '',
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

function defaults () {
    return {
        name: '',
        city: 'astana',
        capacity: '',
        coordinates: '',
        login: '',
        password: ''
    }
}

async function save (event) {
    if ( event && event.preventDefault )
        event.preventDefault()

    let empty = Object.keys(this.dormitory).find(key => {
        return this.dormitory[key] == false
    })

    if ( empty === undefined ) {
        let { data, success } = await this.api.post('dormitory/create', this.dormitory)

        if ( success === true ) {
            this.$store.commit('dormitories-set', data)
            this.dormitory = this.defaults()
            
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
        width 100%

    .buttons-div
        border-top 1px solid lighten($light-gray, 15)
        display flex
        justify-content space-between
        margin-top 8px
        padding-top 16px
        width 100%

    #form
        align-items flex-start
        display flex
        flex-direction column
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