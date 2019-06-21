/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

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
    console.log(this.cache)
    var groundTile = map.addTilesetImage('world')
    // 'world' image used as a tileset from preload
    var groundLayer = map.createStaticLayer('Tile Layer 1', groundTile, 0, 0);
    // Creats a game layer from the name in the map.json file
    groundLayer.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;
  }
}
