<template lang='pug'>
    div( class='search-list-div' )
        span( class='current' @click='open = !open' ) {{ list[ current ] }}
            i( class='drop-down-icon icon-arrow-drop' :class='{ open }' )

        div( class='search-list' :class='{ open }' )
            input( class='search-input' placeholder='Найти...' v-model='search' )
            span( v-for='option of sorted' class='option' @click='select(option.id)' ) {{ option.title }}
            span( v-if='sorted.length === 0' class='option gray' @click='search = ""' ) Не найдено
</template>

<script>
export default {
    props: ['value', 'list'],
    computed: { sorted },
    methods: { select },
    mounted: start,
    data: function () {
        return {
            search: '',
            open: false,
            current: 0
        }
    }
}

function sorted () {
    var sort = []

    this.list.forEach((option, index) => {
        if ( option.toLowerCase().search(this.search.toLowerCase() || '') > -1 )
            sort.push({
                id: index,
                title: option
            })
    })

    return sort
}

function select (id) {
    this.open = false
    this.current = id
}

function start () {
    this.$watch('current', id => {
        this.$emit('input', this.list[ id ])
    })

    // this.$el.addEventListener('mouseleave', () => {
    //     this.timeout = setTimeout(() => {
    //         this.open = false
    //     }, 50)
    // })

    
    // this.$el.addEventListener('mouseenter', () => {
    //     clearTimeout(this.timeout)
    // })

    return this.$emit('input', this.list[ this.current ] || '')
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.search-list-div
    display inline-block
    position relative
    min-width 380px

    .current
        border 1px solid lighten($light-gray, 10)
        border-radius 3px
        cursor pointer
        display block
        font-size 18px
        padding 8px 12px
        position relative

        .drop-down-icon
            color darken($light-gray, 20)
            font-size 20px
            position absolute
            top 8px
            right 12px
            &.open
                top 3px
                transform scale(1, -1)


    .search-list
        background $white
        border-radius 3px
        box-shadow 0 0 0 $white
        opacity 0
        overflow hidden
        position absolute
        top calc(100% + 8px)
        left 0
        max-height 0
        width 100%
        z-index 3
        &.open
            box-shadow 0 0 3px darken($light-gray, 15)
            opacity 1
            max-height 195px

        .search-input
            border 1px solid lighten($light-gray, 10)
            border-top none
            border-radius 3px
            display block
            font-size 18px
            margin 0 -1px
            margin-bottom 4px
            outline none
            padding 8px
            width calc(100% + 2px)

        .option
            cursor pointer
            display block
            font-size 18px
            padding 8px 12px
            &:hover
                background lighten($light-gray, 25)
            &.gray
                background inherit
                color $light-gray

</style>