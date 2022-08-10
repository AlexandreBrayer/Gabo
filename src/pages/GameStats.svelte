<script>
  import { token } from "../stores/userStore";
  import { onMount } from "svelte";
  import moment from "moment";
  export let params;

  const id = params.id;
  let game;
  let date;
  function getStats() {
    fetch(import.meta.env.VITE_API + "/game/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: $token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          game = data.game;
          console.log(game);
        }
      });
  }
  onMount(() => {
    getStats();
  });
</script>

<svelte:head>
  <title>GameStats</title>
</svelte:head>

{#if game}
  <h3 class="title is-3 mt-4 ml-4">Stats</h3>
  <span class="ml-4"> Partie du {moment(game.timestamp).format("DD/MM/YYYY")}</span>
{/if}
