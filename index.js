const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d'); // canvas context

canvas.width = innerWidth
canvas.height = innerHeight

class Margine {
    static width = 40
    static height = 40
    constructor({position}){
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw(){ // numele poate sa fie oricare nu neaparat draw(), doar de referinta
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// Class Player
class Player {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'yellow'
        ctx.fill()
        ctx.closePath()
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const margini = [] // un empty array pentru a putea da push in functie de pattern ul din map

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    a: {
        pressed:false
    }
}

let lastKey = ''

const player = new Player({ // creare player la pozitia x si y 
    position: {
        x: Margine.width + Margine.width/2, // operatie ca player-ul(cercul) sa fie in mijloc
        y: Margine.height + Margine.height/2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const map = [
    ['-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-']
]

map.forEach((row, i) => {
    row.forEach((linie, j) => {
        switch(linie){
            case '-':
                // in locul liniei din constanta map desenam obiectul Margine
                margini.push(new Margine({position: {
                    x: Margine.width * j,
                    y: Margine.height * i
                }}))

                console.log(margini)
                break
        }
    })
})

function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    margini.forEach((margine) => {
        margine.draw()

        // collision detection
        if(player.position.x - player.radius <= margine.position.y + margine.height
            && player.position.x + player.radius >= margine.position.x &&
            player.position.y + player.radius >= margine.position.y
            && player.position.x - player.radius <= margine.position.x + margine.width){
            console.log('loveit')
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })
    
    player.update()
    player.velocity.y = 0
    player.velocity.x = 0

    if(keys.w.pressed && lastKey === 'w'){
        player.velocity.y = -5
    }
    else if(keys.a.pressed && lastKey === 'a'){
        player.velocity.x = -5
    }
    else if(keys.s.pressed && lastKey === 's'){
        player.velocity.y = 5
    }
    else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 5
    }
}

animate()

window.addEventListener('keydown', ({key}) => { // detectare apasare pentru a putea misca player ul
    switch(key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break
    }

    console.log(player.velocity)
})

window.addEventListener('keyup', ({key}) => { // detectare apasare pentru a putea misca player ul
    switch(key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
        break
    }

    console.log(player.velocity)
})