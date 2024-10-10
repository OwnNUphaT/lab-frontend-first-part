<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import { JsxEmit } from 'typescript';

const store = useMessageStore()
const authStore = useAuthStore()
const router = useRouter()
const { message } = storeToRefs(store)
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
}else{
  authStore.logout()
}

function logout() {
  authStore.logout()
  router.push({ name: 'logn' })
}

</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <nav class="flex">
              <ul class="flex navbar-nav ml-auto" v-if="!authStore.currentUserName">
                  <li class="nav-item px-2">
                      <router-link to="/register" class="nav-link">
                          <div class="flex items-center">
                            <span class="ml-3">Sign Up</span>
                          </div>
                      </router-link>
                  </li>
                  <li class="nav-item px-2">
                      <router-link to="/login" class="nav-link">
                          <div class="flex items-center">
                            <span class="ml-3">Login</span>
                          </div>
                      </router-link>
                  </li>
              </ul>
              <ul class="flex navbar-nav ml-auto" v-if="authStore.currentUserName" >
                  <li class="nav-item px-2">
                      <router-link to="/profile" class="nav-link">
                          <div class="flex items-center">
                              <span class="ml-3">{{ authStore.currentUserName }}</span>
                          </div>
                      </router-link>
                  </li>
                  <li class="nav-item px-2">
                      <a class="nav-link hover:cursor-pointer" @click="logout">
                          <div class="flex items-center">
                              <span class="ml-3">LogOut</span>
                          </div>
                      </a>
                  </li>
              </ul>
          </nav>
          <RouterLink 
          class="font-bold text-gray-700"
          exportparts="text-green-500"
          :to="{ name: 'event-list-view' }"
          >Event</RouterLink>
          |
          <span v-if="authStore.isAdmin">
            <RouterLink 
          class="font-bold text-gray-700"
          exportparts="text-green-500"
          :to="{ name: 'add-event' }"
          >New Event</RouterLink>
          |
          </span>
          <router-link 
          class="font-bold text-gray-700"
          :to="{ name: 'organizer' }" 
          exact-active-class="text-green-500">
          Organizer</router-link> 
          <span v-if="authStore.isAdmin">
          |
          <router-link 
          class="font-bold text-gray-700" 
          :to="{ name: 'add-organier' }" 
          exact-active-class="text-green-500">
          New Organizer</router-link>
          </span>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style>

/* nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
} */



/* @keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flashMessage {
  animation: yellofade 3s ease-in-out;
} */
</style>
