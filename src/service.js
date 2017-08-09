import ls from 'local-storage'

const DGM = 'diagrams'

export function getDiagrams() {
  return new Promise((resolve, reject) => {
    resolve(ls(DGM) || [])
  })
}

export function getDiagram(id) {
  return new Promise((resolve, reject) => {
    const diagrams = ls(DGM) || []
    const diagram = diagrams.find(item => item.id === parseInt(id))

    if (!diagram) {
      return reject('not_found')
    }

    resolve(diagram)
  })
}

export function createDiagram({ name }) {
  return new Promise((resolve, reject) => {
    const diagrams = ls(DGM) || []
    const diagram = {
      name,
      id: diagrams.length ? Math.max.apply(Math, diagrams.map(i => i.id)) + 1 : 1, // get the biggest value plus one
      createdAt: new Date().toString(),
    }

    // save
    ls(DGM, [ ...diagrams, diagram ])

    resolve()
  })
}

export function updateDiagram({ id, ...newProps }) {
  return new Promise((resolve, reject) => {
    const diagrams = ls(DGM) || []
    const diagram = diagrams.find(item => item.id === parseInt(id))

    if (!diagram) {
      return reject('not_found')
    }

    // save
    ls(DGM, diagrams.map(item => item.id === id ? ({ ...item, ...newProps }) : ({ ...item })))

    resolve()
  })
}

export function deleteDiagram(id) {
  return new Promise((resolve, reject) => {
    const diagrams = ls(DGM) || []

    // save
    ls(DGM, [ ...diagrams.filter(item => item.id !== id) ])

    resolve()
  })
}
