$(() => {
    $("#edit-btn").on("click", async function (e) {
      e.preventDefault();
      let hasErrors = false;
  
      const swalResult = await Swal.fire({
        title: 'Input user information',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="First Name">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Last Name">' +
          '<input id="swal-input3" class="swal2-input" placeholder="Gender">' +
          '<input id="swal-input4" class="swal2-input" placeholder="Username">',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          return {
            fristName: document.getElementById('swal-input1').value,
            lastName: document.getElementById('swal-input2').value,
            gender: document.getElementById('swal-input3').value,
            username: document.getElementById('swal-input4').value
          };
        }
      });
  
      if (swalResult.isConfirmed) {
        const userData = swalResult.value;
  
        const response = await fetch('/users/updateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          const parsedError = JSON.parse(errorMessage);
          const errorText = parsedError.message;
  
          // نمایش خطا با استفاده از Swal.fire
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorText
          });
  
          hasErrors = true; // وجود خطا را ثبت کنید
        }
  
        if (!hasErrors) {
          Swal.close();
        }
      }
    });
  });