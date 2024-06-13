<script>
    import Button from "$lib/components/Button.svelte";
    import MoodButton from "$lib/components/MoodButton.svelte";
</script>

<div class="app-container">
    <h1 class="title">How Do You Feel Now?</h1>
    <div class="mood-button-container">
        <MoodButton
            moodText="Excellent"
            moodIcon="fa-regular fa-face-laugh-beam"
        />
        <MoodButton moodText="Good" moodIcon="fa-regular fa-face-smile-beam" />
        <MoodButton moodText="Fine" moodIcon="fa-regular fa-face-smile" />
        <MoodButton moodText="Feel Down" moodIcon="fa-regular fa-face-frown" />
        <MoodButton moodText="Depressed" moodIcon="fa-regular fa-face-dizzy" />
    </div>

    <Button label="move to mood chart" />
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
