<script lang="ts">
    import type { Mood } from "$lib/models/Mood";
    import { createEventDispatcher } from "svelte";

    export let moodIcon: string;
    export let moodText: string;
    export let mood: Mood;
    export let group: Mood;
    $: isSelected = mood.equals(group);

    const dispatcher = createEventDispatcher();
    const clickDispatcher = () => {
        group = mood;
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
