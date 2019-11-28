<template lang="pug">
    div#sidebar
        p Sidebar

        router-link( tag='a' class='link' to='/' ) Home
        router-link( tag='a' class='link' to='/about' ) About
</template>

<style lang='stylus'>
@import '~src/style/palette'

#sidebar
    background $black
    position absolute
    top 0
    left 0
    bottom 0
    width 320px
    z-index 2

    .link
        display block
        margin 16px 8px
</style>