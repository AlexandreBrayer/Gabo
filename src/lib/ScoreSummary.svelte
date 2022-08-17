<script>
  let score = []
  export function updateScore(s) {
    score = s;
  }
</script>

<div class="score-summary">
  {#each score as s}
    <span><b>{s.name}</b> : {s.score}</span>
  {/each}
</div>
