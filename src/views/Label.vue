<template>
  <div id="label">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="9">
          <v-card>
            <v-card-title>
              选择标签
            </v-card-title>
            <v-card-text>
              <v-container fluid>
                <v-row>
                  <v-col v-for="label in allLabels" :key="label.labelId">
                    <v-checkbox v-model="selectedLabels" :label="label.labelName" :value="label.labelId"></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <list_blog :articleurl="articleurl" :labelId="selectedLabels"></list_blog>
  </div>
</template>

<script>
  export default {
    name: "Label",
    components: {
      'list_blog': () => import('../components/list_blog.vue')
    },
    data() {
      return {
        articleurl: 'http://localhost:8181/article/label/',
        allLabels: [],
        selectedLabels: []
      }
    },
    created() {
      this.flushLabels();
      if (this.$route.query.labelId !== undefined) {
        this.selectedLabels.push(parseInt(this.$route.query.labelId));
      }
    },
    methods: {
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
      }
    },
    watch: {
      selectedLabels(val) {
      }
    }
  }
</script>

<style scoped>

</style>