const imageContainer = document.querySelector('.image-container');
const image = imageContainer.getElementsByTagName('img').item(0);
const searchBtn = document.getElementById("search");
var cropper;

chrome.runtime.sendMessage({ from: "urlRequest" });

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.from == "background") {
        image.src = msg.result;
    }
});

image.onload = function () {
    initializeCropper(image)
}

searchBtn.addEventListener("click", () => {
    search();
})

function initializeCropper(img) {
    if (cropper) {
        cropper.destroy();
    }
    cropper = new Cropper(img);
}


function search() {
    if (!cropper) {
        return;
    }

    const cd_url = "https://api.cloudinary.com/v1_1/djendsmic/upload";
    const cd_preset = "o3byx6gh";

    const file = cropper.getCroppedCanvas().toDataURL('image/jpeg');
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cd_preset);
    // console.log(formData)
    fetch(
        cd_url,
        {
            method: "POST",
            body: formData,
        })
        .then(res => res.json())
        .then(function (data) {
            // console.log(data) // for debugging
            // console.log(data.secure_url)// for debugging
            // console.log(btoa(data.secure_url))// for debugging
            var b64 = btoa(data.secure_url);
            var urlToGo = "https://aliimagesearch.com/image?imageData=" + b64 + ""
            window.open(
                urlToGo, "_blank"
            )
        })
        .catch(function (err) {
            console.log(err);
        });

    // axios({
    //     url: cd_url,
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     data: formData,
    // })
    //     .then(function (res) {
    //         // console.log(res) // for debugging
    //         // console.log(res.data.secure_url)// for debugging
    //         var urlToGo = "https://aliimagesearch.com/image?imageData=" + btoa(res.data.secure_url) + ""
    //         window.open(
    //             urlToGo, "_blank"
    //         )
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });


}