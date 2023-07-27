

const key = "ab3e90e2839e0acc7ff3e208bc78ab24";

document.addEventListener("DOMContentLoaded", () => {
    getWeatherByGeolocation();
});

function colocarDadosNaTela(dados) {
    if (dados && dados.name && dados.main && dados.main.temp && dados.weather && dados.weather[0].description) {
        document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;
        document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C";
        document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
        document.querySelector(".Umidade").innerHTML = "Umidade: " + dados.main.humidity + "%";
        document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    } else {
        console.error("Dados inválidos ou incompletos:", dados);
    }
}


async function buscarCidade(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());

    colocarDadosNaTela(dados);
}

function consultaCidade() {
    const cidade = document.querySelector(".input-cidade").value;

    buscarCidade(cidade);

}

async function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Buscar dados climáticos usando as coordenadas
                const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`);
                const dados = await resposta.json();

                // Exibir os dados climáticos
                colocarDadosNaTela(dados);
            });
        } catch (error) {
            console.error("Erro ao obter a geolocalização:", error);
        }
    } else {
        console.error("Geolocalização não é suportada por este navegador.");
    }
}
