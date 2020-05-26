class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene"); 
    }

    preload(){
        // loads background music
        this.load.audio('BGMusic',"./assets/BGMusic.mp3");
    }
    create() {
        //add the coral reef background image
        this.add.image(centerX, centerY, "corals");
        //add the pufferfish sprite at top of screen and scale it down 
        this.puffer= this.add.sprite(480, 0, "pufferFish").setOrigin(0,0).setScale(0.7);
        //add play and select button sprites w/ physics and make them interactive with mouse controls
        let playbutton= this.physics.add.sprite(centerX, 380, "play").setInteractive();
        let selectbutton= this.physics.add.sprite(657, 466, "select").setInteractive().setScale(0.8);//scale down to play button size
        //Add main Title text above selection buttons
        //this.add.text(100, 165, "Pufferfish Misadventures", {fontFamily: "Cursive", fontSize: "92px", color: "#FF7F50", stroke: "#1565c0", strokeThickness:20});
        this.add.image(centerX, 250, "Title").setScale(2);
        //fixed scope issue with 'this'
        const self= this;
        //resize the collision box of playbutton
        playbutton.body.setSize(playbutton.width/2.5, playbutton.height/5).setOffset(100,80);
        //resize the collision box of select button
        selectbutton.body.setSize(selectbutton.width/1.5, selectbutton.height/3).setOffset(59,80);
        //lower opacity alpha of play button and play blip sound effect when mouse cursor is over it 
        playbutton.on('pointerover',function(pointer){
            playbutton.setAlpha(0.3);
            self.sound.play("blip");
        })
        //set alpha of play button to its normal setting and no sound effect once mouse pointer is away from it
        playbutton.on('pointerout',function(pointer){
            playbutton.setAlpha(1);
        })
        //lower opacity alpha of level select button and play blip sound effect when mouse cursor is over it
        selectbutton.on('pointerover',function(pointer){
            selectbutton.setAlpha(0.3);
            self.sound.play("blip");
        })
        //set alpha of select button to its normal setting and no sound effect once mouse pointer is away from it
        selectbutton.on('pointerout',function(pointer){
            selectbutton.setAlpha(1);
        })
        //created event where mouse clicked on play button transitions to the next scene
        playbutton.on('pointerdown',function(pointer){
            self.scene.start("tutorialTransition");
        })
        //created event where mouse clicked on level select button transitions to the next scene
        selectbutton.on('pointerdown',function(pointer){
            self.music.stop();
            self.scene.start("levelSelectScene");
        })
        //add separate bubble sprites into the menu scene so that they lie on top of one another
        this.bubble = this.add.sprite(1050, 120, 'bubbles', 'bubble1');
        this.bubble2= this.add.sprite(1000, 350, 'bubbles', 'bubble1');
        this.bubble3= this.add.sprite(900, 600, 'bubbles', 'bubble1');
        //create the bubble float animation from spritesheet and atlas frames
        this.anims.create({ 
            key: 'float', 
            frames: this.anims.generateFrameNames('bubbles', {      
                prefix: 'bubble',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 4,
            repeat: -1 
        });

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

    }

    update(){
        //play each individual float animation for every frame
        this.bubble.anims.play("float", true);
        this.bubble2.anims.play("float", true);
        this.bubble3.anims.play("float", true);
        
    }
}
