<script>
  export let scores;
  export let players;
</script>

<table class="table game-tab">
  <thead>
    <tr>
      {#each players as p}
        <th><abbr title={p.name}>{p.name.slice(0, 3)}</abbr></th>
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
  abbr[title] {
    position: relative;
    text-decoration: underline dotted;
  }

  abbr[title]:hover::after,
  abbr[title]:focus::after {
    content: attr(title);
    position: absolute;
    left: 0;
    bottom: -30px;
    width: auto;
    white-space: nowrap;

    background-color: #1e1e1e;
    color: #fff;
    border-radius: 3px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    font-size: 14px;
    padding: 3px 5px;
  }
</style>
