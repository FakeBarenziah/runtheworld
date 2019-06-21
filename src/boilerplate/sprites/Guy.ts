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
  update(keys, time, delta){
    let input = {
      left: keys.left.isDown,
      right:keys.right.isDown,
      jump:keys.jump.isDown
    };
    if (input.left) {
      if (this.body.velocity.y === 0) {
          this.run(-this.acceleration);
      } else {
          this.run(-this.acceleration / 3);
      }
      this.flipX = true;
    }
    else if (input.right) {
      if (this.body.velocity.y === 0) {
          this.run(this.acceleration);
      } else {
          this.run(this.acceleration / 3);
      }
      this.flipX = false;
    }
    if (this.body.blocked.down&&input.jump) {
      this.jump();
  }

//   if (this.body.velocity.y < 0) {
//     this.scene.physics.world.collide(this, this.scene.groundLayer, this.scene.tileCollision);
// } else {
//     this.scene.physics.world.collide(this, this.scene.groundLayer);
// }
  }
  run(vel) {
    this.body.setAccelerationX(vel);
  }
  jump() {
    console.log(this.body)
    this.body.setVelocityY(-500)

  }

}
