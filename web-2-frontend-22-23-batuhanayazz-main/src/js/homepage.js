window.onload = () => {
    console.log('page is fully loaded');
    loadData(allFishSpecies);
};
/* === DOM === */
/* Card container */
const cardCollection = document.getElementById("cardCollection");
/* Filters */
const allSpeciesFish = document.getElementById("allSpeciesFish"),
    africanCichlids = document.getElementById("africanCichlids"),
    americanCichlids = document.getElementById("americanCichlids"),
    livebearer = document.getElementById("livebearer"),
    tetras = document.getElementById("tetras"),
    tags = document.querySelectorAll(".tag");
/* Searchbar */
const searchBar = document.getElementById("searchTerm");
/* Card container Elements*/
let addMyStockButtons = document.querySelectorAll("#addMyStock"),
    openModalButtons = document.querySelectorAll('[data-modal-target]'),
    closeModalButtons = document.querySelectorAll('[data-close-button]'),
    overlay = document.getElementById('overlay');
    catalogMessage = document.getElementById('catalogMessage');
/* DOM Style */
cardCollection.style.display = "none";
searchBar.style.display = "none";
document.getElementById("tags").style.display = "none";
/* ARRAYS */
let fishSpeciesData = [];
/* === FRONTEND API's === */
const allFishSpecies = "https://private-c681a-aquariumfish.apiary-mock.com/species",
    africanCichlidsAPI = "https://private-c681a-aquariumfish.apiary-mock.com/africancichlids",
    americanCichlidsAPI = "https://private-c681a-aquariumfish.apiary-mock.com/americancichlids",
    livebearerAPI = "https://private-c681a-aquariumfish.apiary-mock.com/livebearer",
    tetrasAPI = "https://private-c681a-aquariumfish.apiary-mock.com/tetras";
/* === BACKEND API's === */
const backEndFish = 'https://web-2-backend-22-23-batuhanayazz.onrender.com/fish',
    backEndStock = 'https://web-2-backend-22-23-batuhanayazz.onrender.com/clients/stocks';

/* === Search Function === */
/* https://www.youtube.com/watch?v=wxz5vJ1BWrc */
searchBar.addEventListener('keyup', (event) => {
    const searchString = event.target.value.toLowerCase();
    const filteredAllFishSpeciesData = fishSpeciesData.filter(fish => {
        return (fish.common_name.toLowerCase().includes(searchString) ||
            fish.scientific_name.toLowerCase().includes(searchString)
        );
    });
    displayData(filteredAllFishSpeciesData);
});
/* === Each sort Filter Function === */
allSpeciesFish.addEventListener('click', () => {
    loadData(allFishSpecies);
    searchBar.value = "";
});

africanCichlids.addEventListener('click', () => {
    loadData(africanCichlidsAPI);
    searchBar.value = "";
});

americanCichlids.addEventListener('click', () => {
    loadData(americanCichlidsAPI);
    searchBar.value = "";
});

livebearer.addEventListener('click', () => {
    loadData(livebearerAPI);
    searchBar.value = "";
});

tetras.addEventListener('click', () => {
    loadData(tetrasAPI);
    searchBar.value = "";
});
/* === Tag Active Toggle === */
function tagActiveToggle() {
    tags.forEach(eachTag => {
        eachTag.addEventListener('click', () => {
            tags.forEach(removeTagActive => removeTagActive.classList.remove("active"));
            eachTag.classList.add("active")
        });

    });
}
tagActiveToggle()
/* === Fetch Data === */
/* https://www.youtube.com/watch?v=8JcCdp2Y4Q4 */
async function getRequest(url) {
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Bad response")
    }
};
/* === Load All fish Data === */
async function loadData(url) {
    try {
        fishSpeciesData = await getRequest(url);
        displayData(fishSpeciesData);
    } catch (error) {
        console.log(error)
    }
};
/* === Display Fish Data === */
async function displayData(fishData) {
    const htmlString = fishData
        .map((fish) => {
            return `
        <div class="fish-box" id="${fish.id}">
        <div class="img-container">
              <img src="${fish.image_link}">
        </div>
        <div class="info-container">
         <h4>${fish.species_group}</h4>
         <h2>${fish.common_name}</h2>
         <h3>${fish.scientific_name}</h3>
         <div class="addButton">
            <button class="addMyStock" id="addMyStock" name="${fish.id}" type="submit">Add to MyStock</button>
         </div>
      </div>
      <button data-modal-target="#modal${fish.id}" class="infoButton" id="infoButton">Information</button>
      <div class="modal" id="modal${fish.id}">
    <div class="modal-header">
      <div class="title"></div>
      <button data-close-button class="close-button">&times;</button>
    </div>
    <div class="modal-body">
    <div class="modal-img-container">
              <img src="${fish.image_link}">
        </div>
        <h4>${fish.species_group}</h4>
        <h2>${fish.common_name}</h2>
        <h3>${fish.scientific_name}</h3>
        <div class="modal-fishInfo">
        <p>${fish.common_name} fish live for up to ${fish.lifespan} and are ${fish.care_level} to care for. Their length is approximately ${fish.average_adult_size} at maturity and ${fish.maximum_adult_size} at maximum. Their desired aquarium size should be at least ${fish.minimum_tank_size}. The pH of the water should be between ${fish.ph} and the water temperature should be between ${fish.temperature} degrees.</p>
        </div>
        </div>
  </div>
    </div>
        `;
        })
        .join('')
    cardCollection.innerHTML = htmlString
    addMyStockButtons = document.querySelectorAll("#addMyStock");
    infoButton = document.querySelectorAll("#infoButton");
    openModalButtons = document.querySelectorAll('[data-modal-target]')
    closeModalButtons = document.querySelectorAll('[data-close-button]')
    overlay = document.getElementById('overlay')

    modalDiv();
    getCardData(fishData);
}

/* === Make Modal function when More Options Clicked === */
/* === https://www.youtube.com/watch?v=MBaw_6cPmAw === */
function modalDiv() {

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal)

        })
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
            closeModal(modal)
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal)
        })
    })

    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
}
/* Send Stock and fish data to backend */
function getCardData(fishInformation) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    addMyStockButtons.forEach((addMyStockButton, index) => {
        addMyStockButton.addEventListener('click', () => {
            let fish = {
                fish_id: fishInformation[index].id,
                common_name: fishInformation[index].common_name,
                scientific_name: fishInformation[index].scientific_name,
                species_group: fishInformation[index].species_group,
                image_link: fishInformation[index].image_link
            };
            let userStock = {
                client_id: user.client_id,
                fish_id: fishInformation[index].id,
                quantity: '0'
            };
            postFishAndStock(backEndFish, "POST", fish).then(result => {
            });

            postFishAndStock(backEndStock, "POST", userStock).then(userStockResult => {
                if(userStockResult.status == 'Bad Request'){
                    catalogMessage.innerHTML = `<p style="background-color: red">${userStockResult.message}</p>`;
                    responseStockMessagesFade();
                } else {
                    catalogMessage.innerHTML = `<p style="background-color: #007a4d">${userStockResult.message}</p>`;
                    responseStockMessagesFade();
                }
            });
        });
    });
}
function responseStockMessagesFade(){
    catalogMessage.classList.add("fade-in")
    setTimeout(()=>{
        catalogMessage.classList.remove("fade-in")
        catalogMessage.classList.add("fade-out")
      }, 1500, catalogMessage.classList.remove("fade-out")); 
}
async function postFishAndStock(url, method, data) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};