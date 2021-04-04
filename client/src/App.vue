<template>
  
  <div class="api-container">

    <content-api />

  </div>

</template>


<style lang="scss" scoped>

  *{
    font-family: 'Roboto', sans-serif;
  }

</style>


<script>

// add files or component
import Content from './components/content';

  export default {

    components : {

      "content-api" : Content , 

    },

    data(){

      return{

      }
      
    }

  }

</script>