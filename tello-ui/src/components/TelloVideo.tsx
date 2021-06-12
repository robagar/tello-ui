import React, { useRef, useEffect } from 'react'

export interface TelloVideoProps {
  width?: number;
  height?: number;
}


function TelloVideo(props:TelloVideoProps) {

  const {
    width = 960,
    height = 720
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const context = canvas.getContext('2d')
    if (!context) return;
    //Our first draw
    context.fillStyle = '#00f'
    context.fillRect(0, 0, width, height)
  }, [width, height])

  return (
    <canvas ref={canvasRef} width={width} height={height} />
  )
}

export default TelloVideo;