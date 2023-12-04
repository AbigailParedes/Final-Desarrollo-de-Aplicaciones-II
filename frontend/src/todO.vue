<template>
  <div class="container-fluid">
    <!--navbar con logo y boton de cerrar sesion-->
    <div class="row justify-content-center">
    <nav id="nav" class="navbar .collapse.navbar-collapse mb-5">

      <div class=" d-flex justify-content-between align-items-center col mb-2">

        <div class=" col-md-4 mx-auto mt-3">
          <img src="./assets/Listo_logo.png" alt=" lOGO APP" />
        </div>

        <div class=" col-md-4 mx-auto mt-3">
        <ul>
         <router-link to="/about" style="text-decoration: none;"><li> Novedades<i class="fa-solid fa-arrow-up-right-from-square" style="color: #ffffff"></i></li></router-link> 
        </ul>
        </div>

        <div class="d-flex justify-content-end col-md-4  mt-3">
          <button @click="signOut" class="btn btn-danger mt-2" id="cerrar-sesion"> Cerrar Sesión</button>
        </div>

      </div>
      <!-- ............-->

    </nav>

  </div>
    <div class="row justify-content-center">
      <div class="hello">



        <!--titulo de la seccion lista de tareas-->
        <span>
        <h1 class="h3 text-left m-2"> <i class="fa-solid fa-list-check" style="color: #301155;  width: 50px;"></i><strong>Tu lista de tareas</strong>  </h1>
        
        </span>
        <hr style="width: 35%;">

        <div class="d-flex justify-content-between align-items-center col ">
           <!-- Botón para mostrar el formulario de nueva tarea -->
           <div  class=" col mx-auto " >

          <button id="nueva-tarea" @click="mostrarFormularioNuevaTarea"> + Nueva Tarea </button>

          <!-- Botones de filtrado -->
          <button @click="mostrarTareasPendientes">Ver Pendientes</button>
          <button @click="mostrarTareasCompletadas">Ver Completadas</button>
          <button @click="mostrarTodas">Mostrar Todas</button>
        </div>
      </div>
        <!-- Botón para cerrar la sesión -->
       <!-- <button @click="signOut">Cerrar Sesión</button>-->

        <!-- Formulario de edición -->
        <div v-if="editandoTarea" class="col-md-4 mx-auto mt-3">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Editar Tarea</h3>
              <label>Título</label>
              <input v-model="tareaEditada.titulo" class="form-control" id="titulo-editado"/>
              <label>Fecha</label>
              <input type="date" v-model="tareaEditada.fecha" class="form-control" />
              <label>Cuerpo</label>
              <textarea v-model="tareaEditada.cuerpo" class="form-control"></textarea>

              <div class="form-check">
              
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="tareaEditada.completado" />
              <label class="form-check-label" for="flexCheckDefault">Completada</label>
              
              </div>
              <br />

              <button @click="actualizarTarea()" class="btn btn-primary mt-2">
                Guardar Cambios
              </button>
              <button @click="cancelarEdition" class="btn btn-secondary mt-2">
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <!-- Formulario de nueva tarea -->
        <div v-if="mostrarFormNuevaTarea" class="col-md-4 mx-auto mt-3 ">
          <div class="card ">
            <div class="card-body  ">
              <h3 class="card-title ">Nueva Tarea  </h3>
              <label for="titulo-tarea">Título</label>
              <input v-model="nuevaTarea.titulo" class="form-control" type="text" placeholder="ingrese un titulo"/>
              <label>Fecha</label>
              <input type="date" v-model="nuevaTarea.fecha" class="form-control" />
              <label>Cuerpo</label>
              <textarea v-model="nuevaTarea.cuerpo" class="form-control"></textarea>
              <br />
              <button @click="crearTarea()" class="btn btn-danger mt-2">
                Crear Tarea
              </button>
            </div>
          </div>
        </div>

        <!-- Tareas existentes -->
        <div class="row">
          <div v-for="tareaItem in tareaMostrada" :key="tareaItem._id" class="col-md-2 mb-3 mt-3 style= max-width:50% " >
            <div class="card position-relative text-white bg-dark mb-3">
              <div class="card-body " id="cards-tareas">
                <div class="d-flex justify-content-between align-items-center mb-2 ">

                  <h5 class="card-title titulo-tarea">
                    {{ tareaItem.titulo }}
                  </h5>
                  <i class="fas fa-edit" @click="editarTarea(tareaItem._id)" style="cursor: pointer;"></i>
                
                </div>
              
                <p class="card-text cuerpo-tarea text-center">
                  {{ tareaItem.cuerpo }}
                </p>
                <p class="card-text fecha-tarea mb-2">
                  {{ tareaItem.fecha }}
                </p>
                <p class="card-text">
                  {{ tareaItem.completado ? "Completada" : "Pendiente" }}
                </p>
                <button @click="borrarTarea(tareaItem._id)">Eliminar</button>
              </div>

            </div>
          </div>
        </div>

        

      </div>
    </div>
    
    <footer class=" text-center">
          <!-- Grid container -->
          <div class="d-flex justify-content-end mb-5 ">
       <router-link to="/equipo" style="text-decoration: none; color: #ffffff;"> <p class="display 3"> Conocé nuestro Equipo <i class="fa-solid fa-code"></i></p></router-link></div>
           
        </footer>
    

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
  [x: string]: any;
  tarea: Tarea[] = [];
  editandoTarea: string | null = null;
  tareaEditada: Tarea = {
    _id: "",
    titulo: "",
    cuerpo: "",
    fecha: "",
    completado: false,
  };
  nuevaTarea: {
    titulo: string;
    cuerpo: string;
    fecha: string;
    completado: boolean;
  } = {
    titulo: "",
    cuerpo: "",
    fecha: "",
    completado: false,
  };
  $router: any;
  tareaMostrada: Tarea[] | undefined;
  data() {
    return {
      tareaMostrada: [],
      tarea: [], // otros datos aquí
      editandoTarea: null,
      tareaEditada: {
        _id: "",
        titulo: "",
        cuerpo: "",
        fecha: "",
        completado: false,
      } as Tarea,
      nuevaTarea: {
        titulo: "",
        cuerpo: "",
        fecha: "",
        completado: false,
      },
      mostrarFormNuevaTarea: false,
    };
  }
  created() {
    // Llamada a mostrar todas las tareas al cargar el componente
    this.mostrarTodas();
  }

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
    this.mostrarTodas();
  }

  editarTarea(id: string): void {
    this.editandoTarea = id;
    this.tareaEditada = {
      ...this.tarea.find((tarea) => tarea._id === id),
    } as Tarea;
    this.mostrarFormNuevaTarea = false;
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
          `http://localhost:3000/todo/tareas/`,
          this.nuevaTarea
        );
        console.log("Respuesta del servidor:", respuesta.data);
        this.tarea.push(respuesta.data);
        this.nuevaTarea.titulo = "";
        this.nuevaTarea.cuerpo = "";
        this.nuevaTarea.fecha = "";

        this.mostrarFormNuevaTarea = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async borrarTarea(id: string): Promise<void> {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
      });

      if (confirmacion.isConfirmed) {
        // Eliminar del servidor
        await axios.delete(`http://localhost:3000/todo/tareas/${id}`);

        // Actualizar localmente
        this.tarea = this.tarea.filter((tarea) => tarea._id !== id);
        // Forzar la actualización de Vue
        this.$forceUpdate();
      }
    } catch (error) {
      console.log("Error al eliminar tarea:", error);
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

  // Método para obtener solo las tareas pendientes
  obtenerTareasPendientes(): Tarea[] {
    return this.tarea.filter((t) => !t.completado);
  }

  // Método para obtener solo las tareas completadas
  obtenerTareasCompletadas(): Tarea[] {
    return this.tarea.filter((t) => t.completado);
  }

  // Método para mostrar solo las tareas pendientes
  mostrarTareasPendientes(): void {
    this.tareaMostrada = this.obtenerTareasPendientes();
  }

  // Método para mostrar solo las tareas completadas
  mostrarTareasCompletadas(): void {
    this.tareaMostrada = this.obtenerTareasCompletadas();
  }

  // Método para mostrar todas las tareas
  mostrarTodas(): void {
    this.tareaMostrada =[...this.tarea];}
    
  // Función para mostrar/ocultar el formulario de nueva tarea
  mostrarFormularioNuevaTarea() {
    this.mostrarFormNuevaTarea = !this.mostrarFormNuevaTarea;
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


#nav {
 

 background-image: linear-gradient(135deg, #070208 0%, rgb(43, 9, 63) 100%); 
 margin-bottom:40px;
 box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
 left: 0px;
 top:0px;

}
/**titulo de la seccion */
h1 {
  color: #301155;
  text-align: center;
}




/*estilo para el link de proximo*/ 
ul {
  list-style: none;
  padding: 0;
}

li {
  
  color: #ffff;
  border-radius: 5px;
  display: block;
  cursor: pointer;
 
}

img {
  width: 150px;
  margin-right: auto;
  margin-left: 0px;
  margin-top: 0px;
  display: block;
 
}





/* input titulo de tarea editada -----*/ 
#titulo-editado{
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 5px 10px;
  border: 2px solid #764ba2 ;
}

/* inputs de nueva tarea -----*/ 

input[type="text"]{
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 5px 10px;
  border: 2px solid #764ba2 ;
}
input[type="date"],
textarea {
  
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 15px;
  border: 2px solid #764ba2 ;
 
}

/* estilos de los botones */
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

button:hover {
  background-color: #9e68d3;
  color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

#nueva-tarea{
  width: 200px;
  font-size: bold;}


/**fin estilos botones */
.titulo-lista {
  font-size: 30px;
  color: #5b5b5b;
  font-family: "Istok Web", sans-serif;
  font-weight: bold;
}



#cards-tareas{
  box-shadow: 5px 5px 10px  rgba(0, 0, 0, 0.3);


}

footer {
  background-image: linear-gradient(135deg, #070208 0%, rgb(43, 9, 63) 100%); 
    position:fixed ;
   left:0px;
   bottom:0px;
   
   padding: 20px;
   height:50px;
   width:100%;
   color: #fff;
   
}
footer p{
  text-align: center;
  
 margin-bottom: 50px;
 font-size: 15px;
  
}
</style>
