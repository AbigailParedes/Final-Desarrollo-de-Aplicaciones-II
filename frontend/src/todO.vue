<template>
  <div class="hello">
    <img
      src="./assets/Listo_logo.png"
      alt=""
    />

    <div v-if="editandoTarea">
      <h3>Editar Tarea</h3>
      <label>Título</label>
      <input v-model="tareaEditada.titulo" />
      <br />
      <label>Fecha</label>
      <input
        type="date"
        v-model="tareaEditada.fecha"
      />
      <br />
      <label>Cuerpo</label>
      <textarea v-model="tareaEditada.cuerpo"></textarea>
      <br />
      <label>Completada</label>
      <input
        type="checkbox"
        v-model="tareaEditada.completado"
      />
      <br />
      <button @click="actualizarTarea()">Guardar Cambios</button>
    </div>

    <div class="container">
      <h3>Nueva Tarea</h3>
      <label for="titulo-tarea">Título</label>
      <input v-model="nuevaTarea.titulo" />
      <br />
      <label for="date">Fecha</label>
      <input
        id="date"
        type="date"
        v-model="nuevaTarea.fecha"
      />
      <br />
      <label for="cuerpo">Cuerpo</label>
      <textarea
        v-model="nuevaTarea.cuerpo"
        id="cuerpo"
      ></textarea>
      <br />
      <button
        @click="crearTarea()"
        class="btn btn-danger mt-2"
      >
        Crear Tarea
      </button>
      <button
        @click="signOut"
        class="btn btn-danger mt-2"
        id="cerrar-sesion"
      >
        Cerrar Sesión
      </button>
    </div>

    <h1 class="titulo-lista">Lista de tareas</h1>

    <ul>
      <li
        v-for="tareaItem in tarea"
        :key="tareaItem._id"
      >
        {{ tareaItem.titulo }} -
        {{ tareaItem.completado ? "Completada" : "Pendiente" }}
        <br />
        {{ tareaItem.fecha }} - {{ tareaItem.cuerpo }}
        <br />
        <button @click="editarTarea(tareaItem._id)">Editar</button>
        <button @click="borrarTarea(tareaItem._id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { auth } from "../firebaseConfig";
import Swal from "sweetalert2";

interface Tarea {
  _id: string;
  titulo: string;
  cuerpo: string;
  fecha: string;
  completado: boolean;
}

@Component
export default class Hello extends Vue {
  tarea: Tarea[] = [];
  editandoTarea: string | null = null;
  tareaEditada: Tarea = {
    _id: "",
    titulo: "",
    cuerpo: "",
    fecha: "",
    completado: false,
  };
  nuevaTarea: Tarea = {
    _id: "",
    titulo: "",
    cuerpo: "",
    fecha: "",
    completado: false,
  };
  $router: any;

  signOut() {
    auth
      .signOut()
      .then(() => {
        //cerrar sesión correctamente, redirigir a la página de inicio de sesión
        this.$router.push("/");
      })
      .catch((error) => {
        console.log("Error al serrar sesión:", error);
      });
  }

  async obtenerTareas(): Promise<void> {
    try {
      const respuesta = await axios.get(`http://localhost:3000/todo/tareas`);
      this.tarea = respuesta.data;
    } catch (error) {
      console.log(error);
    }
  }

  editarTarea(id: string): void {
    this.editandoTarea = id;
    this.tareaEditada = {
      ...this.tarea.find((tarea) => tarea._id === id),
    } as Tarea;
  }

  async actualizarTarea(): Promise<void> {
    try {
      const respuesta = await axios.put(
        `http://localhost:3000/todo/tareas/${this.tareaEditada._id}`,
        this.tareaEditada
      );
      const actualizarIndexTarea = this.tarea.findIndex(
        (tarea) => tarea._id === this.tareaEditada._id
      );
      this.$set(this.tarea, actualizarIndexTarea, respuesta.data);

      this.cancelarEdition();
    } catch (error) {
      console.log(error);
    }
  }
  compararTituloFecha() {
    if (this.nuevaTarea.titulo === "" && this.nuevaTarea.fecha === "") {
      return "titulo ni fecha";
    } else if (this.nuevaTarea.titulo === "") {
      return "titulo";
    } else if (this.nuevaTarea.fecha === "") {
      return "fecha";
    }
  }

  async crearTarea(): Promise<void> {
    try {
      if (this.nuevaTarea.titulo === "" || this.nuevaTarea.fecha === "") {
        Swal.fire({
          title: "error!",
          text: `No se puede crear una tarea sin ${this.compararTituloFecha()}`,
          icon: "error",
        });
      } else {
        console.log("Creando tarea:", this.nuevaTarea);
        const respuesta = await axios.post(
          `http://localhost:3000/upso/tareas/`,
          this.nuevaTarea
        );
        console.log("Respuesta del servidor:", respuesta.data);
        this.tarea.push(respuesta.data);
        this.nuevaTarea.titulo = "";
        this.nuevaTarea.cuerpo = "";
        this.nuevaTarea.fecha = "";
      }
    } catch (error) {
      console.error(error);
    }
  }

  async borrarTarea(id: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/todo/tareas/${id}`);
      this.tarea = this.tarea.filter((tarea) => tarea._id !== id);
    } catch (error) {
      console.log(error);
    }
  }

  cancelarEdition(): void {
    this.editandoTarea = null;
    this.tareaEditada = {
      _id: "",
      titulo: "",
      cuerpo: "",
      fecha: "",
      completado: false,
    };
  }

  mounted() {
    this.obtenerTareas();
  }
}
</script>

<style scoped>
.hello {
  max-width: 100%;

  font-family: "Arial", sans-serif;
}
.container {
  max-width: 700px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
}

img {
  width: 150px;
  margin-right: 1800px;
  margin-top: -600px;
}

.navbar {
  width: 1000vh;
  height: 90px;
  padding: 25px;
}

button {
  margin-left: 5px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
}

button:hover {
  background-color: #45a049;
}

div {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 15px;
  border: none;
}

input[type="checkbox"] {
  margin-top: 5px;
}

button {
  cursor: pointer;
  background-color: #764ba2;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
}

button:hover {
  background-color: #d5fa6f;
  color: black;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.titulo-lista {
  font-size: 30px;
  color: #5b5b5b;
  font-family: "Istok Web", sans-serif;
  font-weight: bold;
}
</style>
