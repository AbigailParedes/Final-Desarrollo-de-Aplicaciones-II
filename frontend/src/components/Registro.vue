<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- Dentro de tu componente Registro.vue -->
        <h2
          class="form-title text-right"
          v-if="mostrarFormulario === 'login'"
        >
          Login
        </h2>
        <h2
          class="form-title text-right"
          v-else-if="mostrarFormulario === 'registro'"
        >
          Registrarse
        </h2>
        <h2
          class="form-title text-right"
          v-else
        >
          ¿Olvidaste tu Contraseña?
        </h2>

        <form
          v-if="mostrarFormulario === 'login'"
          @submit.prevent="login"
          action=""
          class="mt-4 login-form"
        >
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="emailLogin"
              v-model="email"
              placeholder="Correo Electronico"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="passwordLogin"
              v-model="password"
              placeholder="Contraseña"
            />
          </div>
          <button
            type="submit"
            class="btn btn-success mt-4"
          >
            Iniciar Sesión
          </button>
          <p class="mt-2">
            ¿No tienes una cuenta?
            <a
              href="#"
              @click="cambiarFormulario('registro')"
              >Regístrate</a
            >
          </p>
          <p class="mt-2">
            <a
              href="#"
              @click="cambiarFormulario('recuperar')"
              >¿Olvidaste tu contraseña?</a
            >
          </p>
        </form>

        <form
          v-else-if="mostrarFormulario === 'registro'"
          @submit.prevent="register"
          class="mt-4 register-form"
        >
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="emailRegister"
              v-model="emailSign"
              placeholder="Correo Electronico"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="passwordRegister"
              v-model="passwordSign"
              placeholder="Contraseña"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="passwordRepeat"
              v-model="passwordCompare"
              placeholder="Repetir Contraseña"
            />
          </div>
          <button
            type="submit"
            class="btn btn-success mt-4"
          >
            Registrarse
          </button>
          <p class="mt-2">
            ¿Ya tienes una cuenta?
            <a
              href="#"
              @click="cambiarFormulario('login')"
              >Iniciar Sesión</a
            >
          </p>
        </form>

        <form
          v-else
          @submit.prevent="forgotPassword"
          class="mt-4 recovery-form"
        >
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              id="emailForgot"
              v-model="emailForgot"
              placeholder="Correo Electronico"
            />
          </div>
          <button
            type="submit"
            class="btn btn-info mt-4 custom-btn"
          >
            Enviar Correo de Recuperación
          </button>
          <p class="mt-2">
            ¿Recuerdas tu contraseña?
            <a
              href="#"
              @click="cambiarFormulario('login')"
              >Iniciar Sesión</a
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

@Component
export default class Registro extends Vue {
  mostrarFormulario: string = "login";
  email: string = "";
  emailSign: string = "";
  password: string = "";
  passwordSign: string = "";
  passwordCompare: string = "";
  emailForgot: string = "";
  $router: any;

  login() {
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((credenciales) => {
        const user = credenciales.user;
        console.log(user);
        window.alert("Inicio de sesión Exitoso");
        this.$router.push("/todO");
      })
      .catch((error) => {
        window.alert("Fallo el Inicio de Sesión");
        console.error(error);
      });
  }

  register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailSign)) {
      window.alert("Correo electrónico inválido");
      return;
    }

    if (this.passwordSign === this.passwordCompare) {
      createUserWithEmailAndPassword(auth, this.emailSign, this.passwordSign)
        .then((credenciales: { user: any }) => {
          const user = credenciales.user;
          console.log(user);
          window.alert("Registro Exitoso");

          this.passwordSign = "";
          this.passwordCompare = "";
        })
        .catch((error: any) => {
          window.alert("Fallo el Registro");
          console.error(error);
        });
    } else {
      window.alert("Las contraseñas no coinciden");
      this.passwordSign = "";
      this.passwordCompare = "";
    }
  }

  forgotPassword() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailForgot)) {
      window.alert("Correo electrónico inválido");
      return;
    }

    sendPasswordResetEmail(auth, this.emailForgot)
      .then(() => {
        window.alert("Correo de recuperación enviado exitosamente");
        this.emailForgot = "";
        this.mostrarFormulario = "login";
      })
      .catch((error: any) => {
        window.alert("Error al enviar el correo de recuperación");
        console.error(error);
      });
  }

  cambiarFormulario(formulario: string) {
    this.mostrarFormulario = formulario;
  }
}
</script>

<style scoped>
.form-title.text-right {
  text-align: left;
}
.login-form,
.register-form,
.recovery-form {
  background-color: rgb(231, 243, 227);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.8s ease;
}

.login-form:hover,
.register-form:hover,
.recovery-form:hover {
  box-shadow: 0 0 50px rgba(37, 37, 37, 0.5);
}

.form-title {
  color: #333;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  color: #555;
}

input {
  border-radius: 30px;
  width: 60%;
  font-size: 15px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-color: rgb(153, 255, 0, 0.35);
}

input:focus {
  background-color: rgba(204, 83, 248, 0.35);
}

.btn-success,
.btn-info {
  background-color: #4caf50;
  border: none;
  font-size: 15px;
}

.btn-success:hover,
.btn-info:hover {
  background-color: #81c42a;
}

.btn-success:active,
.btn-info:active {
  background-color: #3e8e41;
}

.custom-btn {
  color: #fff !important;
}
</style>
