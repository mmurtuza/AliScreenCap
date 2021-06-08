const imageContainer = document.querySelector('.image-container');
const image = imageContainer.getElementsByTagName('img').item(0);
const searchBtn = document.getElementById("search");
const undoBtn = document.getElementById("undo");
const parentEle = document.getElementsByClassName('btn-container')[0];
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

undoBtn.addEventListener("click", () => {
    cropper.clear()

    parentEle.setAttribute('style', 'display: none;');
})
function initializeCropper(img) {
    if (cropper) {
        cropper.destroy();
    }
    cropper = new Cropper(img, {
        autoCrop: false,
        scalable: false,
        zoomable: false,
        background: false,
        ready() {
            console.log('cropper ready');
        },
        cropend(event) {

            let properties = 'left: ' + (event.detail.originalEvent.x - 100) + 'px; top:' + event.detail.originalEvent.y + 'px;';

            parentEle.removeAttribute("style");
            parentEle.setAttribute('style', properties);

        },
    });


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

            var b64 = btoa(data.secure_url);
            var urlToGo = "https://aliimagesearch.com/image?imageData=" + b64 + ""
            window.open(
                urlToGo, '_self'
            )
        })
        .catch(function (err) {
            console.log(err);
        });

}