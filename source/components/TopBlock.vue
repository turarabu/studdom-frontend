<template lang="pug">
    div#top-block
        div( class='notifications' )
            span( class='icon icon-bell' @click='showNots = !showNots' )
            span( class='nots-count' @click='showNots = !showNots' ) {{ actions.length }}

            div( class='nots-list' :class='{ active: showNots }' )
                div( class='scroll-div' )
                    div( v-for='action in actions' class='note' ) 
                        span( class='note-text' ) {{ action.description }}
                        span( class='note-date' ) {{ getDate(action.date) }}

        div( class='user-menu' )
            div( class='content' @click='showMenu = !showMenu' )
                span( class='icon icon-users' )
                span( class='user-name' ) Администратор
                span( class='icon-div' )
                    span( class='icon icon-arrow-down' :class='{ active: showMenu }' )

            div( class='menu' :class='{ active: showMenu }' )
                span( class='link' )
                    span( class='icon icon-exit' )
                    span( @click='quit' ) Выйти
</template>

<script>
export default {
    computed: { actions },
    methods: { getDate, quit },
    data: function () {
        return {
            showNots: false,
            showMenu: false
        }
    }
}

function actions () {
    console.log(this.$store.state)
    return this.$store.state.actions
}

function getDate (string) {
    return new Date(string).toLocaleDateString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    })
}

async function quit () {
    var { success } = await this.api.get('user/quit')

    if ( success === true )
        this.$store.commit('user-quit')
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
            cursor pointer
            font-size 28px
            position relative
            top 2px

        .nots-count
            align-items center
            background $red
            border-radius 50%
            color $white
            cursor pointer
            display flex
            font-size 10px
            justify-content center
            position absolute
            top 16px
            right 16px
            height 18px
            width 18px

        .nots-list
            background #FFFFFF
            border-radius 5px
            box-shadow 0 0 0 RGBA(50, 50, 50, .5)
            max-height 0
            opacity 0
            overflow hidden
            position absolute
            top calc(100% + 12px)
            right -16px
            width 400px
            &.active
                box-shadow 0 0 3px 1px RGBA(50, 50, 50, .5)
                max-height 400px
                opacity 1

        .scroll-div
            max-height 375px
            margin 12px 4px 6px 0
            overflow auto
            padding 0 10px 0 12px

        .note
            background #EEE
            border-radius 5px
            display block
            margin-bottom 4px
            padding 4px 
            
        .note-text
            display block
            font-size 18px
            margin 6px 8px

        .note-date
            display block
            color #777
            font-size 16px
            text-align right
            margin 12px 8px 6px 8px

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
            position absolute
            top 100%
            left 0
            width calc(100%)
            &.active
                box-shadow 0 2px 2px $light-gray
                max-height 500px
                opacity 1

            .link
                cursor pointer
                display block
                padding 16px
                &:hover
                    background lighten($light-gray, 25)
</style>