$(() => {
  const cardsContainer = $("#cardsContainer");
  const paginationContent = $("#paginationContent");
  const url = window.location.pathname;
  const articleId = url.substring(url.lastIndexOf("/") + 1);
  

  const requestHandler = async () => {
    const page = 1;
    const pageSize = 4;
    const url = `api/article/getAll?page=${page}&pageSize=${pageSize}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const articles = data.results;
        cardsRenderer(articles);
        console.log(articles);
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "error!",
        text: "error !!",
        icon: "error",
      });
    }
  }
  requestHandler()
  $("#getArticle").on("click", async function (e) {
    requestHandler()
  });
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const cardGenerator = (article) => {
    return `
    <div class="col-md-6 col-sm-6 col-12">
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

  const paginationHandler = async (page) => {
    const pageSize = 4; 
    const url = `/api/article/getAll?page=${page}&pageSize=${pageSize}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const articles = data.results;
        cardsRenderer(articles);
        console.log(data);
  
        // بررسی فعال یا غیرفعال بودن دکمه‌ها
        const previousButton = document.getElementById("previous-button");
        const nextButton = document.getElementById("next-button");
  
        if (data.page === 1) {
          previousButton.disabled = true;
        } else {
          previousButton.disabled = false;
        }
  
        if (data.page === data.totalPages) {
          nextButton.disabled = true;
        } else {
          nextButton.disabled = false;
        }
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "خطا!",
        text: "خطایی رخ داده است!",
        icon: "error",
      });
    }
  };
  
  let currentPage = 1;
  
  document.getElementById("previous-button").addEventListener("click", () => {
    currentPage--;
    paginationHandler(currentPage);
  });
  
  document.getElementById("next-button").addEventListener("click", () => {
    currentPage++;
    paginationHandler(currentPage);
  });
  
  // اجرای درخواست اولیه
  paginationHandler(currentPage);
});







