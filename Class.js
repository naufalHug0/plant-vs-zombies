class Sprite {
    constructor({ context, position, width, height, frameMax = 1, scale }) {
        this.context = context
        this.position = position
        this.width = width
        this.height = height
        this.frameMax = frameMax
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 3
        this.scale = scale
    }
}

class Zombie extends Sprite {
    constructor({ context, position, width, height, frameMax = 1, scale, imageSrc }) {
        super({
            context,
            position,
            width,
            height,
            frameMax,
            scale
        })
        this.image = new Image()
        this.image.src = imageSrc
        this.frameCurrent = 0
        this.frameElapsed = 0
        this.frameHold = 2
        this.speed = 0.5
    }

    draw() {
        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale
        )
    }

    animate() {
        if (this.frameCurrent > 33) {
            this.frameCurrent = 0
        }

        this.frameElapsed++
        if (this.frameElapsed % this.frameHold === 0) {
            this.image.src = `./assets/Sprites/Zombie/frame_${String(this.frameCurrent).padStart(2,'0')}_delay-0.05s.gif`
            this.frameCurrent++
        }
        
        this.position.x -= this.speed
    }

    update() {
        this.draw()
        this.animate()
    }
}

class Cart extends Sprite {
    constructor({ context, position, width, height, imageSrc, scale }) {
        super({
            context,
            position,
            width,
            height,
            scale
        })
        this.image = new Image()
        this.image.src = imageSrc
        this.speed = 0
        this.velocity = 0
    }
    draw() {
        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale
        )
    }

    move() {
        this.image.src = `./assets/Sprites/General/${(this.velocity <= 0)?'lawnmowerActivated':'lawnmowerIdle'}.gif`

        setTimeout(() => {
            this.speed = 0.15
            this.velocity += this.speed
        }, 1000)
    }

    update() {
        this.draw()
        this.position.x += this.velocity
    }
}

class Sun extends Sprite {
    constructor({ context, position, width, height, imageSrc, scale }) {
        super({
            context,
            position,
            width,
            height,
            scale
        })
        this.image = new Image()
        this.image.src = imageSrc
        this.speed = 2
        this.velocity = {
            x: 0,
            y: this.speed
        }
        this.sunPoint = {
            x: 300, y: 50
        }
    }
    draw() {
        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale
        )
    }

    move() {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }

    // collect() {
    //     if (this.position.x <= this.sunPoint.x && this.position.y <= this.sunPoint.y) {
    //         this.velocity = {x:0,y:0}
    //     } else {
    //         this.velocity.y = this.position.y <= this.sunPoint.y?0:-(Math.abs((this.position.y-this.sunPoint.y)/20))
    //         this.velocity.x = this.position.x <= this.sunPoint.x?0:-(Math.abs((this.position.x-this.sunPoint.x)/20))
    //     }
    // }

    update() {
        this.draw()
        this.move()
    }
}

class Background extends Sprite {
    constructor({ context, position, width, height, imageSrc, imageWidth, imageHeight }) {
        super({
            context,
            position,
            width,
            height,
        })
        this.image = new Image()
        this.image.src = imageSrc
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
    }

    draw() {
        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.imageWidth,
            this.imageHeight
        )
    }

    update() {
        this.draw()
    }
}

class PlantCard extends Sprite {
    constructor({ context, position, width, height, imageSrc, purchasable, container }) {
        super({
            context,
            position,
            width,
            height,
        })
        this.image = new Image()
        this.image.src = imageSrc
        this.selected = false
        this.purchasable = purchasable
        this.container = container
        this.border = document.createElement('div')

        this.container.appendChild(this.border)
    }

