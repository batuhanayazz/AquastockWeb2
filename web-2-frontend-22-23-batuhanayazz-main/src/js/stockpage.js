window.onload = () => {
    console.log('page is fully loaded');
};
let user = JSON.parse(sessionStorage.getItem('user'));
let userClientID = user.client_id
/* DOM */
const searchBar = document.getElementById("searchTerm");
const cardCollection = document.getElementById("cardCollection");
let decreaseButtons = document.querySelectorAll("#decrease-btn"),
    increaseButtons = document.querySelectorAll('#increase-btn'),
    counters = document.querySelectorAll("#counter"),
    updateButtons = document.querySelectorAll("#updateButton"),
    deleteButtons = document.querySelectorAll("#deleteButton"),
    tags = document.querySelectorAll(".tag"),
    catalogMessage = document.getElementById('catalogMessage');

let AllFish = [];
let clientStock = [];
let combinedFishes = [];
let fishSpeciesResult = [];

/* API */
const clientStockAPI = `https://web-2-backend-22-23-batuhanayazz.onrender.com/clients/client/${userClientID}/stock`;
const fishAPI = 'https://web-2-backend-22-23-batuhanayazz.onrender.com/fish';


if (user) {
    let clientStockRequest = getRequest(clientStockAPI, "GET").then(async result => {
        result.stock.forEach(result => {
            clientStock.push({
                fish_id: result.fish_id,
                quantity: result.quantity
            })
        });
    });
    getRequest(fishAPI, "GET").then(async result => {
        await clientStockRequest
        result.fish.forEach(fish => {
            AllFish.push(fish)
        });
        /* https://stackoverflow.com/questions/52668966/add-property-from-one-array-into-another-array-with-the-same-key */
        let AllFishMap = AllFish.reduce((accumulator, currentValue) => {
            accumulator[currentValue.fish_id] = currentValue
            return accumulator;
        }, {});
        combinedFishes = clientStock.map(element => Object.assign(element, AllFishMap[element.fish_id]));
        /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign */
        displayData(combinedFishes);
        searchBarFishes(combinedFishes)
    });
}
async function getRequest(url, method) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json"
        }
    });
    return await response.json();
};

allSpeciesFish.addEventListener('click', () => {
    searchBarFishes(combinedFishes)
    displayData(combinedFishes);
    searchBar.value = "";
});

africanCichlids.addEventListener('click', () => {
    filter('African cichlids')
    searchBarFishes(fishSpeciesResult)
    searchBar.value = "";
});

americanCichlids.addEventListener('click', () => {
    filter('American cichlids')
    searchBarFishes(fishSpeciesResult)
    searchBar.value = "";
});

livebearer.addEventListener('click', () => {
    filter('Livebearer')
    searchBarFishes(fishSpeciesResult)
    searchBar.value = "";
});

tetras.addEventListener('click', () => {
    filter('Tetras')
    searchBarFishes(fishSpeciesResult)
    searchBar.value = "";
});

/* === Search Function === */
/* https://www.youtube.com/watch?v=wxz5vJ1BWrc */
function searchBarFishes(fishArray) {
    searchBar.addEventListener('keyup', (event) => {
        let searchString = event.target.value.toLowerCase();
        let filteredAllFishSpeciesData = fishArray.filter(fish => {
            return (fish.common_name.toLowerCase().includes(searchString) ||
                fish.scientific_name.toLowerCase().includes(searchString)
            );
        });
        displayData(filteredAllFishSpeciesData);
    });
}

function filter(fishSpecies) {
    fishSpeciesResult = combinedFishes.filter((fish) => fish.species_group == fishSpecies);
    displayData(fishSpeciesResult);
};

function tagActiveToggle() {
    tags.forEach(eachTag => {
        eachTag.addEventListener('click', () => {
            tags.forEach(removeTagActive => removeTagActive.classList.remove("active"));
            eachTag.classList.add("active")
        });

    });
}
tagActiveToggle()

