export default class Guy extends Phaser.GameObjects.Sprite{
  private acceleration:number
  private jumping: boolean
  private jumpTimer:number
  constructor(config) {
    super(config.scene, config.x, config.y, config.key)
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.acceleration = 600;
        this.body.maxVelocity.x = 200;
        this.body.maxVelocity.y = 500;
        this.body.checkCollision.up = false;
        this.type = 'guy';
        this.jumping = false;
        this.jumpTimer = -1
  }
  update(keys, time, delta,zoom){
    let input = {
      left: keys.left.isDown,
      right:keys.right.isDown,
      jump:keys.jump.isDown
    };
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
    if (this.body.blocked.down&&input.jump) {
      this.jump(zoom);
  }

//   if (this.body.velocity.y < 0) {
//     this.scene.physics.world.collide(this, this.scene.groundLayer, this.scene.tileCollision);
// } else {
//     this.scene.physics.world.collide(this, this.scene.groundLayer);
// }
  }
  run(vel) {
    this.body.setVelocityX(vel);
  }
  jump(zoom) {
    this.body.setVelocityY(-200*Math.sqrt(zoom))
  }

}
