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
    import { Mood } from "$lib/models/Mood";
    import { addDay, addHour, dayStart } from "@formkit/tempo";

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

    export let startAt = dayStart(new Date());
    const generatePointsData = (): Point[] => {
        return [
            {
                x: addHour(addDay(startAt, 0), 7).getTime(),
                y: Mood.fine.getValue(),
            },
            {
                x: addHour(addDay(startAt, 0), 13).getTime(),
                y: Mood.good.getValue(),
            },
            {
                x: addHour(addDay(startAt, 1), 12).getTime(),
                y: Mood.fine.getValue(),
            },
            {
                x: addHour(addDay(startAt, 2), 18).getTime(),
                y: Mood.feelDown.getValue(),
            },
            {
                x: addHour(addDay(startAt, 3), 20).getTime(),
                y: Mood.depressed.getValue(),
            },
            {
                x: addHour(addDay(startAt, 4), 12).getTime(),
                y: Mood.good.getValue(),
            },
            {
                x: addHour(addDay(startAt, 5), 15).getTime(),
                y: Mood.good.getValue(),
            },
            {
                x: addHour(addDay(startAt, 6), 23).getTime(),
                y: Mood.excellent.getValue(),
            },
        ];
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
                        switch (value as number) {
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
