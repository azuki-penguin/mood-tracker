<script lang="ts">
  export let title: string;
</script>

<header>
  <h1 class="app-title">{title}</h1>
</header>

<style>
  header {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #0e9d6e;
  }

  h1.app-title {
    color: #ffffff;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 2rem;
  }
</style>
