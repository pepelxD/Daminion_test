import View from '../../controlers/view.js'
import html from './index.pug';
import style from './style.css';

class Circle {
    constructor(node) {
        this.DOMElement = node;
        this.ctx = this.DOMElement.getContext('2d');
        this.cirleRadius = this.DOMElement.width / 2 - 50; 
        this.ballRadius = 39;
        this.x = this.DOMElement.width / 2;
        this.y = this.DOMElement.height / 2;
        this.speed = 0,
        this.dirx = 0;
        this.diry = 0;
        this.damp = 10;
        this.collision = false;
    }
    drawCircle(x, y, radius, fill) {
        this.ctx.beginPath();
        this.ctx[`${fill.fill}Style`] = fill.color;
        this.ctx.lineWidth = 3;
        this.ctx.arc(x, y, radius, 0, Math.PI*2, true);
        this.ctx[fill.fill]();
        this.ctx.closePath();
    }
    hitOuterCircleCheck() {
    
        let dr = this.cirleRadius - this.ballRadius; 
        if (Math.pow(this.x - this.DOMElement.width / 2, 2) + Math.pow(this.y - this.DOMElement.height / 2, 2) > Math.pow(this.cirleRadius - this.ballRadius, 2)) {
            if (this.collision){
                return;
            }
            this.collision = true; 
            this.dirx = -this.dirx;
            this.diry = -this.diry;
        } else {
            this.collision = false;
        }
    }
    hitMouseCheck(mouseX, mouseY) {
        if (this.collision) {
            return;
        }
        let dx = this.x - mouseX; 
        let dy = this.y - mouseY;
        if (dx*dx + dy*dy < this.ballRadius*this.ballRadius) { 
            let max = Math.max(Math.abs(dx), Math.abs(dy));
            if (!max){
                return;
            }
            this.dirx = dx/max;
            this.diry = dy/max;
            this.speed = 300;
        }
    }
    doMove(dt) {
        this.x += this.dirx*this.speed*dt; 
        this.y += this.diry*this.speed*dt;
        this.speed = Math.max(0, this.speed - this.damp*dt);
    }
    render() {
        this.ctx.clearRect(0, 0, this.DOMElement.width, this.DOMElement.height);
        this.drawCircle(
            this.DOMElement.width / 2, 
            this.DOMElement.height / 2, 
            this.cirleRadius,
            {fill: 'stroke', color: '#34648e'}
        );
        this.drawCircle(
            this.x, 
            this.y, 
            this.ballRadius,
            {fill: 'fill', color: '#0294bf'}
        );
        requestAnimationFrame(this.render.bind(this));
    }
    init() {
        let x = 0, y = 0; 
        this.DOMElement.addEventListener('mousemove', e => {
            let z = window.getComputedStyle(this.DOMElement).zoom || 1;     
            x = e.pageX/z - e.target.offsetLeft - this.DOMElement.offsetLeft;
            y = e.pageY/z - e.target.offsetTop - this.DOMElement.offsetTop;
        });

        requestAnimationFrame(this.render.bind(this));
        let t = 0;
        setInterval(() => {
            let dt = new Date().getTime() - t; 
            this.hitMouseCheck(x, y);
            this.doMove(dt/1000);
            this.hitOuterCircleCheck();
            t = new Date().getTime();
        }, 10);
    }
   
    
    
}

export default function() {
    new View(html()).render();
    const circle = new Circle(document.querySelector('#canvas'));
    circle.init();
    document.body.style.height = 'auto';
}