<script>
  export let user;
</script>

<div class="user-info-card">
  <div>
    <img
      class="profile-pic"
      src="https://robohash.org/{user.name}"
      alt="Profile pic"
    />
  </div>
  <div><b>{user.name}</b></div>
  <div>{user.games.length} games played</div>
</div>
