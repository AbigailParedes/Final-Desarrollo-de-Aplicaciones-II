<!-- Bienvenida.vue -->

<template>
  <div id="contenedor" class="container-fluid">

    <span>
      Bienvenido a 
    </span>
    <br>

    <div class="imagen" >

    <img src="./assets/Listo_logo.png" alt="Login Image" class="img-fluid"/>

    </div>

      <br>

      <iframe src="https://lottie.host/embed/c2a69be1-cc0f-4e75-b8cc-ed8c509ec503/b7tTuTBcIE.json"></iframe>
  
  </div>
  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default Vue.extend({
  mounted(): void {
    
    setTimeout(() => {
      
      document.body.classList.add("hidden");
      if (this.$route.path !== "/registro") {
        this.$router.push("/registro"); // Redirige a la página de inicio de sesión después de 5 segundos
      }
    }, 4000);
  },
});
</script>

<style scoped>
/* Estilos página de bienvenida */

#contenedor{
  max-width: 100%;
  margin-top:200px;
}

/* estilo de titulo de bienvenido */ 
span {
  display: block;
  white-space: nowrap;
  border-right: 1px solid;
  width: 11ch;
  font-size: 30px;
  color: #797777;
  margin:0 auto;
  font-family: 'Istok Web', sans-serif;
 
  
  
  animation: typing 2s steps(11),
  blink .5s infinite step-end alternate;
  overflow: hidden;
}

@keyframes typing{
  from { width:0}
}

@keyframes blink{
  50% { border-color:transparent}
}

/* - - - - -- */ 
.imagen{
  width: 100%;
}

img {
  margin: 0 auto;
  margin-top:-60px;
  max-width: 20%;
  min-width: 20%;
  height: auto;
  
}

/*simulacion de tiempo de transicion a login*/
iframe{
  margin-top:150px;
  margin-left: 25px;

}

</style>
