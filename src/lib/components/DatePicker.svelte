<script lang="ts">
    import { format, parse } from "@formkit/tempo";
    import { createEventDispatcher, onMount } from "svelte";

    let inputDate: string;
    export let date: Date;

    const dispatcher = createEventDispatcher();
    const changeEventDispatcher = () => {
        if (!inputDate) {
            return;
        }
        date = parse(inputDate);
        dispatcher("change");
    };

    onMount(() => {
        inputDate = format(date, 'YYYY-MM-DD');
    });
</script>

<input type="date" bind:value={inputDate} on:blur={changeEventDispatcher} />

<style>
    input[type="date"] {
        padding: 4px;
        border: solid 1px #a8a8a8;
        border-radius: 5px;

        font-size: 1.1rem;
    }
</style>
