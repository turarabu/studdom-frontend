<template lang="pug">
    div#top-block
        div( class='notifications' )
            span( class='icon icon-bell' )
            span( class='nots-count' ) 14

        div( class='user-menu' )
            div( class='content' @click='showMenu = !showMenu' )
                span( class='icon icon-users' )
                span( class='user-name' ) Администратор
                span( class='icon-div' )
                    span( class='icon icon-arrow-down' :class='{ active: showMenu }' )

            div( class='menu' :class='{ active: showMenu }' )
                span( class='link' )
                    span( class='icon icon-exit' )
                    span Выйти
</template>

<script>
export default {
    data: function () {
        return {
            showMenu: false
        }
    }
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

#top-block
    box-shadow 0 0 5px RGBA(50, 50, 50, 0.5)
    display flex
    justify-content flex-end
    padding 0 0
    position absolute
    top 0
    left 0
    right 0
    height 72px
    z-index 10

    .notifications
        align-items center
        display flex
        justify-content center
        position relative
        height 72px
        width 72px
        
        .icon
            font-size 28px
            position relative
            top 2px

        .nots-count
            align-items center
            background $red
            border-radius 50%
            color $white
            display flex
            font-size 10px
            justify-content center
            position absolute
            top 16px
            right 16px
            height 18px
            width 18px

    .user-menu
        border-left 1px solid transparentify($light-gray, .25)
        position relative
        height 100%
        width 280px

        .content
            align-items center
            display flex
            cursor pointer
            padding 0 16px
            position relative
            height 100%
            width 100%

            .icon-users
                font-size 32px
                margin 8px 16px 0 0

            .user-name
                font-size 18px

            .icon-div
                align-items center
                display flex
                font-size 24px
                position absolute
                top 20px
                right 18px

            .icon-arrow-down
                display inline-block
                position relative
                top 3px
                &.active
                    top -3px
                    transform scale(1, -1)

        .menu
            background $white
            box-shadow 0 0 0 $light-gray
            max-height 0
            opacity 0
            overflow hidden
            padding 0 16px
            position absolute
            top 100%
            left 0
            width calc(100%)
            &.active
                box-shadow 0 2px 2px $light-gray
                padding 16px
                max-height 500px
                opacity 1
</style>