async function displayData(fishes) {
    const htmlString = fishes
        .map((fish) => {
            return `
                <div class="fish-box" id"${fish.fish_id}">
                <div class="img-container">
                      <img src="${fish.image_link}">
                </div>
                <div class="info-container">
                 <h4>${fish.species_group}</h4>
                 <h2>${fish.common_name}</h2>
                 <h3>${fish.scientific_name}</h3>
                 <div class="counterButtons">
                    <button id="decrease-btn" name="${fish.fish_id}" class="min"><i class="bx bx-minus" id="decrease"></i></button>
                    <input type="text" size="1" value="${fish.quantity}" id="counter" name="${fish.fish_id}" class="stockValue">
                    <button id="increase-btn" name="${fish.fish_id}" class="plus"><i class="bx bx-plus" id="increase"></i></button>
                 </div>
                 <div class="addButton">
                    <button class="updateButton" id="updateButton" name="${fish.fish_id}" type="submit">UPDATE</button>
                    </div>
                    </div>
                    <button class="deleteButton" id="deleteButton">DELETE</button>
                  </div>
            `;
        })
        .join('')
    cardCollection.innerHTML = htmlString
    decreaseButtons = document.querySelectorAll("#decrease-btn");
    increaseButtons = document.querySelectorAll('#increase-btn');
    counters = document.querySelectorAll("#counter");
    updateButtons = document.querySelectorAll("#updateButton");
    deleteButtons = document.querySelectorAll("#deleteButton");
    fishCounter()
    putAndDelete(fishes)
}

/* === Fish Counter === */
function fishCounter() {
    increaseButtons.forEach((increaseButton, index) => {
        increaseButton.addEventListener('click', () => {
            counters[index].value++
        });

    });

    decreaseButtons.forEach((decreaseButton, index) => {
        decreaseButton.addEventListener('click', () => {
            counters[index].value--
            if (counters[index].value < 0) {
                counters[index].value = 0
            }
        });
    });
}

function putAndDelete(fishInformation) {
    let user = JSON.parse(sessionStorage.getItem('user'));
    updateButtons.forEach((updateButton, index) => {
        updateButton.addEventListener('click', () => {
            let updateFish = {
                client_id: user.client_id,
                fish_id: fishInformation[index].fish_id,
                quantity: counters[index].value
            };
            putAndDeleteStockRequest(clientStockAPI, "PUT", updateFish).then(result => {
                if (result.status == 'Successfully') {
                    catalogMessage.innerHTML = `<p style="background-color: #007a4d">The number of ${fishInformation[index].common_name} fish has been changed to ${counters[index].value}</p>`;
                    responseStockMessagesFade()
                } else {
                }
                if (counters[index].value <= 9) {
                    setTimeout(() => {
                        catalogMessage.innerHTML += `<p style="background-color: red">You have less than 10 ${fishInformation[index].common_name} left.</p>`;
                    }, 1000);
                }
            });
        });
    });
    deleteButtons.forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            let deleteFish = {
                client_id: user.client_id,
                fish_id: fishInformation[index].fish_id,
                quantity: counters[index].value
            };
            if (confirm(`Do you really want to delete ${fishInformation[index].common_name} ?`)) {
                putAndDeleteStockRequest(clientStockAPI, "DELETE", deleteFish).then(result => {
                    if (result.status == 'Successfully') {
                        catalogMessage.innerHTML = `<p style="background-color: #007a4d">${fishInformation[index].common_name}, Successfully Deleted!</p>`;
                        responseStockMessagesFade()
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000);
                    } else {
                        console.log(result);
                    }
                });

            }
        });
    });
}
function  responseStockMessagesFade() {
    catalogMessage.classList.add("fade-in")
    setTimeout(() => {
        catalogMessage.classList.remove("fade-in")
        catalogMessage.classList.add("fade-out")
    }, 2000, catalogMessage.classList.remove("fade-out"));
}

async function putAndDeleteStockRequest(url, method, data) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};