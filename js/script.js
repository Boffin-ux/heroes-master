document.addEventListener('DOMContentLoaded', () => {
   // eslint-disable-next-line strict
   'use strict';
   const heros = document.querySelector('.heros'),
      selectMovie = document.getElementById('select-movie'),
      selectGender = document.getElementById('select-gender'),
      clearBtn = document.getElementById('clear');

   const outputCards = (dataHero) => {
      const allMovies = dataHero.reduce((accum, item) => accum.concat(item.movies), []);
      const genderHero = dataHero.reduce((accum, item) => accum.concat(item.gender), []);
      const filterMovies = allMovies.filter((item, i) => allMovies.indexOf(item) === i && item);
      const filterGender = genderHero.filter((item, i) => genderHero.indexOf(item.toLowerCase()) === i && item);

      let filterFilms,
         filterGenders;

      filterMovies.forEach(item => {
         const option = document.createElement('option');
         option.textContent = item;
         option.value = item;
         selectMovie.append(option);
      });
      filterGender.forEach(item => {
         const option = document.createElement('option');
         option.textContent = `${item[0].toUpperCase()}${item.slice(1)}`;
         option.value = `${item[0].toUpperCase()}${item.slice(1)}`;
         selectGender.append(option);
      });

      const addCard = (data) => {
         data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('hero-card');

            card.innerHTML = `<div class="hero-info">
                        <img src="${item.photo}" alt="${item.name}" class="hero-photo">
                        <span class="hero-name">Имя героя: ${item.name}</span>
                        <span class="hero-status">Статус героя: ${item.status}</span>
                        </div>                       
                        <h2 class="actor-name">Актер: <span>${item.actors}</span></h2>
                        <h3>Список фильмов:</h3>`;

            heros.append(card);

            if (item.movies) {
               const ul = document.createElement('ul');
               ul.classList.add('films');
               card.append(ul);
               item.movies.forEach(film => {
                  ul.insertAdjacentHTML('beforeEnd', `<li>${film}</li>`);
               });
            }
         });
      };
      addCard(dataHero);

      selectMovie.addEventListener('change', event => {
         const target = event.target;
         heros.innerHTML = '';
         filterGenders = '';
         selectGender.value = 'no';

         if (!filterGenders) {
            filterFilms = dataHero.filter(item => item.movies && item.movies.indexOf(target.value) > -1);
         } else {
            filterFilms = filterGenders.filter(item => item.movies && item.movies.indexOf(target.value) > -1);
         }
         addCard(filterFilms);
      });
      selectGender.addEventListener('change', event => {
         const target = event.target;
         heros.innerHTML = '';
         if (!filterFilms) {
            filterGenders = dataHero.filter(item => item.gender && item.gender.toLowerCase() === target.value.toLowerCase());
         } else {
            filterGenders = filterFilms.filter(item => item.gender && item.gender.toLowerCase() === target.value.toLowerCase());
         }
         addCard(filterGenders);
      });

      clearBtn.addEventListener('click', () => {
         heros.innerHTML = '';
         filterGenders = '';
         filterFilms = '';
         selectMovie.value = 'no';
         selectGender.value = 'no';
         addCard(dataHero);
      });
   };

   fetch('./dbHeroes.json')
      .then(response => response.json())
      .then(data => outputCards(data))
      .catch(error => console.error(error));

});