    draw() {
        if (!this.purchasable) {
            this.image.style.filter = 'grayscale(100%)'
        }
        console.log(this.image)
        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y
        )
        if (this.selected) {
            this.select() 
        } else {
            this.removeSelection()
        }
    }

    select() {
        this.border.style.display = 'block'

        this.border.style.border ='2px solid lightgreen'
        this.border.style.width = `${this.image.width + 5}px`
        this.border.style.height = `${this.image.height + 5}px`
        this.border.style.position = 'absolute'
        this.border.style.left = `${this.position.x - 2}px`
        this.border.style.top = `${this.position.y - 2}px`
        this.border.style.zIndex = 80
        // border.style.border = '2px solid lightgreen';
        // border.style.width = this.image.width + 4
        // border.style.height = this.image.height + 4
        // this.context.rect(this.position.x - 2, this.position.y - 2, this.image.width + 4, this.image.height + 4)
        // this.context.stroke()
        
    }

    removeSelection() {
        this.border.style.display = 'none'
        this.setSelected(false)
    }

    checkIsSelected(canvasClickCoordinates) {
        return ((canvasClickCoordinates.y >= this.position.y && canvasClickCoordinates.y <= (this.position.y + this.image.height) ) && (canvasClickCoordinates.x >= this.position.x && canvasClickCoordinates.x <= (this.position.x + this.image.width) )) 
    }

    setSelected(bool) {
        this.selected = bool
        return this.selected
    }

    update() {
        this.draw()
    }
}

class Shovel extends Sprite {
    constructor({ context, position, width, height, imageSrc, scale }) {
        super({
            context,
            position,
            width,
            height,
            scale
        })
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale
        )
    }

    update() {
        this.draw()
    }
}

class ActionListener {
    constructor() {
        this.canvas = document.querySelector('canvas')
        this.canvas.addEventListener('click', this.handleCanvasClick.bind(this))
        this.canvasClickCordinates = {
            x: 0, y: 0
        }
        this.previousClickCoordinates = {
            x: 0, y: 0
        }
        this.keys = {
            esc: { pressed: false }
        }
        this.hasStarted = false

        this.isPaused = this.keys.esc.pressed

        window.addEventListener('beforeunload', function (event) {
            event.preventDefault()
            return (event.returnValue = "")
        })

        window.addEventListener('keydown', this.keydownEvent.bind(this))
    }

    handleCanvasClick(event) {
        if (!this.isPaused) {
            this.canvasClickCordinates = { x: event.offsetX, y: event.offsetY }
            this.previousClickCoordinates = { x: event.offsetX, y: event.offsetY }
        }
        
    }

    resetClickCoordinates() {
        this.canvasClickCordinates = { x: 0, y: 0 }
    }

    keydownEvent(e) {
        switch (e.key) {
            case 'Escape' :
                this.keys.esc.pressed = (this.hasStarted) ? !this.keys.esc.pressed : false
                this.isPaused = (this.hasStarted) ? !this.isPaused : false
                break
        }
    }

    keyupEvent(e) {
        switch (e.key) {
            
        }
    }
}

