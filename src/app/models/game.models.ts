import {
  Images,
  Icons,
} from '../features/home/components/game/interfaces/interfaces';

export class ComponentGame {
  rotation: number = 0;
  selected = false;
  width: number;
  height: number;
  positionX = 0;
  positionY = 0;

  relativePositionToParentX!: number;
  relativePositionToParentY!: number;
  contador = 0;
  type: string;

  pickedItem = false;

  constructor(
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    type: string
  ) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.type = type;
  }
  click(event: any, canvas: any) {
    if (this.pickedItem) {
      console.log(this.type);
      const clickX = event.clientX - canvas.getBoundingClientRect().left;
      const clickY = event.clientY - canvas.getBoundingClientRect().top;
      const distanceToCircle1 = Math.sqrt(
        Math.pow(clickX - this.relativePositionToParentX - 35, 2) +
          Math.pow(clickY - this.relativePositionToParentY - 35, 2)
      );

      if (distanceToCircle1 <= this.width / 2) {
        this.selected = true;
      } else {
        this.selected = false;
      }
    }
  }

  drawCircles(
    context: CanvasRenderingContext2D,
    raio: number,
    strokeWidth: number,
    opacity: number
  ) {
    context.save();
    context.beginPath();
    context.arc(
      this.positionX - raio + this.relativePositionToParentX,
      this.positionY + raio,
      raio,
      0,
      2 * Math.PI
    );
    context.strokeStyle = `rgba(134, 144, 171, ${opacity})`;
    context.lineWidth = strokeWidth;
    context.stroke();
    context.restore();
  }

  setRotation(angleInRadians: number) {
    this.rotation = angleInRadians;
  }

  draw(context: any, images: Images[]) {
    images.forEach((element, index) => {
      this.positionX = element.positionX + this.positionX;
      this.positionY = element.positionY + this.positionY;
      const image = new Image();
      image.src = element.src;
      this.relativePositionToParentX =
        this.positionX + element.positionX <= 0
          ? this.positionX
          : element.positionX + element.width >= this.width
          ? this.positionX
          : this.positionX + element.positionX - element.width;

      this.relativePositionToParentY =
        this.positionY + element.positionY <= 0
          ? this.positionY
          : element.positionY + element.height >= this.height
          ? this.positionY
          : this.positionY + element.positionY - element.height;

      if (this.pickedItem && this.selected && index == 0) {
        context.beginPath();
        context.arc(
          this.relativePositionToParentX + element.width / 2,
          this.relativePositionToParentY + element.width / 2,
          element.width / 2,
          0,
          2 * Math.PI
        );
        context.strokeStyle = 'white';
        context.lineWidth = 5;
        context.stroke();
      }

      context.drawImage(
        image,
        this.relativePositionToParentX,
        this.relativePositionToParentY,
        element.width,
        element.height
      );
    });
  }
}

export class GroupComponentsGame {
  components: ComponentGame[] = [];
  width: number;
  height: number;
  positionX: number = 0;
  positionY: number = 0;
  positionIcon: number = 0;
  delocamentoX: number = this.positionX + this.positionIcon;
  delocamentoY: number = this.positionY + this.positionIcon;
  constructor(
    components: ComponentGame[],
    width: number,
    height: number,
    positionX: number,
    positionY: number
  ) {
    this.width = width;
    this.height = height;
    this.positionX = positionX;
    this.positionY = positionY;
    this.components = components;
  }

  draw() {
    this.components.forEach((element) => {
      this.positionIcon = element.width;
      element.positionX = this.positionX + this.delocamentoX;
      element.positionY = this.positionY + this.delocamentoY;
    });
  }
}

export class Game {
  stage: number | undefined;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  objectsScene1: ComponentGame[] = [];
  objectsScene2: ComponentGame[] = [];
  group!: GroupComponentsGame;
  group2!: GroupComponentsGame;
  selectedIcon!: string;
  opacity = 0;
  on = false;
  cont = 0;
  selected!: Icons;
  chosenBot!: Icons;
  status: string | undefined;

