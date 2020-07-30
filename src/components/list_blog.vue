<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col v-for="article in articles" :key="article.articleTitle" cols="9">
        <v-card @click="readMore(article.articleId)">
          <v-card-title v-text="article.articleTitle"></v-card-title>
          <v-card-subtitle>
            <v-icon>mdi-calendar-range</v-icon> {{ article.articleDate }}<br/>
          </v-card-subtitle>
          <v-card-text>
            <v-chip-group column>
              <v-chip label v-for="label in article.labels" :key="label.labelId" @click="toLabel(label.labelId)">
                <v-icon left>mdi-label</v-icon>
                {{ label.labelName }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-actions>
            <v-btn text>阅读更多</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "ListBlog",
    data() {
      return {
        articles: [],
      }
    },
    props: ['articleurl', 'labelId'],
    methods: {
      getArticles() {
        let _this = this;
        let myParam = {};
        if (this.labelId !== undefined && this.labelId.length !== 0) {
          myParam.labelId = this.labelId.toString();
        }
        this.axios({
          method: 'get',
          url: _this.articleurl,
          params: myParam
        }).then(res => {
          if (res.data.code === 100) {
            _this.articles = res.data.data.articles;
          }
        });
      },
      readMore(articleId) {
        this.$router.push("/blog/" + articleId);
      },
      toLabel(labelId) {
        this.$router.push({
          path: '/label',
          query: {
            labelId: labelId
          }
        });
      }
    },
    created() {
      this.getArticles();
    },
    watch: {
      articles(val) {
        if (this.articles === undefined || this.articles === []) {
          return ;
        }
        let _this = this;
        this.articles.filter(function (item, index) {
          item.labels = [];
          _this.axios({
            method: "get",
            url: 'http://localhost:8181/label/article/' + item.articleId
          }).then(res => {
            item.labels = res.data.data.labels.slice();
            _this.$forceUpdate();
          });
        });
      },
      labelId(val) {
        this.getArticles();
      }
    }
  }
</script>

<style scoped>

</style>