<template>
  <blog_editor editorTitle="新建博客" postURL="http://localhost:8181/article"></blog_editor>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: "NewBlog",
    components: {
      'blog_editor': () => import('../../components/blog_editor.vue')
    }
  }
</script>

<style scoped>
</style>