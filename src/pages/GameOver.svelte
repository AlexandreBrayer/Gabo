<script>
  import { gameStore, roundsStore, groupStore } from "../stores/gameStore";

  $gameStore = JSON.parse(localStorage.getItem("gameStore"));
  $roundsStore = JSON.parse(localStorage.getItem("roundsStore"));
  $groupStore = JSON.parse(localStorage.getItem("groupStore"));

  let rounds = JSON.parse(JSON.stringify($roundsStore));
  let playerIndexes = $groupStore.map((player) => player._id);
  let endScores = [$roundsStore[0].scores];
  for (let i = 1; i < $roundsStore.length; i++) {
    endScores.push($roundsStore[i].scores);
    for (let j = 0; j < playerIndexes.length; j++) {
      endScores[i][playerIndexes[j]] += endScores[i - 1][playerIndexes[j]];
      if (
        $roundsStore[i].lowDownhill.includes(playerIndexes[j]) ||
        $roundsStore[i].highDownhill.includes(playerIndexes[j])
      ) {
        endScores[i][playerIndexes[j]] /= 2;
      }
    }
  }
  let stats = {
    rounds: $roundsStore.length,
    scores: endScores,
    gabo: $roundsStore.reduce((acc, cur) => {
      for (let i = 0; i < cur.gabo.length; i++) {
        acc[cur.gabo[i]] ? acc[cur.gabo[i]]++ : (acc[cur.gabo[i]] = 1);
      }
      return acc;
    }, {}),
    lowpen: $roundsStore.reduce((acc, cur) => {
      for (let i = 0; i < cur.lowpen.length; i++) {
        acc[cur.lowpen[i]] ? acc[cur.lowpen[i]]++ : (acc[cur.lowpen[i]] = 1);
      }
      return acc;
    }, {}),
    highpen: $roundsStore.reduce((acc, cur) => {
      for (let i = 0; i < cur.highpen.length; i++) {
        acc[cur.highpen[i]] ? acc[cur.highpen[i]]++ : (acc[cur.highpen[i]] = 1);
      }
      return acc;
    }, {}),
    lowDownhill: $roundsStore.reduce((acc, cur) => {
      for (let i = 0; i < cur.lowDownhill.length; i++) {
        acc[cur.lowDownhill[i]]
          ? acc[cur.lowDownhill[i]]++
          : (acc[cur.lowDownhill[i]] = 1);
      }
      return acc;
    }, {}),
    highDownhill: $roundsStore.reduce((acc, cur) => {
      for (let i = 0; i < cur.highDownhill.length; i++) {
        acc[cur.highDownhill[i]]
          ? acc[cur.highDownhill[i]]++
          : (acc[cur.highDownhill[i]] = 1);
      }
      return acc;
    }, {}),
  };

  console.log(stats);
</script>

<svelte:head><title>GameOver</title></svelte:head>
<table class="table">
  <thead>
    <tr>
      {#each $groupStore as player}
        <th>{player.name}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each $roundsStore as round}
      <tr>
        {#each playerIndexes as id}
          <td>{round.scores[id]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
<div class="stats-sum">
<span>
  <b>Gabo:</b>
  {#each Object.entries(stats.gabo) as [userId, gabo]}
    <span>
      {$groupStore.find((el) => el._id == userId).name}: {gabo}
    </span>
  {/each}
</span>
<span>
    <b>Petite péna:</b>
    {#each Object.entries(stats.lowpen) as [userId, gabo]}
      <span>
        {$groupStore.find((el) => el._id == userId).name}: {gabo}
      </span>
    {/each}
  </span>
  <span>
    <b>Grande Pena:</b>
    {#each Object.entries(stats.highpen) as [userId, gabo]}
      <span>
        {$groupStore.find((el) => el._id == userId).name}: {gabo}
      </span>
    {/each}
  </span>
  <span>
    <b>Petite Redscente:</b>
    {#each Object.entries(stats.lowDownhill) as [userId, gabo]}
      <span>
        {$groupStore.find((el) => el._id == userId).name}: {gabo}
      </span>
    {/each}
  </span>
  <span>
    <b>Grande Redscente:</b>
    {#each Object.entries(stats.highDownhill) as [userId, gabo]}
      <span>
        {$groupStore.find((el) => el._id == userId).name}: {gabo}
      </span>
    {/each}
  </span>
</div>