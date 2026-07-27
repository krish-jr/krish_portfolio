import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const vertexShaderSource = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iChannel0;

void mainImage(out vec4 O, vec2 I)
{
    vec2 r = iResolution.xy,
         p = (I+I-r) / r.y * mat2(3.,4.,4.,-3.) / 1e2;

    vec4 S = vec4(0.0);
    // Vibrant deep red color tuning
    vec4 C = vec4(4.0, 1.0, 0.5, 0.0);
    vec4 W;

    for(float t=iTime, T=.1*t+p.y, i=0.; i<50.; i+=1.){
        S += (cos(W=sin(i)*C)+1.)
             * exp(sin(i+i*T))
             / length(max(p,
               p / vec2(2.0, texture(iChannel0, p/exp(W.x)+vec2(i,t)/8.).r*40.0)
             )) / 1e4;

        p += .02 * cos(i*(C.xz+8.0+i) + T + T);
    }

    vec3 rawCol = tanh((S*S).rgb);
    vec3 redCol = vec3(rawCol.r * 2.6 + rawCol.g * 1.2, rawCol.g * 0.1, rawCol.r * 0.2 + rawCol.b * 0.1);
    fragColor = vec4(redCol, 1.0);
}

void main() {
    mainImage(fragColor, gl_FragCoord.xy);
}
`;

export const Component = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    // Create shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Create 256x256 static noise texture for iChannel0
    const noiseData = new Uint8Array(256 * 256 * 4);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.floor(Math.random() * 256);
    }

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, noiseData);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Uniform locations
    const timeLocation = gl.getUniformLocation(program, 'iTime');
    const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const channel0Location = gl.getUniformLocation(program, 'iChannel0');

    gl.uniform1i(channel0Location, 0);

    let animationFrameId: number;
    const startTime = performance.now();

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const render = (now: number) => {
      handleResize();
      const time = (now - startTime) * 0.001;

      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div className={cn("w-full h-full relative overflow-hidden bg-black", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
