<template>
  <v-container class="fill-height" fluid>
    <v-row align="start" justify="center">
      <v-col cols="10">
        <v-card>
          <v-card-title>
            {{ article.articleTitle }}
          </v-card-title>
          <v-card-subtitle>
            <v-icon>mdi-calendar-range</v-icon> {{ article.articleDate }}<br/>
            <v-icon>mdi-account-outline</v-icon> {{ userName }}
          </v-card-subtitle>
          <v-card-text>
            <mavon-editor style="z-index: 0;" :toolbarsFlag="false" :subfield="false" defaultOpen="preview" previewBackground="#ffffff"
                          :boxShadow="false" v-model="article.articleContent" codeStyle="solarized-light" :externalLink="externalLink">
            </mavon-editor>
            <v-divider></v-divider><br/>
            <v-chip-group column>
              <v-chip v-for="label in labels" label @click="toLabel(label.labelId)" :key="label.labelId">
                <v-icon left>mdi-label</v-icon>
                {{ label.labelName }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-actions v-if="this.$store.state.isAuthenticated">
            <v-btn block color="primary" @click="changeRoute('/management/blog/edit/' + article.articleId)">
              <v-icon>mdi-file-document-edit-outline</v-icon>
              编辑
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: "ShowBlog",
    data() {
      return {
        userName: '',
        article: {},
        labels: [],
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
      'mavon-editor': mavonEditor
    },
    methods: {
      getArticle() {
        let _this = this;
        this.axios({
          method: 'get',
          url: 'http://localhost:8181/article/' + this.$route.params.articleId
        }).then(res => {
          if (res.data.code === 100) {
            _this.article = res.data.data.article;
          }
        });
      },
      toLabel(labelId) {
        this.$router.push({
          path: '/label',
          query: {
            labelId: labelId
          }
        });
      },
      changeRoute(path) {
        this.$router.push(path);
      }
    },
    created() {
      this.getArticle();
    },
    watch: {
      article(val) {
        if (this.article === {} || this.article.userId === undefined) {
          return ;
        }
        let _this = this;
        this.axios({
          method: "get",
          url: 'http://localhost:8181/user/name/' + _this.article.userId
        }).then(res => {
          _this.userName = res.data.message;
        });
        this.axios({
          method: "get",
          url: 'http://localhost:8181/label/article/' + _this.article.articleId
        }).then(res => {
          _this.labels = res.data.data.labels;
        });
      }
    }
  }
</script>

<style scoped>

</style>