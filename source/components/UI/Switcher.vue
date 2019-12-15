<template lang='pug'>
    div( class='switch-div' @click='change' )
        div( class='switch-slider' :class='{ active: status }' )
            div( class='point' )
</template>

<script>
export default {
    props: ['value'],
    methods: { change },
    mounted: start,
    data: function () {
        return {
            lock: false,
            active: this.value || false,
            status: this.value || false,
        }
    }
}

function change () {
    if ( this.lock === true )
        return 

    this.active = !this.active
    
    setTimeout(() => {
        if ( this.lock === false )
            this.status = this.active
    }, 10)
}

function start () {
    this.$watch('active', value => {
        
        this.$emit('input', {
            value,
            lock: (status) => {
                if ( status === false )
                    this.status = this.active

                this.lock = status
            }
        })
    })
}
</script>

<style lang='stylus'>
@import '~src/style/palette'

.switch-div
    align-items center
    display flex
    justify-content center
    height 30px
    width 65px

    .switch-slider
        background lighten($light-gray, 15)
        border-radius 20px
        display inline-block
        position relative
        height 18px
        width 50px

        .point
            background darken($light-gray, 15)
            border-radius 50%
            box-shadow 0 0 2px $light-gray
            position absolute
            top -2px
            left -2px
            height 22px
            width 22px
            
        &.active
            background $green

            .point
                background lighten($light-gray, 10)
                left calc(100% - 20px)
</style>