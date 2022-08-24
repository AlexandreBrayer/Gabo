<script>
  export let scores;
  export let players;
</script>

<table class="table game-tab">
  <thead>
    <tr>
      {#each players as p}
        <th>{p.name}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each scores as s}
      <tr>
        {#each Object.keys(s) as p}
          <td>{s[p]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .game-tab {
    width: 100%;
  }
</style>