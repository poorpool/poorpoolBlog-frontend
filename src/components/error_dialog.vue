<template>
  <div>
    <v-dialog v-model="errorDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{ errorMessage.errorTitle }}</v-card-title>
        <v-card-text>{{ errorMessage.errorContent }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="errorDialog=false">我知道了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "error_dialog",
    data() {
      return {
        errorDialog: false,
        errorMessage: {
          errorTitle: '',
          errorContent: ''
        }
      }
    },
    methods: {
      show(errorTitle, errorContent) {
        if (errorContent !== undefined && errorContent !== '') {
          this.errorMessage.errorContent = errorContent;
        }
        if (errorTitle !== undefined && errorTitle !== '') {
          this.errorMessage.errorTitle = errorTitle;
        }
        this.errorDialog = true;
      },
      close() {
        this.errorDialog = false;
      }
    }
  }
</script>

<style scoped>

</style>