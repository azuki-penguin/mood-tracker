<script lang="ts">
    import { goto } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    import Textarea from "$lib/components/Textarea.svelte";
    import MoodButton from "$lib/components/MoodButton.svelte";
    import { Mood } from "$lib/models/Mood";

    let group: Mood;
    const chooseMood = () => {
        console.log(`Your mood is ${group}`);
    };

    let notes = '';

    const submit = () => {
        console.log({ group, notes });
    };

    const moveToChart = () => {
        goto("/chart");
    };
</script>

<div class="app-container">
    <h1 class="title">How Do You Feel Now?</h1>
    <div class="mood-button-container">
        <MoodButton
            mood={Mood.excellent}
            moodText="Excellent"
            moodIcon="fa-regular fa-face-laugh-beam"
            bind:group
            on:click={chooseMood}
        />
        <MoodButton
            mood={Mood.good}
            moodText="Good"
            moodIcon="fa-regular fa-face-smile-beam"
            bind:group
            on:click={chooseMood}
        />
        <MoodButton
            mood={Mood.fine}
            moodText="Fine"
            moodIcon="fa-regular fa-face-smile"
            bind:group
            on:click={chooseMood}
        />
        <MoodButton
            mood={Mood.feelDown}
            moodText="Feel Down"
            moodIcon="fa-regular fa-face-frown"
            bind:group
            on:click={chooseMood}
        />
        <MoodButton
            mood={Mood.depressed}
            moodText="Depressed"
            moodIcon="fa-regular fa-face-dizzy"
            on:click={chooseMood}
            bind:group
        />
    </div>

    <div class="mood-notes">
        <Textarea label="notes" bind:value={notes} />
    </div>

    <Button label="Submit" on:click={submit} />

    <Button label="move to mood chart" on:click={moveToChart} />
</div>

<style>
    .app-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;

        margin: 24px 0;
    }

    .title {
        margin: 0;

        font-family: sans-serif;
        font-size: 1.8rem;
    }

    .mood-button-container {
        display: grid;
        row-gap: 16px;
    }

    .mood-notes {
        width: 60%;
    }
</style>
