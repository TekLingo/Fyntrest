import React, { useEffect, useRef } from 'react';
import '../index.css'; // Import custom CSS (for canvas styling if needed)

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const navHeight = 80;
    const waveStretch = 10;
    const waveLength = 0.01;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawWaves() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < window.innerWidth; i += 0.5) {
        context.save();
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, navHeight + Math.sin(i * waveLength) * waveStretch);
        context.strokeStyle = '#2980B9';
        context.stroke();
        context.closePath();
        context.restore();
      }
    }

    drawWaves();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="fixed top-0 left-0 z-[-1]" />
      <nav className="flex py-2 px-4 h-16 bg-transparent">
        <ul className="flex flex-1 justify-center space-x-8 text-white">
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
