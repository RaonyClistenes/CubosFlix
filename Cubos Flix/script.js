const filmes = document.querySelector('div .movies')
const modal = document.querySelector('.modal')
const modalTitle = document.querySelector('.modal__title')
const botaoFecharModal = document.querySelector('.modal__close')
const modalImage = document.querySelector('.modal__img')
const modalDescription = document.querySelector('.modal__description')
const modal__average = document.querySelector('.modal__average');
const containerFilmes = document.querySelector('div .container')
const botaoDireita = document.querySelector('.btn-next');
const botaoEsquerda = document.querySelector('.btn-prev');
const temaPage = document.querySelector('.btn-theme')
const logo = document.querySelector('.header__container-logo img')
const input = document.querySelector('input')



async function movies() {

    const idFilme = [];
    const data = [];
    const dataApi = [];
    const nome = []
    const cartaz = []
    const rating = [];
    const description = [];


    const response = await api.get('/discover/movie?language=pt-BR&include_adult=false')
    dataApi.push(response.data)
    data.push(dataApi[0].results)

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            nome.push(data[i][j].title)
            cartaz.push(data[i][j].poster_path)
            rating.push(data[i][j].vote_average)
            idFilme.push(data[i][j].backdrop_path)
            description.push(data[i][j].overview)
            console.log(cartaz)
        }
    }

    for (let t = 0; t < nome.length; t++) {
        const filme = document.createElement('div');
        const info = document.createElement('div')
        const movie_title = document.createElement('span')
        const movie_rating = document.createElement('span')
        const icone = document.createElement('img');

        filmes.style.overflowX = 'auto'
        filmes.style.overflow = 'hidden'
        filme.style.flexShrink = 0
        filmes.appendChild(filme)
        filme.appendChild(info)
        info.appendChild(movie_title)
        info.appendChild(movie_rating)
        filme.className = 'movie'
        filme.style.backgroundImage = `url("${cartaz[t]}")`
        info.className = 'movie__info'
        movie_title.className = 'movie__title'
        movie_rating.className = 'movie__rating'
        icone.src = "/assets/estrela.svg"
        movie_title.innerText = nome[t]
        movie_rating.innerHTML = rating[t]
        movie_rating.appendChild(icone)
        
        function busca() {
            input.addEventListener('keydown', () => {
                const provisorio = input.value
                if (provisorio != nome[t]) {
                    filme.classList.add('hidden')
                }
                if (!provisorio) {
                    filme.classList.remove('hidden')
                }
                if(nome[t].includes(provisorio)){
                    filme.classList.remove('hidden')
                }
                
                
            })
        }
        busca()


        function modalInfo() {
            modal.classList.toggle('hidden')

            modalImage.src = idFilme[t]
            modalTitle.innerHTML = nome[t]
            modalDescription.innerHTML = description[t]
            modal__average.innerHTML = rating[t]
        }

        botaoFecharModal.addEventListener('click', () => {

            modal.classList.add("hidden")

        })

        let listFilmes = document.querySelectorAll('.movie')
        if (listFilmes.length > 18) {
            listFilmes[t].classList.add('hidden')
        }
        let indexArray = 0;
        let maxIndex = listFilmes.length

        function direita() {
            botaoDireita.addEventListener('click', () => {
                indexArray = indexArray + 6;
                if (indexArray == maxIndex) {
                    indexArray = 0
                }
                listFilmes[indexArray].scrollIntoView({
                    inline: 'start',
                    behavior: 'smooth'
                })

            })
        }

        function esquerda() {
            botaoEsquerda.addEventListener('click', () => {
                if (indexArray == 0) {
                    indexArray = maxIndex
                }
                indexArray = indexArray - 6;

                listFilmes[indexArray].scrollIntoView({
                    inline: 'start',
                    behavior: 'smooth'
                })
            })

        }
        esquerda()
        direita()

        function abrirModal() {
            listFilmes[t].addEventListener('click', () => {
                modalInfo()
            })
        }
        abrirModal()

    }



}

movies()

const highlight__size = document.querySelector('div highlight')
const video = document.querySelector('div .highlight__video')
const textH1 = document.querySelector('div .highlight__title')
const textRating = document.querySelector('div .highlight__rating')
const gener = document.querySelector('div .highlight__genres')
const launch = document.querySelector('div .highlight__launch')
const description = document.querySelector('div .highlight__description')

async function todayMovie() {
    const response = await api.get('/movie/436969?language=pt-BR')
    const dataApi = [];
    const data = [];
    const generos = [];
    const generArray = [];
    dataApi.push(response.data)
    video.style.backgroundImage = `url("${dataApi[0].backdrop_path}")`
    textH1.innerHTML = `${dataApi[0].title}`
    textRating.innerHTML = dataApi[0].vote_average
    for (let i = 0; i < dataApi.length; i++) {
        data.push(dataApi[i].genres)
        for (let j = 0; j < data[i].length; j++) {
            generos.push(data[i][j])
            generArray.push(generos[j].name)
            let generString = generArray.join(', ')
            gener.innerHTML = generString
            description.innerHTML = dataApi[i].overview
            launch.innerHTML = dataApi[i].release_date


        }
    }
}

todayMovie()


const botaoplay = document.querySelector('div #play')
const linkVideo = document.querySelector('div .highlight__video-link')


async function playMovie() {

    const response = await api.get('/movie/436969/videos?language=pt-BR');
    const dataApi = []

    dataApi.push(response.data)

    botaoplay.addEventListener('click', () => {
        linkVideo.href = 'https://www.youtube.com/watch?v=' + dataApi[0].results[0].key
    })

}

playMovie()

function tema() {

    temaPage.addEventListener('click', () => {

        const root = document.querySelector(':root')
        const back = root.style.getPropertyValue('--background');
        const back2 = root.style.getPropertyValue('--bg-secondary');
        if (!back || back === 'white') {
            root.style.setProperty('--background', '#1B2028')
            root.style.setProperty('--text-color', 'white')
            root.style.setProperty('--bg-secondary', '#2D3440')
            temaPage.src = "./assets/dark-mode.svg"
            logo.src = "./assets/logo.svg"
            botaoDireita.src = '/assets/arrow-right-light.svg'
            botaoEsquerda.src = '/assets/arrow-left-light.svg'
            botaoFecharModal.src = './assets/close.svg'
        } else {
            root.style.setProperty('--background', 'white')
            root.style.setProperty('--text-color', 'black')
            root.style.setProperty('--bg-secondary', '#EDEDED')
            temaPage.src = "./assets/light-mode.svg"
            logo.src = "./assets/logo-dark.png"
            botaoDireita.src = './assets/arrow-right-dark.svg'
            botaoEsquerda.src = './assets/arrow-left-dark.svg'
            botaoFecharModal.src = './assets/close-dark.svg'

        }
    })
}
tema()

