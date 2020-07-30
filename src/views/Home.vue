<template>
  <div id="home">
    <list_blog ref="listBlog" articleurl="http://localhost:8181/article"></list_blog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    'list_blog': () => import('../components/list_blog.vue')
  }
}
</script>
