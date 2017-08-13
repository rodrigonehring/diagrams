import * as React from 'react'
import * as SRD from 'react-js-diagrams'

function getPolygon(size) {
  return `0,${size/2} ${size/2},0 ${size},${size/2} ${size/2},${size}`
}
 
export class NodeWidget extends React.Component  {
  static defaultProps = {
    node: null,
  }

  render() {
    const { node, diagramEngine } = this.props
    const { name, size = 150 } = node.extras
    const { colorBackground, colorBorder, colorText } = node.extras
    // debugger

    const wrapperStyle = { width: size, height: size, position: 'relative' }

    return (
      <div style={wrapperStyle} className="node square-node" onDoubleClick={() => diagramEngine.openDialogCreate(node)}>
        <svg width={size} height={size}>

          <g>
            <polygon fill={colorBackground} stroke={colorBorder} strokeWidth="3" strokeMiterlimit="10" points={getPolygon(size)} />
          </g>

          <g>
            <text y={size/2} transform={`translate(${size/2})`} fill={colorText}>
              <tspan textAnchor="middle">{name}</tspan>
            </text>
          </g>

        </svg>
        <div className="node-port" style={{ position: 'absolute', zIndex: 100, top: size - 10, left: size / 2 - 9 }}>
          <SRD.PortWidget name="bottom" node={node} />
        </div>
        <div className="node-port" style={{ position: 'absolute', zIndex: 100, top: -7, left: size / 2 - 9 }}>
          <SRD.PortWidget name="top" node={node} />
        </div>
        <div className="node-port" style={{ position: 'absolute', zIndex: 100, top: size / 2 - 9, left: -9 }}>
          <SRD.PortWidget name="left" node={node} />
        </div>
        <div className="node-port" style={{ position: 'absolute', zIndex: 100, top: size / 2 - 9, left: size - 9  }}>
          <SRD.PortWidget name="right" node={node} />
        </div>
      </div>
    )
  }
}

export default React.createFactory(NodeWidget)
