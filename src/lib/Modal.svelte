<script>
  import { FontAwesomeIcon } from "fontawesome-svelte";
  import { groupStore } from "../stores/gameStore.js";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

  let name = "";
  let email = "";
  let otp = "";

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

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

  function createGuest(e) {
    e.preventDefault();
    if (name === "" || email === "") {
      showToast("Error", "Name and email are required", false);
      return;
    }
    if (!validateEmail(email)) {
      showToast("Error", "Email is not valid", false);
      return;
    }
    fetch(import.meta.env.VITE_API + "/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showToast("Success", "Guest created", true);
          name = "";
          email = "";
          otp = data.otp;
          let group = $groupStore;
          group.push(data.user);
          $groupStore = group;
        } else {
          showToast("Error", data.message, false);
        }
      });
  }
</script>

<div on:click|self class="modal">
  <div class="content">
    <div>
      <form class=" user-form mt-6">
        <div class="field mb-4">
          <p class="control has-icons-left has-icons-right">
            <input
              bind:value={name}
              class="input"
              type="text"
              placeholder="Name"
            />
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
        <div class="field">
          <p class="control">
            <button on:click={createGuest} class="button is-success">
              Céer + ajouter au groupe</button
            >
          </p>
        </div>
      </form>
      <div class="otp">
        One Time Password : <span class="otp-code"><b>{otp}</b></span>
      </div>
    </div>
  </div>
</div>

<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
</ToastContainer>

<style>
  .modal {
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    background-color: white;
    border-radius: 10px;
    padding: 5px;
    width: 20em;
    height: 20em;
  }
</style>
