import lightgl from '../../libs/lightgl'
import {times} from 'lodash'

import birdGeometry from '../geometry/birdTest01.json'
import {parse} from '../utils/houdiniJSON'

const points = parse(birdGeometry).points

export default function BirdMesh(size) {
  var mesh = new lightgl.Mesh({
    coords: false,
    triangles: false
  })

  mesh.addVertexBuffer('texcoords', 'texcoord');

  times(size * size, i => {
    const index = i % points.length;
    const point = points[index];

    const coord = {
      x: (i % 256) / 256,
      y: Math.floor(i / 256) / 256
    }

    mesh.vertices.push([point[0], point[1], point[2]]);
    mesh.texcoords.push([coord.x, coord.y]);
  })

  mesh.compile()

  return mesh
}
