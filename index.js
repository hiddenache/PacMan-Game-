const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d'); // canvas context

canvas.width = innerWidth
canvas.height = innerHeight

class Margine {
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

const map = [
    ['-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', '-']
    ['-', '-', '-', '-', '-', '-']
]

const margini = []

map.forEach((row) => {
    row.forEach((char) => {
        switch(char){
            case '-': 
                margini.push(new Margine({position: {
                    x:0,
                    y:0
                }}))
                break
        }
    })
})

margini.forEach(margine => {
    margine.draw()
})