import { SpriteConfig } from "../types";

export default class Chair extends Phaser.GameObjects.Sprite {
  constructor(config: SpriteConfig) {
    super(config.scene, config.x, config.y, "atlas", "chair");
    config.scene.physics.world.enable(this);
  }
}
