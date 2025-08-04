// constantes para las funciones
const americas = document.querySelector("#americas");
const asia = document.querySelector("#asia");
const africa = document.querySelector("#africa");
const europe = document.querySelector("#europe");
const oceania = document.querySelector("#oceania");
const dataDiv = document.querySelector("#data");
const clearButton = document.querySelector("#clear");
const helloWorld = document.querySelector("#hello-world");
const regionsBtn = document.querySelector("#regions-btn");
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const homeBtn = document.querySelector("#home-btn");
const allBtn = document.querySelector("#all");
const themeBtn = document.querySelector("#theme-toggle");
const regionSelect = document.querySelector("#region-select");
const searchDiv = document.querySelector("#search-div");
const searchToggle = document.querySelector("#search-toggle");
const body = document.querySelector("#body");

// PRIMERA LLAMADA A LA API COMPLETA
async function getData() {
    const apiURL = "https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region";
    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        getInfo(json);
        regions(json);
    } catch (error) {
        console.error(error.message);
    }
}
getData();


// BUSCAR POR CAPITAL, LENGUAJE O NOMBRE DE PAIS
// Esta función busca en todas las propiedades de los objetos dentro del array proporcionado.
function buscarEnTodasPropiedades(array, valorBuscado, exactMatch = true) {
    // Validaciones iniciales
    if (!Array.isArray(array)) {
        throw new Error('El primer parámetro debe ser un array');
    }

    if (valorBuscado === undefined || valorBuscado === null) {
        throw new Error('Debes proporcionar un valor a buscar');
    }

    // Mostrar mensaje si el valor buscado es vacío
    if (valorBuscado === "") {
        dataDiv.innerHTML = `<div class="invalid-card invalid-card-breakpoint animate-blurred-fade-in">
            <h3 class="error-name">Please enter a value to search</h3>
            <svg>
                <use xlink:href="src/sprite.svg#earth-globe"></use>
            </svg>
        </div>`;
        return [];
    }
    // Convertir a string para búsqueda no sensible a mayúsculas/minúsculas
    const strBuscado = String(valorBuscado).toLowerCase();

    const resultados = array.filter(objeto => {
        for (const propiedad in objeto) {
            if (objeto.hasOwnProperty(propiedad)) {
                const valorPropiedad = String(objeto[propiedad]).toLowerCase();

                if (exactMatch) {
                    if (valorPropiedad === strBuscado) {
                        return true;
                    }
                } else {
                    if (valorPropiedad.includes(strBuscado)) {
                        return true;
                    }
                }
            }
        }
        return false;
    });

    dataDiv.innerHTML = "";
    if (resultados.length > 0) {
        resultados.forEach(objeto => {
            if (valorBuscado === "nepal".toLocaleLowerCase()) {
                dataDiv.innerHTML += `<div class="country-card animate-blurred-fade-in country-card-breakpoint">
            <h3 class = "country-name">${objeto.name}</h3>
            <p>Capital:<span class = "capital"> ${objeto.capital}</span></p>
            <p class="language-container">Language: <span class = "language">${objeto.languages}</span></p>
            <img class = "flag nepal" id="${objeto.name.toLocaleLowerCase()}" src="${objeto.flag}" alt="Flag of ${objeto.name}">
        </div>`
            }
            if (valorBuscado === "asia".toLocaleLowerCase() || valorBuscado === "europe".toLocaleLowerCase() || valorBuscado === "africa".toLocaleLowerCase() || valorBuscado === "americas".toLocaleLowerCase() || valorBuscado === "oceania".toLocaleLowerCase() || valorBuscado === "spanish".toLocaleLowerCase() || valorBuscado === "english".toLocaleLowerCase() || valorBuscado === "french".toLocaleLowerCase() || valorBuscado === "portuguese".toLocaleLowerCase() || valorBuscado === "german".toLocaleLowerCase() || valorBuscado === "chinese".toLocaleLowerCase() || valorBuscado === "arabic".toLocaleLowerCase()) {
                dataDiv.innerHTML += `<div class="country-card animate-blurred-fade-in">
            <h3 class = "country-name">${objeto.name}</h3>
            <p>Capital:<span class = "capital"> ${objeto.capital}</span></p>
            <p class="language-container">Language: <span class = "language">${objeto.languages}</span></p>
            <img class = "flag" id="${objeto.name.toLocaleLowerCase()}" src="${objeto.flag}" alt="Flag of ${objeto.name}">
        </div>`
                if (valorBuscado === "asia" && objeto.name.toLocaleLowerCase() === "nepal") {
                    const nepalFlag = document.querySelector("#nepal");
                    nepalFlag.classList.add("nepal");
                }
            }
            else {
                if (valorBuscado !== "nepal".toLocaleLowerCase()) {
                    dataDiv.innerHTML += `<div class="country-card animate-blurred-fade-in country-card-breakpoint">
                <h3 class="country-name">${objeto.name}</h3>
                <p>Capital: <span class="capital">${objeto.capital}</span></p>
                <p class="language-container">Language: <span class="language">${objeto.languages}</span></p>
                <img class="flag" id="${objeto.name.toLocaleLowerCase()}" src="${objeto.flag}" alt="Flag of ${objeto.name}">
            </div>`;
                }
            }
        });
    } else {
        dataDiv.innerHTML = `<div class="invalid-card animate-blurred-fade-in invalid-card-breakpoint">
            <h3 class="error-name">Don't results Found</h3>
            <svg>
                <use xlink:href="src/sprite.svg#warning-error"></use>
            </svg>
        </div>`;
    }
    return resultados;
}

