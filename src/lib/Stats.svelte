<script>
  export let data;
</script>

<div class="stats-container">
  <div class="stats-line">
    <div class="stats-item-third has-text-success">
      <h6 class="has-text-success title is-6 mb-1">Victoires</h6>
      <p>{data.wins}</p>
    </div>
    <div class="stats-item-third">
      <h6 class="title is-6 mb-1">Ratio</h6>
      <p>
        {(data.wins / (data.losses == 0 ? 1 : data.losses) || 0).toFixed(2)}
      </p>
    </div>
    <div class="stats-item-third has-text-danger">
      <h6 class="title has-text-danger is-6 mb-1">Défaites</h6>
      <p>{data.losses}</p>
    </div>
  </div>
  <div class="stats-line">
    <div class="stats-item-third yellow">
      <h6 class="title yellow is-6 mb-1">
        <abbr title="Petites pénalités">Pp</abbr>
      </h6>
      <p>{data.lowPens}</p>
    </div>
    <div class="has-text-success stats-item-third">
      <h6 class=" has-text-success title is-6 mb-1">Gabos</h6>
      <p>{data.gabos}</p>
    </div>
    <div class="stats-item-third has-text-danger">
      <h6 class="title is-6 mb-1 has-text-danger">
        <abbr title="Grandes pénalités">Gp</abbr>
      </h6>
      <p>{data.highPens}</p>
    </div>
  </div>
  <div class="stats-line">
    <div class="stats-item-half diamond">
      <h6 class="title is-6 mb-1 diamond">
        <abbr title="Petites redescentes">Pr</abbr>
      </h6>
      <p>{data.lowDownhills}</p>
    </div>
    <div class="stats-item-half diamond">
      <h6 class="title is-6 mb-1 diamond">
        <abbr title="Grandes redescentes">Gr</abbr>
      </h6>
      <p>{data.highDownhills}</p>
    </div>
  </div>
  <div class="stats-line">
    <div class="stats-item-third">
      <h6 class="title is-6 mb-1">Game played</h6>
      <p>{data.totalGames}</p>
    </div>
    <div class="stats-item-third">
      <h6 class="title is-6 mb-1">Ratio</h6>
      <p>{(data.totalRounds / data.totalGames || 0).toFixed(2)}</p>
    </div>
    <div class="stats-item-third">
      <h6 class="title is-6 mb-1">Round played</h6>
      <p>{data.totalRounds}</p>
    </div>
  </div>
  <!-- <div class="stats-line">
    <div class="stats-item-third">
      <h6 class="title is-6 mb-1">Total score</h6>
      <p>{data.totalScore}</p>
    </div>
    <div class="stats-item-third">
      <h6 class="title is-6 mb-1">Avg Per round</h6>
      <p>{data.averageScore.toFixed(2)}</p>
    </div>
    <div class="stats-item-third">
      <h6 class="title is-6 mb-1">Avg Per game</h6>
      <p>{data.averageScorePerGame.toFixed(2)}</p>
    </div>
  </div> -->
</div>

<style>
  .yellow {
    color: #f1c40f;
  }
  .diamond {
    color: #1bc5e7;
  }
  .stats-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 90%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .stats-line {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .stats-item-third,
  .stats-item-half {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stats-item-half {
    width: 50%;
  }

  .stats-item-third {
    width: 33%;
  }

  abbr[title] {
    position: relative;
    text-decoration: underline dotted;
  }

  abbr[title]:hover::after,
  abbr[title]:focus::after {
    content: attr(title);
    position: absolute;
    left: -60px;
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
