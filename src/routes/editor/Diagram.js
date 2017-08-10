import React from 'react'
import * as RJD from 'react-js-diagrams'

import { DiamondNodeModel } from './models/Diamond/DiamondNodeModel'
import { DiamondWidgetFactory } from './models/Diamond/DiamondWidgetFactory'
import { DiamondNodeFactory, DiamondPortFactory } from './models/Diamond/DiamondInstanceFactories'

// custom models
import ModelSquare from './models/Square'
// const ModelSquare = {}

export default class Diagram extends React.Component {
  constructor(props) {
    super(props)
    let a = ModelSquare
    console.log(a)

    // para conseguir ver com ref da instance deste component
    this.serialize = this.serialize

    // Setup the diagram engine
    this.engine = new RJD.DiagramEngine()
    this.engine.registerNodeFactory(new RJD.DefaultNodeFactory())
    this.engine.registerLinkFactory(new RJD.DefaultLinkFactory())
    this.engine.registerNodeFactory(new DiamondWidgetFactory())
    this.engine.registerNodeFactory(new ModelSquare.WidgetFactory())

    props.model ? this.serialize(props.model) : this.createEmpty()
  }

  createEmpty() {
    // Setup the diagram model
    this.model = new RJD.DiagramModel()

    const node1 = this.createNode({
      name: 'Node 1',
      color: 'rgb(0, 192, 255)',
      x: 100,
      y: 100
    })

    const node2 = this.createNode({
      name: 'Node 2',
      color: 'rgb(0, 192, 0)',
      x: 200,
      y: 100
    })

    // Create the diamond node
    const diamondNode = new DiamondNodeModel()
    diamondNode.x = 400
    diamondNode.y = 100

    // Create the quare node
    const squareNode = new ModelSquare.NodeModel()
    squareNode.x = 50
    squareNode.y = 50


    this.model.addNode(diamondNode)
    this.model.addNode(squareNode)
    this.model.addNode(node1)
    this.model.addNode(node2)
  }

  // Serialize, deSerialize the model
  serialize(str) {
    const { engine, model } = this

    // We need this to help the system know what models to create form the JSON
    engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory())
    engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory())
    engine.registerInstanceFactory(new RJD.LinkInstanceFactory())
    engine.registerInstanceFactory(new DiamondNodeFactory())
    engine.registerInstanceFactory(new DiamondPortFactory())

    engine.registerInstanceFactory(new ModelSquare.NodeFactory())
    engine.registerInstanceFactory(new ModelSquare.PortFactory())

    // Serialize the model
    if (!str) {
      return JSON.stringify(model.serializeDiagram())
    }

    // deserialize
    this.model = new RJD.DiagramModel()
    this.model.deSerializeDiagram(JSON.parse(str), engine)

  }

  createNode(options) {
    const { name, color, x, y } = options
    var node = new RJD.DefaultNodeModel(name, color)
    node.x = x
    node.y = y
    return node
   }

  render() {
    const { engine, model } = this

    engine.setDiagramModel(model)

    console.log('render diagram')
    return (
      <RJD.DiagramWidget
        diagramEngine={engine}
        actions={{
          canvasDrag: false,
          zoom: false,
        }}
      />
    )
  }
}
