<template>
  <v-app>
    <navibar></navibar>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
import jwt from 'jwt-decode';
export default {
  name: 'App',

  components: {
    navibar: () => import('./components/navibar.vue')
  },

  data: () => ({
  }),

  created(){
    if (localStorage.blogToken){
      const decoded = jwt(localStorage.blogToken);
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },

  methods: {
    isEmpty (value) {
      return(
        value === undefined || value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
