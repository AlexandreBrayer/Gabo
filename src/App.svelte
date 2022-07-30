<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import Regles from "./pages/Regles.svelte";
  export let url = "";
</script>

<Router {url}>
  <nav class="topnav">
    <Link class="active" to="/">Jouer</Link>
    <div id="myLinks">
      <Link class="not-active" to="/regles">Regles</Link>
      <Link class="not-active" to="/">Profil</Link>
    </div>
  </nav>
  <div>
    <Route path="/"><Regles /></Route>
    <Route path="/regles"><Regles /></Route>
  </div>
</Router>