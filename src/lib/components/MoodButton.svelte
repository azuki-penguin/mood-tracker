<script lang="ts">
    export let moodIcon: string;
    export let moodText: string;
</script>

<button>
    <i class="mood-icon {moodIcon}" />
    <span>{moodText}</span>
</button>

<style>
    button {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 10px 20px;

        border: none;
        border-radius: 15px;
        box-shadow: 2px 4px 6px #888888;

        font-size: 2.5rem;
        color: #484848;
    }

    .mood-icon {
        font-size: 3rem;
    }
</style>
