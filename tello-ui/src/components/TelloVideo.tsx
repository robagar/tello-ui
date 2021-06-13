import React, { useRef, useEffect } from 'react'
import { useTello } from '../providers/TelloProvider'

export interface TelloVideoProps {
  width?: number;
  height?: number;
}


function TelloVideo(props:TelloVideoProps) {

  const { websocket } = useTello();

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
    context.fillStyle = '#00f'
    context.fillRect(0, 0, width, height)
  }, [width, height])

  useEffect(() => {
    if (!websocket) return;

    websocket.onmessage = (event:MessageEvent) => {
      // console.info(`[TelloProvider] MESSAGE`, event)
      const canvas = canvasRef.current
      if (!canvas) return;
      const context = canvas.getContext('2d')
      if (!context) return;
      try { 
        const { data } = event;
        data.arrayBuffer().then((buffer:ArrayBuffer) => {
          const rgb = new Uint8Array(buffer);
          const n = 4 * 960 * 720;
          const rgba = new Uint8ClampedArray(n)

          let i = 0, j = 0;
          while (i < n) {
            rgba[i++] = rgb[j++];
            rgba[i++] = rgb[j++];
            rgba[i++] = rgb[j++];
            rgba[i++] = 0xff;  
          }

          const frame = new ImageData(rgba, 960, 720)
          context.putImageData(frame, 0, 0);
        });
      }
      catch(e) {
        console.error(e);
      }
    }

  }, [websocket]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  )
}

export default TelloVideo;