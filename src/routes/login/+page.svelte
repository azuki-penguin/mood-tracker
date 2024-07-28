<script lang="ts">
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<div class="login-form-container">
    <h1 class="title">Login</h1>
    {#if  form?.success}
        <p class="success-message">A login link sent.</p>
    {:else}
        {#if form?.error}
            <p class="error-message">{form.error}</p>
        {/if}
        <form class="login-form" method="POST">
            <div class="email-form">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="your-email@example.com">
            </div>
            <button type="submit">Login</button>
        </form>
    {/if}
</div>

<style scoped>
    .login-form-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        margin: 80px 20px 0;
    }

    h1 {
        margin: 0;
    }

    .success-message {
        margin: 0;
        font-size: 1.1rem;
    }

    .error-message {
        margin: 0;
        color: red;
        font-weight: bold;
    }

    form.login-form {
        display: grid;
        row-gap: 20px;
        padding: 20px;

        background-color: #ffffff;
        border: solid 1px #c8c8c8;
        border-radius: 10px;
    }

    .email-form {
        display: grid;
        align-items: center;
        grid-template-columns: auto 1fr;
        column-gap: 15px;
    }

    .email-form > label {
        font-weight: bold;
        font-size: 1.1rem;
    }

    .email-form > input[type="email"] {
        padding: 8px 12px;
        border: solid 1px #c8c8c8;
        border-radius: 5px;
        font-size: 1.05rem;
    }

    form.login-form > button {
        padding: 10px;

        background-color: #0e9d6e;
        color: #ffffff;
        font-size: 1.1rem;
        font-weight: bold;

        border: none;
        border-radius: 5px;
    }
</style>