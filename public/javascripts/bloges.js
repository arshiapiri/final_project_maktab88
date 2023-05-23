$(() => {
  const cardsContainer = $("#cardsContainer");

  $("#getArticle").on("click", async function (e) {
    try {
      const response = await fetch("/article/getAll");
      if (response.ok) {
        const data = await response.json();
        const articles = data.readArticle;
        cardsRenderer(articles);
      } else {
        throw new Error("Request failed.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const cardGenerator = (article) => {
    return `
    <div class="col-md-4 col-sm-6 col-12">
      <div class="arshia card shadow p-3">
        <img src="${article.thumbnail}" class="card-img-top rounded" />
        <div class="card-body px-0">
          <h5 class="card-title">Title: ${article.title}</h5>
          <p class="card-text">
            <p>Description: ${article.description}</p>
            <p>CreatedAt: ${formatDate(article.createdAt)}</p>
          </p>
          <a href="/article/${article._id}" class="btn btn-primary w-100">Show Profile</a>
        </div>
      </div>
    </div>
    `;
  };

  const cardsRenderer = (data) => {
    let html = "";
    for (const article of data) {
      html += cardGenerator(article);
    }
    cardsContainer.html(html);
  };

    $("#removeArticleBtn").on("click", async function (e) {
      
      await fetch("/article/:id", {
        method: "DELETE",
      })
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Success!",
            text: "Delete successfully!",
            icon: "success",
          });

        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong!!!",
            icon: "error",
          });
        });
    });
  $("#editArticleBtn").on("click", async function (e) {
      e.preventDefault();
      let hasErrors = false;
  
      const swalResult = await Swal.fire({
        title: 'Input user information',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="title">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Description">' +
          '<input id="swal-input3" class="swal2-input" placeholder="Thumbnail">' +
          '<input id="swal-input5" class="swal2-input" placeholder="Content">'+
          '<input id="swal-input6" class="swal2-input" placeholder="Author">',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          return {
            title: document.getElementById('swal-input1').value,
            Description: document.getElementById('swal-input2').value,
            Thumbnail: document.getElementById('swal-input3').value,
            Content: document.getElementById('swal-input4').value,
            Images: document.getElementById('swal-input5').value,
            Author: document.getElementById('swal-input6').value,
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
  
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorText
          });
  
          hasErrors = true; 
        }
  
        if (!hasErrors) {
          Swal.close();
        }
      }
    });
  });







