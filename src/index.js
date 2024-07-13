console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const filterDropdown = document.getElementById("breed-dropdown");

    // Fetch images of dogs
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching dog images:", error));

    // Fetch dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            Object.keys(data.message).forEach(breed => {
                const li = document.createElement("li");
                li.textContent = breed;
                breedList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching dog breeds:", error));

    // Change font color on click
    breedList.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            event.target.style.color = "blue"; // Change to any color you prefer
        }
    });

    // Filter breeds by selected letter
    filterDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const liElements = breedList.getElementsByTagName("li");

        Array.from(liElements).forEach(li => {
            if (li.textContent.startsWith(selectedLetter)) {
                li.style.display = "list-item";
            } else {
                li.style.display = "none";
            }
        });
    });
});
