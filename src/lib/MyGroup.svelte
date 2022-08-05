<script>
  export let group = [];
  import { userId } from "../stores/userStore";
  import { faUser } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function removeFromGroup(user) {
    dispatch("removeFromGroup", user);
  }
</script>

<h3 class="title is-3 mt-5 ml-3">
  <FontAwesomeIcon icon={faUser} />
  <span>Groupe</span>
</h3>

{#each group as user}
  <div class="user-mini-card">
    <b>{user.name}</b>
    {#if user._id == $userId}
      <button disabled class="button is-danger">X</button>
    {:else}
      <button on:click={() => removeFromGroup(user)} class="button is-danger"
        >X</button
      >
    {/if}
  </div>
{/each}
