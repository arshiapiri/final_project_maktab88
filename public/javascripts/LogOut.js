$(() => {
    $("#logout-btn").on("click", async function (e) {
        await fetch("/users/logout", {
            method: "get"
        })
            .then(async response => {
                Swal.fire({
                    title: "Success!",
                    text: "Logout successfully!",
                    icon: "success",
                })
                setTimeout(() => {
                    window.location.href = `/login`;
                }, 2000)
            }).catch((error) => {
                console.log(error);
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong!!!",
                    icon: "error",
                });
            })
    })

    $("#delete-btn").on("click", async function (e) {
        await fetch("users/deleteAcc", {
            method: "get"
        }).then(response => {
            Swal.fire({
                title: "Success!",
                text: "Delete successfully!",
                icon: "success",
            })
            setTimeout(() => {
                window.location.href = `/signup`;
            }, 2000)
        }).catch((error) => {
            Swal.fire({
                title: "Error!",
                text: "Something went wrong!!!",
                icon: "error",
            });
        })
    })
});