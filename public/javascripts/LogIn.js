$(() => {
    $("button").on("click", async function (e) {
      e.preventDefault();
      const fields = {
        username: $("#username-input").val(),
        password: $("#password-input").val(),
      }
  
       await fetch("/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields)
      })
        .then(async response => {
            setTimeout(() => {
              window.location.href = `/profile`;
            }, 2000)
        }).catch(error => {
            console.log(error);
        })
    });
  })