$(() => {
  $("button").on("click", async function (e) {
    e.preventDefault();
    const fields = {
      fristName: $("#firstname-input").val(),
      lastName: $("#lastname-input").val(),
      username: $("#username-input").val(),
      password: $("#password-input").val(),
      phoneNumber: $("#phoneNumber-input").val(),
    }
    if (!!$("#gender-input").val()) fields.gender = $("#gender-input").val();

     await fetch("/users/signup", {
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
            window.location.href = `/login`;
          }, 2000)
        }
      });
  });
})
