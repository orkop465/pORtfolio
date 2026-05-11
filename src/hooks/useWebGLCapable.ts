import { useState } from 'react';

let cached: boolean | null = null;

function check(): boolean {
  if (cached !== null) return cached;
  if (typeof window === 'undefined' || typeof document === 'undefined') return (cached = false);
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    cached = !!gl;
  } catch {
    cached = false;
  }
  return cached;
}

export function useWebGLCapable(): boolean {
  const [ok] = useState<boolean>(() => check());
  return ok;
}
