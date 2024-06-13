const apiKey = "ebdhhz7wgCVwtzAx5qYxqIaynOvU5qHLnp4hnwsSaRco5yVCwcIHkZCh";
const url = "https://api.pexels.com/v1/search?query=beer";
const url2 = "https://api.pexels.com/v1/search?query=wine";
const url3 = "https://api.pexels.com/v1/search?query=drink";
const urlSearch = "https://api.pexels.com/v1/search?query=";

const photoContainer = document.getElementById("photoContainer");
const loadBtn1 = document.getElementById("btn1");
const loadBtn2 = document.getElementById("btn2");
const searchButton = document.getElementById("inputButton");
const searchInput = document.getElementById("inputField");

window.onload = function () {
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => {
      return raw.json();
    })
    .then((dati) => {
      displayImages(dati.photos);
      console.log(dati);
    });
};

//creo le cards

function displayImages(images) {
  images.forEach((image) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("cardContainer", "col-md-4");

    const card = document.createElement("div");
    card.classList.add("card", "mb-4", "shadow-sm");

    const imgContainer = document.createElement("div");

    imgContainer.classList.add("d-flex", "justify-content-center");

    const imgAnchor = document.createElement("a");
    imgAnchor.href = "#";
    imgAnchor.onclick = function () {
      // Passa i dettagli dell'immagine alla pagina dei dettagli
      const imageDetails = {
        src: image.src.large,
        photographer: image.photographer,
        photographer_url: image.photographer_url,
      };
      sessionStorage.setItem("imageDetails", JSON.stringify(imageDetails));
      window.location.href = "imageDetails.html"; // reindirizza alla pagina dei dettagli
    };

    const img = document.createElement("img");
    img.className = "card-body";
    img.src = image.src.small;
    img.alt = img.alt;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const titleAnchor = document.createElement("a");
    titleAnchor.href = "";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = image.photographer;

    const text = document.createElement("p");
    text.className = "card-text";
    text.textContent =
      "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer";

    const cardSection = document.createElement("div");
    cardSection.classList.add(
      "cardSection",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-group";

    const button1 = document.createElement("button");
    button1.type = "button";
    button1.classList.add("btn", "btn-sm", "btn-outline-secondary");
    button1.textContent = "View";

    const button2 = document.createElement("button");
    button2.type = "button";
    button2.classList.add("btn", "btn-sm", "btn-outline-secondary");
    button2.textContent = "Hide";

    const hideMinuts = document.createElement("small");
    hideMinuts.className = "text-muted";
    hideMinuts.textContent = image.id;

    //appendo gli elementi nel Dom

    cardContainer.appendChild(card);
    card.appendChild(imgContainer);
    imgContainer.appendChild(imgAnchor);
    imgAnchor.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    title.appendChild(titleAnchor);
    cardBody.appendChild(text);
    cardBody.appendChild(cardSection);
    cardSection.appendChild(buttonContainer);
    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);
    cardSection.appendChild(hideMinuts);
    photoContainer.appendChild(cardContainer);

    //Funzione per il bottone Hide

    button2.onclick = function () {
      cardContainer.remove();

      imgAnchor.onclick = function () {
        const selectedImages = image.id;

        const stringObj = JSON.stringify(selectedImages);
        sessionStorage.setItem("selectedItem", stringObj);
      };
    };
  });
}

//Funzione per il bottone load images and load secondary images

loadBtn1.onclick = function () {
  fetch(url2, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => {
      return raw.json();
    })
    .then((btnLoad) => {
      photoContainer.innerHTML = "";
      displayImages(btnLoad.photos);
    });
};
loadBtn2.onclick = function () {
  fetch(url3, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => {
      return raw.json();
    })
    .then((btnLoadSec) => {
      photoContainer.innerHTML = "";
      displayImages(btnLoadSec.photos);
    });
};

//Funzione per il bottone Search

searchButton.onclick = function () {
  const query = searchInput.value;
  const searchUrl = urlSearch + query;
  fetch(searchUrl, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => raw.json())
    .then((searchResults) => {
      photoContainer.innerHTML = "";
      displayImages(searchResults.photos);
    });
};
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
