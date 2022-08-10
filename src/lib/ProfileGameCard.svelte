<script>
  import { navigate } from "svelte-routing";
  function goToGameStats(id) {
    navigate("/stats/" + id);
  }
  export let game;
</script>

<div class="card-game">
  <span class="has-text-weight-bold has-text-success">
    {game.winner.name}
    {game.scores.at(-1)[game.winner._id]}
  </span>
  <span class="has-text-weight-bold has-text-danger">
    {game.loser.name}
    {game.scores.at(-1)[game.loser._id]}
  </span>
  <button
    on:click={() => {
      goToGameStats(game._id);
    }}
    class="button is-info">Stats</button
  >
</div>
