import * as THREE from 'three';

export const palette = {
  ink: '#0E0E0F',
  ink2: '#16161A',
  bone: '#F4F1EA',
  dust: '#7E776A',
  copper: '#D8754A',
  ubBlue: '#005BBB',
} as const;

export const color = (k: keyof typeof palette) => new THREE.Color(palette[k]);
