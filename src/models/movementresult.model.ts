import { Direction } from "../enums/Direction.enum"

export interface MovementResult {
    finalPosition: {x: number, y: number, facing: Direction}
    movementResults: string[]
}
