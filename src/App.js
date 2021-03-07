import './App.css'

import DrawingCanvas from './canvasComponent.js'

function App () {
  return (
    <div className='App'>
      <DrawingCanvas
        width={500}
        height={500}
        lineWidth={10}
        lineColor='darkorange'
        image=''
        onChange={(data) => { console.log(data.substring(0, 1000)) }}
      />
    </div>
  )
}

export default App
