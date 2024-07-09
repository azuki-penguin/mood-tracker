<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let moodIcon: string;
    export let moodText: string;
    export let group: string;
    $: isSelected = moodText === group;

    const dispatcher = createEventDispatcher();
    const clickDispatcher = () => {
        group = moodText;
        dispatcher("click");
    };
</script>

<button class:isSelected on:click={clickDispatcher}>
    <i class="mood-icon {moodIcon}" />
    <span>{moodText}</span>
</button>

<style>
    button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;

        border: none;
        border-radius: 15px;
        box-shadow: 2px 4px 6px #888888;

        font-size: 2.2rem;
        color: #484848;
    }

    button.isSelected {
        color: #007bff;
    }

    .mood-icon {
        font-size: 2.48rem;
    }
</style>
