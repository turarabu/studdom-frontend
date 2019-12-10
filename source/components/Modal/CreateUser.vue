<template lang='pug'>

    form( class='create-user-modal modal-window' @submit='save' )
        div( class='modal-head' )
            p( class='modal-title' ) Создание/Редактирование пользователя
            i( class='icon icon-plus' @click='$store.commit("closeModal", id)' )

        div( class='blocks-div' )
            div( class='block' )
                input( class='input' placeholder='Фамилия' required v-model='user[0]' )
                input( class='input' placeholder='Имя' required v-model='user[1]' )
                input( class='input' placeholder='Отчество' v-model='user[3]' )
                input( class='input' placeholder='ИИН' v-model='user[7]' )
                input( class='input' placeholder='Телефон' v-model='user[8]' )
                input( class='input' placeholder='Должность' required v-model='user[3]' )

            div( class='block right' )
                div( class='avatar-div' )
                    i( class='icon icon-users' )

                select( class='select' v-model='user[5]' required )
                    option( value='admin' ) Администратор
                    option( value='editor' ) Управляющий
                    option( value='user' ) Пользователь
                
                input( class='input' type='password' placeholder='Ноавый пароль' )
                input( class='input' type='password' placeholder='Новый пароль ещё раз' )
                
        div( class='buttons-div' )
            Button( type='button' title='Отмена' background='red' icon-top='2px' @click.native='$store.commit("closeModal", id)' )
            Button( icon='create' title='Сохранить' background='green' icon-top='2px' )


</template>

<script>
import Button from ':src/components/UI/Button.vue'

export default {
    components: { Button },
    props: ['id', 'data'],
    methods: { save },
    data: function () {
        var user = []

        if ( this.data !== undefined && this.data.id !== undefined ) {
            // console.log(this.data, this.$store.state.list.users)
            user = JSON.parse( JSON.stringify(this.$store.state.list.users[ this.data.id ]) )
        }

        return { user }
    }
}

function save (event) {
    event.preventDefault()

    if ( this.data.id === undefined ) {
        this.$store.commit('pushList', {
            list: 'users',
            value: [
                this.user[0],
                this.user[1],
                this.user[2],
                this.user[3],
                this.user[4] = (this.user[5] == 'admin' && 'Администратор' || this.user[5] == 'editor' && 'Управляющий' || 'Пользователь'),
                this.user[5],
                this.user[6],
                this.user[7],
                this.user[8]
            ]
        })
    }

    else {
        this.$store.commit('editList', {
            list: 'users',
            id: this.data.id,
            value: this.user
        })   
    }
    
    return this.$store.commit("closeModal", this.id)
}
</script>

<style lang="stylus">
@import '~src/style/palette'

$select-icon = 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSdibGFjaycgaGVpZ2h0PScyNCcgdmlld0JveD0nMCAwIDI0IDI0JyB3aWR0aD0nMjQnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZD0nTTcgMTBsNSA1IDUtNXonLz48cGF0aCBkPSdNMCAwaDI0djI0SDB6JyBmaWxsPSdub25lJy8+PC9zdmc+'

.modal-window
    background $white
    border-radius 5px
    box-shadow 0 0 10px RGBA(50, 50, 50, .75)
    padding 24px 18px

    .modal-head
        align-items flex-start
        display flex
        justify-content space-between

        .modal-title
            font-size 20px
            font-weight 500
            margin 0 4px


        .icon-plus
            color darken($light-gray, 25)
            cursor pointer
            display inline-block
            font-size 28px
            transform rotate(45deg)
            &:hover
                color darken($light-gray, 50)

    .buttons-div
        align-items flex-start
        border-top 1px solid lighten($light-gray, 15)
        display flex
        justify-content space-between
        margin-top 6px
        padding-top 16px

.create-user-modal
    
    .blocks-div
        align-items flex-start
        display flex
        justify-content space-between

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

    .avatar-div
        align-items center
        display flex
        justify-content center
    
    .icon-users
        color $light-gray
        font-size 128px

</style>