$(() => {
    $("#logout-btn").on("click", async function (e) {
        await fetch("/users/logout", {
            method: "get"
        })
            .then(async response => {
                swal({
                    title: "Success!",
                    text: "Logout successfully!",
                    icon: "success",
                })
                setTimeout(() => {
                    window.location.href = `/login`;
                }, 2000)
            }).catch((error) => {
                swal({
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
            swal({
                title: "Success!",
                text: "Delete successfully!",
                icon: "success",
            })
            setTimeout(() => {
                window.location.href = `/signup`;
            }, 2000)
        }).catch((error) => {
            swal({
                title: "Error!",
                text: "Something went wrong!!!",
                icon: "error",
            });
        })
    })
});