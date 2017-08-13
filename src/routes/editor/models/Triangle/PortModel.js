import * as SRD from 'react-js-diagrams'
import * as _ from 'lodash'

export default class PortModel extends SRD.PortModel {
  constructor(pos = 'top') {
    super(pos)
    this.position = pos
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position,
    })
  }

  deSerialize(data) {
    super.deSerialize(data)
    this.position = data.position
  }
}
