<template>
  <div>
    <v-container style="padding-top: 0" class="fill-height" fluid >
      <v-row align="start" justify="center">
        <v-col cols="12" style="padding-top: 0">
          <blog_editor ref="blogEditor" editorTitle="修改博客" :postURL="postURL"></blog_editor>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>删除博客</v-card-title>
            <v-card-text>
              <v-alert type="warning">
                删除博客不可逆
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="deleteArticle">
                <v-icon>mdi-delete-forever</v-icon>
                删除博客
              </v-btn>
            </v-card-actions>
          </v-card>
          <confirm_dialog ref="confirmDialog"></confirm_dialog>
          <error_dialog ref="errorDialog"></error_dialog>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: "EditBlog.vue",
    components: {
      confirm_dialog: () => import('../../components/confirm_dialog.vue'),
      blog_editor: () => import('../../components/blog_editor.vue'),
      error_dialog: () => import('../../components/error_dialog.vue')
    },
    data() {
      return {
        postURL: 'http://localhost:8181/article/' + this.$route.params.articleId
      }
    },
    created() {
      this.setArticle(this.$route.params.articleId);
      this.setLabels(this.$route.params.articleId);
    },
    methods: {
      setArticle(articleId) {
        let _this = this;
        this.axios({
          method: "get",
          url: 'http://localhost:8181/article/' + articleId
        }).then(res => {
          _this.$refs.blogEditor.blogForm.articleTitle = res.data.data.article.articleTitle;
          _this.$refs.blogEditor.blogForm.articleContent = res.data.data.article.articleContent;
        });
      },
      setLabels(articleId) {
        let _this = this;
        this.axios({
          method: "get",
          url: 'http://localhost:8181/label/article/' + articleId
        }).then(res => {
          let labelIds = [];
          res.data.data.labels.filter(function (item, index) {
            labelIds.push(item.labelId);
          });
          _this.$refs.blogEditor.selectedLabels = labelIds;
        });
      },
      deleteArticle() {
        let _this = this;
        this.$refs.confirmDialog.show('删除', '你确定要删除吗？').then(() => {
          _this.axios({
            method: 'delete',
            url: 'http://localhost:8181/article/' + this.$route.params.articleId
          }).then(res => {
            if (res.data.code === 100) {
              _this.$refs.errorDialog.show('删除成功', '');
              _this.$router.push('/');
            } else {
              _this.$refs.errorDialog.show('删除失败', res.data.message);
            }
          }).catch(error => {
            _this.$refs.errorDialog.show('删除失败', '可能是服务器出现了问题');
          });
        }).catch(() => {});
      }
    }
  }
</script>

<style scoped>

</style>