  icons: Icons[] = [
    {
      type: 'rock',
      src: '../../../../../assets/images/rock.svg',
      background: '../../../../../assets/images/yellow.svg',
    },
    {
      type: 'paper',
      src: '../../../../../assets/images/paper.svg',
      background: '../../../../../assets/images/red.svg',
    },
    {
      type: 'scissors',
      src: '../../../../../assets/images/scissors.svg',
      background: '../../../../../assets/images/blue.svg',
    },
  ];

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
  }

  click(event: any, objects: ComponentGame[]) {
    objects.forEach((ele) => ele.click(event, this.canvas));
  }


  makeComponents() {
    const bg_triangulo = new ComponentGame(
      287,
      257,
      (this.canvas.width - 287) / 2,
      (this.canvas.height - 257) / 2,
      'bg_tringulo'
    );

    const circle1 = new ComponentGame(
      200,
      200,
      (this.canvas.width - 200) / 2,
      (this.canvas.height - 200) / 2,
      'rock'
    );
    const circle2 = new ComponentGame(
      200,
      200,
      (this.canvas.width - 200) / 2,
      (this.canvas.height - 200) / 2,
      'paper'
    );

    const circle3 = new ComponentGame(
      200,
      200,
      (this.canvas.width - 200) / 2,
      (this.canvas.height - 200) / 2,
      'scissors'
    );

    const circleBot = new ComponentGame(300, 300, 0, 0, 'circleBot');

    const circlePlayer = new ComponentGame(200, 200, 0, 0, 'circlePlayer');

    this.objectsScene1.push(bg_triangulo, circle1, circle2, circle3);
    this.objectsScene2.push(circlePlayer, circleBot);
  }

  update() {
    if (this.stage == 1 || !this.stage) {
      this.clearCanvas();
      this.status = undefined;
      this.objectsScene1[1].pickedItem = true;
      this.objectsScene1[2].pickedItem = true;
      this.objectsScene1[3].pickedItem = true;
      this.objectsScene1[0].draw(this.context, [
        {
          src: '../../../../../assets/images/bg-triangle.svg',
          positionX: (482 - 287) / 2,
          positionY: (430 - 257) / 2,
          width: 287,
          height: 257,
        },
      ]);
      this.objectsScene1[1].draw(this.context, [
        {
          src: this.icons[0].background,
          positionX: 0,
          positionY: 0,
          width: 200,
          height: 200,
        },
        {
          src: this.icons[0].src,
          positionX: (200 - 70) / 2,
          positionY: (200 - 70) / 2,
          width: 70,
          height: 70,
        },
      ]);

      this.objectsScene1[2].draw(this.context, [
        {
          src: this.icons[1].background,
          positionX: 282,
          positionY: 0,
          width: 200,
          height: 200,
        },
        {
          src: this.icons[1].src,
          positionX: (200 - 70) / 2,
          positionY: (200 - 70) / 2,
          width: 70,
          height: 70,
        },
      ]);

      this.objectsScene1[3].draw(this.context, [
        {
          src: this.icons[2].background,
          positionX: 141,
          positionY: 230,
          width: 200,
          height: 200,
        },
        {
          src: this.icons[2].src,
          positionX: (200 - 70) / 2,
          positionY: (200 - 70) / 2,
          width: 70,
          height: 70,
        },
      ]);

      this.objectsScene1.forEach((ele, index) => {
        if (ele.selected) {
          this.stage = 2;
          this.objectsScene1[index].selected = false;
        }
      });
    }

    if (this.stage == 2) {
      this.clearCanvas();
      this.status = this.checkGameOutcome();
      this.objectsScene1[1].pickedItem = false;
      this.objectsScene1[2].pickedItem = false;
      this.objectsScene1[3].pickedItem = false;
      
      this.opacityInOut(0.1);
      
      for (let index = 0; index < 3; index++) {
          let drawIndex;
      
          if (this.status === "you win") {
              drawIndex = 0;
          } else if (this.status === "draw") {
              drawIndex = undefined;
          } else {
              drawIndex = 1;
          }

      
          if (drawIndex !== undefined) {
              const xPosition = 150;
              const yPosition = (index + 1) * 100;
              this.objectsScene2[drawIndex].drawCircles(
                  this.context,
                  xPosition,
                  yPosition,
                  this.opacity
              );
          }
      }
      
      this.drawText("YOU PICKED", 20, 290, 275, 'white')
      this.drawText("THE HOUSE PICKED", 20, 920, 275, 'white')

      this.objectsScene2[0].draw(this.context, [
        {
          src: this.selected.background,
          positionX: 0,
          positionY: 0,
          width: 300,
          height: 300,
        },
        {
          src: this.selected.src,
          positionX: (300 - 100) / 2,
          positionY: (300 - 100) / 2,
          width: 100,
          height: 100,
        },
      ]);

      this.objectsScene2[1].draw(this.context, [
        {
          src: this.chosenBot.background,
          positionX: 660,
          positionY: 0,
          width: 300,
          height: 300,
        },
        {
          src: this.chosenBot.src,
          positionX: (300 - 100) / 2,
          positionY: (300 - 100) / 2,
          width: 100,
          height: 100,
        },
      ]);
    }
    this.group2.draw();
    this.group.draw();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }



  checkGameOutcome() {
    let outcome = '';

    const results = {
      rock: { rock: 'draw', paper: 'you lose', scissors: 'you win' },
      paper: { rock: 'you win', paper: 'draw', scissors: 'you lose' },
      scissors: { rock: 'you lose', paper: 'you win', scissors: 'draw' },
    };
    if (this.chosenBot) {
      outcome =
        results[this.selected.type as keyof typeof results][
          this.chosenBot.type as keyof typeof results
        ];
    }
    return outcome;
  }



  machineChoose() {
    const index = Math.floor(Math.random() * this.icons.length);
    this.chosenBot = this.icons[index];
  }

  drawText(
    text: string,
    fontSize: number,
    positionX: number,
    positionY: number,
    color: string,
) {

    this.context.font = `${fontSize}px Roboto Condensed`;
    this.context.fillStyle = color;
    this.context.fillText(text, positionX, positionY + 20);
    this.context.textAlign = 'start'
}
  

  opacityInOut(n: number) {
    if (this.opacity === 0) {
      this.on = true;
    }

    if (this.opacity === n) {
      this.on = false;
    }
    this.opacity += this.on ? 0.002 : -0.002;
    this.opacity = parseFloat(this.opacity.toFixed(3));
  }



  startGame() {
    this.makeComponents();
    this.group = new GroupComponentsGame(
      this.objectsScene1,
      500,
      500,
      this.canvas.width / 2 - 250,
      this.canvas.height / 2 - 250 + 125
    );
    this.group2 = new GroupComponentsGame(
      this.objectsScene2,
      0,
      0,
      200,
      365
    );
  }

  clickGame(event: MouseEvent) {
    this.objectsScene1.forEach((ele) => {
      ele.click(event, this.canvas);
      if (ele.selected) {
        this.icons.filter((icon) => {
          if (icon.type == ele.type) {
            console.log(icon.type, 'f');
            this.selected = icon;
          }
        });

        this.machineChoose();
      }
    });
  }

  // changeColor() {
  //   for (let i = this.background.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [this.background[i], this.background[j]] = [
  //       this.background[j],
  //       this.background[i],
  //     ];
  //   }
  // }
}
