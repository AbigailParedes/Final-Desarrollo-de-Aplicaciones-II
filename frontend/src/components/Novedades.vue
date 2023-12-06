<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <br />
        <!-- Mensaje de próximamente con estilo -->
        <p style="color: #3f1e5f">
          <strong>¡Pronto tu app de tareas en tu celular!</strong>
        </p>
        <!-- Contenido principal -->
        <div class="row">
          <div class="d-flex justify-content-between align-items-center col">
            <div class="d-flex justify-content-right col-md-6 mt-3">
              <img
                src="../assets/IMAGEN_CELU_v2.svg"
                alt="celu-app"
              />
            </div>

            <!-- Información de la próxima app y botón para regresar -->
            <div class="d-flex justify-content-align-left col-md-6 mb-3 mt-3">
              <div class="card position-relative text-white bg-dark mb-3">
                <div class="card-header"><strong>Proximamente</strong></div>

                <div class="card-body">
                  <h4 class="card-title h6">Tu app de tareas</h4>
                  <p class="card-text">Disponible para Android</p>
                  <img
                    src="../assets/Logo-Android.png"
                    alt=""
                    style="width: 20%; height: auto"
                  />
                  <br />
                  <!-- Enlace para regresar a la página de notas -->
                  <router-link to="/todO">Volver a Notas</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Usuario extends Vue {
  $router: any;
  created(): void {
    console.log("El componente se ha creado");
  }

  // Método para regresar a todO.vue
  regresarATodo(): void {
    this.$router.push("/todO");
  }
}
</script>

<style scoped>
p {
  font-size: 25px;
  text-align: center;
}
img {
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none;
  color: #fff;
}
button {
  margin-left: 5px;
  cursor: pointer;
  background-color: #764ba2;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>

function regresarATodo() { throw new Error("Function not implemented."); }
function regresarATodo() { throw new Error("Function not implemented."); }
