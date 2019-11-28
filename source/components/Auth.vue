<template lang="pug">
    div#auth
        div( class='block' )
            img( class='background-image' src='/images/auth-image.jpg' )
            div( class='background-text' )
                p( class='text' ) Some text

        div( class='block' )
            form#form
                input( class='input' )
</template>

<script>
export default {
    name: 'AuthPage',
    // computed: { user }
}

function user () {
    return this.$store.state.user
}
</script>

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
        max-height 100%

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
            font-size 24px
</style>