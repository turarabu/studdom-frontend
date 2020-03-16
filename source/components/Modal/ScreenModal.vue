<template lang='pug'>

    div#screen-user( class='modal' )
        h3( class='modal-title' ) {{student.firstName + " " + student.lastName + " "}}
            div( class='user-info-div' )
                div( class='avatar-div' )
                    img( class='screenPhoto' :src='getFirstScreen(student.firstScreen)' :style={'height':'300px','margin':'10px'} )
                    img( class='screenPhoto' :src='getSecondScreen(student.secondScreen)' :style={'height':'300px','margin':'10px'} )







</template>
<script>
    export default {
        props: ['id', 'data'],
        components: { },
        methods: { getFirstScreen, getSecondScreen},
        data: function () {
            return {
                student: this.data
            }
        }
    }
    function getFirstScreen (firstScreen) {
        if ( firstScreen == undefined || firstScreen == false )
            return '/images/avatar.png'

        else return  firstScreen
    }
    function getSecondScreen (secondScreen) {
        if ( secondScreen == undefined || secondScreen == false )
            return '/images/avatar.png'

        else return  secondScreen
    }



</script>

<style scoped lang='stylus'>

    #screen-user
    padding 24px
                  .user-info-div
                  margin-left 16px
                  .avatar-div
                  align-items center
                  display flex
                  justify-content center
                  margin-bottom 8px
                  .screenPhoto
                   margin 10px
                   height 200px
                   max-width 100%

</style>