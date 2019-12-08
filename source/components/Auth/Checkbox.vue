<template lang="pug">
    label( class='checkbox-label' )
        input( class='checkbox-input' type='checkbox' v-model='checked' )
        span( class='checkbox-status-div' )
            span( class='checkbox-status icon-ok' )

        span( class='checkbox-title' ) {{ title }}
</template>

<script>
export default {
    props: ['title', 'value'],
    mounted: start,
    data: function () {
        return {
            checked: this.value || false
        }
    }
}

function start () {
    console.log(this.value)
    this.$watch('checked', value => {
        this.$emit('input', value)
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.checkbox-label
    align-items flex-start
    display inline-flex
    justify-content space-between

    .checkbox-status-div
        border 1px solid #B5B5B5
        border-radius 3px
        display block
        height 20px
        width 20px

    .checkbox-status
        color $white
        font-size 12px
        position relative
        left 2px

    .checkbox-input
        display none
        &:checked ~ .checkbox-status-div
            background $blue
            border-color $blue

    .checkbox-title
        display block
        margin 0 12px
        white-space nowrap
</style>