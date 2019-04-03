
var canvas = document.createElement("canvas");
document.body.appendChild(canvas)

 canvas.width = document.body.clientWidth;
 canvas.height = window.innerHeight;


 var c = canvas.getContext('2d');


addEventListener('resize' ,function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init()
})


addEventListener('mouseout', function(){
    mouse.x = undefined ;
    mouse.y = undefined ;
})

let mouse ={
    x: undefined,
    y: undefined
}

addEventListener('mousemove', event =>{
    mouse.x = event.x + window.scrollX;
    mouse.y = event.y + window.scrollY;
})

var colorArray = [
     '#1f156f', 
     '#1d234a',
     '#d63897',
     '#8956de',
     '#c89505',
];


/* dm = Math.pow(radius, 3) -Math.pow(otheradius, 3)  default  object is cricle and use  Elastic collision
   dv1x = dv2x
   dv1y = dv2y
*/
function getCollision(cricle, othercricle){
    const dv1 = cricle.velocity.x - othercricle.velocity.x
    const dv2 = cricle.velocity.y - othercricle.velocity.y

    const distance1 = othercricle.x - cricle.x
    const distance2 = othercricle.y - cricle.y
    //if( dv1 * distance1 + dv2 * distance2 > 0 ){  
    const dm = Math.pow(cricle.radius, 3) - Math.pow(othercricle.radius, 3);
    const dm2 = Math.pow(cricle.radius, 3) + Math.pow(othercricle.radius, 3);


    const dx = (cricle.velocity.x * dm + 2 * othercricle.velocity.x * Math.pow(othercricle.radius, 3)) / dm2;
    const dy = (cricle.velocity.y * dm + 2 * othercricle.velocity.y * Math.pow(othercricle.radius, 3)) / dm2;

    const otherdx = (othercricle.velocity.x * (-dm) + 2 * cricle.velocity.x * Math.pow(cricle.radius, 3)) / dm2;
    const otherdy = (othercricle.velocity.y * (-dm) + 2 * cricle.velocity.y * Math.pow(cricle.radius, 3)) / dm2;
    

    cricle.velocity = {x : dx, y : dy}
    othercricle.velocity ={ x: otherdx, y: otherdy}  
    if( dv1 * distance1 + dv2 * distance2 < 0 ){  
    console.log(dv1, dv2, distance1, distance2)}
}


function generateColor(){
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}

function generateInScreen(radius, width){
    return Math.random() * (width- 2 * radius) + radius
}

function generateDistance(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2  - x1, 2) + Math.pow(y2  - y1, 2))
}

function Particle(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.velocity = {
        x : (Math.random() - 0.5) * 2,
        y : (Math.random() - 0.5) * 2
    }
    this.radius = radius;
    this.color =  color;
    this.angle = Math.random() * Math.PI * 2;

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.lineWidth = 1;
        c.closePath();
    }

    this.update = particles => {
        for (let i = 0; i < particles.length; i++) {
            if( this === particles[i]) continue;
            if( generateDistance(this.x, this.y, particles[i].x, particles[i].y) < 50){
                c.beginPath();
                c.moveTo(this.x, this.y)
                c.lineTo(particles[i].x, particles[i].y)
                c.strokeStyle = this.color;
                c.lineWidth = 0.1
                c.stroke();
                c.closePath();
            }
        } 
        
        if( this.x + this.radius >= canvas.width || this.x -this.radius <= 0){
            this.velocity.x = -this.velocity.x
        }

        if( this.y + this.radius >= canvas.height || this.y -this.radius <= 0){
            this.velocity.y = -this.velocity.y
        }

        if( generateDistance(mouse.x, mouse.y, this.x, this.y) < 80){
            const lastPoint = { x: this.x, y: this.y};
            c.moveTo(lastPoint.x, lastPoint.y)
            this.angle = Math.atan2(this.y - mouse.y, this.x - mouse.x)
            this.x = mouse.x +  Math.cos(this.angle)* 65
            this.y = mouse.y +  Math.sin(this.angle)* 65
            c.lineTo(this.x, this.y)
            c.stroke();
            c.closePath();
        }
        this.x += this.velocity.x
        this.y += this.velocity.y

        this.draw();
    }

}

let particles;
function init(){  
    particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle(generateInScreen(.5, canvas.width), generateInScreen(.5, canvas.height), .5, 'red'))
    }
}


function animate(){
    requestAnimationFrame(animate); //callback
    c.clearRect(0, 0, innerWidth, innerHeight);

    particles.forEach(particle => {
        particle.update(particles);
    });


    for (let i = 0; i <particles.length; i++) {
        if( generateDistance(mouse.x, mouse.y, particles[i].x, particles[i].y) < 120){
            c.beginPath();
            c.moveTo(mouse.x, mouse.y)
            c.lineTo(particles[i].x, particles[i].y)
            c.strokeStyle = 'red';
            c.lineWidth = 0.2
            c.stroke();
            c.closePath();
        }
    }
};
init();
animate();


