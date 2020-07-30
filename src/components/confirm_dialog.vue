<template>
  <div>
    <v-dialog v-model="confirmDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{ confirmMessage.confirmTitle }}</v-card-title>
        <v-card-text>{{ confirmMessage.confirmContent }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handlerConfirm(false)">否</v-btn>
          <v-btn text @click="handlerConfirm(true)">是</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: "confirm_dialog",
    data() {
      return {
        confirmDialog: false,
        confirmMessage: {
          confirmTitle: '',
          confirmContent: ''
        },
        promiseStatus: null
      }
    },
    methods: {
      show(confirmTitle, confirmContent) {
        if (confirmContent !== undefined && confirmContent !== '') {
          this.confirmMessage.confirmContent = confirmContent;
        }
        if (confirmTitle !== undefined && confirmTitle !== '') {
          this.confirmMessage.confirmTitle = confirmTitle;
        }
        this.confirmDialog = true;
        let _this = this;
        return new Promise(function (resolve, reject) {
          _this.promiseStatus = {resolve, reject};
        });
      },
      handlerConfirm(flag) {
        this.confirmDialog = false;
        if (flag) {
          this.promiseStatus && this.promiseStatus.resolve();
        } else {
          this.promiseStatus && this.promiseStatus.reject();
        }
      }
    }
  }
</script>

<style scoped>

</style>