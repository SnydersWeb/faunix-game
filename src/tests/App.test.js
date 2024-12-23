import { render, screen, fireEvent } from '@testing-library/react';
import { calculateCanvas, storeCanvas } from '../utils/canvasFunctions';
import App from '../App';

window.innerHeight = 658;
window.innerWidth = 873;
const canvasSize = calculateCanvas();
storeCanvas(canvasSize);

const initialGameState = {
  started: false,
  shotsRemaining: 100,
  startTime: 0,
  endTime: 0,
  score: 0,
  highScore: 0,
  shipPosition: {
      x: 50,
      y: 100,
  },
  shipMoving: 'none',
  shipFire: [],
  birds: [],
};

test('Renders the canvas', () => {
  const handleEvent = () => {};
  
  render(<App 
      gameState={initialGameState}
      startGame={handleEvent}
      moveShip={handleEvent}
      shoot={handleEvent}
      moveObjects={handleEvent}
  />);

  const appElement = screen.getByTestId(/fauxnix-app/i);
  expect(appElement).toBeInTheDocument();

});

test('Tests Events', () => {
  const handleStartEvent = jest.fn();
  const handleMoveEvent = jest.fn();
  const handleShootEvent = jest.fn();
  
  render(<App 
      gameState={initialGameState}
      startGame={handleStartEvent}
      moveShip={handleMoveEvent}
      shoot={handleShootEvent}
      moveObjects={() => {}}
  />);

  const appElement = screen.getByTestId(/fauxnix-app/i);
  
  fireEvent.keyDown(appElement, {key: 'ArrowRight', code: 'ArrowRight'});
  fireEvent.keyDown(appElement, {key: 'ArrowLeft', code: 'ArrowLeft'});
  fireEvent.keyDown(appElement, {key: 'ArrowUp', code: 'ArrowUp'});
  fireEvent.keyDown(appElement, {key: ' ', code: 'Space'});
  fireEvent.keyUp(appElement, {key: 'ArrowRight', code: 'ArrowRight'});
  fireEvent.keyUp(appElement, {key: 'ArrowLeft', code: 'ArrowLeft'});
  fireEvent.keyUp(appElement, {key: 'Enter', code: 'Enter'});
  expect(handleStartEvent).toHaveBeenCalledTimes(2);
  expect(handleMoveEvent).toHaveBeenCalledTimes(4);
  expect(handleShootEvent).toHaveBeenCalledTimes(0);

});

test('Tests Events with Game Started', () => {
  const handleStartEvent = jest.fn();
  const handleMoveEvent = jest.fn();
  const handleShootEvent = jest.fn();
  const newGameState = { ...initialGameState, started: true, };
  
  render(<App 
      gameState={newGameState}
      startGame={handleStartEvent}
      moveShip={handleMoveEvent}
      shoot={handleShootEvent}
      moveObjects={() => {}}
  />);

  const appElement = screen.getByTestId(/fauxnix-app/i);
  
  fireEvent.keyDown(appElement, {key: 'ArrowRight', code: 'ArrowRight'});
  fireEvent.keyDown(appElement, {key: 'ArrowLeft', code: 'ArrowLeft'});
  fireEvent.keyDown(appElement, {key: 'ArrowUp', code: 'ArrowUp'});
  fireEvent.keyDown(appElement, {key: ' ', code: 'Space'});
  fireEvent.keyUp(appElement, {key: 'ArrowRight', code: 'ArrowRight'});
  fireEvent.keyUp(appElement, {key: 'ArrowLeft', code: 'ArrowLeft'});
  fireEvent.keyUp(appElement, {key: 'Enter', code: 'Enter'});
  expect(handleStartEvent).toHaveBeenCalledTimes(0);
  expect(handleMoveEvent).toHaveBeenCalledTimes(4);
  expect(handleShootEvent).toHaveBeenCalledTimes(2);

});
