/** CPU-generated surface maps and shaded sphere sprites. No downloaded imagery. */
const MAP_WIDTH = 384,
  MAP_HEIGHT = 192;
const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));
const smooth = (value: number) => value * value * (3 - 2 * value);
function hash(x: number, y: number, z: number) {
  let n =
    Math.imul(x, 374761393) ^
    Math.imul(y, 668265263) ^
    Math.imul(z, 1274126177);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}
function noise(x: number, y: number, z: number) {
  const ix = Math.floor(x),
    iy = Math.floor(y),
    iz = Math.floor(z);
  const sx = smooth(x - ix),
    sy = smooth(y - iy),
    sz = smooth(z - iz);
  let result = 0;
  for (let a = 0; a < 2; a++)
    for (let b = 0; b < 2; b++)
      for (let c = 0; c < 2; c++)
        result +=
          hash(ix + a, iy + b, iz + c) *
          (a ? sx : 1 - sx) *
          (b ? sy : 1 - sy) *
          (c ? sz : 1 - sz);
  return result;
}
function fractal(x: number, y: number, z: number) {
  let result = 0,
    weight = 0.55;
  for (let i = 0; i < 5; i++) {
    result += noise(x, y, z) * weight;
    x = x * 2.07 + 7.1;
    y = y * 2.07 - 3.7;
    z = z * 2.07 + 5.2;
    weight *= 0.48;
  }
  return result;
}

interface SurfaceMap {
  terrain: Float32Array;
  clouds: Float32Array;
}
let maps: SurfaceMap | undefined;
function surfaceMaps(): SurfaceMap {
  if (maps) return maps;
  const terrain = new Float32Array(MAP_WIDTH * MAP_HEIGHT);
  const clouds = new Float32Array(terrain.length);
  for (let y = 0; y < MAP_HEIGHT; y++) {
    const latitude = (y / (MAP_HEIGHT - 1)) * Math.PI;
    for (let x = 0; x < MAP_WIDTH; x++) {
      const longitude = (x / MAP_WIDTH) * Math.PI * 2;
      const nx = Math.sin(latitude) * Math.cos(longitude),
        ny = Math.cos(latitude),
        nz = Math.sin(latitude) * Math.sin(longitude);
      const i = y * MAP_WIDTH + x;
      terrain[i] = fractal(nx * 3.2 + 10, ny * 3.2 + 13, nz * 3.2 + 8);
      clouds[i] = fractal(
        nx * 5.7 + 30,
        ny * 7 + Math.sin(longitude * 3) * 0.5,
        nz * 5.7 - 12,
      );
    }
  }
  maps = { terrain, clouds };
  return maps;
}

function sample(map: Float32Array, u: number, v: number) {
  const px = (((u % 1) + 1) % 1) * MAP_WIDTH,
    py = clamp(v) * (MAP_HEIGHT - 1);
  const x = Math.floor(px),
    y = Math.floor(py),
    fx = px - x,
    fy = py - y;
  const nextX = (x + 1) % MAP_WIDTH,
    nextY = Math.min(y + 1, MAP_HEIGHT - 1);
  return (
    (map[y * MAP_WIDTH + x] * (1 - fx) + map[y * MAP_WIDTH + nextX] * fx) *
      (1 - fy) +
    (map[nextY * MAP_WIDTH + x] * (1 - fx) +
      map[nextY * MAP_WIDTH + nextX] * fx) *
      fy
  );
}

export class PlanetSurface {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private pixels: ImageData;
  private normals: Float32Array;
  private maps = surfaceMaps();
  private lastFrame = -Infinity;
  private lastLight = 0;

