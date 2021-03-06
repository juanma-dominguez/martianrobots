import Robot from '../../domain/models/robot';
import { coordinates, posVector } from '../../domain/types';
import { Command } from './interface';

export default class ForwardCommand implements Command {
  robot: Robot;
  position: posVector;
  constructor(robot: Robot) {
    this.robot = robot;
    this.position = robot.getPosition();
  }
  execute() {
    const direction = this.position.d;
    if (direction === 'N') {
      this.position.y += 1;
    } else if (direction === 'E') {
      this.position.x += 1;
    } else if (direction === 'S') {
      this.position.y -= 1;
    } else if (direction === 'W') {
      this.position.x -= 1;
    }
    if (
      this.robot.board.isOutside({
        x: this.position.x,
        y: this.position.y,
      })
    ) {
      const coordinate: coordinates = this.robot.getCoordinate();
      if (!this.robot.board.isClosePosition(coordinate)) {
        this.robot.board.setClosePosition(coordinate);
        this.robot.setLost();
      }
    } else {
      this.robot.setPosition({
        x: this.position.x,
        y: this.position.y,
      });
    }
  }
}
