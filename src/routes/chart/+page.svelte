<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import DatePicker from "$lib/components/DatePicker.svelte";
    import { goto } from "$app/navigation";
    import MoodChart from "$lib/components/MoodChart.svelte";
    import { format } from "@formkit/tempo";

    type MoodRecord = {
        id: string;
        mood: number;
        note: string|null;
        createdAt: string;
    };

    const moveToRoot = () => {
        goto("/");
    };

    const loadMoodData = async () => {
        const params = new URLSearchParams({
            date: format(date, 'YYYY-MM-DD'),
        });
        const response = await fetch(`/chart?${params}`);
        const moodRecords: MoodRecord[] = await response.json();
        return moodRecords;
    };

    const changeDate = async () => {
        moodRecords = await loadMoodData();
    };

    export let data: { list: MoodRecord[], date: Date };
    let moodRecords = data.list;
    let date = data.date;
</script>

<div class="app-container">
    <h1>Mood Chart</h1>
    <div class="date-form">
        <i class="fa-solid fa-calendar-day" />
        <DatePicker bind:date={date} on:change={changeDate} />
    </div>
    <div class="mood-chart-container">
        <MoodChart bind:records={moodRecords} />
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

    .mood-chart-container {
        min-height: 240px;
        padding: 10px;
        box-shadow: 2px 2px 6px #888888;
    }
</style>
