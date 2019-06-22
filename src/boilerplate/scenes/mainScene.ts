import Guy from "../sprites/Guy";
import { Z_DEFAULT_COMPRESSION } from "zlib";
// import Phaser from "phaser"
import Stringer from "./Stringer"

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
  private groundLayer1: Phaser.Tilemaps.StaticTilemapLayer
  private groundLayer2: Phaser.Tilemaps.StaticTilemapLayer
  private toggle: Boolean
  private zoom: number
  private world: number
  private hotLoad: Boolean
  constructor() {
    super({
      key: "MainScene"
    });
    this.zoom = 1.0
    this.toggle = false
    this.world = 2
    this.hotLoad = false
  }

  preload(): void {
    this.load.tilemapTiledJSON('map1', './src/boilerplate/assets/map.json')
    // Load the map as JSON from the file created by Tiled
    console.log(this)
    this.cache.tilemap.entries.entries.map2 = {"format":1,"data":Stringer()
}
    this.load.image('world', "./src/boilerplate/assets/DesertTiles.png")
    // Loads the image that was tiled
    this.load.image('guy', "./src/boilerplate/assets/guy.png");

  }
  create(): void {
    var map1 = this.make.tilemap({key: 'map1'})
    var groundTile1 = map1.addTilesetImage('world')
    // 'world' image used as a tileset from preload
    var map2 = this.make.tilemap({key: 'map2'})
    var groundTile2 = map2.addTilesetImage('world')

    this.groundLayer1 = map1.createStaticLayer('Tile Layer 1', groundTile1, 0, 0);
    this.groundLayer2 = map2.createStaticLayer('Tile Layer 1', groundTile2, 40*32, 0);
    // Creats a game layer from the name in the map.json file
    // this.groundLayer.setCollisionByExclusion([-1]);
    // this.physics.world.enable(this.groundLayer)
    map1.setCollisionByProperty({"Collides":true}, true, true)
    map2.setCollisionByProperty({"Collides":true}, true, true)

    // map.setCollision([1, 2, 3, 4, 5, 6, 7, 8], true, false, this.groundLayer)

    this.physics.world.bounds.width = 80*32;
    this.physics.world.bounds.height = 15*32;
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
    this.guy.body.collideWorldBounds=true;
    // this.guy.body

  }
  update(time, delta):void {

    if(!this.load.isLoading() && this.hotLoad) this.hotLoader()

    this.physics.collide(this.guy, this.groundLayer1 )
    this.physics.collide(this.guy, this.groundLayer2 )

    this.guy.update(this.keys, time, delta, this.zoom)
    let input =  {
      big: this.keys.big.isDown,
      small: this.keys.small.isDown,
    };
    if(input.big && this.zoom < 5){
     this.zoom += .05
    }``
    if(input.small && this.zoom > .2){
      this.zoom -= .05
    }
    this.cameras.main.zoom = 1/this.zoom
    this.guy.setScale(this.zoom)
    this.cameras.main.startFollow(this.guy,false,0,0,-300*this.zoom,200*this.zoom)

    if(this.guy.x > 50*32 && !this.toggle){

      this.world += 1

      this.groundLayer1.x = 40*32

      this.groundLayer2.x = 0

      this.guy.x -= 40*32



      this.loadNewMap()

      this.toggle = !this.toggle
    }

    if(this.guy.x > 50*32 && this.toggle){

      this.world += 1

      this.groundLayer2.x = 40*32

      this.groundLayer1.x = 0

      this.guy.x -= 40*32

      this.loadNewMap()

      this.toggle = !this.toggle

    }

  }

  loadNewMap(){

    this.load.tilemapTiledJSON(`map${this.world}`, './src/boilerplate/assets/fuck.json')

    this.load.start()

    this.hotLoad = true
  }

  hotLoader(){

    var nextMap = this.make.tilemap({key: `map${this.world}`})

   if(this.world%2){

    var groundTile1 = nextMap.addTilesetImage('world')

    this.groundLayer1 = nextMap.createStaticLayer('Tile Layer 1', groundTile1, 40*32, 0);

    nextMap.setCollisionByProperty({"Collides":true}, true, true)

   } else{

    var groundTile2 = nextMap.addTilesetImage('world')

    this.groundLayer2 = nextMap.createStaticLayer('Tile Layer 1', groundTile2, 40*32, 0);

    nextMap.setCollisionByProperty({"Collides":true}, true, true)
   }

   this.hotLoad = false
  }

}
