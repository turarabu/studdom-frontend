<template lang='pug'>
    div( class='options-list' )
        label( v-for='(title, id) in list' class='option-label' )
            input( class='option-input' type='radio' :name='name' :value='id' v-model='current' )
            span( class='option-status' )
            span( class='option-title'  ) {{ title }}

</template>

<script>
export default {
    props: ['list', 'name', 'value'],
    mounted: start,
    data: function () {
        return {
            current: this.value
        }
    }
}

function start () {
    this.$watch('current', value => {
        this.$emit('input', value)
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.options-list

    .option-label
        align-items flex-start
        cursor pointer
        display flex
        margin 4px 0

        .option-status
            border 1px solid $light-gray
            border-radius 50%
            display inline-block
            margin 4px 8px 0 0
            height 18px
            width 18px

        .option-title
            color darken($light-gray, 45)
            font-size 20px

        .option-input
            display none
            &:checked ~ .option-status
                border 4px solid $green

</style>