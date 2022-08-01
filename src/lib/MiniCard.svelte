<script>
  import {
    fa1,
    fa0,
    fa2,
    fa3,
    fa4,
    fa5,
    fa6,
    fa7,
    fa8,
    fa9,
    faA,
    faR,
    faD,
    faV,
    faT,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "fontawesome-svelte";
  export let icon;
  export let pts = null;
  export let text = null;
  export let red = false;
  export let icon2 = null;
  let icons = {
    "2": fa2,
    "3": fa3,
    "4": fa4,
    "5": fa5,
    "6": fa6,
    "7": fa7,
    "8": fa8,
    "9": fa9,
    T: faT,
    A: faA,
    R: faR,
    D: faD,
    V: faV,
  };
</script>

<div class={pts ? "" : "power-style"}>
  {#if icons[icon]}
    <div class={red ? "red card-border" : "card-border"}>
      <FontAwesomeIcon icon={icons[icon]} />
    </div>
  {:else}
    <div class={red ? "red card-border-alt" : "card-border-alt"}>
      <FontAwesomeIcon icon={fa1} /><FontAwesomeIcon icon={fa0} />
    </div>
  {/if}
  {#if icon2}
    {#if icons[icon2]}
      <div class={red ? "red card-border" : "card-border"}>
        <FontAwesomeIcon icon={icons[icon2]} />
      </div>
    {:else}
      <div class={red ? "red card-border-alt" : "card-border-alt"}>
        <FontAwesomeIcon icon={fa1} /><FontAwesomeIcon icon={fa0} />
      </div>
    {/if}
  {/if}
  {#if pts}
    <div class="has-text-centered">
      {#if pts > 1}
        <span class="has-text-weight-bold">{pts} pts</span>
      {:else}
        <span class="has-text-weight-bold">{pts} pt</span>
      {/if}
    </div>
  {/if}
  {#if text}
    <span class="text has-text-weight-bold">{text}</span>
  {/if}
</div>

<style>
  .power-style {
    display: inline-flex;
    margin-bottom: 1rem;
  }
  .text {
    margin: auto;
    margin-left: 10px;
  }
  .card-border {
    border: 2px solid rgb(173, 172, 172);
    border-radius: 4px;
    padding: 10px;
    margin: 8px;
    max-height: 48px;
    max-width: 34px;
  }
  .card-border-alt {
    border: 2px solid rgb(173, 172, 172);
    border-radius: 4px;
    padding: 10px;
    margin: 8px;
    padding-left: 7px;
    max-width: 34px;
    max-height: 48px;
    white-space: nowrap;
  }
  .red {
    color: rgb(245, 36, 36);
  }
</style>
