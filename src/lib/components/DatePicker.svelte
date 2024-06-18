<script lang="ts">
    import { parse } from "@formkit/tempo";
    import { createEventDispatcher } from "svelte";

    let date: string;

    const dispatcher = createEventDispatcher<{ change: Date }>();
    const changeEventDispatcher = () => {
        if (!date) {
            return;
        }
        dispatcher("change", parse(date));
    };
</script>

<input type="date" bind:value={date} on:blur={changeEventDispatcher} />

<style>
    input[type="date"] {
        padding: 4px;
        border: solid 1px #a8a8a8;
        border-radius: 5px;

        font-size: 1.1rem;
    }
</style>
