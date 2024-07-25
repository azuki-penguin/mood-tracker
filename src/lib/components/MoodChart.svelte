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
        TimeScale,
        Colors,
        type ChartOptions,
        type ChartData,
        type Point,
    } from "chart.js";
    import "chartjs-adapter-moment";
    import { date, dayStart } from "@formkit/tempo";
    import { Mood } from "$lib/models/Mood";

    type MoodRecord = {
        id: string;
        mood: number;
        note: string|null;
        createdAt: string;
    };

    ChartJS.register(
        Title,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
        LineElement,
        PointElement,
        TimeScale,
        Colors,
    );

    export let records: MoodRecord[] = [];
    export let startAt = dayStart(new Date());
    const generatePointsData = (): Point[] => {
        return records.map<Point>((x) => ({
            x: date(x.createdAt).getTime(),
            y: x.mood,
        }));
    };
    const data: ChartData<"line", Point[]> = {
        datasets: [
            {
                label: "Mood",
                data: generatePointsData(),
            },
        ],
    };
    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "time",
                time: {
                    unit: "day",
                    displayFormats: {
                        day: "YYYY/MM/DD",
                    },
                },
            },
            y: {
                ticks: {
                    stepSize: 1,
                    autoSkip: false,
                    callback(value) {
                        // Ignore floating point
                        const y = Number.parseInt(String(value));
                        switch (y) {
                            case 2:
                                return "Excellent";
                            case 1:
                                return "Good";
                            case 0:
                                return "Fine";
                            case -1:
                                return "Feel Down";
                            case -2:
                                return "Depressed";
                            default:
                                throw new Error(`Invalid value: ${value}`);
                        }
                    },
                },
                min: Mood.depressed.getValue(),
                max: Mood.excellent.getValue(),
            },
        },
    };
    let chart: ChartJS<"line", Point[]>;
    $: {
        const _date = startAt; // Watch startAt change to update chart.
        if (chart) {
            chart.data = {
                datasets: [{ label: "Mood", data: generatePointsData() }],
            };
            chart.update();
        }
    }
</script>

<Line bind:chart {data} {options} />
