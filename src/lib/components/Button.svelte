<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let label = "";

    const dispatcher = createEventDispatcher();
    const clickDispatcher = () => {
        dispatcher("click");
    };
</script>

<button on:click={clickDispatcher}>{label}</button>

<style>
    button {
        padding: 15px 20px;

        background-color: #dfdfdf;
        color: #2f2f2f;
        font-size: 1.2rem;

        border: none;
        border-radius: 10px;
    }
</style>
