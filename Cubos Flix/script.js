const filmes = document.querySelector('div .movies')
const modal = document.querySelector('.modal')
const modalTiulo = document.querySelector('.modal__title')
const botaoFecharModal = document.querySelector('.modal__close')
const modalImagem = document.querySelector('.modal__img')
const modalDescricao = document.querySelector('.modal__description')
const modal__media = document.querySelector('.modal__average');
const containerFilmes = document.querySelector('div .container')
const botaoDireita = document.querySelector('.btn-next');
const botaoEsquerda = document.querySelector('.btn-prev');
const temaPagina = document.querySelector('.btn-theme')
const logo = document.querySelector('.header__container-logo img')
const input = document.querySelector('input')
const linkVideo = document.querySelector('div .highlight__video-link')
const root = document.querySelector(':root')
const filmeDoDiaImagem = document.querySelector('.highlight__video')
const tituloFilmedoDia = document.querySelector('.highlight__title')
const avaliacaoDoFilmeDoDia = document.querySelector('.highlight__rating')
const generosFilmeDoDia = document.querySelector('.highlight__genres')
const descricaoFilmeDoDia = document.querySelector('.highlight__description')

const apiPadrao = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false';
const apiBusca = `https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false`;
const apiVideoDoDia = "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR";
const apiFilmeDoDia = "https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR";
async function filmesPadrao() {
  try {
    const response = await fetch(apiPadrao);
    const data = await response.json();
    const resultados = data.results;
    filmes.innerHTML = '';
    for (let item = 0; item < 18; item++) {
      const element = resultados[item];
      const filme = document.createElement('div');
      filmes.appendChild(filme);
      filmes.style.overflowX = 'auto'
      filmes.style.overflow = 'hidden'
      filme.style.flexShrink = 0
      filme.style.backgroundImage = `url("${element.poster_path}")`;
      filme.className = 'movie';
      const filmeInfo = document.createElement('div');
      filmeInfo.className = 'movie__info'
      filme.appendChild(filmeInfo);
      const filmeTitulo = document.createElement('span');
      filmeTitulo.className = 'movie__title'
      filmeInfo.appendChild(filmeTitulo);
      filmeTitulo.innerHTML = element.title;
      const filmeavaliacao = document.createElement('span');
      filmeavaliacao.className = 'movie__rating'
      filmeInfo.appendChild(filmeavaliacao);
      filmeavaliacao.innerHTML = element.vote_average;
      const filmeEstrela = document.createElement('img');
      filmeInfo.appendChild(filmeEstrela);
      filmeEstrela.src = './assets/estrela.svg';
      filme.addEventListener('click', () => {
        modalPadrao(element)
        abriModal()
      })
    }
  } catch (error) {
    console.log(error);
  }
}

async function filmesBuscados(buscar) {
  try {
    const response = await fetch(`${apiBusca}&query=${buscar}`);
    const data = await response.json();
    const resultados = data.results;
    filmes.innerHTML = '';
    for (let item = 0; item < 18; item++) {
      const element = resultados[item];
      const filme = document.createElement('div');
      filmes.appendChild(filme);
      filmes.style.overflowX = 'auto'
      filmes.style.overflow = 'hidden'
      filme.style.flexShrink = 0
      filme.style.backgroundImage = `url("${element.poster_path}")`;
      filme.className = 'movie';
      const filmeInfo = document.createElement('div');
      filmeInfo.className = 'movie__info'
      filme.appendChild(filmeInfo);
      const filmeTitulo = document.createElement('span');
      filmeTitulo.className = 'movie__title'
      filmeInfo.appendChild(filmeTitulo);
      filmeTitulo.innerHTML = element.title;
      const filmeavaliacao = document.createElement('span');
      filmeavaliacao.className = 'movie__rating'
      filmeInfo.appendChild(filmeavaliacao);
      filmeavaliacao.innerHTML = element.vote_average;
      const filmeEstrela = document.createElement('img');
      filmeInfo.appendChild(filmeEstrela);
      filmeEstrela.src = './assets/estrela.svg';
      filme.addEventListener('click', () => {
        modalPadrao(element)
        abriModal()
      })
    }
  } catch (error) {
    console.log(error);
  }
}
function modalPadrao(valor) {
  modalImagem.src = valor.backdrop_path
  modalTiulo.innerHTML = valor.title
  modalDescricao.innerHTML = valor.overview
  modal__media.innerHTML = valor.vote_average
}
async function abriModal() {
  modal.classList.toggle('hidden')
}
function fecharModal() {
  modal.classList.add('hidden')
}
botaoFecharModal.addEventListener('click', fecharModal)

