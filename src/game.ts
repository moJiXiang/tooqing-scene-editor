import "phaser";
import { GridLayer, MapPosition } from "./gridlayer";
import { PaintBrush } from "./paintbrush";

export default class SceneEditor extends Phaser.Scene {
  private _controls;
  private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _map: Phaser.Tilemaps.Tilemap;
  private _layerMap = new Map<string, Phaser.Tilemaps.TilemapLayer>();
  private _currentLayer: Phaser.Tilemaps.TilemapLayer;
  private _gridLayer: GridLayer;
  private _paintBrush: PaintBrush;

  constructor() {
    super("SceneEditor");
  }

  preload() {
    this.load.tilemapTiledJSON("blank-map", "assets/blank-map.json");
    this.load.image("ground", "assets/ground.png");
    this.load.image("ground1", "assets/ground/ground1.png");

    this.load.tilemapTiledJSON("map1", "assets/isorpg.json");
    this.load.image("outside", "assets/iso-64x64-outside.png");
    this.load.image("building", "assets/iso-64x64-building.png");
  }

  private initCamera() {
    const camera = this.cameras.main;
    // camera.centerOn(config.width / 2, config.height / 2);
    camera.setScroll(-config.width / 2, -100);
  }

  private initMap() {
    // this._map = this.add.tilemap();
    // const ground = this._map.addTilesetImage("ground", "ground");
    // this._map.createLayer("ground-layer", [ground]);
    // this._map = this.add.tilemap("blank-map");
    // const ground = this._map.addTilesetImage("ground", "ground");
    // this._currentLayer = this._map.createLayer("ground-layer", [ground]);

    this._map = this.add.tilemap("map1");
    const outside = this._map.addTilesetImage("iso-64x64-outside", "outside");
    const building = this._map.addTilesetImage(
      "iso-64x64-building",
      "building"
    );

    this._currentLayer = this._map.createLayer(
      "Tile Layer 1",
      [outside, building]
      // -32,
      // -32
    );
    // this._currentLayer.setScrollFactor(-64, -32);

    // const show = this.add.graphics();

    // this._currentLayer.renderDebug(show);
  }

  private initGridLayer() {
    this._gridLayer = new GridLayer(this);

    const { rows, cols, tileWidth, tileHeight } = config;
    this._gridLayer.draw({
      rows,
      cols,
      tileWidth,
      tileHeight,
    });
  }

  private initPaintBrush() {
    this._paintBrush = new PaintBrush(this);
    // this._paintBrush.setSprite("ground1");
  }

  public createBlankLayer(name: string): Phaser.Tilemaps.TilemapLayer {
    const layer = this._map.createBlankLayer(
      name,
      "ground",
      0,
      0,
      config.rows,
      config.cols,
      config.tileWidth,
      config.tileHeight
    );

    this._layerMap.set(name, layer);
    return layer;
  }

  public selectLayer(name) {
    this._currentLayer = this._layerMap.get(name);
  }

  // 创建 tile 选择器
  private createTileSelector() {
    const tileSelector = this.add.group();
    const tileStrip = tileSelector.create(1, 1, "ground1");
    tileStrip.inputEnabled = true;
    // tileStrip.events.onInputDown.add(pickTile, this)
  }

  private addListener() {
    this.input.on("pointermove", this.onPointerMove, this);
    this.input.on("pointerdown", this.onPointerDown, this);
  }

  private onPointerMove(pointer: Phaser.Input.Pointer) {
    const { worldX, worldY } = pointer;
    const tile = this._currentLayer.getTileAtWorldXY(worldX, worldY);

    console.log("tile: ", tile.x, tile.y);

    const mapPos = new MapPosition(
      tile.x,
      tile.y,
      config.tileWidth,
      config.tileHeight
    );

    this._paintBrush.update(
      mapPos.getScreenPoint().x,
      mapPos.getScreenPoint().y
    );
  }

  private onPointerDown(pointer: Phaser.Input.Pointer) {
    const { worldX, worldY } = pointer;
    console.log(this._currentLayer);
    console.log("world point: ", worldX, worldY);
    const tile = this._currentLayer.getTileAtWorldXY(worldX, worldY);
    console.log(
      "🚀 ~ file: game.ts ~ line 82 ~ SceneEditor ~ onPointerDown ~ tile",
      tile.x,
      tile.y
    );
    this._currentLayer.removeTileAt(tile.x, tile.y);
    // this._currentLayer.putTileAt(1, tile.x, tile.y);
    console.log("this._currentLayer: ", this._currentLayer);
  }

  public addOriginPointer() {
    const graphics = this.add.graphics({
      x: 0,
      y: 0,
    });

    graphics.lineStyle(2, 0xffffff);

    graphics.beginPath();
    graphics.arc(
      0,
      0,
      2,
      Phaser.Math.DegToRad(0),
      Phaser.Math.DegToRad(360),
      false,
      0.02
    );
    graphics.strokePath();
    graphics.closePath();
  }

  create() {
    this.initCamera();
    this.addOriginPointer();
    // this.createTileSelector();
    this.initMap();
    this.initGridLayer();
    this.initPaintBrush();
    this.addListener();
    // 创建地块层
    // this._currentLayer = this.createBlankLayer("floor");

    this._cursors = this.input.keyboard.createCursorKeys();

    const controlConfig = {
      camera: this.cameras.main,
      left: this._cursors.left,
      right: this._cursors.right,
      up: this._cursors.up,
      down: this._cursors.down,
      acceleration: 0.04,
      drag: 0.0005,
      maxSpeed: 0.7,
    };

    this._controls = new Phaser.Cameras.Controls.SmoothedKeyControl(
      controlConfig
    );
  }

  updateMarker() {
    const { worldX, worldY } = this.input.activePointer;
    const tile = this._map.getTileAtWorldXY(worldX, worldY);

    if (this.input.mousePointer.isDown) {
      // this._currentLayer.putTileAt(currentTile, tile.x, tile.y);
    }
  }

  update(time, delta) {
    this._controls.update(delta);
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 1500,
  height: 800,
  rows: 20,
  cols: 20,
  tileWidth: 64,
  tileHeight: 32,
  scene: SceneEditor,
};

const game = new Phaser.Game(config);
