import React, { useEffect, useRef, useState } from 'react';

export const InteractiveBubbles = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const bubblesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const animationFrameRef = useRef();
  
  class Bubble {
    constructor(x, y, radius, dx, dy, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.originalRadius = radius;
      this.dx = dx;
      this.dy = dy;
      this.color = color;
      this.alpha = 0.6;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
      ctx.closePath();
    }

    update(ctx, mouse, width, height) {
      if (this.x + this.radius > width || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > height || this.y - this.radius < 0) this.dy = -this.dy;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius + this.radius) {
        if (mouse.x < this.x && this.x < width - this.radius * 10) {
          this.x += 10;
        }
        if (mouse.x > this.x && this.x > this.radius * 10) {
          this.x -= 10;
        }
        if (mouse.y < this.y && this.y < height - this.radius * 10) {
          this.y += 10;
        }
        if (mouse.y > this.y && this.y > this.radius * 10) {
          this.y -= 10;
        }
      }

      this.x += this.dx;
      this.y += this.dy;

      this.radius = this.originalRadius + Math.sin(Date.now() / 1000) * 2;
      this.alpha = 0.6 + Math.sin(Date.now() / 1000) * 0.2;

      this.draw(ctx);
    }
  }

  const initBubbles = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
    const bubbles = [];
    const numberOfBubbles = Math.floor((dimensions.width * dimensions.height) / 20000);

    for (let i = 0; i < numberOfBubbles; i++) {
      const radius = Math.random() * 20 + 10;
      const x = Math.random() * (dimensions.width - radius * 2) + radius;
      const y = Math.random() * (dimensions.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      bubbles.push(new Bubble(x, y, radius, dx, dy, color));
    }
    
    bubblesRef.current = bubbles;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#4a4a4a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    bubblesRef.current.forEach(bubble => {
      bubble.update(ctx, mouseRef.current, dimensions.width, dimensions.height);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      const canvas = canvasRef.current;
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      
      initBubbles();
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: isDragging ? 150 : 100
    };
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0, radius: 0 };
    setIsDragging(false);
  };

  return (
    <div className="background-wrapper">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};