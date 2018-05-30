# State of WebGL
- Gain a basic understanding of 3D, and how WebGL fits into that
- Introduce major formats and frameworks
- ...and render the [Utah Teapot](https://www.sjbaker.org/wiki/index.php?title=The_History_of_The_Teapot)!

## What is 3D?
### Ray Tracing
![Ray casting from the camera][https://www.cs.unc.edu/~rademach/xroads-RT/RTfigs-jpg/RTfigure6.jpg]
Ray tracing follows each pixel's reflections and refractions from the camera.
It is expensive. It is usually performed on the CPU because of frequent memory lookups. (This may not be true anymore.)

### Rasterization
![Rasterization of a triangle][https://www.scratchapixel.com/images/upload/rasterization/rasterization-triangle1.png]
Rasterization converts objects to 2D, retaining color/depth/transparency.
It "cheats" a lot, because it does not directly model a physical system. This allows for computational speedups.

## What is WebGL?
*[MDN Web Docs](mdn.io/webgl)*

An sandboxxed HTML5 canvas renderer based on OpenGL ES 2.0. In other words, it's baked into the browser!

### What is OpenGL?
[An API for interacting with the GPU to achieve hardware-accelerated rendering](https://en.wikipedia.org/wiki/OpenGL).
An open API specification by the [Khronos group](https://www.khronos.org/).

GPUs are hardward specialized for rasterization of triangle meshes.

- Define and compile shaders to be run on the GPU
  - Vertex Shader: Transform meshes to vertices
  - Fragment/Pixel Shader: Render points between vertices
- Transfer Meshes to the GPU
  - GPU holds everything in resident memory - transfer is a large cost
  - Meshes are composed of vertex buffers and textures
- Render!

## Questions?

---

# State of WebGL

## 3D Formats
### Assets
#### FBX
- Proprietary
- May include animations
- Many custom extensions

#### OBJ
- Open
- Only includes geometry

### Scenes
#### OpenSceneGraph
- Used by SketchFab
- Not web-optimized

### glTF
- A new open format specification by the [Khronos group](https://www.khronos.org/)
- JSON-based, with supporting binary and visual assets
- May include animations
- May include compression (DRACO)
- Only supports a restricted subset of shaders

## 3D Creation
### Unity
- Captured ecosystem: exports in .unity format
- Some assets may be exported as FBX/OBJ/etc.
- [Restricted subset may be exported **as a scene** as glTF](https://github.com/zzmp/UnityGLTF)

## Questions?

---

## 3D Display
*i.e. Frameworks*

### Raw WebGL
- [No](https://regl-project.github.io/regl/www/compare.html)
- Lots of stateful calls: GL is not at the level of abstraction typical of JS

### [OSG.JS](http://osgjs.org/)
- Used in SketchFab
- Based on OpenSceneGraph

### [THREE.js](https://threejs.org/)
- Monolithic
- Industry standard for general work
- Supports most formats
  - Includes a GLTF Reader/Writer

[Let's make a teapot!](./index.html)
<!-- TODO: Copy ./teapot.three.js into the console for this demo -->

### [👑 regl](http://regl.party/)
> [you can't improve what's already perfect 😎](https://gitter.im/mikolalysenko/regl?at=59826511614889d475132d85)
- It has since had 77 new commits, including [my addition of BitMap support](https://github.com/regl-project/regl/pull/470)
- The internet is forever...

- Functional
- Supporting packages on npm
- Meshes are not native
  - Joining geometries to textures is a manual effort
  - *This may be outdated*
- Faster, but requires more technical knowledge / effort

[Let's make a teapot!](./index.html)
<!-- TODO: Copy ./teapot.regl.js into the console for this demo -->

### etc.
#### Babylon.js
- Game framework (out of scope)
#### A-Frame
- AR framework by [Mozilla](https://www.mozilla.org/) (out of scope)

## Challenges
### Complexity
- Just use THREE.js...

### Timing

#### Initial Load Time
- Network Cost
- GPU Tx Cost

![Synchronous load - note the idle time][TODO]
[Let's load a mesh naively!](./mesh.sync.html)

![Asynchronous load][TODO]
[Let's load the texture while transferring the geometry to the GPU!](./mesh.async.html).

##### Other strategies
- Texture compression (ffmpeg/avconv)
  - Retain a power-of-two size for best GPU performance
- Mesh decimation (custom libs or services)

##### Esoteric strategies
- Preprocessing to BitmapImage
  - Only relevant when images can be preloaded

## Questions?
