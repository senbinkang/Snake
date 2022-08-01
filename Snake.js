class Snake {
    constructor(game, unit) {
        this.game = game
        this.unit = unit
        this.head = {}
        this.body = []
        this.width = game.canvas.width
        this.height = game.canvas.height
        this.middleX = Math.floor(game.canvas.width / 2)
        this.middleY = Math.floor(game.canvas.height / 2)
        this.direction = ''

        this.init()
    }

    init() {
        this.registerAction()
        this.create()
    }
    registerAction() {
        let g = this.game
        // 向左
        g.registerAction('a', () => {
            if (this.direction !== 'right') {
                this.direction = 'left'
            }
        })
        g.registerAction('ArrowLeft', () => {
            if (this.direction !== 'right') {
                this.direction = 'left'
            }
        })
        // 向右
        g.registerAction('d', () => {
            if (this.direction !== 'left') {
                this.direction = 'right'
            }
        })
        g.registerAction('ArrowRight', () => {
            if (this.direction !== 'left') {
                this.direction = 'right'
            }
        })
        // 向上
        g.registerAction('w', () => {
            if (this.direction !== 'down') {
                this.direction = 'up'
            }
        })
        g.registerAction('ArrowUp', () => {
            if (this.direction !== 'down') {
                this.direction = 'up'
            }
        })
        // 向下
        g.registerAction('s', () => {
            if (this.direction !== 'up') {
                this.direction = 'down'
            }
        })
        g.registerAction('ArrowDown', () => {
            if (this.direction !== 'up') {
                this.direction = 'down'
            }
        })

        // 暂停
        g.registerAction(' ', () => {
            this.direction = ''
        })
    }

    create() {
        this.createHead()
        this.draw()
    }
    createHead() {
        this.head = {
            x: this.middleX,
            y: this.middleY,
        }
    }

    draw() {
        this.drawHead()
        this.drawBody()
    }
    drawHead() {
        let context = this.game.context
        context.save()
        context.fillStyle = 'rgba(255, 255, 255, 1)'
        let {x, y} = this.head
        context.fillRect(x, y, this.unit, this.unit)
        context.restore()
    }
    drawBody() {
        let context = this.game.context
        context.save()
        context.fillStyle = 'rgba(255, 255, 255, 0.7)'
        for (let i = 0; i < this.body.length; i++) {
            let {x, y} = this.body[i]
            context.fillRect(x, y, this.unit, this.unit)
        }
        context.restore()
    }

    isEatSelf() {
        let h = this.head
        let b = this.body
        for (let e of b) {
            if (e.x === h.x && e.y === h.y) {
                log('eat self！！！')
                return true
            }
        }

        return false
    }
    has(p) {
        let h = this.head
        if (h.x === p.x && h.y ===p.y) {
            return true
        }

        let b = this.body
        for (let e of b) {
            if (e.x === p.x && e.y ===p.y) {
                return true
            }
        }

        return false
    }
    addBody(p) {
        log('eat food')
        this.body = [p].concat(this.body)
    }

    update() {
        this.oldHead = JSON.parse(JSON.stringify(this.head))
        this.oldBody = JSON.parse(JSON.stringify(this.body))
        this.move()
    }

    move() {
        if (this.direction !== '') {
            this.headMove()
            this.bodyMove()
        }
    }
    headMove() {
        let u = this.unit
        let moveObj = {
            left: (e) => { e.x -= u },
            right: (e) => { e.x += u },
            down: (e) => { e.y += u },
            up: (e) => { e.y -= u },
        }
        let d = this.direction
        if (d !== '') {
            moveObj[d](this.head)
        }

        this.checkBorder(this.head)
    }
    bodyMove() {
        let temp = this.oldHead
        let len = this.oldBody.length
        let newBody = this.oldBody

        for (let i = len - 1; i >= 0; i--) {
            let b = newBody[i]
            newBody[i] = temp
            temp = b
        }
        this.body = newBody
    }

    // 边界检测
    checkBorder(cell) {
        let borderX = this.width - this.unit
        let borderY = this.height - this.unit

        if (cell.x > borderX) {
            cell.x = 0
        }
        if (cell.y > borderY) {
            cell.y = 0
        }
        if (cell.x < 0) {
            cell.x = borderX
        }
        if (cell.y < 0) {
            cell.y = borderY
        }
    }
}
