import * as SRD from 'react-js-diagrams'
import { DiamondNodeModel } from './DiamondNodeModel'
import { DiamondPortModel } from './DiamondPortModel'

export class DiamondNodeFactory extends SRD.AbstractInstanceFactory {
  constructor() {
    super('DiamondNodeModel')
  }

  getInstance() {
    return new DiamondNodeModel()
  }
}

export class DiamondPortFactory extends SRD.AbstractInstanceFactory {
  constructor() {
    super('DiamondPortModel')
  }

  getInstance() {
    return new DiamondPortModel()
  }
}
