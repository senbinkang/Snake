class Food {
    constructor(game, snake) {
        this.game = game
        this.snake = snake
        this.unit = 20
        this.maxX = game.canvas.width - this.unit
        this.maxY = game.canvas.height - this.unit
        this.alive = true
        this.color = null

        this.create()
    }

    createColor() {
        return `hsl(${~~(Math.random() * 360)},100%,50%)`
    }
    dead() {
        this.alive = false
    }

    getRandomPos() {
        let maxX = this.game.canvas.width - this.unit
        let maxY = this.game.canvas.height - this.unit
        let unit = this.unit

        let x = Math.floor((Math.random() * (0 - maxX) + maxX) / unit) * unit
        let y = Math.floor((Math.random() * (0 - maxY) + maxY) / unit) * unit
        return {x, y}
    }

    create() {
        let randomPos = this.getRandomPos()
        while (this.snake.has(randomPos)) {
            randomPos = this.getRandomPos()
        }
        this.p = randomPos
        this.color = this.createColor()
        this.alive = true
        this.draw()
    }

    draw() {
        let p = this.p
        let context = this.game.context
        context.save()
        context.globalCompositeOperation = 'lighter'
        context.shadowBlur = 20
        context.shadowColor = this.color
        context.fillStyle = this.color
        context.fillRect(p.x, p.y, this.unit, this.unit)
        context.shadowBlur = 0
        context.stroke()
        context.restore()
    }
}