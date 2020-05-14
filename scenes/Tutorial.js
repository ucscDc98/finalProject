class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    preload() {


    }
    create() {

        // background
        this.add.image(0, 0, 'tutorialBG').setScale(4);

        // pufferfish speed and sprite setup
        this.pufferFishVelocity = 300;

        this.pufferFish = this.physics.add.sprite(centerX, centerY, 'pufferFish').setScale(0.6);
        this.pufferFish.body.setOffset(4,4);
        
        //have the keyboard UI sprites follow with the camera by setting their scroll factor
        this.key1 = this.add.sprite(-600, -350, 'key1').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key2 = this.add.sprite(-280, -350, 'key2').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key3 = this.add.sprite(30, -350, 'key3').setScale(2).setOrigin(0).setScrollFactor(0);
        this.key4 = this.add.sprite(350, -350, 'key4').setScale(2).setOrigin(0).setScrollFactor(0);
        
        //camera setup and world bounds setup
        //https://phaser.io/examples/v3/view/camera/follow-offset
        //set camera and world bounds to double the size of the background image
        this.cameras.main.setBounds(0, 0, 1920*2, 1080*2);
        this.physics.world.setBounds(0, 0, 1920*2, 1080*2);
        //set up pufferfish colliision with world bounds 
        this.pufferFish.setCollideWorldBounds(true);
        //set zoom 
        this.cameras.main.setZoom(0.5);
        //have camera follow pufferfish and offset it
        this.cameras.main.startFollow(this.pufferFish, true, 0.1, 0.1);
        this.cameras.main.followOffset.set(-300, 0);
        
        // control configs
        cursors = this.input.keyboard.createCursorKeys();
        this.keyboard1 = this.input.keyboard.addKey("ONE");
        this.keyboard2 = this.input.keyboard.addKey("TWO");
        this.keyboard3 = this.input.keyboard.addKey("THREE");
        this.keyboard4 = this.input.keyboard.addKey("FOUR");

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

    } 

    update() {
        //when key1 is pressed, give it #FACADE tint, clear tint of other UI keys, play animation back to original form and adjust hitbox accordingly
        this.keyboard1.on('down', () => {            
            this.key1.tint = 0xFACADE;
            this.key2.clearTint();
            this.key3.clearTint();
            this.key4.clearTint();
            this.pufferFish.anims.play('one', true);
            this.pufferFish.setSize(this.pufferFish.width,this.pufferFish.height);
         });
          //when key2 is pressed, give it #FACADE tint, clear tint of other UI keys, play animation for pufferfish's longer form and adjust hitbox accordingly
         this.keyboard2.on('down', () => {            
            this.key2.tint = 0xFACADE;
            this.key1.clearTint();
            this.key3.clearTint();
            this.key4.clearTint();
            this.pufferFish.anims.play('two', true);
            this.pufferFish.setSize(420,100).setOffset(4,4);
         });
          //when key3 is pressed, give it #FACADE tint, clear tint of other UI keys, play animation for pufferfish's skinnier form and adjust hitbox accordingly
         this.keyboard3.on('down', () => {            
            this.key3.tint = 0xFACADE;
            this.key1.clearTint();
            this.key4.clearTint();
            this.key2.clearTint();
            this.pufferFish.anims.play('three', true);
            this.pufferFish.setSize(130, 400);
         });
          //when key4 is pressed, give it #FACADE tint, clear tint of other UI keys, play animation for the fattest pufferfish form and adjust hitbox accordingly
         this.keyboard4.on('down', () => {            
            this.key4.tint = 0xFACADE;
            this.key2.clearTint();
            this.key1.clearTint();
            this.key3.clearTint();
            this.pufferFish.anims.play('four', true);
            this.pufferFish.setSize(650,650);
         });
         
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
    }
}
