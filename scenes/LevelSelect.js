class LevelSelect extends Phaser.Scene {
    constructor() {
        super("levelSelectScene");
    }

    preload() {


    }
    create() {
        //add the desired background image for level select scene
        this.add.image(centerX, centerY, "LSbackground").setScale(2.1);

        //add the title of the scene at top of the screen
        this.add.text(centerX-330, 30, "SELECT LEVEL", {fontFamily: "Cursive", fontSize: "92px", color: "#FF7F50"});

        //Add all necessary buttons, scale them appropriately, and make them interactive with mouse cursor
        let tutobutton= this.physics.add.sprite(150, centerY, "tutbutton").setInteractive().setScale(2);
        tutobutton.body.setSize(tutobutton.width/2.2, tutobutton.height/4.5).setOffset(103,85);
        let LV1button= this.physics.add.sprite(centerX-100, centerY, "lv1button").setInteractive().setScale(2);
        LV1button.body.setSize(LV1button.width/4, LV1button.height/4.5).setOffset(103,85);
        let LV2button= this.physics.add.sprite(centerX+200, centerY, "lv2button").setInteractive().setScale(2);
        LV2button.body.setSize(LV2button.width/4, LV2button.height/4.5).setOffset(103,85);
        let LV3button= this.physics.add.sprite(centerX+ 500, centerY, "lv3button").setInteractive().setScale(2);
        LV3button.body.setSize(LV3button.width/4, LV3button.height/4.5).setOffset(103,85);

        //fixed scope issue in listeners with this
        const self= this;

        // plays BGMusic in loop
        // feel free to change the config
        this.music = this.sound.add("BGMusic");
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);

        //set alpha of tutorial button to its normal setting and no sound effect once mouse pointer is away from it
        tutobutton.on('pointerover',function(pointer){
           tutobutton.setAlpha(0.3);
            self.sound.play("blip");
        })
        //set alpha of tutorial button to its normal setting and no sound effect once mouse pointer is away from it
        tutobutton.on('pointerout',function(pointer){
            tutobutton.setAlpha(1);
        })
        //lower opacity alpha of level 1 button and play blip sound effect when mouse cursor is over it
        LV1button.on('pointerover',function(pointer){
            LV1button.setAlpha(0.3);
            self.sound.play("blip");
        })
        //set alpha of level 2 button to its normal setting and no sound effect once mouse pointer is away from it
        LV1button.on('pointerout',function(pointer){
            LV1button.setAlpha(1);
        })
        //lower opacity alpha of level 2 button and play blip sound effect when mouse cursor is over it
        LV2button.on('pointerover',function(pointer){
            LV2button.setAlpha(0.3);
            self.sound.play("blip");
        })
        //set alpha of level 2 button to its normal setting and no sound effect once mouse pointer is away from it
        LV2button.on('pointerout',function(pointer){
            LV2button.setAlpha(1);
        })
        //lower opacity alpha of level 3 button and play blip sound effect when mouse cursor is over it
        LV3button.on('pointerover',function(pointer){
            LV3button.setAlpha(0.3);
            self.sound.play("blip");
        })
        //set alpha of level 3 button to its normal setting and no sound effect once mouse pointer is away from it
        LV3button.on('pointerout',function(pointer){
            LV3button.setAlpha(1);
        })

        //created event where mouse clicked on tutorial button transitions to the next scene
        tutobutton.on('pointerdown',function(pointer){
            self.music.stop();
            self.scene.start("tutorialTransition");
        })
        
        
        //created event where mouse clicked on level 1 button transitions to the next scene
        LV1button.on('pointerdown',function(pointer){
            self.music.stop();
            self.scene.start("level1Transition");
        })
       

         //created event where mouse clicked on level 2 button transitions to the next scene
        LV2button.on('pointerdown',function(pointer){
            self.music.stop();
            self.scene.start("level2Transition");
        })
         //created event where mouse clicked on level 3 button transitions to the next scene
        LV3button.on('pointerdown',function(pointer){
            self.music.stop();
            self.scene.start("level3Transition");
        })
        

    } 
}
