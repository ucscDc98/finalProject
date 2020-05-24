class tutorialLoad extends Phaser.Scene {
    constructor() {
        super("tutorialTransition");
    }

    preload() {


    }
    create() {
        this.add.image(centerX, centerY, 'tutorialTrans');

        this.levelSound = this.sound.add("levelStart");
        this.levelConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        
        this.levelSound.play(this.levelConfig);
        this.timer= this.time.delayedCall(1500, () => {
           
            this.scene.start("tutorialScene");

        }, null, this);
    }

    update() {

    }
}