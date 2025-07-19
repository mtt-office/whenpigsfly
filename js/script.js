
const { Engine, Runner, Bodies, World, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
const world = engine.world;

const matterCanvas = document.getElementById("matter-canvas");
const boxes = [];
let walls = [];

const runner = Runner.create();
Runner.run(runner, engine);

function createProjectBoxes() {
  const projects = [
    {
      width: 200,
      height: 130,
      imgSrc: 'assets/images/projects/mtt.jpeg',
      link: 'https://www.instagram.com/mtt.office/'
    },
    {
      width: 90,
      height: 125,
      imgSrc: 'assets/images/projects/tooth.jpeg',
      link: 'https://www.instagram.com/p/DLnnO8kzOB3/?img_index=1'
    },
    {
      width: 90,
      height: 130,
      imgSrc: 'assets/images/projects/book.jpeg',
      link: 'https://www.instagram.com/p/DLnnO8kzOB3/?img_index=1'
    },
    {
      width: 160,
      height: 100,
      imgSrc: 'assets/images/projects/ball.jpeg',
      link: 'https://www.instagram.com/p/DLnnO8kzOB3/?img_index=1'
    },
    {
      width: 140,
      height: 170,
      imgSrc: 'assets/images/projects/ny.jpeg',
      link: 'https://www.shopiloveny.com/?srsltid=AfmBOopRTW3Qw_O0tD4hOG3QmVYPmeGrzWH2W6ZRE2ql363iBtykRmKb'
    },
    {
      width: 160,
      height: 160,
      imgSrc: 'assets/images/projects/rainbowcircle.jpeg',
      link: 'https://en.wikipedia.org/wiki/Damien_Hirst'
    },
    {
      width: 90,
      height: 90,
      imgSrc: 'assets/images/projects/jeju.jpeg',
      link: 'https://www.kma.go.kr/jeju/html/main/index.jsp'
    },
    {
      width: 180,
      height: 100,
      imgSrc: 'assets/images/projects/corn.jpeg',
      link: 'https://en.wikipedia.org/wiki/Green'
    },
    {
      width: 80,
      height: 80,
      imgSrc: 'assets/images/projects/chair.jpeg',
      link: 'https://en.wikipedia.org/wiki/History_of_the_chair'
    },
    {
      width: 90,
      height: 150,
      imgSrc: 'assets/images/projects/sound.jpeg',
      link: 'https://www.instagram.com/p/DLnn4PazFZ9/?img_index=1'
    },
    {
      width: 93,
      height: 130,
      imgSrc: 'assets/images/projects/ant.jpeg',
      link: 'https://www.instagram.com/p/DEkfGYkvNiM/?img_index=1'
    },
    {
      width: 60,
      height: 160,
      imgSrc: 'assets/images/projects/zig.jpeg',
      link: 'https://ddp.or.kr/?menuno=228'
    },
    {
      width: 120,
      height: 140,
      imgSrc: 'assets/images/projects/choii.jpeg',
      link: 'https://www.instagram.com/p/DLQ2NbjzoCA/?img_index=1'
    },
    {
      width: 120,
      height: 140,
      imgSrc: 'assets/images/projects/spring.jpeg',
      link: 'https://namu.wiki/w/%ED%9B%84%ED%81%AC%20%EB%B2%95%EC%B9%99'
    }
  ];

  projects.forEach(p => {
    const box = new ProjectBox(
      Math.random() * window.innerWidth,
      -Math.random() * 300 - 100,
      false,
      p.width,
      p.height,
      p.imgSrc,
      p.link,
      true,
      world
    );
    boxes.push(box);
  });
}

function update() {
  boxes.forEach(box => box.display());
  requestAnimationFrame(update);
}

function createWalls() {
  if (walls.length > 0) {
    walls.forEach(w => World.remove(world, w));
    walls = [];
  }

  const w = window.innerWidth;
  const h = window.innerHeight;
  const thickness = 200;

  walls = [
    Bodies.rectangle(w / 2, h + thickness / 2, w, thickness, { isStatic: true }), // bottom
    Bodies.rectangle(-thickness / 2, h / 2, thickness, h, { isStatic: true }), // left
    Bodies.rectangle(w + thickness / 2, h / 2, thickness, h, { isStatic: true }) // right
  ];

  World.add(world, walls);
}

window.addEventListener("resize", () => {
  createWalls();
});

const mouse = Mouse.create(matterCanvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false }
  }
});
World.add(world, mouseConstraint);

createWalls();
createProjectBoxes();
update();
