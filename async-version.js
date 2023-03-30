//default
const defaultCat = document.getElementById("lottie-home");
const catPath = "cat.json";
const pawPath = "https://assets2.lottiefiles.com/packages/lf20_ypqxhono.json";
const button = document.querySelector("button");
const viewWidth = window.innerWidth;

const pawAnim = lottie.loadAnimation({
  container: button,
  renderer: "svg",
  loop: false,
  autoplay: true,
  path: pawPath,
});

//init
button.addEventListener("click", async (e) =>{
    showDefaultCat();
    setCursor();
    await hideButton();
    window.addEventListener("click", handleWindowClick);
} );

//functions
function handleWindowClick(e) {
  const catContainer = document.createElement("div");
  catContainer.style.position = "absolute";
  catContainer.style.width = "150px";
  catContainer.style.left = `${e.clientX}px`;
  catContainer.style.top = `${e.clientY}px`;
  document.body.appendChild(catContainer);

  const catAnim = lottie.loadAnimation({
    container: catContainer,
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: catPath,
  });

  const isLeftSide = e.clientX < viewWidth / 2;
  if (isLeftSide) {
    moveCat(catContainer, 1);
  } else {
    catContainer.style.transform = "rotateY(180deg)";
    moveCat(catContainer, -1);
  }
}

function showDefaultCat() {
  const defaultAnim = lottie.loadAnimation({
    container: defaultCat,
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: catPath,
  });

  defaultCat.style.position = "absolute";
  defaultCat.style.width = "150px";
  defaultCat.style.left = `${viewWidth / 2}px`;
  defaultAnim.play();

  moveCat(defaultCat, 1);
}

function setCursor() {
  const element = document.body;
  element.style.cursor = "url('fa-paw.png'), auto";
  button.style.cursor = "url('fa-paw.png'), auto";
}

function hideButton() {
 return gsap.to(button, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      button.style.visibility = "hidden";
    },
  });
}

const moveCat = (element, int) => {
  gsap.to(element, {
    duration: 14,
    x: Math.floor(Math.random() * (400 - 200) + 200) * int,
    onComplete: () => gsap.to(element, { opacity: 0 }),
  });
};
