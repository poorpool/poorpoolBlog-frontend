<template>
  <v-card>
    <v-card-title>{{ editorTitle }}</v-card-title>
    <v-card-text>
      <v-form v-model="valid">
        <v-text-field :counter="512" v-model="blogForm.articleTitle" label="标题" required></v-text-field>
        <mavon-editor style="z-index: 0; max-height: 600px" v-model="blogForm.articleContent" codeStyle="solarized-light" :externalLink="externalLink"></mavon-editor>
        <br/>
        <v-card flat>
          <v-card-title>选择标签</v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-row dense>
                <v-col v-for="label in allLabels" :key="label.labelId">
                  <v-checkbox v-model="selectedLabels" :label="label.labelName" :value="label.labelId"></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="newTagDialog=true">新建标签</v-btn>
          </v-card-actions>
        </v-card>
        <br/><br/>
        <v-btn block color="primary" @click="submitBlog">提交</v-btn>
      </v-form>
      <v-dialog v-model="newTagDialog" max-width="400px">
        <v-card>
          <v-card-title>新建标签</v-card-title>
          <v-card-text>
            <v-form ref="newTagForm">
              <v-text-field label="标签名" :rules="tagNameRules" v-model="labelName"></v-text-field>
              <v-btn color="primary" @click="submitTagName">提交</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="newTagDialog=false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
    <error_dialog ref="errorDialog"></error_dialog>
    <confirm_dialog ref="confirmDialog"></confirm_dialog>
  </v-card>
</template>

<script>
  import 'mavon-editor/dist/css/index.css';
  import {mavonEditor} from "mavon-editor";
  import Confirm_dialog from "./confirm_dialog";

  export default {
    name: "blog_editor",
    props: ['editorTitle', 'postURL'],
    data() {
      return {
        value: '',
        newTagDialog: false,
        valid: true,
        labelName: '',
        tagNameRules: [
          v => !!v || '请输入名字',
        ],
        blogForm: {
          articleTitle: '',
          articleContent: ''
        },
        selectedLabels: [],
        allLabels: [],
        externalLink: {
          hljs_css: function(css) {
            // 这是你的代码高亮配色文件路径
            return '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/styles/' + css + '.min.css';
          },
          hljs_lang: function(lang) {
            // 这是你的代码高亮配色文件路径
            return '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/languages/' + lang + '.min.js';
          },
          hljs_js: function () {
            return '//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.1.2/build/highlight.min.js';
          },
          katex_js: function () {
            return 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js'
          },
          katex_css: function() {
            return 'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css';
          },
        },
      }
    },
    components: {
      'error_dialog': () => import('./error_dialog.vue'),
      'confirm_dialog': () => import('./confirm_dialog.vue'),
      'mavon-editor': mavonEditor
    },
    created() {
      this.flushLabels();
    },
    methods: {
      submitTagName() {
        if (!this.$refs.newTagForm.validate()) {
          return false;
        }
        let _this = this;
        this.axios({
          method: 'post',
          url: 'http://localhost:8181/label',
          data: {
            labelName: _this.labelName
          }
        }).then(res => {
          if (res.data.code === 100) {
            _this.newTagDialog = false;
            _this.flushLabels();
          } else {
            _this.$refs.errorDialog.show('添加标签失败', '尝试添加标签失败，可能是标签已存在');
          }
        }).catch(error => {
          _this.$refs.errorDialog.show('添加标签异常', '尝试添加标签失败，可能是服务器异常');
        });
      },
      flushLabels() {
        this.allLabels = [];
        let _this = this;
        this.axios({
          method: 'get',
          url: 'http://localhost:8181/label'
        }).then(res => {
          if (res.data.code === 100) {
            for (let c in res.data.data.labels) {
              _this.allLabels.push(res.data.data.labels[c]);
            }
          }
        });
      },
      submitBlog() {
        let _this = this;
        this.$refs.confirmDialog.show("确认", "你真的要提交吗？").then(() => {
          this.axios({
            method: 'post',
            url: _this.postURL,
            data: {
              article: {
                userId: _this.$store.getters.user.aud,
                articleTitle: _this.blogForm.articleTitle,
                articleContent: _this.blogForm.articleContent
              },
              labels: _this.selectedLabels
            }
          }).then(res => {
            if (res.data.code === 100) {
              _this.$refs.errorDialog.show('提交成功');
            } else {
              _this.$refs.errorDialog.show('提交失败', res.data.message);
            }
          });
        }).catch(() => {});
      }
    }
  }
</script>

<style scoped>

</style>