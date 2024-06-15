<script lang="ts">
    import { Line } from "svelte-chartjs";
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from "chart.js";
    import Button from "$lib/components/Button.svelte";
    import DatePicker from "$lib/components/DatePicker.svelte";

    const data = {
        labels: Array.from(new Array(5), (_, i) => i),
        datasets: [{ label: "label", data: [1, 2, 3, 4, 5] }],
    };

    ChartJS.register(
        Title,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
        LineElement,
        PointElement,
    );
</script>

<div class="app-container">
    <h1>Mood Chart</h1>
    <div class="date-form">
        <i class="fa-solid fa-calendar-day" />
        <DatePicker />
    </div>
    <div class="mood-chart-container">
        <Line {data} options={{ responsive: true }} />
    </div>
    <Button label="How do you feel now?" />
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
