<template lang='pug'>
    div( class='select-label' :class='{ focused }' )
        div( class='selected-div' @click='focused = !focused' )
            i( class='icon icon-arrow-drop' :class='{ focused }' )

            span( v-if='selected !== false' class='value' ) {{ list[selected] }}
            span( v-else class='placeholder' ) {{ placeholder || 'Выберите из значение' }}

        div( class='options-div' )
            input( v-if='searchable !== false' class='search-input' placeholder='Найти...' v-model='search' )
            span(
                v-for='(option, code) in filtered'
                class='option' :class='{ scroll: searchable === false }'
                @click='select(code)'
            ) {{ option }}
</template>

<script>
export default {
    props: ['value', 'list', 'searchable', 'placeholder'],
    computed: { filtered },
    methods: { select },
    mounted: start,
    data: function () {
        return {
            selected: this.value || false,
            search: '',
            focused: false
        }
    }
}

function filtered () {
    if ( this.searchable === false )
        return this.list
    
    else {
        let result = {}

        Object.keys(this.list).forEach(option => {
            let subStr = this.search.toLowerCase()
            let inText = this.list[option].toLowerCase()

            if ( inText.search(subStr) > -1 )
                result[option] = this.list[option]
        })

        return result
    }
}

function select (code) {
    this.search = ''
    this.focused = false
    this.selected = code
}

function start () {
    this.addEventListener('focus', () => this.focused = true)
    this.addEventListener('blur', () => this.focused = false)

    this.$watch('selected', value => {
        this.$emit('input', value)
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.select-label
    border 1px solid lighten($light-gray, 5)
    border-radius 5px
    cursor pointer
    display inline-block
    font-size 18px
    padding 12px 16px
    position relative
    width 380px 

    .icon
        color #555
        font-size 20px
        position absolute
        right 16px
        top 12px
        &.focused
            transform scale(1, -1)
            top 8px

    .placeholder
        color darken($light-gray, 20)

    .options-div
        background $white
        border 0px solid lighten($light-gray, 5)
        box-shadow 0 0 0 lighten($light-gray, 5)
        border-radius 5px
        display block
        overflow hidden
        max-height 0
        position absolute
        top calc(100% + 5px)
        left -1px
        width calc(100% + 2px)
        z-index 3


        .search-input
            border none
            border-bottom 1px solid lighten($light-gray, 15)
            font-size 16px
            margin-bottom 4px
            outline none
            padding 10px 12px
            width 100%

        .option
            display block 
            font-size 16px
            padding 8px 12px
            &:hover
                background lighten($light-gray, 25)

    &.focused
        border-color darken($light-gray, 5)

        .icon
            transform scale(1, -1)
            top 8px

        .options-div
            border-width 1px
            box-shadow 0 0 5px lighten($light-gray, 15)
            max-height 185px

</style>