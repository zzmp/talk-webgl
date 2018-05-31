var canvas = document.querySelector('canvas');
var regl = createREGL({canvas: canvas});

var draw = regl({
  vert: `
    precision mediump float;
    attribute vec3 position;
    uniform mat4 model, view, projection;
    void main() {
      gl_Position = projection * view * model * vec4(position, 1);
    }`,

  frag: `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1, 1, 1, 1);
    }`,

  // this converts the vertices of the mesh into the position attribute
  attributes: {
    position: teapot.positions
  },

  // and this converts the faces fo the mesh into elements
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
    projection: ({viewportWidth, viewportHeight}) =>
      mat4.perspective([],
          Math.PI / 4,
          1, //viewportWidth / viewportHeight,
          0.01,
          1000)
  }
})

regl.frame(() => {
  regl.clear({
    depth: 1,
    color: [0, 0, 0, 1]
  })

  draw()
})

