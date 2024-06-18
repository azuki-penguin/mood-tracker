<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import DatePicker from "$lib/components/DatePicker.svelte";
    import { goto } from "$app/navigation";
    import MoodChart from "$lib/components/MoodChart.svelte";

    const moveToRoot = () => {
        goto("/");
    };

    let date: Date;
    const changeDate = (event: CustomEvent<Date>) => {
        date = event.detail;
    };
</script>

<div class="app-container">
    <h1>Mood Chart</h1>
    <div class="date-form">
        <i class="fa-solid fa-calendar-day" />
        <DatePicker on:change={changeDate} />
    </div>
    <div class="mood-chart-container">
        <MoodChart bind:startAt={date} />
    </div>
    <Button label="How do you feel now?" on:click={moveToRoot} />
</div>

<style>
    .app-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
    }

    .date-form {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .date-form > i {
        color: #888888;
        font-size: 0.9rem;
    }
</style>
