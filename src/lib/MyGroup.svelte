<script>
  export let group = [];
  import { userId } from "../stores/userStore";
  import { faUser, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { createEventDispatcher } from "svelte";
  import  Modal  from "./Modal.svelte";
  const dispatch = createEventDispatcher();
  let toggleGuestModal = false;
  function removeFromGroup(user) {
    dispatch("removeFromGroup", user);
  }
  function toggleModal() {
		toggleGuestModal = !toggleGuestModal;
	}
</script>

<div class="centered-title mb-5">
  <h3 class="title is-3 mt-5 ml-3">
    <FontAwesomeIcon icon={faUser} />
    <span>Groupe</span>
  </h3>
</div>

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
<div class="user-mini-card">
  <b
    on:click={() => {
      toggleModal();
    }}
  >
    <FontAwesomeIcon icon={faPlusCircle} /> Créer un invité
  </b>
</div>
{#if toggleGuestModal}
	<Modal on:addToGroup={(e) => {
    dispatch("addToGroup", e.detail);
  }} on:click={toggleModal}/>
{/if}