  constructor(
    private resolution: number,
    private kind: "ocean" | "moon",
  ) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = resolution;
    this.context = this.canvas.getContext("2d")!;
    this.pixels = this.context.createImageData(resolution, resolution);
    this.normals = new Float32Array(resolution * resolution * 3);
    for (let y = 0; y < resolution; y++)
      for (let x = 0; x < resolution; x++) {
        const nx = ((x + 0.5) / resolution) * 2 - 1,
          ny = ((y + 0.5) / resolution) * 2 - 1;
        const index = (y * resolution + x) * 3;
        this.normals[index] = nx;
        this.normals[index + 1] = ny;
        this.normals[index + 2] =
          nx * nx + ny * ny < 1 ? Math.sqrt(1 - nx * nx - ny * ny) : -1;
      }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    time: number,
    cameraYaw: number,
  ) {
    // Texture rotation runs at 10 fps; the sprite moves at the scene frame rate.
    const tick = Math.floor(time * 10);
    const lightAngle = Math.round(cameraYaw * 12) / 12;
    if (tick !== this.lastFrame || lightAngle !== this.lastLight) {
      this.paint(time, lightAngle);
      this.lastFrame = tick;
      this.lastLight = lightAngle;
    }
    if (this.kind === "ocean") {
      const glow = ctx.createRadialGradient(
        x,
        y,
        radius * 0.96,
        x,
        y,
        radius * 1.2,
      );
      glow.addColorStop(0, "#7baaff45");
      glow.addColorStop(0.3, "#477edb18");
      glow.addColorStop(1, "#477edb00");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.drawImage(this.canvas, x - radius, y - radius, radius * 2, radius * 2);
  }

  private paint(time: number, yaw: number) {
    const rotation = time * 0.025 + 0.6 + yaw * 0.12;
    const cr = Math.cos(rotation),
      sr = Math.sin(rotation);
    const lx = -0.68 * Math.cos(yaw * 0.4),
      ly = -0.43,
      lz = 0.59 + Math.sin(yaw * 0.4) * 0.12;
    const lightLength = Math.hypot(lx, ly, lz);
    const data = this.pixels.data;
    for (let i = 0; i < this.resolution * this.resolution; i++) {
      const nx = this.normals[i * 3],
        ny = this.normals[i * 3 + 1],
        nz = this.normals[i * 3 + 2];
      if (nz < 0) continue;
      const wx = nx * cr + nz * sr,
        wz = nz * cr - nx * sr;
      const u = Math.atan2(wz, wx) / (Math.PI * 2) + 0.5,
        v = Math.acos(-ny) / Math.PI;
      const height = sample(this.maps.terrain, u, v);
      const sun = (nx * lx + ny * ly + nz * lz) / lightLength;
      const daylight = clamp((sun + 0.08) / 0.2);
      const light = 0.035 + Math.max(0, sun) * 1.12;
      const ocean = this.kind === "ocean";
      const land = smooth(clamp((height - 0.475) * 25));
      const ice = clamp((Math.abs(ny) - 0.82) * 9);
      let r = ocean ? 12 + land * (40 + height * 35) : 75 + height * 110;
      let g = ocean ? 34 + land * (48 + height * 30) : 84 + height * 105;
      let b = ocean ? 70 + land * (20 + height * 28) : 104 + height * 105;
      if (ocean) {
        r += ice * 100;
        g += ice * 100;
        b += ice * 100;
        const cloud =
          clamp((sample(this.maps.clouds, u + time * 0.0013, v) - 0.49) * 9) *
          0.88;
        r = r * (1 - cloud) + 217 * cloud;
        g = g * (1 - cloud) + 230 * cloud;
        b = b * (1 - cloud) + 247 * cloud;
        const halfLength = Math.hypot(lx, ly, lz + 1);
        const specular =
          Math.pow(
            Math.max(0, (nx * lx + ny * ly + nz * (lz + 1)) / halfLength),
            65,
          ) *
          (1 - land) *
          (1 - cloud) *
          95;
        r += specular;
        g += specular;
        b += specular;
      }
      // Small terrain gradients add surface relief without outlines or grid lines.
      const relief = clamp(
        (sample(this.maps.terrain, u + 0.004, v) - height) * 8,
        -0.2,
        0.2,
      );
      const illumination = Math.max(0.025, light + relief * daylight);
      const atmosphere = ocean ? Math.pow(1 - nz, 3) * daylight : 0;
      data[i * 4] = clamp((r * illumination + atmosphere * 55) / 255) * 255;
      data[i * 4 + 1] =
        clamp((g * illumination + atmosphere * 110) / 255) * 255;
      data[i * 4 + 2] =
        clamp((b * illumination + atmosphere * 195) / 255) * 255;
      data[i * 4 + 3] = clamp(nz * this.resolution * 0.55) * 255;
    }
    this.context.putImageData(this.pixels, 0, 0);
  }
}
