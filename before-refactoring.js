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
      console.log(svgChild.childNodes[0]); //body
      console.log(svgChild.childNodes[1]); //face
      const NodeArray = [];

      //get body's "g" into NodeArray
      const bodyNode = svgChild.childNodes[0];
      const nodeNode = bodyNode.childNodes;
      nodeNode.forEach((child) => {
        const childNodes = child.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
          NodeArray.push(childNodes[i]);
        }
      });
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      NodeArray.forEach((node) => {
        node.setAttribute("fill", `rgb(${r},${g},${b})`); 
        
      });

      // const backColor1 = NodeArray[NodeArray.length - 1]; //진회색 등
      // const backColor2 = NodeArray[NodeArray.length - 2]; //진회색 등
      // const backLeg1 = NodeArray[1]; //진회색 다리
      // const backLeg2 = NodeArray[2]; //진회색 다리
      const certainColor = [NodeArray[NodeArray.length - 1], NodeArray[NodeArray.length - 2], NodeArray[1], NodeArray[2]]
      const r2 = Math.floor(Math.random() * 256);
      const g2 = Math.floor(Math.random() * 256);
      const b2 = Math.floor(Math.random() * 256);
      certainColor.forEach((node)=>{
        node.setAttribute("fill", `rgb(${r2},${g2},${b2})`); 
      })

    });
  });
});
//rnd -> 버튼 클릭 -> 색깔만 바꾸는 버전, 여러 로티를 업로드 하는 버전  
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
  gsap.to(element, 14, {
    x: Math.floor(Math.random() * (400 - 200) + 200) * int,
    onComplete: function () {
      gsap.to(element, { opacity: 0 });
    },
  });
}

/*

// in this svg case, only domloaded works.. 

config_ready (when initial config is done)
data_ready (when all parts of the animation have been loaded)
DOMLoaded (when elements have been added to the DOM)

*/
