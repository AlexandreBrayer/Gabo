<script>
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { token, userName, userId } from "../stores/userStore";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import {
    faEnvelope,
    faLock,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  let name = "";
  let email = "";
  let password = "";
  let password2 = "";
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
  function register(e) {
    e.preventDefault();
    if (password !== password2) {
      showToast("Error", "Passwords do not match", false);
      return;
    }
    fetch(import.meta.env.VITE_API + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showToast("Success", "You have successfully registered", true);
          name = "";
          email = "";
          password = "";
          password2 = "";
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
  <title>Register</title>
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
    <p class="control has-icons-left has-icons-right">
      <input
        bind:value={email}
        class="input"
        type="email"
        placeholder="Email"
      />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon={faEnvelope} />
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
  <div class="field mb-4">
    <p class="control has-icons-left">
      <input
        bind:value={password2}
        class="input"
        type="password"
        placeholder="Confirm password"
      />
      <span class="icon is-small is-left">
        <FontAwesomeIcon icon={faLock} />
      </span>
    </p>
  </div>
  <div class="field">
    <p class="control">
      <button on:click={register} class="button is-success"> Register </button>
    </p>
  </div>
</form>
<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
</ToastContainer>
