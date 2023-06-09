$(() => {
  const cardsContainer = $("#cardsContainer");

  let articles;
  const requestHandler = async () => {
    await fetch("/article/getAll", {
      method: "get"
    }).then(async response => {
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        articles = data.readArticle;
        cardsRenderer(articles);
      }
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        title: "خطا!",
        text: "مشکلی پیش آمده است!!!",
        icon: "error",
      });
    });
  }
  requestHandler();
  $("#getArticle").on("click", async function (e) {
    requestHandler()
  });
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const cardGenerator = (article) => {
    return `
    <div class="col-md-4 col-sm-6 col-12">
        <img src="${article.thumbnail}" class="card-img-top rounded" />
      <div class="card-body px-0">
        <h5 class="card-title">Title: ${article.title}</h5>
        <p class="card-text">
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
  $("#editArticleBtn").on("click", async function (e) {
    e.preventDefault();
    let hasErrors = false;

    const swalResult = await Swal.fire({
      title: 'Input user information',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="title">' +
        '<input type="file" id="swal-input3" class="swal2-input" placeholder="Thumbnail" style="width: 260px;">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Content">',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        return {
          title: document.getElementById('swal-input1').value,
          Thumbnail: document.getElementById('swal-input3').value,
          Content: document.getElementById('swal-input4').value,
        };
      }
    });

    if (swalResult.isConfirmed) {
      const userData = swalResult.value;

      const response = await fetch('api/users/updateUser', {
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







