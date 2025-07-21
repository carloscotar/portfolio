import {Scene} from "phaser";

export class Room extends Scene {
    background: Phaser.GameObjects.Image;
    roomText: Phaser.GameObjects.Text;
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    triggerZone: Phaser.GameObjects.Zone;
    
    constructor() {
        super('Room');
    }
    
    create() {
        this.background = this.add.image(0, 0, 'room');
        this.background.setOrigin(0, 0);
        
        this.physics.world.setBounds(0,0, this.background.width * 0.5, this.background.height * 0.5);
        
        this.cursors = this.input.keyboard!.createCursorKeys();
        
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00000);
        
        this.player = this.physics.add.sprite(0, 512, 'carlos');
        this.player.setCollideWorldBounds(true);
        this.player.setOrigin(0, 0);
        this.player.setScale(1.2);
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('carlos', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        })
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('carlos', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'far',
            frames: this.anims.generateFrameNumbers('carlos', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'carlos', frame: 0 }],
            frameRate: 10,
            repeat: -1
        })
        
        const doorWidth = 64;
        const doorHeight = this.background.height * 0.5;
        const doorX = this.background.width * 0.5 - doorWidth;
        const doorY = 512;
        
        this.triggerZone = this.add.zone(doorX, doorY, doorWidth, doorHeight).setOrigin(0,0)
        
        this.physics.world.enable(this.triggerZone);
        (this.triggerZone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        (this.triggerZone.body as Phaser.Physics.Arcade.Body).setImmovable(true);
        
        this.physics.add.overlap(this.player, this.triggerZone, () => {
            
        })
        
        
        const gameWidth = this.scale.width
        const gameHeight = this.scale.height;
        const scale = gameHeight / this.background.height
        this.background.setScale(0.5);

        this.roomText = this.add.text(0, 0, 'Welcome to the Room!', {
            fontFamily: 'Arial Black',
            fontSize: 38,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Emit an event when the scene is ready
        this.events.emit('current-scene-ready', this);
        // this.scale.on('resize', this.resize, this);
    }
    
    update(time: number, delta: number) {
        super.update(time, delta);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle', true);
            this.player.anims.stop()    
        }
    }

    resize(gameSize: { width: number, height: number }) {
        const { width, height } = gameSize;
        const scale = height / this.background.height;
        if (this.background) {
            this.background.setScale(scale);
            this.background.setPosition(0, 0);
        }
    }
    
    changeScene() {
        this.scene.start('MainMenu');
    }
}