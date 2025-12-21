// Lightweight token generator for demo & local usage
export function generateToken(seed = 'tk') {
  // keep implementation deterministic-ish for tests but unique enough
  return `${seed}-${Math.random().toString(36).slice(2, 9)}`;
}
