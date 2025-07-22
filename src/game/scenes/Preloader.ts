import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');
        this.load.image('room', 'roomWithoutDoors.png');
        this.load.image('doors', 'doors.png');
        this.load.image('doorsOpen', 'doorsOpen.png');
        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
        this.load.spritesheet('carlos', 'carlos2.png', {
            frameWidth: 100,
            frameHeight: 192
        })
    }

    async create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        
        await document.fonts.ready

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
            frames: this.anims.generateFrameNumbers('carlos', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'carlos', frame: 0 }],
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'near',
            frames: this.anims.generateFrameNumbers('carlos', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Room');
    }
}