class Game extends ActionListener {
    constructor({
        width = 770, 
        height = 600
    }) {
        super()
        this.width = width
        this.height = height
        this.context = this.canvas.getContext('2d')   
        
        this.container = document.querySelector('.container')
        this.playerName = document.getElementById('stats-player-name')
        this.score = document.querySelector('#stats-score span')
        this.sunBoard = document.querySelector('#sun')
        this.timeBoard = document.querySelector('#stats-time span')
        this.countdown = document.querySelector('#start-countdown')
        this.pauseBoard = document.querySelector('.pause')
        this.resumeButton = document.querySelector('.pause button')
        this.resumeButton.addEventListener('click', this.resumeGame.bind(this))

        this.zombieYPositions = [
            100,
            190,
            280,
            370,
            460
        ]
        this.groundSquares = [
            {
                x: 200,
                y: this.zombieYPositions[0]
            }
        ]


        this.second = 0
        this.minute = 0
        this.countdown_second = 3
        this.animate = this.animate.bind(this)
        
        this.countdown_text = [
            'PLANT',
            'SET',
            'READY'
        ]

        this.Background = new Background({
            context: this.context,
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './assets/Sprites/General/Background.jpg',
            imageWidth: this.width,
            imageHeight: this.height
        })

        this.Cart = [...Array(5)].map((_,i) => {
            return new Cart({
                context: this.context,
                position: {
                    x: 0,
                    y: (110*(i+1)) - (i*20)
                },
                imageSrc: './assets/Sprites/General/lawnmowerIdle.gif',
                scale: 0.8
            })
        })

        this.PlantCard = [...Array(4)].map((_,i) => {
            let seeds = [
                {
                    name: 'SunFlowerSeed',
                    price: 50
                },
                {
                    name: 'WallNutSeed',
                    price: 50
                },
                {
                    name: 'PeaShooterSeed',
                    price: 100
                },
                {
                    name: 'IcePeaSeed',
                    price: 175
                }
            ]

            return new PlantCard({
                context: this.context,
                position: {
                    x: 190+(55*i),
                    y: 17
                },
                imageSrc: `./assets/Sprites/Seeds/${seeds[i].name}.png`,
                purchasable: parseInt(this.sunBoard.textContent) >= seeds[i].price,
                container: this.container
            })
        })

        this.Zombies = []
        this.Suns = []

        // this.Zombies = [new Zombie({
        //     context: this.context,
        //     position: {
        //         x: this.width,
        //         y: this.zombieYPositions[Math.round(Math.random() * 5)]
        //     },
        //     imageSrc: './assets/Sprites/Zombie/frame_00_delay-0.05s.gif',
        //     scale: 0.7
        // })]

        // this.Suns = [new Sun({
        //     context: this.context,
        //     position: {
        //         x: Math.round(Math.random() * (this.width - 92)),
        //         y: -95
        //     },
        //     imageSrc: './assets/Sprites/General/Sun.png',
        //     scale: 0.7
        // })]

        this.Shovel = new Shovel({
            context: this.context,
            position: {
                x: 610,
                y: 12
            },
            imageSrc: `./assets/Sprites/General/Shovel.png`,
            scale: 0.55
        })
    }

    draw() {
        if (sessionStorage.getItem('username') === null) document.location.href = 'index.html'
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.playerName.innerHTML = sessionStorage.getItem('username')
        this.score.innerHTML = 0
        this.timeBoard.innerHTML = `${String(this.minute).padStart(2,'0')}:${String(this.second).padStart(2,'0')}`

        this.setCountDown()

        setTimeout(() => {
            this.startTime()
            this.generateZombies()
            this.generateSuns()
        }, 4000)

        this.context.rect(this.groundSquares[0].x, this.groundSquares[0].y, 100,100)
        this.context.stroke()
    }

    startTime() {
        setInterval(() => {
            if (!this.isPaused) {
                this.timeBoard.innerHTML = `${String(this.minute).padStart(2,'0')}:${String(this.second).padStart(2,'0')}`
                if (this.second >= 59) {
                    this.second = 0
                    this.minute++
                }
                else this.second++
            }
        }, 1000)
    }

    setCountDown() {
        setInterval(() => {
            if (this.countdown_second === 0) {
                setTimeout(() => {
                    this.countdown.remove()
                    this.hasStarted = true
                    clearInterval()
                }, 500)
            } else {
                this.countdown.innerHTML = ''
                let text = document.createElement('img')
                text.src = `./assets/Sprites/General/${this.countdown_text[this.countdown_second - 1]}.png`
                text.width = this.countdown_second === 1 ? 700 : 350

                this.countdown.appendChild(text)
                this.countdown_second--
            }
        }, 1000)
    }

    generateZombies() {
        setInterval(() => {
            this.Zombies.push(
                new Zombie({
                    context: this.context,
                    position: {
                        x: this.width,
                        y: this.zombieYPositions[Math.round(Math.random() * 5)]
                    },
                    imageSrc: './assets/Sprites/Zombie/frame_00_delay-0.05s.gif',
                    scale: 0.7
                })
            )
        }, 7000)
    }

