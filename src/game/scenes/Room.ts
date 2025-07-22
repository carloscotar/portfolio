import {Scene} from "phaser";

export class Room extends Scene {
    background: Phaser.GameObjects.Image;
    doors: Phaser.GameObjects.Image;
    roomText: Phaser.GameObjects.Text;
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    triggerZone: Phaser.GameObjects.Zone;
    OpenDoor: Phaser.GameObjects.Rectangle;
    
    constructor() {
        super('Room');
    }
    
    create() {
        this.background = this.add.image(0, 0, 'room');
        this.background.setOrigin(0, 0);

        const doors = {
            x: 1071,
            y: 234,
            width: 128,
            height: 512
        }

        this.doors = this.add.image(doors.x * 0.5, doors.y * 0.5, 'doors').setOrigin(0, 0);

        this.physics.world.setBounds(0,0, this.background.width * 0.5, this.background.height * 0.5);

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.camera = this.cameras.main;

        this.camera.setBackgroundColor(0x00000);
        this.player = this.physics.add.sprite(0, 512, 'carlos');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(1.2);
        if (this.player.body) {
            this.player.body.onOverlap = true
        }

        this.player.setDepth(100)
        const doorWidth = 16;
        const doorHeight = this.background.height * 0.5;
        const doorOffset = 128;
        const doorX = this.background.width * 0.5 - doorWidth - doorOffset;

        const doorY = 512;
        
        const doorTrigger = {
            x: this.background.width * 0.5 - doorWidth - 128,
            y: 512,
            width: 16,
            height: this.background.height * 0.5,
        }
        
        this.triggerZone = this.add.zone(doorTrigger.x, doorTrigger.y, doorTrigger.width, doorTrigger.height)

        this.physics.world.enable(this.triggerZone);
        (this.triggerZone.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        (this.triggerZone.body as Phaser.Physics.Arcade.Body).setImmovable(true);
        
        this.physics.add.overlap(this.player, this.triggerZone, () => {
            this.doors.setTexture('doorsOpen');
            if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                this.changeScene();
            }
        })
        
        
        const gameWidth = this.scale.width
        const gameHeight = this.scale.height;
        const scale = gameHeight / this.background.height
        this.background.setScale(scale);
        this.doors.setScale(scale);

        this.roomText = this.add.text(10, 10, 'Welcome to the Room! \n' +
            'Use arrow keys to move, \n' +
            '\'space\' to go through doors', {
            fontFamily: 'Pixelify Sans',
            fontSize: 28,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'left'
        }).setOrigin(0,0).setDepth(100);
        
        this.events.emit('current-scene-ready', this);
        this.scale.on('resize', this.resize, this);
    }
    
    update(time: number, delta: number) {
        super.update(time, delta);
        
        if (this.doors.texture.key === 'doorsOpen' && !this.physics.world.overlap(this.player, this.triggerZone)) {
            this.doors.setTexture('doors');
        }
        
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.player.anims.play('idle', true);
            this.player.anims.stop()    
        }
    }

    resize(gameSize: { width: number, height: number }) {
        const { width, height } = gameSize;
        const scale = height / this.background.height;
        if (this.background && this.doors) {
            this.background.setScale(scale);
            this.background.setPosition(0, 0);
            this.doors.setScale(scale);
        }
    }
    
    changeScene() {
        this.scene.start('MainMenu');
    }
}