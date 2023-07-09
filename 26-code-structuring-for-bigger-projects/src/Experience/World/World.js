import Environment from "./Environment.js"
import Experience from "../Experience.js"
import Floor from "./Floor.js"
import Fox from "./Fox.js"
import RiggedFigure from "./RiggedFigure.js"
import Robot from "./Robot.js"

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on("ready", () => {
            // Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.robot = new Robot
            this.riggedFigure = new RiggedFigure()
            this.environment = new Environment()
        })
    }

    update() {
        if (this.fox) this.fox.update()

        if (this.riggedFigure) this.riggedFigure.update()

        if (this.robot) this.robot.update()
    }
}
