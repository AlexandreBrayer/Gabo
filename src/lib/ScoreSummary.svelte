<script>
  export let scoreSummary;
</script>

<div class="score-summary">
  {#each Object.entries(scoreSummary) as [name,score]}
    <span><b>{name}</b> : {score}</span>
  {/each}
</div>
