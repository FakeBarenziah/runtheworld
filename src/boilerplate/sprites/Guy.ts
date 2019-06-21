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
    } else if (input.right) {
      if (this.body.velocity.y === 0) {
          this.run(this.acceleration);
      } else {
          this.run(this.acceleration / 3);
      }
      this.flipX = false;
    }
    if (input.jump && (!this.jumping || this.jumpTimer > 0)) {
      this.jump();
  } else if (!input.jump) {
      this.jumpTimer = -1; // Don't resume jump if button is released, prevents mini double-jumps
      if (this.body.blocked.down) {
          this.jumping = false;
      }
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
    if (!this.body.blocked.down && !this.jumping) {
        return;
    }

    if (!this.jumping) {
        // if (this.animSuffix === '') {
        //     this.scene.sound.playAudioSprite('sfx', 'smb_jump-small');
        // } else {
        //     this.scene.sound.playAudioSprite('sfx', 'smb_jump-super');
        // }
    }
    if (this.body.velocity.y < 0 || this.body.blocked.down) {
        this.body.setVelocityY(-200);
    }
    if (!this.jumping) {
        this.jumpTimer = 300;
    }
    this.jumping = true;
  }

}
