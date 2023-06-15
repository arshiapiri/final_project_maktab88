$(() => {
  const cardsContainer = $("#cardsContainer");
  const url = window.location.pathname;
  const articleId = url.substring(url.lastIndexOf("/") + 1);
  let articles;

  const requestHandler = async () => {
    await fetch("api/article/getAll", {
      method: "get"
    }).then(async response => {
      if (response.ok) {
       const data = await response.json();
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
          <a href="api/article/${article._id}" class="btn btn-primary w-100">Show Profile</a>
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
      title: 'Input article information',
      html:
        '<input type="text" class="form-control form-control-lg" id="title" name="title" placeholder="Enter your title" />' +
        '<input type="file" name="thumbnail" class="form-control form-control-lg" id="thumbnail" placeholder="Enter your thumbnail" />' +
        ' <textarea class="form-control form-control-lg" id="content" name="content" placeholder="Enter your content"></textarea>',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('content', document.getElementById('content').value);
        formData.append('thumbnail', document.getElementById('thumbnail').files[0]);
  
        return formData;
      }
    });
  
    if (swalResult.isConfirmed) {
      const articleData = swalResult.value;
  
      const response = await fetch(`/api/article/${articleId}`, {
        method: 'put',
        body: articleData
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
        window.location.href = `/Article`;
      }
    }
  });
});