    generateSuns() {
        setInterval(() => {
            this.Suns.push(new Sun({
                context: this.context,
                position: {
                    x: Math.round(Math.random() * (this.width - 92)),
                    y: -95
                },
                imageSrc: './assets/Sprites/General/Sun.png',
                scale: 0.7
            }))
        }, 8000)
    }

    removeElapsedSun() {
        for (const sun of this.Suns) {
            if (sun.position.y > this.height) {
                this.Suns.shift()
            }
        }
    }

    collectSun() {
        this.Suns.forEach((sun, index) => {
            let width = sun.image.width * sun.scale
            let height = sun.image.height * sun.scale
            let x = sun.position.x
            let y = sun.position.y

            if ((this.canvasClickCordinates.y >= y && this.canvasClickCordinates.y <= (y + height) ) && (this.canvasClickCordinates.x >= x && this.canvasClickCordinates.x <= (x + width) )) {
                this.Suns.splice(index,1)
                this.resetClickCoordinates()
                this.updateSun(50)
            }
        })
    }

    updateSun(sun) {
        this.sunBoard.innerHTML = parseInt(this.sunBoard.textContent) + sun
    }

    updateScore(score) {
        this.score.innerHTML = this.score.value + score
    }

    resumeGame() {
        this.keys.esc.pressed = false
        this.isPaused = false
    }

    // checkSelectedPlantCard() {
    //     this.PlantCard.forEach(plant => {
    //         if (plant.checkIsSelected(this.canvasClickCordinates)) {
    //             plant.select()
    //             this.resetClickCoordinates()
    //         }
    //     })
    // }

    moveCart() {
        this.Zombies.forEach(zombie => {
            if (this.checkZombieCollision(zombie,this.Cart[this.zombieYPositions.indexOf(zombie.position.y)],-10)) {
                this.Cart[this.zombieYPositions.indexOf(zombie.position.y)].move()
            }
        })
    }

    checkZombieCollision(zombie, cart, distance = 0) {
        return (
            zombie.position.x + distance <= (cart.position.x + cart.image.width) && zombie.position.x + distance >= cart.position.x
        ) 
    }

    checkZombieCollidesCart() {
        this.Zombies.forEach(zombie => {
            const cart = this.Cart[this.zombieYPositions.indexOf(zombie.position.y)]
            if (this.checkZombieCollision(zombie, cart, 40) && cart.velocity > 0) {
                this.removeCollidedZombie(zombie)
            }
        })
    }

    removeCollidedZombie(zombie) {
        this.Zombies.splice(this.Zombies.indexOf(zombie), 1)
    }

    animate() {
        window.requestAnimationFrame(this.animate)

        if (this.isPaused) {
            this.pauseBoard.style.display = 'block'
        }
        else {
            this.pauseBoard.style.display = 'none'
            this.context.fillStyle = 'black'
            this.context.fillRect(0,0,this.canvas.width,this.canvas.height)

            this.Background.update()

            this.Shovel.update()

            this.Cart.forEach(cart => {
                cart.update()
            })

            this.PlantCard.forEach(plant => {
                plant.update()
                if (
                    plant.checkIsSelected(this.canvasClickCordinates) ||
                    plant.checkIsSelected(this.previousClickCoordinates) 
                ) {
                    // this.PlantCard.forEach(p => p.removeSelection())
                    plant.setSelected(true)
                } else {
                    plant.setSelected(false)
                }
            })

            this.Zombies.forEach(zombie => {
                zombie.update()
            })

            this.Suns.forEach(sun => {
                sun.update()
            })

            this.removeElapsedSun()
            this.collectSun()
            this.moveCart()
            this.checkZombieCollidesCart()
        }
    }
}


