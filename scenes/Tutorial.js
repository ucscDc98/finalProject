class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {


    }
    create() {
        this.i = 0;
        this.j = 0;
        this.k = 0;
        this.levelComplete = false;
        //some parameters
        this.gameOver = false;
        this.pufferFishShape = 'normal';
        // background
        this.add.image(0, 0, 'tutorialBG').setScale(12);

        //temporary timer for water level decrement 
        this.initialTime = 143;         //2 min. 23 sec.
        //timeText = this.add.text(1200, -300, 'Water Level: ' + this.formatTime(this.initialTime)).setScale(3).setScrollFactor(0);
        // Each 1000 ms call onEvent
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });


        // pufferfish speed and sprite setup
        this.pufferFishVelocity = 400;
        this.arrowKeys = this.add.sprite(game.config.width/2 + 700, game.config.height/2 + 700, 'arrowKeys').setScale(0.75); 
        this.add.image(2100, 1325, 'arrow');//add arrow showing where the player is to move
        this.water = this.physics.add.sprite(4275, 1750, 'waterPickup').setScale(0.5);
        this.water1 = this.physics.add.sprite(4615, 1500, 'waterPickup').setScale(0.5);
        this.water0 = this.physics.add.sprite(centerX + 1500, centerY, 'waterPickup').setScale(0.5);
        this.water2 = this.physics.add.sprite(4955, 1250, 'waterPickup').setScale(0.5);

        this.pufferFish = this.physics.add.sprite(centerX, centerY + 700, 'pufferFish').setScale(0.6);
        this.pufferFish.body.setOffset(4,4);
        //this.pufferFish.setImmovable();

        this.goal = this.physics.add.sprite(6500, 1200, 'cageG').setScale(0.5);
        this.chain = this.physics.add.sprite(6500, 900, 'chain');
        this.shark = this.physics.add.sprite(6000, 1300, 'shark');
        this.sharkVel = 200;
        this.add.image(6500, 1700, 'scareShark').setScale(4);
        this.shark.body.setVelocityX(this.sharkVel).setSize(this.shark.width, this.shark.height/2);
        this.shark.setImmovable();

        //this.stone1 = this.physics.add.sprite(300, 300, 'stone1');
        //bottom front
        this.stone3 = this.physics.add.sprite(2675, 2150, 'rock').setSize(125,300).setScale(4);
        this.stone3.rotation = Math.PI/2*3;
        // top front
        this.stone3a = this.physics.add.sprite(2500, 650, 'rock').setSize(100,310).setScale(4);
        this.stone3a.rotation = Math.PI/2*3;
        this.stone3c = this.physics.add.sprite(3300, 1200, 'rock').setSize(120, 300).setScale(4);
        this.stone3c.rotation = Math.PI/2;
        this.stone3b = this.physics.add.sprite(3400, 800, 'rock').setScale(4);
        //this.stone4 = this.physics.add.sprite(3000, 800, 'rock').setScale(2);
        this.stone5 = this.physics.add.sprite(2600, 1500, 'rock').setScale(2);

        // anchors in equidistant positions
        this.anchor1 = this.physics.add.sprite(4100, 500, 'anchor').setScale(4);
        this.anchor1.body.setVelocityY(300);
        this.anchor2 = this.physics.add.sprite(4440, 500, 'anchor').setScale(4);
        this.anchor2.body.setVelocityY(300);
        this.anchor3 = this.physics.add.sprite(4780, 500, 'anchor').setScale(4);
        this.anchor3.body.setVelocityY(300);
        this.anchor4 = this.physics.add.sprite(5120, 500, 'anchor').setScale(4);
        this.anchor4.body.setVelocityY(300);

        this.stone5.body.immovable = true;
        //this.stone4.body.immovable = true;
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
        
        //add groovy kelp to bottom of screen equidistant to form a kelp bed
        this.kelp1 = this.add.sprite(100, 2100, 'kelp').setScale(2);
        this.kelp2 = this.add.sprite(450, 2100, 'kelp').setScale(2);
        this.kelp3 = this.add.sprite(800, 2100, 'kelp').setScale(2);
        this.kelp4 = this.add.sprite(1150, 2100, 'kelp').setScale(2);
        this.kelp5 = this.add.sprite(1500, 2100, 'kelp').setScale(2);
        this.kelp6 = this.add.sprite(1850, 2100, 'kelp').setScale(2);
        this.kelp7 = this.add.sprite(2200, 2100, 'kelp').setScale(2);

        


        // control configs
        cursors = this.input.keyboard.createCursorKeys();
        this.keyboard1 = this.input.keyboard.addKey("ONE");
        this.keyboard2 = this.input.keyboard.addKey("TWO");
        this.keyboard3 = this.input.keyboard.addKey("THREE");
        this.keyboard4 = this.input.keyboard.addKey("FOUR");

        this.restartKey = this.input.keyboard.addKey('R');
        
        // Starting animation for the player
        this.anims.create({
            key: "pufferFish_anim",
            frames: this.anims.generateFrameNumbers("pufferFish"),
            framerate: 0.5, // BUG?: Can't changed the framerate. He's a speedy boi
            repeat: -1
        });
        this.pufferFish.play("pufferFish_anim");

        //create animations for the different states the pufferfish can change into        
        this.anims.create({
            key: 'one',
            frames: this.anims.generateFrameNumbers('pufferFish'),
            frameRate: 10, // BUG: Game crashes if exceeds this framerate. Theory?: Overlaps in animations maybe.
            repeat: -1
        });
        this.anims.create({
            key: 'two',
            frames: this.anims.generateFrameNumbers('pufferLong'),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'three',
            frames: this.anims.generateFrameNumbers('pufferTall'),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'four',
            frames: this.anims.generateFrameNumbers('pufferFat'),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'sharkSpook',
            frames: this.anims.generateFrameNumbers('sharkS', { start: 0, end: 0, first: 0}),
            frameRate: 0.5
        });

        this.anims.create({
            key: 'kelpdance',
            frames: this.anims.generateFrameNumbers('kelp', { start: 0, end: 2, first:0}),
            frameRate: 5
        })
        // colliders
        this.physics.add.collider(this.pufferFish, this.stone5);
        //this.physics.add.collider(this.pufferFish, this.stone4);
        this.physics.add.collider(this.pufferFish, this.stone3);
        this.physics.add.collider(this.pufferFish, this.stone3a);
        this.physics.add.collider(this.pufferFish, this.stone3b);
        this.physics.add.collider(this.pufferFish, this.stone3c);
        this.physics.add.collider(this.pufferFish, this.arrow);

        this.waterLevel = this.physics.add.sprite(0, 0, 'water').setAlpha(0.3).setOrigin(0).setScale(12);

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
        // for pause menu
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.text(-600, -500, 'Press (SPACE) to pause').setScale(3).setScrollFactor(0);
    } 

    update() {

        //play wavy kelp animations
        this.kelp1.anims.play('kelpdance', true);
        this.kelp2.anims.play('kelpdance', true);
        this.kelp3.anims.play('kelpdance', true);
        this.kelp4.anims.play('kelpdance', true);
        this.kelp5.anims.play('kelpdance', true);
        this.kelp6.anims.play('kelpdance', true);
        this.kelp7.anims.play('kelpdance', true);
       
        ///////////////////////////////////////////////////////////////
        // paused menu
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            pauseScene = "tutorialScene";
            this.scene.pause();
            this.scene.launch('pauseScene');
        }
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

        this.waterLevel.y += 0.3;
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
            this.pufferFishVelocity = 400;
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
        if (this.physics.overlap(this.pufferFish, this.water)) {
            this.water.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water1)) {
            this.water1.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water0)) {
            this.water0.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water2)) {
            this.water2.destroy();
            this.waterLevel.y -= 50;
        }

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
            if (this.k == 0) {
                   this.text= this.add.image(this.goal.x - 250, this.goal.y, 'textBubble').setScale(2);
            }
            this.k++;
        }

        // if the cage goes up to the surface the level is completed and the player will later proceed to the next level
        if (this.goal.y <= 0) {
            this.game.sound.stopAll();
            timedEvent.paused= true;
            this.clock= this.time.delayedCall(7000, () => {
                this.levelComplete = true;
    
            }, null, this);
   
        }
        if (this.levelComplete == true) {
            this.scene.start('level1Transition');
        }

        if (this.waterLevel.y == 2150) {
            this.gameOver = true;
        }
        if (this.gameOver == true) {

           this.scene.start('tutorialScene');
        }
    }


    

}
