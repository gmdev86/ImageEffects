const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 700;

class Cell {
    constructor(effect, x, y){
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('projectImage');
        this.slideX = 0;
        this.slideY = 0;
    }
    draw(context){
        context.drawImage(this.image, this.x + this.slideX, this.y + this.slideY, this.width, this.height, this.x, this.y, this.width, this.height);
        //context.strokeRect(this.x, this.y, this.width, this.height);
    }
    update(){
        this.slideX = Math.random() * 2;
        this.slideY = Math.random() * 5;
    }
}

class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.cellWidth = this.width / 35;
        this.cellHeight = this.height / 55;
        this.cell = new Cell(this, 0, 0);
        this.imageGrid = [];
        this.createGrid();
    }
    createGrid(){
        for(let y = 0; y < this.height; y += this.cellHeight){
            for(let x = 0; x < this.width; x += this.cellWidth){
                this.imageGrid.push(new Cell(this, x, y));
            }
        }
    }
    render(context){
        this.imageGrid.forEach(cell => {
            cell.update();
            cell.draw(context);
        })
    }
}


const effect = new Effect(canvas);

function animate() {
    effect.render(ctx);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);