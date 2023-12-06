import Vue from "vue";
import VueRouter, {NavigationGuard} from 'vue-router';

import Bienvenida from './src/views/bienvenida.vue';
import todO from './src/components/todO.vue';
import { auth } from "./firebaseConfig";
import Registro from "./src/components/Registro.vue";

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
];

const router = new VueRouter({
    routes,
})

export default router;