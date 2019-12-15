<template lang="pug">
    div#auth
        div( class='block' )
            img( class='background-image' src='/images/auth-image.jpg' )
            div( class='background-text' )
                p( class='text' ) Система учета студентов в Общежитиях

        div( class='block' )
            form#form( @submit='signIn' )
                h1( class='title' ) StudDom
                p( class='subtitle' ) Войти в систему
                p( class='help' ) Используйте учетную запись, чтобы войти в систему

                div( class='input-div' )
                    input( class='input' type='text' placeholder='Логин' v-model='login' )
                    input( class='input' type='password' placeholder='Пароль' v-model='password' )

                div( class='confirm-div' )
                    Checkbox( title='Запомнить меня' v-model='saveMe' )
                    button( class='sign-in' )
                        i( class='icon icon-login' )
                        span( class='button-text' ) Войти
</template>

<script>
import Checkbox from ':src/components/Auth/Checkbox.vue'

export default {
    components: { Checkbox },
    methods: { loadData, signIn },
    data: function () {
        return {
            login: '',
            password: '',
            saveMe: false
        }
    }
}

async function loadData () {
    if ('cities') {
        let { data } = await this.api.get('city/list')
        this.$store.commit('cities-set', data)
    }

    if ('dormitories') {
        let { data } = await this.api.get('dormitory/list')
        this.$store.commit('dormitories-set', data)
    }
}

async function signIn (event) {
    event.preventDefault()
    
    var data = {
        login: this.login,
        password: this.password
    }

    var { status, data } = await this.api.post('user/sign-in', data)

    if ( status === 200 ) {
        this.$store.commit('user-set', data)
        this.loadData()
    }
}

</script>

23/5

<style lang='stylus'>
@import '~src/style/palette'

#auth
    align-items center
    display flex
    justify-content space-between
    position absolute
    top 0
    left 0
    right 0
    bottom 0

    .block
        align-items center
        display flex
        justify-content center
        overflow hidden
        position relative
        height 100%
        width 50%

    .background-image
        width 100%

    .background-text
        align-items center
        background RGBA(50, 50, 125, .5)
        display flex
        justify-content center
        position absolute
        top 0
        left 0
        right 0
        bottom 0

        .text
            color $white
            font-size 2.635vw
            line-height 3.075vw
            text-align center
            width 32.943vw

    #form
        width 30.747vw

        .title
            font-size 3.075vw
            margin 1.757vw 0

        .subtitle
            font-size 1.757vw

        .help
            color #B5B5B5
            font-size 1.025vw

        .input-div
            margin 2.050vw 0

        .input
            border 0.073vw solid #B5B5B5
            border-radius 5px
            font-size 1.171vw
            margin 0.732vw 0
            outline none
            padding 1.171vw 1.025vw
            width 100%

        .confirm-div
            align-items center
            display flex
            justify-content space-between

        .sign-in
            align-items center
            background $blue
            border none
            border-radius 5px
            color $white
            cursor pointer
            display flex
            font-size 18px
            padding 12px 14px

            .icon
                margin-right 8px
                position relative
                top 2px
</style>