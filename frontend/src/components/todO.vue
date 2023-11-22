<template>
  <div class="hello">
    <h1>Lista de tareas</h1>
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

    <div>
      <h3>Nueva Tarea</h3>
      <label>Título</label>
      <input v-model="nuevaTarea.titulo" />
      <br />
      <label>Fecha</label>
      <input
        type="date"
        v-model="nuevaTarea.fecha"
      />
      <br />
      <label>Cuerpo</label>
      <textarea v-model="nuevaTarea.cuerpo"></textarea>
      <br />
      <button @click="crearTarea()">Crear Tarea</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

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

  async obtenerTareas(): Promise<void> {
    try {
      const respuesta = await axios.get(`http://localhost:3000/upso/tareas`);
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
        `http://localhost:3000/upso/tareas/${this.tareaEditada._id}`,
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

  async crearTarea(): Promise<void> {
    try {
      const respuesta = await axios.post(
        `http://localhost:3000/upso/tareas/`,
        this.nuevaTarea
      );
      this.tarea.push(respuesta.data);
      this.nuevaTarea.titulo = "";
      this.nuevaTarea.cuerpo = "";
      this.nuevaTarea.fecha = "";
    } catch (error) {
      console.error(error);
    }
  }

  async borrarTarea(id: string): Promise<void> {
    try {
      await axios.delete(`http://localhost:3000/upso/tareas/${id}`);
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
}

input[type="checkbox"] {
  margin-top: 5px;
}

button {
  cursor: pointer;
  background-color: #008cba;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
}

button:hover {
  background-color: #005580;
}
</style>
