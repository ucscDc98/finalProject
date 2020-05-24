class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload() {


    }
    create() {
        this.add.image(0, 0, 'level2BG').setScale(20);
        

        this.pufferFishShape = 'normal';
        this.pufferFishVelocity = 400;
        this.pufferFish = this.physics.add.sprite(centerX, centerY + 700, 'pufferFish').setScale(0.6);
        this.pufferFish.body.setOffset(4, 4);

        this.cameras.main.setBounds(0, 0, 1920*5, 1080*2);
        this.physics.world.setBounds(0, 0, 1920*5, 950*2);

        this.pufferFish.setCollideWorldBounds(true);
        this.cameras.main.setZoom(0.4);

        this.cameras.main.startFollow(this.pufferFish, true, 0.1, 0.1);
        this.cameras.main.followOffset.set(-300, 0);

        // control configs
        cursors = this.input.keyboard.createCursorKeys();
        this.keyboard1 = this.input.keyboard.addKey("ONE");
        this.keyboard2 = this.input.keyboard.addKey("TWO");
        this.keyboard3 = this.input.keyboard.addKey("THREE");
        this.keyboard4 = this.input.keyboard.addKey("FOUR");

        // rocks
        this.rock1 = this.physics.add.sprite(2500, 1750, 'rock').setSize(120,310).setScale(3);
        this.rock1.rotation = Math.PI/2*3;
        this.rock1.body.immovable = true;
        this.anchor1 = this.physics.add.sprite(2500, 0, 'anchor').setScale(4);
        this.anchor1.body.setVelocityY(300);


        this.rock2 = this.physics.add.sprite(3100, 1200, 'rock').setSize(120, 310).setScale(3);
        this.rock2.rotation = Math.PI/2*3;
        this.rock2.body.immovable = true;
        this.anchor2 = this.physics.add.sprite(3100, -550, 'anchor').setScale(4);
        this.anchor2.body.setVelocityY(300);

        this.rock3 = this.physics.add.sprite(this.rock2.x + 600, this.rock2.y + this.rock2.height/2, 'rock').setSize(310, 120).setScale(3);
        this.rock3.body.immovable = true;

        this.crate = this.physics.add.sprite(3600, 1800, 'crate').setScale(1.2);
        this.crate.body.immovable = true;
        this.crate1 = this.physics.add.sprite(3600, 2050, 'crate').setScale(1.2);
        this.crate1.body.immovable = true;
        this.crate2 = this.physics.add.sprite(3600, 1550, 'crate').setScale(1.2);
        this.crate2.body.immovable = true;

        //have the keyboard UI sprites follow with the camera by setting their scroll factor
        this.key1 = this.add.sprite(-600, -350, 'key1').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key2 = this.add.sprite(-280, -350, 'key2').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key3 = this.add.sprite(30, -350, 'key3').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key4 = this.add.sprite(350, -350, 'key4').setScale(2).setOrigin(0).setScrollFactor(0);


        this.water = this.physics.add.sprite(this.crate.x + this.crate.width + 50, this.crate.y, 'waterPickup').setScale(0.5);

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

        this.physics.add.collider(this.pufferFish, this.rock1);
        this.physics.add.collider(this.pufferFish, this.rock2);
        this.physics.add.collider(this.pufferFish, this.crate);
        this.physics.add.collider(this.pufferFish, this.crate1);
        this.physics.add.collider(this.pufferFish, this.crate2);
    
    } 

    update() {
        this.waterLevel.y += .5;
        if (this.physics.overlap(this.pufferFish, this.water)) {
            this.water.destroy();
            this.waterLevel.y -= 50;
        }

        this.physics.world.setBounds(0, this.waterLevel.y, 1920*5, 2150 - this.waterLevel.y);

        if (this.checkCollision(this.pufferFish, this.crate) && this.pufferFishShape === 'fat') {
            this.crate.destroy();
        }
        if (this.checkCollision(this.pufferFish, this.crate1) && this.pufferFishShape === 'fat') {
            this.crate1.destroy();
        }
        if (this.checkCollision(this.pufferFish, this.crate2) && this.pufferFishShape === 'fat') {
            this.crate1.destroy();
        }
        ///////////////////////////////////////////////////////////////
        // paused menu
        if(Phaser.Input.Keyboard.JustDown(keySpace)){
            pauseScene = "level1Scene";
            this.scene.pause();
            this.scene.launch('pauseScene');
        }

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


        if (this.levelComplete == true) {
            this.scene.start('level2Transition');
        }

        if (this.anchor1.y > 350) {
            this.anchor1.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor1.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor1.y <= -100) {
            this.anchor1.body.setVelocityY(300);
        }
        
        if (this.anchor2.y > -200) {
            this.anchor2.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor2.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor2.y <= -700) {
            this.anchor2.body.setVelocityY(300);
        }
        if (this.physics.overlap(this.pufferFish, this.anchor1)){
            this.gameOver = true;
        }
        if (this.physics.overlap(this.pufferFish, this.anchor2)){
            this.gameOver = true;
        }

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

        if (this.waterLevel.y == 2150) {
            this.gameOver = true;
        }

        if (this.gameOver == true) {
            this.scene.start('level1Scene');
        }
    }

    checkCollision(puff, crate) {
        if (puff.x < crate.x + crate.width && 
            puff.x + puff.width > crate.x && 
            puff.y < crate.y + crate.height &&
            puff.height + puff.y > crate.y) {
                return true;
        } else {
            return false;
        }
    }
}
