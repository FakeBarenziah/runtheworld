export default class Guy extends Phaser.GameObjects.Sprite{

  private acceleration:number
  public body: any
  public type: string
  public x: number
  public flipX: boolean
  public setScale: any
  public anims:any

  constructor(config: any) {

    super(config.scene, config.x, config.y, config.key)
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 100;
        this.body.maxVelocity.x = 600;
        this.body.maxVelocity.y = 700;
        this.body.checkCollision.up = false;
        this.type = 'guy';
  }


  update(keys, time, delta,zoom: number){

    //input map from parent's keys for semantics
    let input = {
      left: keys.left.isDown,
      right:keys.right.isDown,
      jump:keys.jump.isDown
    };


    //control logic
    if (input.left) {
      this.run(-this.acceleration*Math.max(1, zoom*2));
      this.flipX = true;
    }
    else if (input.right) {
      this.run(this.acceleration*Math.max(1, zoom*2));
      this.flipX = false;
    }
    else {
      this.run(0)
    }

    if (input.jump) {
      this.jump(zoom*2);
  }



  }
  run(vel: number) {
    this.body.setVelocityX(vel);
  }


  jump(zoom: number) {
    this.body.setVelocityY(-450*Math.sqrt(zoom))
  }
}
