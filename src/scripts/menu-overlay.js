const button = document.querySelector('#hamburger');
let menu = document.querySelector('#menu');
let socials = document.querySelector('#socials');
let modal = document.querySelector('#modal');


let toggleMenu = function (e) {
  button.classList.toggle('hamburger--active');
  menu.classList.toggle('menu--overlay');
  socials.classList.toggle('socials--overlay');
  modal.classList.toggle('header__modal--overlay');
}


button.addEventListener('click', toggleMenu);