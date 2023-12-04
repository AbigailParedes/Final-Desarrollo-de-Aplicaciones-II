import Vue from "vue";
import VueRouter, {NavigationGuard} from 'vue-router';

import Bienvenida from './src/bienvenida.vue';
import todO from './src/todO.vue';
import { auth } from "./firebaseConfig";
import Registro from "./src/components/Registro.vue";
import About from './src/components/About.vue';
import NuestroEquipo from './src/components/NuestroEquipo.vue'

Vue.use(VueRouter);

//Guardia de navegación para verificar la autenticación
const requireAuth: NavigationGuard = function (to, from, next){
    const estaAutenticado = auth.currentUser;

    if (estaAutenticado){
        //si el usuario está autenticado, permite el acceso a la ruta
        next();
    }else{
        // si el usuario no esta autenticado, redirige al login
        next('/');
    }
};

const routes = [
    { path: '/', component: Bienvenida },
    { path: '/registro', component: Registro },
    { path: '/todO', component: todO, beforeEnter: requireAuth as NavigationGuard,// utiliza el guard requiereAuth para proteger la ruta
},
{ path: '/about', component: About },
{ path: '/equipo', component: NuestroEquipo }
];

const router = new VueRouter({
    routes,
})

export default router;