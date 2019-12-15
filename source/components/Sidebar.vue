<template lang='pug'>
    div#sidebar
        div( class='logo-div' )
            span( class='logo' ) StudDom

        router-link( tag='a' class='link' exact-active-class='active' to='/' )
            span( class='icon icon-home' )
            span Главная
        router-link( tag='a' class='link' active-class='active' to='/activity' )
            span( class='icon icon-activity' )
            span Активность
        router-link( tag='a' class='link' active-class='active' to='/dormitories' )
            span( class='icon icon-bed' )
            span Общежития
        router-link( tag='a' class='link' active-class='active' to='/students' )
            span( class='icon icon-student' )
            span Студенты
        router-link( v-if='canUserEdit' tag='a' class='link' active-class='active' to='/users' )
            span( class='icon icon-users' )
            span Пользователи
        router-link( tag='a' class='link' active-class='active' to='/records' )
            span( class='icon icon-reports' )
            span Отчеты
        router-link( tag='a' class='link' active-class='active' to='/settings' )
            span( class='icon icon-cog' )
            span Настройки
</template>

<script>
export default {
    computed: { canUserEdit },
    created: start
}

function canUserEdit () {
    return this.$store.state.user.data.type === 'admin'
}

function start () {
    
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#sidebar
    background $asphalt
    position absolute
    top 0
    left 0
    bottom 0
    width 260px
    z-index 2

    .logo-div
        align-items center
        background $blue
        color $white
        display flex
        justify-content center
        height 72px
        width 100%

        .logo
            font-size 40px

    .link
        align-items center
        border-bottom 1px solid $light-gray
        color $light-gray
        display flex
        color pointer
        font-size 18px
        height 50px
        padding 0 4px 0 0
        text-decoration none
        &.active
            color $white

        .icon
            margin 0 14px
            position relative
            top 3px
</style>