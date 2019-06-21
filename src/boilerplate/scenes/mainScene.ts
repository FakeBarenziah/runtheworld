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
    this.load.tilemapTiledJSON('map', '.src/boilerplate/assets/map.json')
    this.load.spritesheet('foreground', "./src/boilerplate/assets/GroundSheet.png",{frameWidth:36, frameHeight: 36});
    this.load.image('groundTile', "./src/boilerplate/assets/guy.png");

  }

  create(): void {
    var map = this.make.tilemap({key: 'map'})
    var gt = map.addTilesetImage('foreground')
    var gL = map.createDynamicLayer('World', gt, 0, 0);

    gL.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = gL.width;
    this.physics.world.bounds.height = gL.height;
  }
}
