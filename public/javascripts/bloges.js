$(() => {
  const cardsContainer = $("#cardsContainer");

  $("#getArticle").on("click", async function (e) {
    const requestHandler = () => {
      $.ajax({
        type: "GET",
        url: "/article/getAll",
        success: function (response) {
          const data = response.readArticle;
          console.log(data);
          cardsRenderer(data);
        },
        error: function (err) {
          console.log(err);
          alert("Something went wrong.");
        },
      });
    };

    requestHandler();
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const cardGenerator = (article) => {
    return `
    <div class="col-md-4 col-sm-6 col-12">
      <div class="card shadow p-3">
        <img src="${article.thumbnail}" class="card-img-top rounded" />
        <div class="card-body px-0">
          <h5 class="card-title">Title: ${article.title}</h5>
          <p class="card-text">
            <p>Description: ${article.description}</p>
            <p>CreatedAt: ${formatDate(article.createdAt)}</p>
          </p>
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
});






