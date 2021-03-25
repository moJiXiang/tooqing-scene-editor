import { SpriteConfig } from "../types";

export default class Glass extends Phaser.GameObjects.Sprite {
  constructor(config: SpriteConfig) {
    super(config.scene, config.x, config.y, "atlas", "glass");
    config.scene.physics.world.enable(this);
  }
}
