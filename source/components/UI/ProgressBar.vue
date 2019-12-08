<template lang='pug'>
    .div( class='progress-bar' )
        div( class='value' :style='{ width }' )
</template>

<script>
export default {
    props: ['value'],
    computed: { width }
}

function width () {
    return Math.min(100, Math.max(0, this.value)) + '%'
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.progress-bar
    background lighten($light-gray, 12.5)
    border-radius 10px
    height 18px
    overflow hidden
    position relative

    .value
        background $green
        border-radius inherit
        position absolute
        top 0
        bottom 0
        left 0
</style>