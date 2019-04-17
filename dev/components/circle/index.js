import View from '../../controlers/view.js'
import html from './index.pug';
import style from './style.css';

class Circle {
    constructor(node) {
        this.DOMElement = node;
        this.ctx = this.DOMElement.getContext('2d');
        this.dx = 0;
        this.dy = 0;
        this.x = this.DOMElement.width / 2,
        this.y = this.DOMElement.height / 2,
        this.ballRadius = 39;
        this.cirleRadius = this.DOMElement.width / 2 - 50;
    }
    drawCircle(x, y, radius, fill) {
        this.ctx.beginPath();
        this.ctx[`${fill.fill}Style`] = fill.color;
        this.ctx.lineWidth = 3;
        this.ctx.arc(x, y, radius, 0, Math.PI*2, true);
        this.ctx[fill.fill]();
        this.ctx.closePath();
    }
    render() {
        //5:1 = dx: p 

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
        this.x += this.dx;
        this.y += this.dy;

        


        if(Math.pow(this.x - this.DOMElement.width / 2, 2) + Math.pow(this.y - this.DOMElement.height / 2, 2) >= Math.pow(this.cirleRadius - this.ballRadius, 2) ||
        Math.pow(this.mouseX - this.x, 2) + Math.pow(this.mouseY - this.y, 2) <= Math.pow(this.ballRadius + 5, 2)) {
            this.dx = -this.dx;
            this.dy = -this.dy;
        }
        const frame = requestAnimationFrame(this.render.bind(this))
    }
    init() {
        let currentX = 0;
        let currentY = 0;
        let distance = 0;
        let speed = 3;

        this.DOMElement.onmousemove = (event) => {
            let mouseX = event.clientX - this.DOMElement.offsetLeft - 10;
            let mouseY = event.clientY - this.DOMElement.offsetTop - this.DOMElement.scrollTop + window.pageYOffset - 14;
            this.mouseX = mouseX;
            this.mouseY = mouseY;
            let xResult = mouseX - currentX;
            let yResult = mouseY - currentY;
            distance = Math.sqrt(xResult * xResult + yResult * yResult);
            if(Math.pow(this.mouseX - this.x, 2) + Math.pow(this.mouseY - this.y, 2) <= Math.pow(this.ballRadius + 5, 2) && 
                Math.pow(this.x - this.DOMElement.width / 2, 2) + Math.pow(this.y - this.DOMElement.height / 2, 2) < Math.pow(this.cirleRadius - this.ballRadius, 2)) {
                this.dx = xResult / distance * speed;
                this.dy = yResult / distance * speed;
            } else if(Math.pow(this.mouseX - this.x, 2) + Math.pow(this.mouseY - this.y, 2) <= Math.pow(this.ballRadius + 5, 2) && 
            Math.pow(this.x - this.DOMElement.width / 2, 2) + Math.pow(this.y - this.DOMElement.height / 2, 2) >= Math.pow(this.cirleRadius - this.ballRadius, 2)) {
                this.x -= xResult;
                this.y -= yResult;
            }
            currentX = mouseX;
            currentY = mouseY;
            
        }
        this.render();
    }
    
    
}

export default function() {
    new View(html()).render();
    const circle = new Circle(document.querySelector('#canvas'));
    circle.init();
}