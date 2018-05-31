var canvas = document.querySelector('canvas');
var regl = createREGL({canvas: canvas});

var draw = regl({
  // vertex shader
  vert: `
    precision mediump float;
    attribute vec3 position;
    uniform mat4 model, view, projection;
    void main() {
      gl_Position = projection * view * model * vec4(position, 1);
    }`,

  // fragment shader
  frag: `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1, 1, 1, 1);
    }`,

  // convert the vertices of the mesh into the position attribute
  attributes: {
    position: teapot.positions
  },

  // convert the faces fo the mesh into elements (i.e. triangles)
  elements: teapot.cells,

  uniforms: {
    model: mat4.identity([]),
    view: ({tick}) => {
      var t = 0.01 * tick
        return mat4.lookAt([],
            [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
            [0, 2.5, 0],
            [0, 1, 0])
    },
    projection: () => {
      mat4.perspective([],
          Math.PI / 4,
          1,
          0.01,
          1000)
  }
})

// regl provides an abstraction over requestAnimationFrame
regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  draw()
})