input.addEventListener('keyup', async () => {
  const buscar = input.value.trim();
  if (buscar !== '') {
    await filmesBuscados(buscar);

  } else {
    await filmesPadrao();

  }
});


let index = 0
async function proximo() {
  botaoDireita.addEventListener('click', async () => {
    index += 6;

    const arrayFilmes = document.querySelectorAll('.movie')
    if (index >= arrayFilmes.length) {
      index = 0
    }
    arrayFilmes[index].scrollIntoView({
      inline: 'start',
      behavior: 'smooth'
    })

  })
}
proximo()
async function anterior() {
  botaoEsquerda.addEventListener('click', async () => {
    index -= 6;
    const arrayFilmes = document.querySelectorAll('.movie')
    if (index < 0) {
      index = arrayFilmes.length
    }
    arrayFilmes[index].scrollIntoView({
      inline: 'start',
      behavior: 'smooth'
    })

  })
}
anterior()
async function filmeDoDia() {
  let generos = [];
  try {
    const response = await fetch(apiFilmeDoDia)
    const data = await response.json()
    const resultados = data
    resultados.genres.forEach(item => generos.push(item))
    filmeDoDiaImagem.style.backgroundImage = `url("${resultados.backdrop_path}")`;
    tituloFilmedoDia.innerHTML = resultados.title
    avaliacaoDoFilmeDoDia.innerHTML = resultados.vote_average
    generos.forEach(item => generosFilmeDoDia.innerHTML += item.name + ' ')
    descricaoFilmeDoDia.innerHTML = resultados.overview
  } catch (error) {
    console.log(error)
  }
}
async function play() {
  try {
    const response = await fetch(apiVideoDoDia)
    const data = await response.json()
    const resultados = data.results
    for (let item = 0; item < resultados.length; item++) {
      const element = resultados[item];
      linkVideo.href = `https://www.youtube.com/watch?v=${element.key}`
    }
  } catch (error) {
    console.log(error)
  }
}
window.addEventListener('load', async () => {
  await filmesPadrao();
  await filmeDoDia();
  await play()

});
function tema() {
  const root = document.querySelector(':root')
  const back = root.style.getPropertyValue('--background');
  if (!back || back === 'white') {
    root.style.setProperty('--background', '#1B2028')
    root.style.setProperty('--text-color', 'white')
    root.style.setProperty('--bg-secondary', '#2D3440')
    temaPagina.src = "./assets/dark-mode.svg"
    logo.src = "./assets/logo.svg"
    botaoDireita.src = '/assets/arrow-right-light.svg'
    botaoEsquerda.src = '/assets/arrow-left-light.svg'
    botaoFecharModal.src = './assets/close.svg'
  } else {
    root.style.setProperty('--background', 'white')
    root.style.setProperty('--text-color', 'black')
    root.style.setProperty('--bg-secondary', '#EDEDED')
    temaPagina.src = "./assets/light-mode.svg"
    logo.src = "./assets/logo-dark.png"
    botaoDireita.src = './assets/arrow-right-dark.svg'
    botaoEsquerda.src = './assets/arrow-left-dark.svg'
    botaoFecharModal.src = './assets/close-dark.svg'

  }
}
temaPagina.addEventListener('click', tema)