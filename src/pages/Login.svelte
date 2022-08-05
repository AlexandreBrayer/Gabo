<script>
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { token, userName, userId } from "../stores/userStore";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import {
    faLock,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  let name = "";
  let password = "";
  const showToast = (title, description, succes) => {
    toasts.add({
      title: title,
      description: description,
      duration: 5000,
      placement: "bottom-right",
      type: succes ? "success" : "error",
      theme: "dark",
    });
  };
  function login(e) {
    e.preventDefault();
    fetch(import.meta.env.VITE_API + "/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showToast("Success", "Welcome back", true);
          name = "";
          password = "";
          $token = data.token;
          $userName = data.name;
          $userId = data.userId;
          localStorage.setItem("token", data.token);
        } else {
          showToast("Error", data.message, false);
        }
      });
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>
<form class=" user-form box mt-6">
  <div class="field mb-4">
    <p class="control has-icons-left has-icons-right">
      <input bind:value={name} class="input" type="text" placeholder="Name" />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon={faUser} />
      </span>
    </p>
  </div>

  <div class="field mb-4">
    <p class="control has-icons-left">
      <input
        bind:value={password}
        class="input"
        type="password"
        placeholder="Password"
      />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon={faLock} />
      </span>
    </p>
  </div>

  <div class="field">
    <p class="control">
      <button on:click={login} class="button is-success"> Login </button>
    </p>
  </div>
</form>
<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
</ToastContainer>
