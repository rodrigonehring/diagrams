import * as SRD from 'react-js-diagrams'
import PortModel from './PortModel'

export default class NodeModel extends SRD.NodeModel {
  constructor() {
    super('square')
    this.addPort(new PortModel('top'))
    this.addPort(new PortModel('left'))
    this.addPort(new PortModel('bottom'))
    this.addPort(new PortModel('right'))
  }
}
