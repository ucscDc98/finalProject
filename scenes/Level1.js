class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload() {


    }
    create() {

        //some parameters
        this.j = 0;
        this.k = 0;

        this.add.image(0, 0, 'level2BG').setScale(35);
        

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

        // obstacles as group
        this.eel = this.physics.add.sprite(4800, 1600, 'eel').setSize(150,400);
        this.eel.body.setVelocityY(500);
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

        this.rock4 = this.physics.add.sprite(this.rock3.x +1100, this.rock3.y, 'rock').setSize(310, 120).setScale(3);
        this.rock4.body.immovable = true;

        this.rock5 = this.physics.add.sprite(this.rock4.x, 2200, 'rock').setSize(120, 310).setScale(3);
        this.rock5.rotation = Math.PI/2*3;
        this.rock5.body.immovable = true;

        this.crate = this.physics.add.sprite(3600, 1800, 'crate').setScale(1.2);
        this.crate.body.immovable = true;
        this.crate1 = this.physics.add.sprite(3600, 2050, 'crate').setScale(1.2);
        this.crate1.body.immovable = true;
        this.crate2 = this.physics.add.sprite(3600, 1550, 'crate').setScale(1.2);
        this.crate2.body.immovable = true;

        this.rock6 = this.physics.add.sprite(this.rock5.x + 500, 1000, 'rock').setSize(120, 310).setScale(3);
        this.rock6.rotation = Math.PI/2;
        this.rock6.body.immovable = true;
        this.anchor3 = this.physics.add.sprite(this.rock5.x, -550, 'anchor').setScale(4);
        this.anchor3.body.setVelocityY(300);
        
        this.eel1 = this.physics.add.sprite(this.rock6.x+400, 1600, 'eel').setSize(150,400);
        this.eel1.body.setVelocityY(500);
        this.rock7 = this.physics.add.sprite(this.rock6.x + 300, 1950, 'rock').setSize(120, 310).setScale(2).setOrigin(0.5);
        this.rock7.rotation = Math.PI/2*3;
        this.rock7.body.immovable = true;
        this.rock8 = this.physics.add.sprite(this.rock7.x + 280, 2000, 'rock').setSize(120, 310).setScale(3).setOrigin(0.5);
        this.rock8.rotation = Math.PI/2;
        this.rock8.body.immovable = true;

        this.rock9 = this.physics.add.sprite(this.rock6.x + 800, 850, 'rock').setSize(120, 310).setScale(3).setOrigin(0.5);
        this.rock9.rotation = Math.PI/2*3;
        this.rock9.body.immovable = true;

        this.eel2 = this.physics.add.sprite(this.rock9.x + 950, this.rock8.y - 350, 'eel').setSize(400,150);
        this.eel2.rotation = Math.PI/2*3;
        this.eel2.body.setVelocityX(500);
        this.eel3 = this.physics.add.sprite(this.eel2.x + 100, this.eel2.y + 250, 'eel').setSize(400,150);
        this.eel3.rotation = Math.PI/2*3;
        this.eel3.body.setVelocityX(500);
        this.rock10 = this.physics.add.sprite(this.rock9.x + 900, this.rock8.y, 'rock').setSize(310, 120).setScale(2).setOrigin(0.5);
        this.rock10.body.immovable = true;
        this.rock11 = this.physics.add.sprite(this.rock10.x, this.rock10.y - 200, 'rock').setSize(310, 120).setScale(2).setOrigin(0.5);
        this.rock11.body.immovable = true;
        this.rock12 = this.physics.add.sprite(this.rock10.x, this.rock11.y - 200, 'rock').setSize(310, 120).setScale(2).setOrigin(0.5);
        this.rock12.body.immovable = true;
        this.anchor4 = this.physics.add.sprite(this.rock12.x - 240, -550, 'anchor').setScale(4);
        this.anchor4.body.setVelocityY(300);
        this.crate3 = this.physics.add.sprite(this.rock12.x, this.rock12.y - 235, 'crate').setScale(1.2);
        this.crate3.body.immovable = true;
        this.crate4 = this.physics.add.sprite(this.crate3.x, this.crate3.y - 220, 'crate').setScale(1.2);
        this.crate4.body.immovable = true;
        this.crate5 = this.physics.add.sprite(this.crate3.x, this.crate4.y - 220, 'crate').setScale(1.2);
        this.crate5.body.immovable = true;

        this.rock13 = this.physics.add.sprite(this.rock12.x + 300, this.rock12.y - 550, 'rock').setSize(120, 310).setScale(3).setOrigin(0.5);
        this.rock13.rotation = Math.PI/2*3;
        this.rock13.body.immovable = true;

        this.rock14 = this.physics.add.sprite(this.rock13.x + 1600, this.rock13.y - 500, 'rock').setSize(120, 310).setScale(3).setOrigin(0.5);
        this.rock14.rotation = Math.PI/2*3;
        this.rock14.body.immovable = true;
        this.rock15 = this.physics.add.sprite(this.rock14.x, this.rock13.y + 350, 'rock').setSize(120, 310).setScale(3).setOrigin(0.5);
        this.rock15.rotation = Math.PI/2*3;
        this.rock15.body.immovable = true;

        this.anchor5 = this.physics.add.sprite(this.rock12.x + 1000, -600, 'anchor').setScale(4);
        this.anchor5.body.setVelocityY(300);
        this.anchor6 = this.physics.add.sprite(this.anchor5.x + 600, -750, 'anchor').setScale(4);
        this.anchor6.body.setVelocityY(300);

        //sharks at the end
        this.sharkVel = 200;
        this.shark1 = this.physics.add.sprite(this.anchor5.x+60, 1500, 'shark').setOrigin(0.5);
        this.shark1.body.setVelocityX(this.sharkVel).setSize(this.shark1.width, this.shark1.height/2);
        this.shark1.setImmovable();
        this.shark2 = this.physics.add.sprite(this.anchor6.x+50, 1800, 'shark').setOrigin(0.5);
        this.shark2.body.setVelocityX(this.sharkVel).setSize(this.shark2.width, this.shark2.height/2);
        this.shark2.setImmovable();

        //seahorse - finish lane
        this.seahorse = this.physics.add.sprite(this.rock15.x + 400, this.rock15.y + 450, 'seahorse').setOrigin(0.5);
        this.seahorse.setFlipX(true);
        this.seahorse.setImmovable();
        this.anchor7 = this.physics.add.sprite(this.seahorse.x, this.seahorse.y, 'anchor1').setScale(4).setOrigin(0.5);
        this.anchor7.setImmovable(); 

        
        //water bonus
        this.water = this.physics.add.sprite(this.crate.x + this.crate.width + 50, this.crate.y, 'waterPickup').setScale(0.5);
        this.water1 = this.physics.add.sprite(this.anchor2.x + 400, 1000, 'waterPickup').setScale(0.5);
        this.water2 = this.physics.add.sprite(this.rock6.x + 350, this.rock6.y, 'waterPickup').setScale(0.5);
        this.water3 = this.physics.add.sprite(this.rock6.x - 100, this.rock6.y + 1000, 'waterPickup').setScale(0.5);
        this.water4 = this.physics.add.sprite(this.rock9.x + 100, this.rock6.y + 1050, 'waterPickup').setScale(0.5);
        this.water5 = this.physics.add.sprite(this.rock4.x + 100, this.rock4.y - 400, 'waterPickup').setScale(0.5);
        this.water6 = this.physics.add.sprite(this.rock9.x + 350, this.crate5.y, 'waterPickup').setScale(0.5);

        //have the keyboard UI sprites follow with the camera by setting their scroll factor
        this.key1 = this.add.sprite(-600, -350, 'key1').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key2 = this.add.sprite(-280, -350, 'key2').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key3 = this.add.sprite(30, -350, 'key3').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key4 = this.add.sprite(350, -350, 'key4').setScale(2).setOrigin(0).setScrollFactor(0);

        
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

        //collide
        this.physics.add.collider(this.pufferFish, this.rock1);
        this.physics.add.collider(this.pufferFish, this.rock2);
        this.physics.add.collider(this.pufferFish, this.rock3);
        this.physics.add.collider(this.pufferFish, this.rock4);
        this.physics.add.collider(this.pufferFish, this.rock5);
        this.physics.add.collider(this.pufferFish, this.rock6);
        this.physics.add.collider(this.pufferFish, this.rock7);
        this.physics.add.collider(this.pufferFish, this.rock8);
        this.physics.add.collider(this.pufferFish, this.rock9);
        this.physics.add.collider(this.pufferFish, this.rock10);
        this.physics.add.collider(this.pufferFish, this.rock11);
        this.physics.add.collider(this.pufferFish, this.rock12);
        this.physics.add.collider(this.pufferFish, this.rock13);
        this.physics.add.collider(this.pufferFish, this.rock14);
        this.physics.add.collider(this.pufferFish, this.rock15);

        this.physics.add.collider(this.pufferFish, this.crate);
        this.physics.add.collider(this.pufferFish, this.crate1);
        this.physics.add.collider(this.pufferFish, this.crate2);
        this.physics.add.collider(this.pufferFish, this.crate3);
        this.physics.add.collider(this.pufferFish, this.crate4);
        this.physics.add.collider(this.pufferFish, this.crate5);
        
    } 

    update() { 
        //water level bonus
        this.waterLevel.y += .3;
        if (this.physics.overlap(this.pufferFish, this.water)) {
            this.water.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water1)) {
            this.water1.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water2)) {
            this.water2.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water3)) {
            this.water3.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water4)) {
            this.water4.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water5)) {
            this.water5.destroy();
            this.waterLevel.y -= 50;
        }
        if (this.physics.overlap(this.pufferFish, this.water6)) {
            this.water6.destroy();
            this.waterLevel.y -= 50;
        }

        this.physics.world.setBounds(0, this.waterLevel.y, 1920*5, 2150 - this.waterLevel.y);

        //check eel collision
        if (this.physics.overlap(this.pufferFish, this.eel)) {
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.eel1)) {
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.eel2)) {
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.eel3)) {
            this.music.stop();
            this.scene.restart();
        }
    
        //check crate collision
        if (this.physics.collide(this.pufferFish, this.crate) && this.pufferFishShape === 'fat') {
            this.crate.destroy();
        }
        if (this.physics.collide(this.pufferFish, this.crate1) && this.pufferFishShape === 'fat') {
            this.crate1.destroy();
        }
        if (this.physics.collide(this.pufferFish, this.crate2) && this.pufferFishShape === 'fat') {
            this.crate2.destroy();
        }
        if (this.physics.collide(this.pufferFish, this.crate3) && this.pufferFishShape === 'fat') {
            this.crate3.destroy();
        }
        if (this.physics.collide(this.pufferFish, this.crate4) && this.pufferFishShape === 'fat') {
            this.crate4.destroy();
        }
        if (this.physics.collide(this.pufferFish, this.crate5) && this.pufferFishShape === 'fat') {
            this.crate5.destroy();
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

        //anchor animation
        //anchor#1
        if (this.anchor1.y > 350) {
            this.anchor1.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor1.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor1.y <= -100) {
            this.anchor1.body.setVelocityY(300);
        }
        //anchor#2
        if (this.anchor2.y > -200) {
            this.anchor2.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor2.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor2.y <= -700) {
            this.anchor2.body.setVelocityY(300);
        }
        //anchor#3
        if (this.anchor3.y > 200) {
            this.anchor3.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor3.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor3.y <= -700) {
            this.anchor3.body.setVelocityY(300);
        }
        //anchor#4
        if (this.anchor4.y > 500) {
            this.anchor4.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor4.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor4.y <= -700) {
            this.anchor4.body.setVelocityY(300);
        }
        //anchor#5
        if (this.anchor5.y > 600) {
            this.anchor5.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor5.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor5.y <= -700) {
            this.anchor5.body.setVelocityY(300);
        }
        //anchor#6
        if (this.anchor6.y > 500) {
            this.anchor6.body.setVelocityY(-300);
            if (Math.abs(this.pufferFish.x - this.anchor6.x) < 1000) {
                this.tinkSound.play(this.tinkConfig);
            }
        }
        if (this.anchor6.y <= -700) {
            this.anchor6.body.setVelocityY(300);
        }

        //eel animation
        //eel#1
        if (this.eel.y <= 1750) {
            this.eel.body.setVelocityY(0);
            this.time.delayedCall(1000, () => {
                this.eel.body.setVelocityY(500);
            }, null, this);
        }
        if (this.eel.y >= 2200) {
            this.eel.body.setVelocityY(0);
            this.time.delayedCall(1000, () => {
                this.eel.body.setVelocityY(-500);
            }, null, this);
        }
        //eel#2
        if (this.eel1.y <= 1450) {
            this.eel1.body.setVelocityY(0);
            this.time.delayedCall(1000, () => {
                this.eel1.body.setVelocityY(500);
            }, null, this);
        }
        if (this.eel1.y >= 2200) {
            this.eel1.body.setVelocityY(0);
            this.time.delayedCall(1000, () => {
                this.eel1.body.setVelocityY(-500);
            }, null, this);
        }
        //eel#3
        if (this.eel2.x <= this.rock12.x) {
            this.eel2.body.setVelocityX(300);
            this.time.delayedCall(1000, () => {
                this.eel2.body.setVelocityX(300);
            }, null, this);
        }
        if (this.eel2.x >= this.rock12.x-270) {
            this.eel2.body.setVelocityX(300);
            this.time.delayedCall(1000, () => {
                this.eel2.body.setVelocityX(-270);
            }, null, this);
        }
        //eel#4
        if (this.eel3.x <= this.rock12.x) {
            this.eel3.body.setVelocityX(320);
            this.time.delayedCall(1000, () => {
                this.eel3.body.setVelocityX(300);
            }, null, this);
        }
        if (this.eel3.x >= this.rock12.x-280) {
            this.eel3.body.setVelocityX(320);
            this.time.delayedCall(1000, () => {
                this.eel3.body.setVelocityX(-300);
            }, null, this);
        }

        //check collision to restart
        if (this.physics.overlap(this.pufferFish, this.anchor1)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.anchor2)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.anchor3)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.anchor4)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.anchor5)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.anchor6)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.eel)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.eel1)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.eel2)){
            this.music.stop();
            this.scene.restart();
        }
        if (this.physics.overlap(this.pufferFish, this.eel3)){
            this.music.stop();
            this.scene.restart();
        }
        
        //shark aimation
        if (this.shark1.x >= this.anchor5.x+200) {
            this.shark1.body.setVelocityX(-this.sharkVel);
            this.shark1.setFlipX(true);
        } else if (this.shark1.x <= this.anchor5.x-200) {
            this.shark1.body.setVelocityX(this.sharkVel);
            this.shark1.resetFlip();
        }
        if (this.shark2.x >= this.anchor6.x+200) {
            this.shark2.body.setVelocityX(-this.sharkVel);
            this.shark2.setFlipX(true);
        } else if (this.shark2.x <= this.anchor6.x-200) {
            this.shark2.body.setVelocityX(this.sharkVel);
            this.shark2.resetFlip();
        }

        //check scare the shark
        if (Math.abs(this.pufferFish.x - this.shark1.x) < 300 && Math.abs(this.pufferFish.y - this.shark1.y) < 300 && this.pufferFishShape == 'fat') {
            this.shark1.anims.play('sharkSpook', true);
            this.shark1.body.setVelocityY(-300).setSize(this.shark1.width/2, this.shark1.height/2);
            if(this.j == 0) {
                this.sharkSound.play(this.sharkConfig);
            }
            this.j++;
        }else if (Math.abs(this.pufferFish.x - this.shark1.x) < 100 && Math.abs(this.pufferFish.y - this.shark1.y) < 100 && this.pufferFishShape != 'fat'){
            this.music.stop();
            this.scene.restart();
        }
        if (Math.abs(this.pufferFish.x - this.shark2.x) < 500 && Math.abs(this.pufferFish.y - this.shark2.y) < 500 && this.pufferFishShape == 'fat') {
            this.shark2.anims.play('sharkSpook', true);
            this.shark2.body.setVelocityY(-300).setSize(this.shark2.width/2, this.shark2.height/2);
            if(this.j == 0) {
                this.sharkSound.play(this.sharkConfig);
            }
            this.j++;
        }else if (Math.abs(this.pufferFish.x - this.shark2.x) < 100 && Math.abs(this.pufferFish.y - this.shark2.y) < 100 && this.pufferFishShape != 'fat'){
            this.music.stop();
            this.scene.restart();
        }
        
        //goal check
        if(this.physics.overlap(this.pufferFish, this.seahorse)) {
            this.seahorse.resetFlip();
            this.seahorse.body.setVelocityX(300);
            this.anchor7.body.setVelocityY(300);
            if (this.k == 0) {
                   this.text= this.add.image(this.seahorse.x - 100, this.seahorse.y - 100, 'level1Text').setScale(1.5);
            }
            this.k++;
        }
        if (this.seahorse.x >= this.rock15.x + 1000) {
            this.game.sound.stopAll();
            //timedEvent.paused= true;
            this.clock= this.time.delayedCall(5000, () => {
                this.levelComplete = true;
    
            }, null, this);
   
        }
        if (this.levelComplete == true) {
            this.scene.start('level2Transition');
        }

        //game ends
        if (this.waterLevel.y == 2150) {
            this.scene.restart();
        }
        
        //if (this.gameOver == true) {
        //   this.scene.start('level1Scene');
        //}


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

