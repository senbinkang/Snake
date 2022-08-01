class GameScene {
    constructor(game) {
        this.game = game
        this.height = game.canvas.height
        this.width = game.canvas.width
        this.unit = 20

        this.init()
    }

    init() {
        let g = this.game
        let unit = this.unit
        this.bg = new Background(g, unit)
        this.snake = new Snake(g, unit)
        this.food = new Food(g, this.snake)
    }

    // 检测碰撞
    checkCollide() {
        // 检测是否撞到自己
        if (this.snake.isEatSelf()) {
            this.game.gameOver()
        }

        // 检测是否吃到食物
        if (this.snake.has(this.food.p)) {
            this.food.dead()
            this.snake.addBody(this.food.p)
            this.food.create()
        }
    }

    update() {
        if (!this.game.over) {
            this.snake.update()
            this.checkCollide()
        }
    }

    draw() {
        this.bg.draw()
        this.snake.draw()
        this.food.draw()
    }
}
