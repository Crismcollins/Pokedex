export const openPokemon = (card) => {
  setLeftTopValuesToFixedItem(card);

  if (card.classList.contains("closed"))
    card.classList.replace("closed","opened");
  else
    card.classList.add("opened");
};

const setLeftTopValuesToFixedItem = (card) => {
  const boundingRect = card.getBoundingClientRect();
  const pageWidth = window.innerWidth || document.documentElement.clientWidth;
  const pageHeight = window.innerHeight || document.documentElement.clientHeight;

  const leftPercentage = (boundingRect.left / pageWidth) * 100;
  const topPercentage = (boundingRect.top / pageHeight) * 100;

  // Cambia la posición a fixed y aplica las coordenadas de posición
  card.style.left = `${leftPercentage}%`;
  card.style.top = `${topPercentage}%`;
}

export const closePokemon = (card) => {
  card.classList.replace("opened", "closed");

  
};