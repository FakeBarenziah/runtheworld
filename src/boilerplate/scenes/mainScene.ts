import Guy from "../sprites/Guy";
import { Z_DEFAULT_COMPRESSION } from "zlib";

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

interface keysObj {
  jump: any,
  right:any,
  left: any,
  big: any,
  small: any

}

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private keys: keysObj
  private guy: Guy
  private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer
  private zoom: number
  constructor() {
    super({
      key: "MainScene"
    });
    this.zoom = 1.0
  }

  preload(): void {
    this.load.tilemapTiledJSON('map', './src/boilerplate/assets/fuck.json')
    // Load the map as JSON from the file created by Tiled
    this.load.image('world', "./src/boilerplate/assets/GroundSheet.png")
    // Loads the image that was tiled
    this.load.image('guy', "./src/boilerplate/assets/guy.png");

  }
  create(): void {
    var map = this.make.tilemap({key: 'map'})
    var groundTile = map.addTilesetImage('world')
    // 'world' image used as a tileset from preload
    this.groundLayer = map.createDynamicLayer('Tile Layer 1', groundTile, 0, 0);
    // Creats a game layer from the name in the map.json file
    // this.groundLayer.setCollisionByExclusion([-1]);
    // this.physics.world.enable(this.groundLayer)
    map.setCollisionByProperty({"Collides":true}, true, true)
    // map.setCollision([1, 2, 3, 4, 5, 6, 7, 8], true, false, this.groundLayer)

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;
    this.keys = {
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      big: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      small: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    }
    this.guy = new Guy({
      scene:this,
      key:"guy",
      x:30,
      y:30
    })
//    this.cameras.main = new Phaser.Cameras.Scene2D.Effects.Zoom(this.cameras.main)
    this.cameras.main.startFollow(this.guy)
    this.guy.body.collideWorldBounds=true;

    // this.guy.body

  }
  update(time, delta):void {
    this.physics.collide(this.guy, this.groundLayer )
    this.guy.update(this.keys, time, delta, this.zoom)
    let input =  {
      big: this.keys.big.isDown,
      small: this.keys.small.isDown,
    };
    if(input.big && this.zoom > .2){
     this.zoom -= .05
    }``
    if(input.small && this.zoom < 5){
      this.zoom += .05
    }
    this.cameras.main.zoom = 1/this.zoom
    this.guy.setScale(this.zoom)
  }

}
