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
  private groundLayers: Array<Phaser.Tilemaps.StaticTilemapLayer>
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
  private currentWorld: number
  private layer1:Phaser.Tilemaps.StaticTilemapLayer
  private layer2:Phaser.Tilemaps.StaticTilemapLayer
  private layer3:Phaser.Tilemaps.StaticTilemapLayer
  private layer4:Phaser.Tilemaps.StaticTilemapLayer
  private layer5:Phaser.Tilemaps.StaticTilemapLayer
  private layer6:Phaser.Tilemaps.StaticTilemapLayer
  private layer7:Phaser.Tilemaps.StaticTilemapLayer


  constructor() {

    super({
      key: "MainScene"
    });

    this.zoom = 1.0
    this.world = 2
    this.currentWorld = 0
    this.terrainTypes = ["Desert", "Castle", "Town", "Mountain"]
  }


  preload(): void {

    //Pull in all of our tilesets and backgrounds
    this.load.image('Desert', "./src/boilerplate/assets/Desert.png")
    this.load.image("Castle", "./src/boilerplate/assets/Castle.png")
    this.load.image("Town", "./src/boilerplate/assets/Town.png")
    this.load.image("Mountain", "./src/boilerplate/assets/Mountain.png")

    this.load.image("BackgroundPallette", "./src/boilerplate/assets/BackgroundPallete.png")

    this.load.tilemapTiledJSON("bg1", "./src/boilerplate/assets/bg1.json")
    this.load.tilemapTiledJSON("bg2", "./src/boilerplate/assets/bg2.json")
    this.load.tilemapTiledJSON("bg3", "./src/boilerplate/assets/bg3.json")
    this.load.tilemapTiledJSON("bg4", "./src/boilerplate/assets/bg4.json")



    //Load up the image for our guy
    this.load.multiatlas('RoboGuy', "./src/boilerplate/assets/RoboSprites.json", "./src/boilerplate/assets");
    // console.log(this.cache)
  }


  create(): void {

    var bgMap1 = this.make.tilemap({key:"bg1"})
    var bgMap2 = this.make.tilemap({key:"bg2"})
    var bgMap3 = this.make.tilemap({key:"bg2"})
    var bgMap4 = this.make.tilemap({key:"bg3"})
    var bgMap5 = this.make.tilemap({key:"bg3"})
    var bgMap6 = this.make.tilemap({key:"bg4"})
    var bgMap7 = this.make.tilemap({key:"bg4"})

    var backgroundTileset1 = bgMap1.addTilesetImage("BackgroundPallette")
    var backgroundTileset2 = bgMap2.addTilesetImage("BackgroundPallette")
    var backgroundTileset3 = bgMap3.addTilesetImage("BackgroundPallette")
    var backgroundTileset4 = bgMap4.addTilesetImage("BackgroundPallette")
    var backgroundTileset5 = bgMap2.addTilesetImage("BackgroundPallette")
    var backgroundTileset6 = bgMap3.addTilesetImage("BackgroundPallette")
    var backgroundTileset7 = bgMap4.addTilesetImage("BackgroundPallette")

    this.layer1 = bgMap1.createStaticLayer("Tile Layer 1", backgroundTileset1, 75, 0)
    this.layer2 = bgMap2.createStaticLayer("Tile Layer 1", backgroundTileset2, 75, 0)
    this.layer3 = bgMap3.createStaticLayer("Tile Layer 1", backgroundTileset3, -75, 0)
    this.layer4 = bgMap4.createStaticLayer("Tile Layer 1", backgroundTileset4, 75, 0)
    this.layer5 = bgMap5.createStaticLayer("Tile Layer 1", backgroundTileset5, -75, 0)
    this.layer6 = bgMap6.createStaticLayer("Tile Layer 1", backgroundTileset6, 75, 0)
    this.layer7 = bgMap7.createStaticLayer("Tile Layer 1", backgroundTileset7, -75, 0)

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

    this.groundLayers = [map1.createStaticLayer('Tile Layer 1', groundTile1, 0, 0)];
    this.groundLayers.push(map2.createStaticLayer('Tile Layer 1', groundTile2, 150*32, 0))


    // Sets up a Phaser world that's two chunks wide and one chunk high
    //we'll be using mostly c1 for the player and c2 holds the next world
    this.physics.world.bounds.width = 300*32;
    this.physics.world.bounds.height = 100*32;


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
      x:75*32,
      y:10*32
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
    this.physics.add.collider(this.guy,this.groundLayers[0])
    this.physics.add.collider(this.guy,this.groundLayers[1])
  }


  update(time, delta):void {
    //use those colliders!
    this.groundLayers.forEach(layer => {
      this.physics.collide(this.guy, layer)})



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
    if(input.small && this.zoom > .15){
      this.zoom -= .05
    }
    if(input.left&&!this.guy.body.blocked.left){
      this.layer1.x -= 3
      this.layer2.x -= 3/2
      this.layer3.x -= 3/2
      this.layer4.x -= 3/4
      this.layer5.x -= 3/4
      this.layer6.x -= 3/8
      this.layer7.x -= 3/8

    }
    if(input.right&&!this.guy.body.blocked.right){
      this.layer1.x += 3
      this.layer2.x += 3/2
      this.layer3.x += 3/2
      this.layer4.x += 3/4
      this.layer5.x += 3/4
      this.layer6.x += 3/8
      this.layer7.x += 3/8
    }

    this.cameras.main.zoom = 1/this.zoom
    this.guy.setScale(this.zoom*2)
    this.cameras.main.startFollow(this.guy,false,0,0,this.zoom,100*this.zoom)


    //load in a new chunk if we're far enough along
    if(this.guy.x > 240*32){

      this.currentWorld++

      this.groundLayers.forEach(layer => {
        layer.x-=150*32
      })

      this.guy.x -= 150*32
      this.layer1.x -=150*32
      this.layer2.x -=150*32
      this.layer3.x -=150*32
      this.layer4.x -=150*32

      if(this.currentWorld===this.world-1){
        this.loadNewMap(false)}

    }

    if(this.guy.x < 50*32){

      this.groundLayers.forEach(layer => {
        layer.x+=150*32
      })

      this.guy.x += 150*32
      this.layer1.x +=150*32
      this.layer2.x +=150*32
      this.layer3.x +=150*32
      this.layer4.x +=150*32

      if(this.currentWorld===0){
        this.loadNewMap(true)
      }else{this.currentWorld--}
    }

    this.guy.update(this.keys, time, delta, this.zoom)

  }

  loadNewMap(left:boolean): void {
    var nextTerrain = this.terrainTypes[Math.floor(Math.random()*this.terrainTypes.length)]

    this.cache.tilemap.entries.entries[`map${this.world}`] = {"format":1,"data":Stringer(nextTerrain)}
    var nextMap = this.make.tilemap({key: `map${this.world}`})

    if(left){
     var groundTile1 = nextMap.addTilesetImage(nextTerrain)
     this.groundLayers.unshift(nextMap.createStaticLayer('Tile Layer 1', groundTile1, 0, 0));

    //make sure collision data is up to date
     nextMap.setCollisionByProperty({"Collides":true}, true, true)
     this.physics.add.collider(this.guy,this.groundLayers[0])

    } else{
     var groundTile2 = nextMap.addTilesetImage(nextTerrain)
     this.groundLayers.push(nextMap.createStaticLayer('Tile Layer 1', groundTile2, 150*32, 0));

     //make sure collision data is up to date
     nextMap.setCollisionByProperty({"Collides":true}, true, true)
     this.physics.add.collider(this.guy,this.groundLayers[this.world-1])
    }
    this.world++
  }
}

