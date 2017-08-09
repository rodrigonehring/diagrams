import * as SRD from 'react-js-diagrams'
import { DiamonNodeWidgetFactory } from './DiamondNodeWidget'

export class DiamondWidgetFactory extends SRD.NodeWidgetFactory {
  constructor() {
    super('diamond')
  }

  generateReactWidget(diagramEngine, node) {
    return DiamonNodeWidgetFactory({ node })
  }
}
