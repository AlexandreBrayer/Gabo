<script>
  export let user;
  let pena = 0;
  let roundScore;
  let gabo = false;

  export function getUser() {
    return user;
  }

  export function setScore(round) {
    let scores = round.scores;
    let userId = user._id;
    roundScore = scores[userId];
    if (round.gabo.indexOf(userId) > -1) {
      gabo = true;
    }
    if (round.lowpen.indexOf(userId) > -1) {
      pena = 1;
    }
    if (round.highpen.indexOf(userId) > -1) {
      pena = 2;
    }
  }

  export function dumpScore() {
    let lowpen = pena == 1;
    let highpen = pena == 2;
    if (!roundScore) {
      roundScore = 0;
    }
    return {
      lowpen,
      highpen,
      roundScore: pena === 0 ? roundScore : pena * 25,
      gabo,
      user,
    };
  }
  export function reset() {
    pena = 0;
    roundScore = null;
    gabo = false;
  }
  function pena0() {
    gabo = !gabo;
    if (gabo) {
      pena = 0;
      roundScore = 0;
    }

  }
  function pena25() {
    pena == 1 ? (pena = 0) : (pena = 1);
    pena == 1 ? (gabo = false) : (gabo = gabo);
  }
  function pena50() {
    pena == 2 ? (pena = 0) : (pena = 2);
    pena == 2 ? (gabo = false) : (gabo = gabo);
  }
</script>

<div class="gamer-card-container my-3">
  <h6 class="title is-6 mb-3">{user.name}</h6>
  <div class="gamer-card-container-inputs">
    <input type="number" class="input score-input" bind:value={roundScore} />
    <button on:click={pena25} class={pena == 1 ? "button is-warning" : "button"}
      >+25</button
    >
    <button on:click={pena50} class={pena == 2 ? "button is-danger" : "button"}
      >+50</button
    >
    <button class={gabo ? "button is-success" : "button"} on:click={pena0}> GABO </button>
  </div>
</div>
