class Background {
    constructor(game, unit) {
        this.game = game
        this.canvas = game.canvas
        this.context = game.context
        this.height = game.canvas.height
        this.width = game.canvas.width
        this.unit = unit
    }

    draw() {
        let context = this.context
        let height = this.height
        let width = this.width
        let unit = this.unit

        // 画背景色
        context.save()
        context.fillStyle = 'rgb(24, 24, 36)'
        context.fillRect(0, 0, width, height)
        context.restore()

        // 格子数量
        let cells = Math.floor(width / unit) + 1
        context.save()
        context.strokeStyle = 'rgba(110,110,110,0.1)'
        context.shadowBlur = 0
        for (let i = 1; i < cells; i++) {
            let f = unit * i
            context.beginPath()
            context.moveTo(f, 0)
            context.lineTo(f, height)
            context.stroke()
            context.beginPath()
            context.moveTo(0, f)
            context.lineTo(width, f)
            context.stroke()
            context.closePath()
        }
        context.restore()
    }
}