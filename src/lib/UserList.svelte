<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let users;
  function addToGroup(user) {
    dispatch("addToGroup", user);
  }
</script>

{#each users as user}
  <div class="user-mini-card">
    <b>{user.name}</b>
    <button on:click={() => addToGroup(user)} class="button is-info"
      >Selectioner</button
    >
  </div>
{/each}
