<template lang='pug'>
    label( class='file-input-label' )
        span( class='input-title' :data-label='name' ) {{ name }}
        input( class='input' type='file' v-bind='{ disabled, accept }' @change='changed' )
</template>

<script>
export default {
    props: ['type', 'disabled', 'accept'],
    methods: { changed },
    mounted: start,
    data: function () {
        return {
            name: 'Выберите файл',
            file: false
        }
    }
}

function changed (event) {
    var path = event.target.value
    var name = event.target.files[0].name
    var value = path.substr(-path.length, 2) + '/.../' + name.substr(name.length - 27)

    this.name = value
    this.$emit('input', event.target.files[0])
    console.log('checked file', event.target.files[0])

}

function start () {
    
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.file-input-label
    cursor: pointer
    display inline-block
    font-size 18px

    .input
        display block
        position absolute
        margin 0
        opacity 0

    .input-title
        border 1px solid lighten($light-gray, 5)
        border-radius 5px
        color $light-gray
        display block
        overflow hidden
        padding 12px 16px
        position relative
        width 420px

        &:after
            display inline-block
            content attr('data-label')

        &:before
            align-items center
            background lighten($light-gray, 15)
            color: darken($light-gray, 50)
            content: 'Выбрать'
            display: flex
            height 100%
            justify-content center
            padding 0 18px
            position: absolute
            top 0
            right 0
</style>