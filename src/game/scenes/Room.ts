import {Scene} from "phaser";

export class Room extends Scene {
    background: Phaser.GameObjects.Image;
    roomText: Phaser.GameObjects.Text;
    camera: Phaser.Cameras.Scene2D.Camera;
    
    constructor() {
        super('Room');
    }
    
    create() {
        this.background = this.add.image(0, 0, 'room');
        this.background.setOrigin(0, 0);
        
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00000);
        
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