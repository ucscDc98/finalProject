class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {


    }
    create() {
        this.i = 0;
        this.j = 0;
        this.levelComplete = false;
        //some parameters
        this.gameOver = false;
        this.pufferFishShape = 'normal';
        // background
        this.add.image(0, 0, 'tutorialBG').setScale(9);

        
        //temporary timer for water level decrement 
        this.initialTime = 180;         //5 minutes for test
        timeText = this.add.text(1200, -300, 'Water Level: ' + this.formatTime(this.initialTime)).setScale(3).setScrollFactor(0);
        // Each 1000 ms call onEvent
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });


        // pufferfish speed and sprite setup
        this.pufferFishVelocity = 500;
        this.arrowKeys = this.add.sprite(game.config.width/2 + 700, game.config.height/2 + 700, 'arrowKeys').setScale(0.75); 

        this.pufferFish = this.physics.add.sprite(centerX, centerY + 700, 'pufferFish').setScale(0.6);
        this.pufferFish.body.setOffset(4,4);
        //this.pufferFish.setImmovable();

        this.goal = this.physics.add.sprite(6500, 1200, 'cageG').setScale(0.5);
        this.chain = this.physics.add.sprite(6500, 900, 'chain');
        this.shark = this.physics.add.sprite(6000, 1300, 'shark');
        this.sharkVel = 200;

        this.shark.body.setVelocityX(this.sharkVel).setSize(this.shark.width, this.shark.height/2);
        this.shark.setImmovable();

        //this.stone1 = this.physics.add.sprite(300, 300, 'stone1');
        this.stone3 = this.physics.add.sprite(3200, 2150, 'stone3').setSize(100,200).setScale(4);
        this.stone3.rotation = Math.PI/2*3;
        this.stone3a = this.physics.add.sprite(3000, 100, 'stone3').setSize(100,200).setScale(4);
        this.stone3a.rotation = Math.PI/2*3;
        this.stone3c = this.physics.add.sprite(3700, 1400, 'stone3').setSize(100, 200).setScale(4);
        this.stone3c.rotation = Math.PI/2;
        this.stone3b = this.physics.add.sprite(3400, 900, 'stone3').setScale(4);
        this.stone4 = this.physics.add.sprite(3000, 800, 'stone4').setScale(2);
        this.stone5 = this.physics.add.sprite(3000, 1500, 'stone5').setScale(2);

        // anchors
        this.anchor1 = this.physics.add.sprite(4000, 500, 'anchor').setScale(4);
        this.anchor1.body.setVelocityY(300);
        this.anchor2 = this.physics.add.sprite(4340, 500, 'anchor').setScale(4);
        this.anchor2.body.setVelocityY(300);
        this.anchor3 = this.physics.add.sprite(4670, 500, 'anchor').setScale(4);
        this.anchor3.body.setVelocityY(300);
        this.anchor4 = this.physics.add.sprite(5000, 500, 'anchor').setScale(4);
        this.anchor4.body.setVelocityY(300);

        this.stone5.body.immovable = true;
        this.stone4.body.immovable = true;
        this.stone3.body.immovable = true;
        this.stone3a.body.immovable = true;
        this.stone3b.body.immovable = true;
        this.stone3c.body.immovable = true;
        //have the keyboard UI sprites follow with the camera by setting their scroll factor
        this.key1 = this.add.sprite(-600, -350, 'key1').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key2 = this.add.sprite(-280, -350, 'key2').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key3 = this.add.sprite(30, -350, 'key3').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key4 = this.add.sprite(350, -350, 'key4').setScale(2).setOrigin(0).setScrollFactor(0);
        
        //camera setup and world bounds setup
        //https://phaser.io/examples/v3/view/camera/follow-offset
        //set camera and world bounds to double the size of the background image
        this.cameras.main.setBounds(0, 0, 1920*5, 1080*2);
        this.physics.world.setBounds(0, 0, 1920*5, 950*2);
        //set up pufferfish colliision with world bounds 
        this.pufferFish.setCollideWorldBounds(true);
        //set zoom 
        this.cameras.main.setZoom(0.4);
        //have camera follow pufferfish and offset it
        this.cameras.main.startFollow(this.pufferFish, true, 0.1, 0.1);
        this.cameras.main.followOffset.set(-300, 0);
        
        // control configs
        cursors = this.input.keyboard.createCursorKeys();
        this.keyboard1 = this.input.keyboard.addKey("ONE");
        this.keyboard2 = this.input.keyboard.addKey("TWO");
        this.keyboard3 = this.input.keyboard.addKey("THREE");
        this.keyboard4 = this.input.keyboard.addKey("FOUR");

        this.restartKey = this.input.keyboard.addKey('R');

        //create animations for the different states thew pufferfish can change into
        this.anims.create({
            key: 'one',
            frames: this.anims.generateFrameNumbers('pufferFish', { start: 0, end: 0, first: 0}),
            frameRate: 0.5
        });
        this.anims.create({
            key: 'two',
            frames: this.anims.generateFrameNumbers('pufferS', { start: 0, end: 0, first: 0}),
            frameRate: 0.5
        });
        this.anims.create({
            key: 'three',
            frames: this.anims.generateFrameNumbers('pufferLong', { start: 0, end: 0, first: 0}),
            frameRate: 0.5
        });
        this.anims.create({
            key: 'four',
            frames: this.anims.generateFrameNumbers('pufferFat', { start: 0, end: 0, first: 0}),
            frameRate: 0.5
        });
        this.anims.create({
            key: 'sharkSpook',
            frames: this.anims.generateFrameNumbers('sharkS', { start: 0, end: 0, first: 0}),
            frameRate: 0.5
        });

        // colliders
        this.physics.add.collider(this.pufferFish, this.stone5);
        this.physics.add.collider(this.pufferFish, this.stone4);
        this.physics.add.collider(this.pufferFish, this.stone3);
        this.physics.add.collider(this.pufferFish, this.stone3a);
        this.physics.add.collider(this.pufferFish, this.stone3b);
        this.physics.add.collider(this.pufferFish, this.stone3c);

        this.waterLevel = this.add.sprite(0, 0, 'water').setAlpha(0.3).setOrigin(0).setScale(8);

        this.poofSound = this.sound.add("poof");
        this.poofConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        this.tinkSound = this.sound.add("tink");
        this.tinkConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        this.sharkSound = this.sound.add("sharkScream");
        this.sharkConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
    } 

    update() {
        ///////////////////////////////////////////////////////////////
        // anchor physics
        if (this.anchor1.y > 1300) {
            this.anchor1.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor1.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor1.y <= 500) {
            this.anchor1.body.setVelocityY(300);
        }
        if (this.anchor2.y > 1300) {
            this.anchor2.body.setVelocityY(-300);
        }
        if (this.anchor2.y <= 500) {
            this.anchor2.body.setVelocityY(300);
        }
        if (this.anchor3.y > 1300) {
            this.anchor3.body.setVelocityY(-300);
        }
        if (this.anchor3.y <= 500) {
            this.anchor3.body.setVelocityY(300);
        }
        if (this.anchor4.y > 1300) {
            this.anchor4.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor4.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor4.y <= 500) {
            this.anchor4.body.setVelocityY(300);
        }


        this.waterLevel.y += 0.25;
        this.physics.world.setBounds(0, this.waterLevel.y, 1920*5, 2150 - this.waterLevel.y);
        /////////////////////////////////////////////////////////////////////////////////////////
        // keyboard inputs changing size and keypad indicators
        //when key1 is pressed, give it #FACADE tint, clear tint of other UI keys, play animation back to original form and adjust hitbox accordingly
        this.keyboard1.on('down', () => {    
            this.pufferFishShape = 'normal'; 
                      
            this.key1.tint = 0xFACADE;
            this.key2.clearTint();
            this.key3.clearTint();
            this.key4.clearTint();
            
            this.pufferFish.anims.play('one', true);
            this.pufferFishVelocity = 300;
            this.pufferFish.setSize(this.pufferFish.width,this.pufferFish.height);
            this.poofSound.play(this.poofConfig);  
         });
          //when key2 is pressed, give it #FACADE tint, clear tint of other UI keys, play animation for pufferfish's longer form and adjust hitbox accordingly
         this.keyboard2.on('down', () => {   
            this.pufferFishShape = 'normal';              
            this.key2.tint = 0xFACADE;
            this.key1.clearTint();
            this.key3.clearTint();
            this.key4.clearTint();
            this.pufferFish.anims.play('two', true);
            this.pufferFishVelocity = 250;
            this.pufferFish.setSize(420,100).setOffset(4,4);
            this.poofSound.play(this.poofConfig);
         });
          //when key3 is pressed, give it #FACADE tint, clear tint of other UI keys, play animation for pufferfish's skinnier form and adjust hitbox accordingly
         this.keyboard3.on('down', () => {   
            this.pufferFishShape = 'normal';         
            this.key3.tint = 0xFACADE;
            this.key1.clearTint();
            this.key4.clearTint();
            this.key2.clearTint();
            this.pufferFish.anims.play('three', true);
            this.pufferFishVelocity = 250;
            this.pufferFish.setSize(130, 400);
            this.poofSound.play(this.poofConfig);
         });
          //when key4 is pressed, give it #FACADE tint, clear tint of other UI keys, play animation for the fattest pufferfish form and adjust hitbox accordingly
         this.keyboard4.on('down', () => {   
             this.pufferFishShape = 'fat';         
            this.key4.tint = 0xFACADE;
            this.key2.clearTint();
            this.key1.clearTint();
            this.key3.clearTint();
            this.pufferFish.anims.play('four', true);
            this.pufferFishVelocity = 250;
            this.pufferFish.setSize(650,650);
            this.poofSound.play(this.poofConfig);
         });

        ////////////////////////////////////////////////////////////////////////
        // player controls for pufferfish
        if(cursors.up.isDown) {
            this.pufferFish.body.setVelocityY(-this.pufferFishVelocity);
        } else if (cursors.down.isDown) {
            this.pufferFish.body.setVelocityY(this.pufferFishVelocity);
        } else {
            this.pufferFish.body.setVelocityY(0);
        }
        if(cursors.left.isDown) {
            this.pufferFish.body.setVelocityX(-this.pufferFishVelocity);
            this.pufferFish.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.pufferFish.body.setVelocityX(this.pufferFishVelocity);
            this.pufferFish.resetFlip();
        } else {
            this.pufferFish.body.setVelocityX(0);
        }
        //////////////////////////////////////////////////////////////////////////////////
        // shark roaming back and forth
        if (this.shark.x >= 7000) {
            this.shark.body.setVelocityX(-this.sharkVel);
            this.shark.setFlipX(true);
        } else if (this.shark.x <= 6000) {
            this.shark.body.setVelocityX(this.sharkVel);
            this.shark.resetFlip();
        }

        //////////////////////////////////////////////////////////////////////////////////
        // collision detection
        if (this.physics.overlap(this.pufferFish, this.shark)){
            this.gameOver = true;
        }

        if (this.physics.overlap(this.pufferFish, this.anchor1)){
            this.gameOver = true;
        }
        if (this.physics.overlap(this.pufferFish, this.anchor2)){
            this.gameOver = true;
        }

        if (this.physics.overlap(this.pufferFish, this.anchor3)){
            this.gameOver = true;
        }
        if (this.physics.overlap(this.pufferFish, this.anchor4)){
            this.gameOver = true;
        }

        //////////////////////////////////////////////////////////////////////////////////////
        // seeing if the player is able to scare the shark
        if (Math.abs(this.pufferFish.x - this.shark.x) < 1000 && Math.abs(this.pufferFish.y - this.shark.y) < 1000 && this.pufferFishShape == 'fat') {
            this.shark.anims.play('sharkSpook', true);
            this.shark.body.setVelocityY(-300).setSize(this.shark.width/2, this.shark.height/2);
            if(this.j == 0) {
                this.sharkSound.play(this.sharkConfig);
            }
            this.j++;
        }

        // player reaching the goal check
        if(this.physics.overlap(this.pufferFish, this.goal)) {
            this.goal.body.setVelocityY(-300);
            this.chain.body.setVelocityY(-300);
        }

        // if the cage goes up to the surface the level is completed and the player will later proceed to the next level
        if (this.goal.y <= 0) {
            if (this.i == 0){
                this.add.image(this.pufferFish.x + 1400, this.pufferFish.y - 700, 'textBubble');
            }
            this.i++;
            this.game.sound.stopAll();
            this.clock= this.time.delayedCall(4000, () => {
                this.levelComplete = true;
    
            }, null, this);
   
        }
        if (this.levelComplete == true) {
            this.scene.start('menuScene');
        }

        if (this.gameOver == true) {
            /* this.add.text(this.pufferFish.x + 100, this.pufferFish.y - 400, 'Game Over');
            this.add.text(this.pufferFish.x + 100, this.pufferFish.y - 200, 'Press R to Restart');
            this.scene.pause()
            if (this.scene.isPaused()) {
                this.restartKey.on('down', () => {
                this.scene.start('tutorialScene');
                })
            }
            */
           this.scene.restart();
        }
    }

      //For display timer
      formatTime(seconds){

        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }
    //Time decrement
    onEvent(){
        if(this.initialTime>=1){
            this.initialTime -= 1; // One second
            timeText.setText('Water Level: ' + this.formatTime(this.initialTime));
        }else{
            if (this.levelComplete == false) {
                this.gameOver = true;    // Pause the scene
           }
        }
    }

}
