import lightgl from '../../libs/lightgl'
import {times, isString} from 'lodash'

const geometryContext = require.context('../geometry');
const parseContext = require.context('../utils');

function loadGeometry(name, callback) {
  if(!isString(name)) {
    return callback(name)
  }

  fetch(geometryContext(`./${name}.json`)).then(data => {
    return data.json();
  }).then(geometry => callback(geometry))
}

export default function GeometryMesh(geometryName, size=256, parser='houdiniJSON') {
  var mesh = new lightgl.Mesh({
    coords: false,
    triangles: false
  })

  mesh.addVertexBuffer('texcoords', 'texcoord');

  const geometry = loadGeometry(geometryName, geometry => {
    const parse = parseContext(`./${parser}.js`).parse;
    const points = parse(geometry).points;

    times(size * size, i => {
      const index = i % points.length;
      const point = points[index];

      const coord = {
        x: (i % size) / size,
        y: Math.floor(i / size) / size
      }

      mesh.vertices.push([point[0], point[1], point[2]]);
      mesh.texcoords.push([coord.x, coord.y]);
    })

    mesh.compile()
    mesh.changed = true;
  });

  return mesh
}
