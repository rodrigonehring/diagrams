import React from 'react'
import * as RJD from 'react-js-diagrams'

// custom models
import ModelSquare from './models/Square'
import ModelTriangle from './models/Triangle'
import ModelDiamond from './models/Diamond'


function getCorrectType(type) {
  switch (type) {
    case 'square':
      return new ModelSquare.NodeModel()
    case 'triangle':
      return new ModelTriangle.NodeModel()
    case 'diamond':
      return new ModelDiamond.NodeModel()
    default:
      return new ModelSquare.NodeModel()
  }
}

export default class Diagram extends React.Component {
  constructor(props) {
    super(props)

    // para conseguir ver com ref da instance deste component
    this.serialize = this.serialize
    this.create = this.create

    // Setup the diagram engine
    this.engine = new RJD.DiagramEngine()
    this.engine.registerNodeFactory(new RJD.DefaultNodeFactory())
    this.engine.registerLinkFactory(new RJD.DefaultLinkFactory())
    this.engine.registerNodeFactory(new ModelSquare.WidgetFactory())
    this.engine.registerNodeFactory(new ModelTriangle.WidgetFactory())
    this.engine.registerNodeFactory(new ModelDiamond.WidgetFactory())

    // to arrive in nodes level
    this.engine.openDialogCreate = props.openDialogCreate

    props.model ? this.serialize(props.model) : this.createEmpty()
  }

  create = (type, data = {}) => {
    // Create the quare node
    const newNode = getCorrectType(type)
    newNode.x = 50
    newNode.y = 50
    newNode.extras = { ...data }

    this.model.addNode(newNode)
  }

  createEmpty() {
    // Setup the diagram model
    this.model = new RJD.DiagramModel()
  }

  // Serialize, deSerialize the model
  serialize(str) {
    const { engine, model } = this

    // We need this to help the system know what models to create form the JSON
    engine.registerInstanceFactory(new RJD.DefaultNodeInstanceFactory())
    engine.registerInstanceFactory(new RJD.DefaultPortInstanceFactory())
    engine.registerInstanceFactory(new RJD.LinkInstanceFactory())

    engine.registerInstanceFactory(new ModelSquare.NodeFactory())
    engine.registerInstanceFactory(new ModelSquare.PortFactory())

    engine.registerInstanceFactory(new ModelTriangle.NodeFactory())
    engine.registerInstanceFactory(new ModelTriangle.PortFactory())

    engine.registerInstanceFactory(new ModelDiamond.NodeFactory())
    engine.registerInstanceFactory(new ModelDiamond.PortFactory())

    // Serialize the model
    if (!str) {
      return JSON.stringify(model.serializeDiagram())
    }

    // deserialize
    this.model = new RJD.DiagramModel()
    this.model.deSerializeDiagram(JSON.parse(str), engine)
  }

  render() {
    const { engine, model } = this

    engine.setDiagramModel(model)

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
