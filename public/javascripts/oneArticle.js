$(() => {
    
    const url = window.location.pathname;
    const articleId = url.substring(url.lastIndexOf("/") + 1);

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
})