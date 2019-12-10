<template lang="pug">
    button( class='button' :class='background' v-bind='{ type }' )
        i( v-if='icon' class='button-icon' :class='`icon-${icon}`' :style='{ top }' )
        span( class='button-text' ) {{ title }}
</template>

<script>
export default {
    props: ['type', 'icon', 'title', 'background', 'icon-top'],
    computed: { top }
}

function top () {
    return this.iconTop || '0'
}

</script>

<style lang='stylus'>
@import '~src/style/palette'

.button
    align-items center
    border none
    border-radius 5px
    cursor pointer
    display inline-flex
    font-size 18px
    padding 12px 16px
    &.blue
        background $blue
        color $white
    &.green
        background $green
        color $white
    &.red
        background $red
        color $white
    
    .button-icon
        display inline-block
        margin-right 8px
        position relative

</style>