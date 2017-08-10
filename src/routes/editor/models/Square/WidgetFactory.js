import * as SRD from 'react-js-diagrams'
import NodeWidgetFactory from './NodeWidget'

export default class WidgetFactory extends SRD.NodeWidgetFactory {
  constructor() {
    super('square')
  }

  generateReactWidget(diagramEngine, node) {
    return NodeWidgetFactory({ node })
  }
}
