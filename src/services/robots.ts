import commands from '../application/commands';
import Board from '../domain/models/board';
import Robot from '../domain/models/robot';
import { posVector } from '../domain/types';

const letterToCommands: any = {
  L: commands.LeftCommand,
  R: commands.RightCommand,
  F: commands.ForwardCommand,
};

const moveRobots = (
  board: Board,
  position: posVector,
  movement: string,
) => {
  const robot = new Robot(board, position);
  [...movement].forEach((letter) => {
    const command = new letterToCommands[letter](robot);
    command.execute();
  });
  return robot.getStringPosition();
};

export default moveRobots;
