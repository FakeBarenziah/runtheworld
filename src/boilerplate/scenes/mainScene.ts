import Guy from "../sprites/Guy";
import Stringer from "./Stringer"

/** Boilerplate credits!
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

  private keys: keysObj
  private guy: Guy
  private groundLayer1: Phaser.Tilemaps.StaticTilemapLayer
  private groundLayer2: Phaser.Tilemaps.StaticTilemapLayer
  private zoom: number
  private world: number
  public physics: any
  public input: any
  public cameras: any
  public make: any
  public load: any
  public cache: any
  public add: any
  public anims:any
  private terrainTypes:Array<string>

  constructor() {

    super({
      key: "MainScene"
    });

    this.zoom = 1.0
    this.world = 3
    this.terrainTypes = ["Desert", "Castle"]
  }


  preload(): void {

    //Pull in all of our tilesets and backgrounds
    this.load.image('Desert', "./src/boilerplate/assets/Desert.png")
    this.load.image("Castle", "./src/boilerplate/assets/Castle.png")


    //Load up the image for our guy
    this.load.multiatlas('RoboGuy', "./src/boilerplate/assets/RoboSprites.json", "./src/boilerplate/assets");
    // console.log(this.cache)
  }


  create(): void {

    ///Generate two random chunks
    var terrain1 = this.terrainTypes[Math.floor(Math.random()*this.terrainTypes.length)]
    this.cache.tilemap.entries.entries.map1 = {"format":1,"data":Stringer(terrain1)}
    var terrain2 = this.terrainTypes[Math.floor(Math.random()*this.terrainTypes.length)]
    this.cache.tilemap.entries.entries.map2 = {"format":1,"data":Stringer(terrain2)}

    //Generates Layers for w1 and w2
    var map1 = this.make.tilemap({key: 'map1'})
    var map2 = this.make.tilemap({key: 'map2'})

    var groundTile1 = map1.addTilesetImage(terrain1)
    var groundTile2 = map2.addTilesetImage(terrain2)

    this.groundLayer1 = map1.createStaticLayer('Tile Layer 1', groundTile1, 0, 0);
    this.groundLayer2 = map2.createStaticLayer('Tile Layer 1', groundTile2, 300*32, 0);


    // Sets up a Phaser world that's two chunks wide and one chunk high
    //we'll be using mostly c1 for the player and c2 holds the next world
    this.physics.world.bounds.width = 600*32;
    this.physics.world.bounds.height = 150*32;


    // Input map that enumerates and exposes player input options
    this.keys = {
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      big: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      small: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    }


    // Makes our guy and adds him to the scene
    this.guy = new Guy({
      scene:this,
      key:"RoboGuy",
      x:15*32,
      y:120*32
    })
    var walkFrames = this.anims.generateFrameNames("RoboGuy", {start:1, end:5, prefix:"RoboGuysplit-", suffix:".png"})
    this.anims.create({
      key:"walk",
      frames:walkFrames,
      frameRate:20
    })
    var standFrames = this.anims.generateFrameNames("RoboGuy", {start:0, end:0, prefix:"RoboGuysplit-", suffix:".png"})
    this.anims.create({
      key:"stand",
      frames:standFrames,
      frameRate:20
    })
    this.guy.anims.play("walk", this.guy)

    //handle collision setup for layers and our guy
    map1.setCollisionByProperty({"Collides":true}, true, true)
    map2.setCollisionByProperty({"Collides":true}, true, true)

    this.guy.body.collideWorldBounds=true;
    this.guy.body.setBounce(.2)

    //Critical for consistent collisions!
    this.physics.add.collider(this.guy,this.groundLayer1)
    this.physics.add.collider(this.guy,this.groundLayer2)
  }


  update(time, delta):void {
    //use those colliders!
    this.physics.collide(this.guy, this.groundLayer1 )
    this.physics.collide(this.guy, this.groundLayer2 )



    //control zoom level and update game state based on zoom
    let input =  {
      big: this.keys.big.isDown,
      small: this.keys.small.isDown,
      left: this.keys.left.isDown,
      right: this.keys.right.isDown
    };

    //This if statement choosed the animation to play based on whether the player is walking or not
    if(input.left || input.right){
    this.guy.anims.play("walk", this.guy)
    } else this.guy.anims.play("stand", this.guy)

    if(input.big && this.zoom < 5){
     this.zoom += .05
    }
    if(input.small && this.zoom > .2){
      this.zoom -= .05
    }

    this.cameras.main.zoom = 1/this.zoom
    this.guy.setScale(this.zoom*2)
    this.cameras.main.startFollow(this.guy,false,0,0,-300*this.zoom,200*this.zoom)


    //load in a new chunk if we're far enough along
    if(this.guy.x > 350*32 && !(this.world%2)){

      this.groundLayer1.x = 300*32
      this.groundLayer2.x = 0
      this.guy.x -= 300*32

      this.loadNewMap()
    }

    if(this.guy.x > 350*32 && this.world%2){

      this.groundLayer2.x = 300*32
      this.groundLayer1.x = 0
      this.guy.x -= 300*32

      this.loadNewMap()
    }

    this.guy.update(this.keys, time, delta, this.zoom)

  }

  loadNewMap(): void {
    var nextTerrain = this.terrainTypes[Math.floor(Math.random()*this.terrainTypes.length)]

    this.cache.tilemap.entries.entries[`map${this.world}`] = {"format":1,"data":Stringer(nextTerrain)}
    var nextMap = this.make.tilemap({key: `map${this.world}`})

    if(this.world%2){
      this.groundLayer1.visible = false
     var groundTile1 = nextMap.addTilesetImage(nextTerrain)
     this.groundLayer1 = nextMap.createStaticLayer('Tile Layer 1', groundTile1, 300*32, 0);

    //make sure collision data is up to date
     nextMap.setCollisionByProperty({"Collides":true}, true, true)
     this.physics.add.collider(this.guy,this.groundLayer1)

    } else{
      this.groundLayer2.visible = false
     var groundTile2 = nextMap.addTilesetImage(nextTerrain)
     this.groundLayer2 = nextMap.createStaticLayer('Tile Layer 1', groundTile2, 300*32, 0);

     //make sure collision data is up to date
     nextMap.setCollisionByProperty({"Collides":true}, true, true)
     this.physics.add.collider(this.guy,this.groundLayer2)
    }
    ++this.world
  }
}

