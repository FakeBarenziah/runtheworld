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
    this.load.image("groundTile", "./src/boilerplate/assets/ground.png");
    this.load.image("groundTile", "./src/boilerplate/assets/guy.png");

  }

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, "logo");
  }
}
