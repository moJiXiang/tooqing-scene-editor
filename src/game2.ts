import "phaser";

export default class SceneEditor extends Phaser.Scene {
  controls;
  fpsText;
  xiaocheSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super("SceneEditor");
  }

  preload() {
    this.load.image("mario-tiles", "assets/super-mario-tiles.png");

    // this.load.image(
    //   "tiles",
    //   "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/catastrophi_tiles_16_blue.png"
    // );
    // this.load.tilemapCSV(
    //   "map",
    //   "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/catastrophi_level3.csv"
    // );

    this.load.image("outside", "assets/outside.png");
    this.load.image("building", "assets/building.png");
    this.load.image("xiaoche", "assets/xiaoche.png");
    this.load.tilemapTiledJSON("map", "assets/test45-20-20.json");

    this.load.image("tiles", "assets/iso-64x64-outside.png");
    this.load.image("tiles2", "assets/iso-64x64-building.png");
    this.load.tilemapTiledJSON("map1", "assets/isorpg.json");
    // this.load.tilemapTiledJSON("map", "assets/test45-500-500.json");
  }

  create() {
    // this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);

    // this.add.shader("Plasma", 0, 412, 800, 172).setOrigin(0);

    // this.add.image(400, 300, "libs");

    // const logo = this.add.image(400, 70, "logo");

    // this.tweens.add({
    //   targets: logo,
    //   y: 350,
    //   duration: 1500,
    //   ease: "Sine.inOut",
    //   yoyo: true,
    //   repeat: -1,
    // });

    const level = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
      [0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 14, 13, 14, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
      [35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
      [39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39],
    ];

    // When loading from an array, make sure to specify the tileWidth and tileHeight
    // const map = this.make.tilemap({
    //   data: level,
    //   tileWidth: 16,
    //   tileHeight: 16,
    // });
    // const tiles = map.addTilesetImage("mario-tiles");
    // const layer = map.createLayer(0, tiles, 0, 0);

    // const map = this.make.tilemap({
    //   key: "map",
    //   tileWidth: 16,
    //   tileHeight: 16,
    // });

    // const tileset = map.addTilesetImage("tiles");
    // const layer = map.createLayer(0, tileset, 0, 0);

    // const map = this.make.tilemap({ key: "map" });

    // const outsideset = map.addTilesetImage("outside", "outside");
    // const buildingSet = map.addTilesetImage("building", "building");

    // const floorLayer = map.createLayer("floor", outsideset);
    // const buildingLayer = map.createLayer("building", [
    //   outsideset,
    //   buildingSet,
    // ]);

    // floorLayer.forEachTile(function (tile) {
    //   console.log(tile);
    // });

    // this.xiaocheSprite = this.add.sprite(0, 0, "xiaoche");

    // this.xiaocheSprite.setPosition(300, 400);

    // const mapObjects = map.getObjectLayer("objects")["objects"];

    // const objectsGroup = this.add.group();

    // const xiaoches = map.createFromObjects(
    //   "objects",
    //   mapObjects.map((object) => ({
    //     gid: object.gid,
    //     x: object.x,
    //     y: object.y,
    //     id: object.id,
    //     name: object.name,
    //     key: object.type,
    //   }))
    // );

    // xiaoches.forEach((item) => {
    //   this.physics.world.enable(item);
    // });

    // mapObjects.forEach((item) => {
    //   if (item.type === "glass") {
    //     const glass = new Glass({
    //       scene: this,
    //       x: item.x,
    //       y: item.y,
    //     });
    //     objectsGroup.add(glass);
    //   }

    //   if (item.type === "chair") {
    //     const chair = new Chair({
    //       scene: this,
    //       x: item.x,
    //       y: item.y,
    //     });
    //     objectsGroup.add(chair);
    //   }
    // });

    // const worldLayer = map.createLayer("World", tileset, 0, 0);
    // const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

    var map = this.add.tilemap("map1");

    console.log(map);

    // this.xiaocheSprite = this.add.sprite(0, 0, "xiaoche");
    // this.add.sprite(100, 0, "xiaoche");
    // this.add.sprite(200, 0, "xiaoche");
    // this.add.sprite(0, 100, "xiaoche");
    // this.add.sprite(0, 200, "xiaoche");

    var tileset1 = map.addTilesetImage("iso-64x64-outside", "tiles");
    var tileset2 = map.addTilesetImage("iso-64x64-building", "tiles2");
    var xiaocheTileset = map.addTilesetImage("xiaoche", "xiaoche");

    var layer1 = map.createLayer("Tile Layer 1", [tileset1, tileset2]);
    var layer2 = map.createLayer("Tile Layer 2", [tileset1, tileset2]);
    var layer3 = map.createLayer("Tile Layer 3", [tileset1, tileset2]);
    var layer4 = map.createLayer("Tile Layer 4", [tileset1, tileset2]);
    var layer5 = map.createLayer("Tile Layer 5", [tileset1, tileset2]);

    var blankLayer = map.createBlankLayer("world", [xiaocheTileset]);

    const worldObjects = map.getObjectLayer("world")["objects"];
    const xiaoches = map.createFromObjects(
      "world",
      worldObjects.map((object) => ({
        gid: object.gid,
        x: object.x,
        y: object.y,
        id: object.id,
        name: object.name,
        key: object.type,
      }))
    );

    const camera = this.cameras.main;
    const cameraWidth = 800;
    const cameraHeight = 600;
    camera.setSize(cameraWidth, cameraHeight);
    camera.setPosition(400 - cameraWidth / 2, 300 - cameraHeight / 2);
    camera.setScroll(-cameraWidth / 2, -cameraHeight / 2);

    const cursors = this.input.keyboard.createCursorKeys();

    // this.cameras.main.setZoom(2);

    this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5,
    });

    // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.fpsText = this.add.text(50, 50, "");
  }

  update(time, delta) {
    this.controls.update(delta);

    var loop = this.sys.game.loop;

    this.fpsText.setText([loop.actualFps]);

    // this.xiaocheSprite.x += delta * 1;
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  // pixelArt: true,
  scene: SceneEditor,
};

const game = new Phaser.Game(config);
