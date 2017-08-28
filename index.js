'use strict'

const fs = require('fs')

const protobuf = require('protobufjs')

module.exports = ({ root, file, throws = true }) => {
  const protoRoot = new protobuf.Root()
  protoRoot.resolvePath = (origin, target) => {
    const normOrigin = protobuf.util.path.normalize(origin)
    const normTarget = protobuf.util.path.normalize(target)

    let resolved = protobuf.util.path.resolve(normOrigin, normTarget, true)
    const idx = resolved.lastIndexOf('google/protobuf/')
    if (idx > -1) {
      const altname = resolved.substring(idx)
      if (altname in protobuf.common) {
        resolved = altname
      }
    }

    if (fs.existsSync(resolved)) {
      return resolved
    }

    const iresolved = protobuf.util.path.resolve(`${root}/`, target)
    if (fs.existsSync(iresolved)) {
      return iresolved
    }

    return resolved
  }
  const protos = protoRoot.loadSync(file)
  return (message, obj) => {
    const result = protos.lookupType(message).verify(obj)
    if (result && throws) {
      throw new Error(result)
    }
    return result
  }
}
