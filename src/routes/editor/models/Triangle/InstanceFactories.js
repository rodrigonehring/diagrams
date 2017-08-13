import * as SRD from 'react-js-diagrams'
import NodeModel from './NodeModel'
import PortModel from './PortModel'

export class NodeFactory extends SRD.AbstractInstanceFactory {
  constructor() {
    super('NodeModel')
  }

  getInstance() {
    return new NodeModel()
  }
}

export class PortFactory extends SRD.AbstractInstanceFactory {
  constructor() {
    super('PortModel')
  }

  getInstance() {
    return new PortModel()
  }
}
