<script lang="ts">
    import { goto } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    import Textarea from "$lib/components/Textarea.svelte";
    import MoodButton from "$lib/components/MoodButton.svelte";
    import { Mood } from "$lib/models/Mood";
    import type { Coordinates } from "$lib/models/Coordinates";
    import { browser } from "$app/environment";

    let errorMessage = '';
    $: hasError = errorMessage !== '';
    let isSaved = false;

    let group: Mood;
    const chooseMood = () => {
        console.log(`Your mood is ${group}`);
    };

    let notes = '';
    let coord: Coordinates;
    if (browser) {
        navigator.geolocation.getCurrentPosition((position) => {
            coord = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
            };
        });
    }

    const submit = async () => {
        if (!group) {
            errorMessage = 'Choose your mood.';
            return;
        }

        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({
                notes,
                coord,
                mood: group?.getValue(),
            }),
        });

        if (!response.ok) {
            errorMessage = 'Failed to save mood.';
            return;
        }

        isSaved = true;
        errorMessage = '';
    };

    const moveToChart = () => {
        goto("/chart");
    };
</script>

<div class="app-container">
    <h1 class="title">How Do You Feel Now?</h1>
    <div class="mood-button-container">
        {#if hasError}
        <div class="error-message">ERROR: {errorMessage}</div>
        {/if}
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

    <div class="save-button">
        <Button label="Submit" on:click={submit} />
        {#if isSaved}
        <div class="save-message">Saved.</div>
        {/if}
    </div>

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

    .save-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

    .save-button  > .save-message {
        font-weight: bold;
    }

    .error-message {
        color: #ff0000;
        font-weight: bold;
        font-size: 1.2rem;
    }
</style>
