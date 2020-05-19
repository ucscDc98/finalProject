class PauseMenu extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }
    preload() {
        this.load.path = "./assets/";
        //load all necessary assets
        this.load.image("resume", "resumeButton.png");
        this.load.image("restart", "restartButton.png");
        this.load.image("Pbackground", "pauseBackground.png");

    }
    create() {
        console.log("play pause");
        this.add.image(centerX, centerY, "Pbackground").setScale(2);
        const self= this;
        let resumeButton= this.physics.add.sprite(centerX, centerY-50, "resume").setInteractive().setScale(2);
        let restartButton= this.physics.add.sprite(centerX, centerY+100, "restart").setInteractive().setScale(2);
        
        resumeButton.body.setSize(resumeButton.width/2.5, resumeButton.height/5).setOffset(100,80);
        restartButton.body.setSize(restartButton.width/2.5, restartButton.height/5).setOffset(100,80);
        
        resumeButton.on('pointerover',function(pointer){
            resumeButton.setAlpha(0.7);
            self.sound.play("blip");
        })
        restartButton.on('pointerover',function(pointer){
            restartButton.setAlpha(0.7);
            self.sound.play("blip");
        })

        resumeButton.on('pointerout',function(pointer){
            resumeButton.setAlpha(1);
        })
        restartButton.on('pointerout',function(pointer){
            restartButton.setAlpha(1);
        })

        resumeButton.on('pointerdown',function(pointer){
            self.scene.resume('tutorialScene');
            self.scene.stop();
        })
        restartButton.on('pointerdown',function(pointer){
            self.scene.stop();
            self.scene.start('tutorialScene');
        })
    } 

}