// FUNCION PARA OBTENER LA INFORMACION DE LOS PAÍSES
// Se obtiene toda la información de los países y se muestra en la página principal.
function getInfo(dato) {
    const completeData = [];
    const capitalData = [];
    const data = dato.forEach((city) => {
        const countryData = {
            name: city.name.common,
            capital: city.capital ? city.capital[0] : 'N/A',
            languages: Object.values(city.languages).join(", "),
            flag: city.flags.svg,
            region: city.region
        };
        completeData.push(countryData);
        capitalData.push(countryData.capital);
    });
    searchBtn.addEventListener("click", () =>{
        const searchValue = searchInput.value.toLowerCase();
        const resultadoExacto = buscarEnTodasPropiedades(completeData, searchValue, true);
        if (body.offsetWidth < 768) {
            setTimeout(() => {
                searchDiv.classList.add("invisible");
                searchDiv.classList.remove("flex", "animate-fade-in-down");
            }, 500); // Espera a que la animación termine antes de cambiar las clases
            searchDiv.classList.add("animate-fade-out-up");
        }
    })
};

// FUNCIÓN PARA CAMBIAR EL TEMA
// Al hacer clic en el botón de tema, se cambia el tema de la página.
function toggleTheme() {
    themeBtn.addEventListener("change", () => {
        if (themeBtn.checked) {
            body.classList.remove('dark');
            body.classList.add('light');
        } else {
            body.classList.remove('light');
            body.classList.add('dark');
        }
    });
}
toggleTheme();


// REGIONES CON SELECT
function regions(datos) {
    regionSelect.addEventListener("change", (event) => {
        const selectedRegion = event.target.value;
        dataDiv.innerHTML = "";
        datos.forEach((dato) => {
            if (dato.region.toLocaleLowerCase() === selectedRegion.toLocaleLowerCase()) {
                dataDiv.innerHTML += `<div class="country-card animate-blurred-fade-in">
                <h3 class = "country-name">${dato.name.common}</h3>
                <p>Capital:<span class = "capital"> ${dato.capital}</span></p>
                <p class="language-container">Language: <span class = "language">${Object.values(dato.languages).join(", ")}</span></p>
                <img id="${dato.name.common.toLocaleLowerCase()}" class = "flag" src="${dato.flags.svg}" alt="Flag of ${dato.name.common}">
                </div>`;
                if (dato.name.common.toLocaleLowerCase() === "nepal") {
                    const nepalFlag = document.querySelector("#nepal");
                    nepalFlag.classList.add("nepal");
                }
            } else if (selectedRegion.toLocaleLowerCase() === "all") {
                dataDiv.innerHTML += `<div class="country-card animate-blurred-fade-in">
            <h3 class = "country-name">${dato.name.common}</h3>
            <p>Capital:<span class = "capital"> ${dato.capital}</span></p>
            <p class="language-container">Language: <span class = "language">${Object.values(dato.languages).join(", ")}</span></p>
            <img class = "flag" id="${dato.name.common.toLocaleLowerCase()}" src="${dato.flags.svg}" alt="Flag of ${dato.name.common}">
        </div>`;
                if (dato.name.common.toLocaleLowerCase() === "nepal") {
                    const nepalFlag = document.querySelector("#nepal");
                    nepalFlag.classList.add("nepal");
                }
            } else if (selectedRegion.toLocaleLowerCase() === "clear") {
                dataDiv.innerHTML = "";
                dataDiv.appendChild(helloWorld);
            } else if (selectedRegion.toLocaleLowerCase() === "select") {
                dataDiv.innerHTML = ""
                dataDiv.innerHTML += `<div class="invalid-card invalid-card-breakpoint animate-blurred-fade-in">
                    <h3 class="error-name">Don't results Found</h3>
                    <p class="error-message">Please select a region.</p>
                    <svg class="error-icon">
                        <use xlink:href="src/sprite.svg#warning-error"></use>
                    </svg>
                </div>`;
            }
        });
    });
}

// toggle buscar
function toggleSearch() {
    searchToggle.addEventListener("click", () => {
        if (searchDiv.classList.contains("invisible")) {
            body.classList.add("overflow-hidden");
            searchDiv.classList.remove("invisible", "animate-fade-out-up");
            searchDiv.classList.add("flex", "animate-fade-in-down");
            helloWorld.classList.add("invisible");
            helloWorld.classList.remove("flex", "animate-blurred-fade-in");
        } else {
            setTimeout(() => {
                body.classList.remove("overflow-hidden");
                searchDiv.classList.add("invisible");
                searchDiv.classList.remove("flex", "animate-fade-in-down");
                helloWorld.classList.remove("invisible");
                helloWorld.classList.add("flex", "animate-blurred-fade-in");
            }, 500); // Espera a que la animación termine antes de cambiar las clases
            searchDiv.classList.add("animate-fade-out-up");
        }
    });
}
toggleSearch()

// FUNCIÓN PARA IR A LA PÁGINA PRINCIPAL
// Al hacer clic en el botón de inicio, se limpia el contenido del div de datos y se muestra el mensaje de bienvenida.
function homeButton() {
    homeBtn.addEventListener("click", () => {
        dataDiv.innerHTML = "";
        dataDiv.appendChild(helloWorld);
        searchInput.value = "";
        if (helloWorld.classList.contains("invisible")) {
            helloWorld.classList.remove("invisible");
            helloWorld.classList.add("flex", "animate-blurred-fade-in");
        }
        if (toggleSearch) {
            searchDiv.classList.add("invisible");
            searchDiv.classList.remove("flex", "animate-fade-in-down");
        }
    })
}
homeButton()
