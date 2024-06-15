<script>
    import { goto } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
    import MoodButton from "$lib/components/MoodButton.svelte";

    let group = "";
    const chooseMood = () => {
        console.log(`Your mood is ${group}`);
    };

    const moveToChart = () => {
        goto("/chart");
    };
</script>

<div class="app-container">
    <h1 class="title">How Do You Feel Now?</h1>
    <div class="mood-button-container">
        <MoodButton
            moodText="Excellent"
            moodIcon="fa-regular fa-face-laugh-beam"
            bind:group
            on:click={chooseMood}
        />
        <MoodButton
            moodText="Good"
            moodIcon="fa-regular fa-face-smile-beam"
            bind:group
            on:click={chooseMood}
        />
        <MoodButton
            moodText="Fine"
            moodIcon="fa-regular fa-face-smile"
            bind:group
            on:click={chooseMood}
        />
        <MoodButton
            moodText="Feel Down"
            moodIcon="fa-regular fa-face-frown"
            bind:group
            on:click={chooseMood}
        />
        <MoodButton
            moodText="Depressed"
            moodIcon="fa-regular fa-face-dizzy"
            on:click={chooseMood}
            bind:group
        />
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
        row-gap: 20px;
    }
</style>
