class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path for assets
        this.load.path = "./assets/";
        //load all necessary assets
        this.load.image("corals", "Coral Reef.png");
        this.load.spritesheet("pufferFish", "Player.png", {
            frameWidth: 417,
            frameHeight: 261,
            startFrame: 0,
            endFrame: 0
        });
        this.load.spritesheet("pufferFat", "fatpuff.png", {
            frameWidth: 640,
            frameHeight: 640,
            startFrame: 0,
            endFrame: 0
        });
        this.load.spritesheet("pufferLong", "puffLong.png", {
            frameWidth: 169,
            frameHeight: 416,
            startFrame: 0,
            endFrame: 0
        });
        this.load.video("oceanfloor", "Ocean Floor.mp4");
        this.load.image("play", "Play Button.png");
        this.load.image("select", "SelectionButton.png");
        this.load.image('tutorialBG', 'tutorialArtTemp.png');
        this.load.image('key2', 'key1UI.png');
        this.load.image('key3', 'key2UI.png');
        this.load.image('key4', 'key3UI.png');
        this.load.image('key1', 'key0UI.png');
        this.load.spritesheet('pufferS', 'pufferS.png',{
            frameWidth: 420,
            frameHeight: 126,
            startFrame: 0,
            endFrame: 0
        });
        this.load.atlas("bubbles", "bubblesheet.png", "bubbles.json");
        this.load.audio("blip", "reverse_blip.mp3");

    }
    create() {
        //set background color to navy blue
        this.cameras.main.setBackgroundColor("#10267B");
        //add video file to scene and play the video file
        this.ocean = this.add.video(centerX, centerY, "oceanfloor");
        this.ocean.play();
        //Create team logo text at center of loading screen and set its alpha so that it's slightly visible
        this.logo= this.add.text(480, centerY, "RDSJ L.L.C.", {fontFamily: "Bangers", fontSize: "80px", color: "#FF7F50"});
        this.logo.setAlpha(0.4);
        //create a time event that lasts 15 seconds before transitioning to the next scene
        this.clock= this.time.delayedCall(1000, () => {
           
            this.scene.start("menuScene");

        }, null, this);

    } 
}
