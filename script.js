document.getElementById("generateBtn").addEventListener("click", function () {
    let qrText = document.getElementById("qrText").value;
    let qrImage = document.getElementById("qrImage");

    if (qrText.trim() === "") {
        alert("Please enter a valid URL or text");
        return;
    }

    let qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`;
    
    qrImage.src = qrApi;
    qrImage.style.display = "block";

    // Wait for the image to load before enabling download
    qrImage.onload = function () {
        fetch(qrApi)
            .then(response => response.blob())
            .then(blob => {
                let url = URL.createObjectURL(blob);
                downloadBtn.href = url;
                downloadBtn.download = "qrcode.png";
                downloadBtn.style.display = "inline-block"; // Show the button
            });
    };
});

// Free up memory after download
document.getElementById("downloadBtn").addEventListener("click", function () {
    setTimeout(() => {
        URL.revokeObjectURL(this.href);
    }, 100);
});
