import Guy from "../sprites/Guy";

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private keys: object
  private guy: Guy
  private groundLayer: Phaser.Tilemaps.DynamicTilemapLayer
  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.tilemapTiledJSON('map', './src/boilerplate/assets/map.json')
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
    this.groundLayer.setCollisionByProperty({"collide":true}, true, true)
    // map.setCollision([1, 2, 3, 4, 5, 6, 7, 8], true, false, this.groundLayer)

    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height+60;
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
    this.cameras.main.startFollow(this.guy)
    this.guy.body.collideWorldBounds=true;
    // this.guy.body

  }
  update(time, delta):void {
    this.guy.update(this.keys, time, delta)
  }
}
