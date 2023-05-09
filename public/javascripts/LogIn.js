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
          if (!response.ok) {
            const errorMessage = await response.text();
            const parsedError = JSON.parse(errorMessage);
            //Joi Check validation 
            const errorText = parsedError.message; 
            swal({
              title: "Error!",
              text: errorText,
              icon: "error",
            });
          } else {
            swal({
              title: "Success!",
              text: "Your data has been saved.",
              icon: "success",
            });
            setTimeout(() => {
              window.location.href = `/profile`;
            }, 2000)
          }
        })
    });
  })