import './App.css'

import DrawingCanvas from './canvasComponent.js'

function App () {
  return (
    <div className='App'>
      <DrawingCanvas
        width={800}
        height={600}
        lineWidth={10}
        lineColor='darkorange'
        image=''
        onChange={(data) => { console.log(data.substring(0, 1000)) }}
      />
    </div>
  )
}

export default App
