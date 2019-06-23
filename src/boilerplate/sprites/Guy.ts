export default class Guy extends Phaser.GameObjects.Sprite{

  private acceleration:number
  public body: any
  public type: string
  public x: number
  public flipX: boolean


  constructor(config: any) {

    super(config.scene, config.x, config.y, config.key)
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 1200;
        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 500;
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
      this.run(-this.acceleration*zoom);
      this.flipX = true;
    }
    else if (input.right) {
      this.run(this.acceleration*zoom);
      this.flipX = false;
    }
    else {
      this.run(0)
    }

    if (input.jump) {
      this.jump(zoom);
  }


  
  }
  run(vel: number) {
    this.body.setVelocityX(vel);
  }


  jump(zoom: number) {
    this.body.setVelocityY(-450*Math.sqrt(zoom))
  }
}
