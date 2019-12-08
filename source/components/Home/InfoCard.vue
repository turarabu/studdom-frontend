<template lang="pug">
    div( class='home-info-card' )
        div( class='icon-div' )
            i( class='icon' :class='`icon-${icon}`' :style='{ top: iconTop || 0 }' )

        div( class='card-info' )
            span( class='title' ) {{ title }}
            span( class='value' ) {{ value }}

</template>

<script>
export default {
    props: ['icon', 'title', 'icon-top', 'value']
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.home-info-card
    border 1px solid #EEE
    border-radius 5px
    display flex
    justify-content space-between
    padding 16px 24px
    width 220px
    &.red
        background $red
        color $white
    &.green
        background $green
        color $white
    &.blue
        background $blue
        color $white
    &.purple
        background $purple
        color $white

    .icon-div .icon
        font-size 48px
        position relative

    .card-info
        text-align right
        width 150px

    .title
        display block
        font-size 20px

    .value
        display block
        font-size 32px
        margin 2px

@media (min-width: 1600)
    .home-info-card
        border 1px solid #EEE
        border-radius 5px
        display flex
        justify-content space-between
        padding 16px 24px
        width 280px

</style>