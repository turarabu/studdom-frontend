<template lang='pug'>

    div#create-user( class='modal' )
        h3( class='modal-title' ) Редактирование пользователя

        form#form( class='blocks-div' @submit='save' )
            div( class='inputs-div' )
                InputText( class='create-input' placeholder='Фамилия' v-model='user.lastName' )
                InputText( class='create-input' placeholder='Имя' v-model='user.firstName' )
                InputText( class='create-input' placeholder='Отчество' v-model='user.patronymic' )
                InputText( class='create-input' placeholder='ИИН' pattern='[0-9]{1,12}' v-model='user.iin' )
                InputText( class='create-input' placeholder='Телефон' pattern='((\\+|7|8)+([0-9]{0,}))' v-model='user.phone' )
                InputText( class='create-input' placeholder='Должность' v-model='user.position' )

                Select( class='create-input' placeholder='Уровень доступа' :searchable='false' :list='userTypes' v-model='user.type' )

            div( class='user-info-div' )
                div( class='avatar-div' )
                    img( class='avatar' :src='getAvatar(user.avatar)' )

                InputFile( class='create-input' accept='image/*' v-model='user.newAvatar' )

                InputText( class='create-input' disabled placeholder='Логин' v-model='user.login' )
                InputText( class='create-input' type='password' placeholder='Пароль' v-model='user.password' )
                InputText( class='create-input' type='password' placeholder='Повторите пароль' v-model='user.confirmPassword' )
            

        div( class='buttons-div' )
            Button( title='Отменить' background='red' icon-top='2px' @click.native='cancel' )
            Button( icon='create' title='Сохранить' background='green' icon-top='2px' @click.native='save' )
                

</template>

<script>
import Button from ':src/components/UI/Button.vue'

import InputText from ':src/components/UI/Input/Text.vue'
import InputFile from ':src/components/UI/Input/File.vue'
import Select from ':src/components/UI/Input/Select.vue'

export default {
    props: ['id', 'data'],
    components: { InputText, InputFile, Select, Button },
    computed: { cities },
    methods: { getAvatar, save, cancel },
    data: function () {
        return {
            userTypes: {
                admin: 'Администратор',
                manager: 'Управляющий'
            },

            user: this.data
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

function getAvatar (avatar) {
    if ( avatar == undefined || avatar == false )
        return '/images/avatar.png'
    
    else return 'data:image/png;base64, ' + avatar
}

async function save (event) {
    if ( event && event.preventDefault )
        event.preventDefault()

    if ( this.password !== this.confirmPassword )
        return

    var post = JSON.parse( JSON.stringify(this.user) )

    if ( this.newAvatar !== undefined )
        post.avatar = this.newAvatar

    let empty = Object.keys(this.user).find(key => {
        return false
        // if ( key === 'avatar' )
        //     return false

        // else return this.user[key] == false
    })
    
    if ( empty === undefined ) {
        let { data, success } = await this.api.post('user/update', post)

        if ( success === true ) {
            this.$store.commit('users-list-set', data)
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

#create-user
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

        .user-info-div
            margin-left 16px

    .avatar-div
        align-items center
        display flex
        justify-content center
        margin-bottom 8px

        .avatar
            max-height 400px
            max-width 100%

</style>