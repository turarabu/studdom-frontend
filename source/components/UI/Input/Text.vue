<template lang='pug'>
    label( class='input-label' )
        input( class='input' v-bind='{ type, required, disabled, placeholder }' v-model='checkValue' )
</template>

<script>
export default {
    props: ['value', 'pattern', 'type', 'required', 'disabled', 'placeholder'],
    mounted: start,
    data: function () {
        var value = (this.value === undefined)
            ? '' : this.value

        return {
            checkValue: value,
            inputValue: value
        }
    }
}

function start () {
    this.$watch('inputValue', value => {
        this.$emit('input', value)
    })

    this.$watch('checkValue', (newValue, oldValue) => {
        if ( newValue.length > 0 && newValue === oldValue )
            return

        else if ( newValue.length > 0 && this.pattern !== undefined ) {
            let check = new RegExp(`^${ this.pattern }$`)

            if (  check.test(newValue) === true )
                this.inputValue = newValue
            else this.checkValue = oldValue
        }

        else this.inputValue = newValue
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.input-label
    display inline-block

    .input
        border 1px solid lighten($light-gray, 5)
        border-radius 5px
        font-size 18px
        outline none
        padding 12px 16px
        width 420px
        &:focus
            border-color darken($light-gray, 5)
</style>