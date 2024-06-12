<script>
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<div class="app-container">
  <Header title="Mood Tracker" />

  <main>
    <slot />
  </main>

  <Footer />
</div>

<style>
  div.app-container {
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
</style>
