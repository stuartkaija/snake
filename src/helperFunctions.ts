export const generateRandomCoordinates = (gridSize: number): [number, number] => {
  const randomRow = Math.floor(Math.random() * gridSize);
  const randomCol = Math.floor(Math.random() * gridSize);
  return [randomRow, randomCol];
}