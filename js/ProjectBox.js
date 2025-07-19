class ProjectBox {
  constructor(x, y, isStatic, width, height, imgPath, projectLink, hoverEffect, world) {
    this.width = width;
    this.height = height;

    this.box = document.createElement("div");
    this.box.classList.add("box");
    this.box.style.width = width + "px";
    this.box.style.height = height + "px";

    this.content = document.createElement("div");
    this.content.classList.add("content");

    this.image = document.createElement("img");
    this.image.src = imgPath;
    this.image.draggable = false;
    this.content.appendChild(this.image);

    this.openSvg = document.createElement("img");
    this.openSvg.src = "assets/svg/open.svg"; // open SVG 경로
    this.openSvg.classList.add("openButton");
    this.content.appendChild(this.openSvg);

    this.box.appendChild(this.content);
    matterCanvas.appendChild(this.box);

    this.body = Matter.Bodies.rectangle(x, y, width, height, { isStatic: isStatic });
    Matter.World.add(world, this.body);

    if (hoverEffect) {
      this.box.classList.add("hover-enabled");
    }

    this.openSvg.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open(projectLink, '_blank');
    });
  }

  display() {
    const pos = this.body.position;
    const angle = this.body.angle;
  
    // 박스 전체는 회전
    this.box.style.left = (pos.x - this.width / 2) + "px";
    this.box.style.top = (pos.y - this.height / 2) + "px";
    this.box.style.transform = `rotate(${angle}rad)`;
  
    // openSvg는 회전 보정하여 항상 정방향 유지
    this.openSvg.style.transform = `translate(-50%, -50%) rotate(${-angle}rad)`;
    this.openSvg.style.transformOrigin = "center center";
  }
  
}
