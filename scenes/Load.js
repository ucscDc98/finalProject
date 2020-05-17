class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // set load path for assets
        this.load.path = "./assets/";
        //load all necessary assets
        this.load.image("corals", "Coral Reef.png");
        this.load.image('arrowKeys', 'arrows.png');
        this.load.image('textBubble', 'Textbubble.png');
        this.load.image('stone1', 'Stone_1.png');
        this.load.image('stone2', 'Stone_2.png');
        this.load.image('stone3', 'Stone_3.png');
        this.load.image('stone4', 'Stone_4.png');
        this.load.image('stone5', 'Stone_5.png');
        this.load.image('stone6', 'Stone_6.png');
        this.load.image('shark', 'Shark.png');
        this.load.image('tutorialTrans', 'tutorialTransition.png');
        this.load.image('water', 'waterLevel.png');
        this.load.image('wall', 'wall.png');
        this.load.image('anchor', 'Anchor-02.png');
        this.load.image('cageG', 'CagedGirl.png');
        this.load.image('chain', 'Chain.png');
        this.load.audio('poof', 'poof.wav');
        this.load.audio('tink', 'tink.wav');
        this.load.audio('sharkScream', 'sharkScream.ogg');
        this.load.audio('levelStart', 'levelStart.wav');
        this.load.spritesheet("sharkS", "SpookedShark.png", {
            frameWidth: 500,
            frameHeight: 500,
            startFrame: 0,
            endFrame: 0
        });
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
