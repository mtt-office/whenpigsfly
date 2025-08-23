
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
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/mtt.png',

    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/tooth.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/book.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/ball.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/ny.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/rainbowcircle.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/jeju.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/corn.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/chair.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/sound.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/ant.png',
    },

    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/d.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/a.png',
    },
    {
      width: 180,
      height: 120,
      imgSrc: 'assets/images/projects/o.png',
    },
    {
      width: 180,
      height: 160,
      imgSrc: 'assets/images/projects/p.png',
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
