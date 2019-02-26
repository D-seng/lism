<template>
  <div>
    {{ lseSection.num }} {{ lseSection.text }} -- {{ lseSection.order }}
  </div>
</template>

<script>
export default {
  props: {
    lseSection: Object
  }
}
</script>

<style scoped></style>
