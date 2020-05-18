/*
CMPM120 Spring 2020
Copyright RDSJ L.L.C.
Pufferfish Misadventures
Group Members: Simon Lemay, Dennis Moiseyev, Rene Ding, Huazhen Xu, and Jake Nguyen
*/

// tame the javashrek
"use strict";

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {

    type: Phaser.AUTO,
    width: 1300,
    height: 735,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },

    scene: [ Load, Menu, tutorialLoad, Tutorial, LevelSelect, Level1, Level2, credits ]
};

//apply configurations to new Phaser Game
let game = new Phaser.Game(config);

let score;
let centerX= game.config.width/2;
let centerY= game.config.height/2;
var timeText;
var timedEvent;

// let highScore;
// let newHighScore = false;
// let boneScore;
// let resetBS = "0";
