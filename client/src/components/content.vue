<template>
    
    <div class="content">

        <transition name="fade" mode="out-in">

            <router-view></router-view>

        </transition>


    </div>

</template>


<style lang="sass" scoped>

    

</style>


<script>

import '../styles/transition.scss';

export default {
    data(){
        return{

        }
    }
}
</script>