import React from 'react'

// https://remysharp.com/2010/07/21/throttling-function-calls
function debounce (fn, delay) {
  var timer = null
  return function () {
    var context = this; var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

function CanvasComponent (props) {
  let canvas = null

  let callback = null
  if (props.onChange) {
    callback = debounce(function () {
      props.onChange(canvas.toDataURL())
    }, 250)
  }

  function onPointerMove (e) {
    const ctx = canvas.getContext('2d')

    const rect = canvas.getBoundingClientRect()

    ctx.lineWidth = props.lineWidth || 4
    ctx.strokeStyle = props.lineColor || 'black'
    if (e.buttons === 1) {
      ctx.lineTo((e.pageX - rect.left - window.scrollX) * 2, (e.pageY - rect.top - window.scrollY) * 2)
      ctx.stroke()

      callback()
    } else {
      ctx.closePath()
      ctx.beginPath()
    }
  }

  function insertImage (canvas) {
    if (props.image) {
      const img = new Image()
      img.onload = function () {
        canvas.getContext('2d').drawImage(img, 0, 0)
      }
      img.src = props.image
    }
  }

  return (
    <canvas
      className='drawingCanvas'
      ref={(node) => {
        canvas = node
        insertImage(node)
      }}
      onPointerMove={onPointerMove}
      width={props.width * 2}
      height={props.height * 2}
      style={{ background: 'white', width: props.width, height: props.height }}
    />
  )
}

export default CanvasComponent
