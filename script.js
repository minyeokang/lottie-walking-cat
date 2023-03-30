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

button.addEventListener("click", async (e) => {
  //default cat showing up and btn disappeared
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
  //   gsap.to(defaultCat, 4, {
  //     x: Math.floor(Math.random() * (400 - 200) + 200), //get random value of x, min: 200, max: 400
  //     onComplete: function () {
  //       gsap.to(defaultCat, { opacity: 0 });
  //     },
  //   });

  //change cursor to a paw!
  const element = document.body;
  element.style.cursor = "url('fa-paw.png'), auto";
  button.style.cursor = "url('fa-paw.png'), auto";

  await hideButton(); //can't use await in addEventListner, it will pause the entire event.

  //click to create cats
  window.addEventListener("click", function (e) {
    //don't need to catAnim.hide(), just create them dynamically
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

    if (e.clientX < viewWidth / 2) {
      moveCat(catContainer, 1);
    }

    //go to left direction
    if (e.clientX > viewWidth / 2) {
      catContainer.style.transform = "rotateY(180deg)";
      moveCat(catContainer, -1);
    }

    //this childNodes are only can be found when DOM is Loaded
    catAnim.addEventListener("DOMLoaded", function () {
      const svg = catAnim.wrapper.childNodes;
      const svgChild = svg[0].childNodes[1];

      if (svgChild.childNodes.length > 0) {
        const svgNode = svgChild.childNodes;
        const gNode = svgNode[0].childNodes[0];
        const path = gNode.childNodes[0];
        path.setAttribute("fill", "#000");
        //now the cat tail is black!!!!!!!!
      } else {
        console.log("The SVG element doesn't have any child nodes.");
      }
    });

    catAnim.addEventListener("DOMLoaded", function () {
        const svg = catAnim.wrapper.childNodes;
        const svgChild = svg[0].childNodes[1]; 
        // const svgNode = svgChild.childNodes;
        // const gNode = svgNode[0].childNodes[0];
        console.log(svgChild.childNodes[0])//body
        console.log(svgChild.childNodes[1])//face
        // console.log(svgNode[0])
        const NodeArray = [];

        //get body's "g" into NodeArray 
        const bodyNode = svgChild.childNodes[0];
        // bodyNode.forEach(child => {
        //     const childNodes = child.childNodes;
        //         for (let i = 0; i < childNodes.length; i++) {
        //             NodeArray.push(childNodes[i]);
        //         }
        // })
        console.log(bodyNode); //왜 전체가 나오노/ 

    })

    /*

catAnim.addEventListener("data_ready", function() {
  const svg = catAnim.wrapper.childNodes;
  const svgChild = svg[0].childNodes[1].childNodes;
  const svgNode = [];

  svgChild.forEach(child => {
    const childNodes = child.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      svgNode.push(childNodes[i]);
    }
  });

  console.log(svgNode);

------------ test can i add them as loop.. --------

config_ready (when initial config is done)
data_ready (when all parts of the animation have been loaded)
DOMLoaded (when elements have been added to the DOM)

// in this svg case, only domloaded works.. 

*/
  });
});

function hideButton() {
  return new Promise((resolve) => {
    gsap.to(button, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        button.style.visibility = "hidden";
        resolve();
      },
    });
  });
}

function moveCat(element, int) {
  gsap.to(element, 4, {
    x: Math.floor(Math.random() * (400 - 200) + 200) * int,
    onComplete: function () { gsap.to(element, { opacity: 0 }); },
  });
}

//you need to add diffrent lottie at the end in the array and place them on randomly!
