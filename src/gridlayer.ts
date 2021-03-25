export interface MapSize {
  rows: number; // The width of the map (in tiles)
  cols: number; // The height of the map (in tiles)
  tileWidth: number;
  tileHeight: number;
}

export class ScreenPoint {
  // in pixels
  constructor(public x: number, public y: number) {}

  static CenterOfTwoPoints(point1: ScreenPoint, point2: ScreenPoint) {
    return {
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2,
    };
  }
}

export class MapPosition {
  constructor(
    private tileX: number,
    private tileY: number,
    private tileWidth: number,
    private tileHeight: number
  ) {}

  private get TILE_WIDTH_HALF() {
    return this.tileWidth / 2;
  }

  private get TILE_HEIGHT_HALF() {
    return this.tileHeight / 2;
  }

  static ConvertScreenPointToMapPosition(
    x: number,
    y: number,
    tileWidth: number,
    tileHeight: number
  ): [number, number] {
    const TILE_WIDTH_HALF = tileWidth / 2;
    const TILE_HEIGHT_HALF = tileHeight / 2;
    const tileX = (x / TILE_WIDTH_HALF + y / TILE_HEIGHT_HALF) / 2;
    const tileY = (y / TILE_HEIGHT_HALF - x / TILE_WIDTH_HALF) / 2;

    return [tileX, tileY];
  }

  getScreenPoint(): ScreenPoint {
    return new ScreenPoint(
      (this.tileX - this.tileY) * this.TILE_WIDTH_HALF,
      (this.tileX + this.tileY) * this.TILE_HEIGHT_HALF
    );
  }
}

export class GridLayer extends Phaser.GameObjects.Graphics {
  private graphics;
  private lineWidth = 1;
  private color = 0xffffff;

  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  public draw(mapSize: MapSize) {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(this.lineWidth, this.color);

    const { rows, cols, tileWidth, tileHeight } = mapSize;
    for (let tileX = 0; tileX <= rows; tileX++) {
      const mapFrom = new MapPosition(tileX, 0, tileWidth, tileHeight);
      const mapTo = new MapPosition(tileX, cols, tileWidth, tileHeight);
      this.drawLine(mapFrom.getScreenPoint(), mapTo.getScreenPoint());
    }

    for (let tileY = 0; tileY <= cols; tileY++) {
      const mapFrom = new MapPosition(0, tileY, tileWidth, tileHeight);
      const mapTo = new MapPosition(rows, tileY, tileWidth, tileHeight);
      this.drawLine(mapFrom.getScreenPoint(), mapTo.getScreenPoint());
    }
  }

  private drawLine(from: ScreenPoint, to: ScreenPoint) {
    this.graphics.lineBetween(from.x, from.y, to.x, to.y);
  }
}
