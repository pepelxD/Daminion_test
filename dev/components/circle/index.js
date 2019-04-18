import View from '../../controlers/view.js'
import html from './index.pug';
import style from './style.css';

class Circle {
    constructor(node) {
        this.DOMElement = node;
        this.ctx = this.DOMElement.getContext('2d');
        this.cirleRadius = this.DOMElement.width / 2 - 50; // радиус окружности внешней
        this.ballRadius = 39;    // радиус шарика
        this.x = this.DOMElement.width / 2;     // координата по х центра шарика
        this.y = this.DOMElement.height / 2;     // координата по y центра шарика
        this.speed = 0, // скорость движения
        this.dirx = 0;  // компонент x вектора движения шарика
        this.diry = 0;  // компонент y вектора движения шарика
        this.damp = 10; // скорость уменьшения скорости движения (сопротивление)
        this.collision = false; // признак коллизии с внешним кругом
    }
    drawCircle(x, y, radius, fill) {
        this.ctx.beginPath();
        this.ctx[`${fill.fill}Style`] = fill.color;
        this.ctx.lineWidth = 3;
        this.ctx.arc(x, y, radius, 0, Math.PI*2, true);
        this.ctx[fill.fill]();
        this.ctx.closePath();
    }
    // функция, которая проверяет наличие коллизии шарика с внешним кругом
    hitOuterCircleCheck() {
    
        let dr = this.cirleRadius - this.ballRadius; //разница радиусов
        // по теореме пифагора проверяем выход за пределы круга (коллизию)
        if (Math.pow(this.x - this.DOMElement.width / 2, 2) + Math.pow(this.y - this.DOMElement.height / 2, 2) > Math.pow(this.cirleRadius - this.ballRadius, 2)) {
        //if(this.x*(this.DOMElement.width / 2) + this.y*(this.DOMElement.height / 2) > dr*dr){    
            console.log(this.collision)
            // если коллизия уже была обсчитана, но шарик еще не вернулся в круг, 
            // чтобы он не застревал больше не надо обсчитывать коллизии, поэтому выходим
            if (this.collision){
                return;
            }
                
            // устанавливаем для шарика признак коллизии    
            this.collision = true; 
        
            // далее идет код расчета нового вектора движения
        
            // найдем вектор нормали. тут он берется приближенно, 
            // в точке центра шарика в момент обсчета коллизии, 
            // при том что шарик уже проскочил границу. по идее тут 
            // необходимо посчитать точку соударения геометрически. 
            /* let max = Math.max(Math.abs(this.x), Math.abs(this.y)); 
            let nx = -this.x / max;
            let ny = -this.y / max;
        
            // найдем новый вектор движения по формуле 
            // r = i−2(i⋅n)n , где
            // i - исходный вектор
            // n - нормаль 
            // ⋅ знак скалярного произведения
        
            let dot2 = this.dirx * nx * 2 + this.diry * ny * 2
            this.dirx = this.dirx - dot2 * nx;
            this.diry = this.diry - dot2 * ny;
        
            // нормализуем вектор движения
            max = Math.max(Math.abs(this.dirx), Math.abs(this.diry));
            this.dirx /= max;
            this.diry /= max; */
            this.dirx = -this.dirx;
            this.diry = -this.diry;
        } else {
            // сбрасываем признак коллизии когда шарик вернулся в круг.
            this.collision = false;
        }
    }
    // функция проверки коллизии шарика и мышки
    hitMouseCheck(mouseX, mouseY) {
    
        // если есть коллизия с внешним кругом игнорируем мышку
        if (this.collision) {
            return;
        }
    
        // разница координат мышки и шарика
        let dx = this.x - mouseX; 
        let dy = this.y - mouseY;

        // проверяем по теореме Пифагора столкновение с мышкой
        if (dx*dx + dy*dy < this.ballRadius*this.ballRadius) { 
            // задаем вектор движения и нормализуем его
            let max = Math.max(Math.abs(dx), Math.abs(dy));
            if (!max){
                return;
            }
            this.dirx = dx/max;
            this.diry = dy/max;

            // задаем скорость
            this.speed = 300;
        }
    }
    doMove(dt) {
        // к текущей координате прибавляем вектор скорости помноженный 
        // на значение скорости помноженные на прошедшее время
        this.x += this.dirx*this.speed*dt; 
        this.y += this.diry*this.speed*dt;
        
        
        // тормозим объект, так же на значение зависящее от времени
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
        //this.ctx.translate(-this.DOMElement.width/2, -this.DOMElement.height/2);
        requestAnimationFrame(this.render.bind(this));
    }
    init() {
        // координаты мыши относительно центра канвы.
        let x = 0, y = 0; 

        // глобальный слушатель мышки
        window.addEventListener('mousemove', e => {
            let z = window.getComputedStyle(canvas).zoom || 1;     
            x = e.pageX/z - e.target.offsetLeft - this.DOMElement.offsetLeft;
            y = e.pageY/z - e.target.offsetTop - this.DOMElement.offsetTop;
        });

        requestAnimationFrame(this.render.bind(this));
        let t = 0;
        setInterval(() => {
            // считаем сколько времени прошло с прошлого обсчета
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
}