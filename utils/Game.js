class Game {
    constructor() {
        this.canvas = e('#id-canvas')
        this.context = this.canvas.getContext('2d')
        window.fps = 8
        this.keysdown = {}
        this.actions = {}
        this.scene = null
        this.over = false

        // 按键监听
        window.addEventListener('keydown', (e) => {
            this.keysdown[e.key] = true
        })
        window.addEventListener('keyup', (e) => {
            this.keysdown[e.key] = false
        })
        // canvas 禁止右键菜单
        this.canvas.addEventListener('contextmenu', function (e) {
            e.preventDefault()
        })

        this.init()
    }

    init() {
        let self = this
        let reset = e('#id-reset')
        reset.addEventListener('click', () => {
            this.scene = null
            this.over = false
            this.clear()
            clearTimeout(this.requestID)

            let scene = new GameScene(self)
            self.start(scene)
        })
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }
    doAction() {
        let g = this
        let actions = Object.keys(g.actions)
        for (let key of actions) {
            if (g.keysdown[key]) {
                g.actions[key]()
            }
        }
    }

    update() {
        this.scene.update()
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    draw() {
        this.scene.draw()
    }
    gameOver() {
        this.over = true
        log('game over !!!')
    }

    runloop() {
        let g = this
        g.doAction()
        g.update()
        g.clear()
        g.draw()

        // next run loop
        this.requestID = setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }

    loadAssets(src) {
        window.images = {}
        let loaded = 0
        let toLoad = 0
        let names = Object.keys(src)
        return new Promise((resolve) => {
            if (names.length === 0) {
                resolve()
            }
            for (let name of names) {
                toLoad += 1
                let path = src[name]
                let img = new Image()
                img.src = path
                img.dataset.id = name
                img.onload = () => {
                    loaded += 1
                    window.images[name] = img
                    if (loaded === toLoad) {
                        resolve()
                    }
                }
            }
        })
    }
    start(scene) {
        let g = this
        g.scene = scene

        const assets = {}
        this.loadAssets(assets).then(() => {
            // 开始运行程序
            this.requestID = setTimeout(function () {
                g.runloop()
            }, 1000 / window.fps)
        })
    }
}