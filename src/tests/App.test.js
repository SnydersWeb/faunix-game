import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

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
  const handleEvent = jest.fn();
  
  render(<App 
      gameState={initialGameState}
      startGame={handleEvent}
      moveShip={handleEvent}
      shoot={handleEvent}
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
  expect(handleEvent).toHaveBeenCalledTimes(6)

});
