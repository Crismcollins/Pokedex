const centerPokemon = (card) => {

  const boundingRect = card.getBoundingClientRect();
  const pageWidth = window.innerWidth || document.documentElement.clientWidth;
  const pageHeight = window.innerHeight || document.documentElement.clientHeight;

  const leftPercentage = (boundingRect.left / pageWidth) * 100;
  const topPercentage = (boundingRect.top / pageHeight) * 100;

  card.style.left = `${leftPercentage}%`;
  card.style.top = `${topPercentage}%`;
};

export default centerPokemon;
