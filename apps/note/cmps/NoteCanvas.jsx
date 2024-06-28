const { useRef, useEffect, useState } = React

export function NoteCanvas({ title, canvasData,style }) {
    const canvasRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (canvasData) {
            const image = new Image()
            image.onload = () => {
                context.drawImage(image, 0, 0)
            }
            image.src = canvasData
        }

        let drawing = false

        const startDrawing = (e) => {
            if (!isDrawing) return
            drawing = true
            draw(e)
        }

        const finishDrawing = () => {
            drawing = false
            context.beginPath()
        }

        const draw = (e) => {
            if (!drawing) return
            context.lineWidth = 5
            context.lineCap = 'round'
            context.strokeStyle = 'black'

            context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
            context.stroke()
            context.beginPath()
            context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
        }

        canvas.addEventListener('mousedown', startDrawing)
        canvas.addEventListener('mouseup', finishDrawing)
        canvas.addEventListener('mousemove', draw)

        return () => {
            canvas.removeEventListener('mousedown', startDrawing)
            canvas.removeEventListener('mouseup', finishDrawing)
            canvas.removeEventListener('mousemove', draw)
        }
    }, [canvasData, isDrawing])
    const clearCanvas = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
    }
    const toggleDrawing = () => {
        setIsDrawing(!isDrawing)
    }
    return (
        <div className="note-canvas" style={style}>
            <h3>{title}</h3>
            <canvas ref={canvasRef} width={300} height={200} style={{ border: '1px solid black' }} />
            <button onClick={clearCanvas}>Clear Canvas</button>
            <button onClick={toggleDrawing}>{isDrawing ? <img src ="assets/img/pen (1).png" /> : <img src ="assets/img/pen.png"  />}</button>
        </div>
    )
}