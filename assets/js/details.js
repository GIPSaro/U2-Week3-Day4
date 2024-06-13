document.addEventListener("DOMContentLoaded", function () {
  const imageDetails = JSON.parse(sessionStorage.getItem("imageDetails"));
  if (imageDetails) {
    document.getElementById("image").src = imageDetails.src.large;
    document.getElementById("photographer").textContent =
      imageDetails.photographer;
    document.getElementById("photographer_url").href =
      imageDetails.photographer_url;
  }
});
