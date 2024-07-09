<script lang="ts">
    export let label = '';
    export let value = '';
</script>

<div class="textarea-container">
    <label for="textarea">{label}</label>
    <textarea id="textarea" bind:value={value}></textarea>
</div>

<style>
    .textarea-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .textarea-container > label {
        font-size: 1.1rem;
        font-weight: bold;
    }

    .textarea-container > textarea {
        border: solid 1px #e8e8e8;
        border-radius: 5px;

        padding: 6px 8px;
        font-size: 1.02rem;
    }
</style>