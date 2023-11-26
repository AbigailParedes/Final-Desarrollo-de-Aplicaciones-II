<!-- Bienvenida.vue -->
<template>
  <div>
    <img
      src="./assets/logo.jpeg"
      alt="Login Image"
    />
    <br />
    <p>
      Bienvenido a nuestra aplicación.
      <br />
      Redireccionando al inicio de sesión...
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default Vue.extend({
  mounted(): void {
    console.log("Componente de Bienvenida montado");
    setTimeout(() => {
      console.log("Redirigiendo a la página de inicio de sesión");
      document.body.classList.add("hidden");
      if (this.$route.path !== "/registro") {
        this.$router.push("/registro"); // Redirige a la página de inicio de sesión después de 5 segundos
      }
    }, 5000);
  },
});
</script>

<style scoped>
/* Estilos opcionales para la página de bienvenida */

p {
  font-size: 44px;
  color: #333;
  text-align: center;
}
img {
  max-width: 100%;
  height: auto;
}

/* Agrega estilos adicionales según sea necesario */
</style>
