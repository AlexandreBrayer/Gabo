<script>
  import { navigate } from "svelte-routing";
  import { token } from "../stores/userStore.js";
  export let user;
  function logout() {
    $token = null;
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }
</script>

<div class="user-info-card">
  <div><b>{user.name}</b></div>
  <div>{user.games.length} games played</div>
</div>
<button on:click={logout}>Logout</button>
