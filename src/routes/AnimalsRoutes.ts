import express, {Request, Response} from "express";
import AnimalController from "../controllers/AnimalsController";

const animalRouter = express.Router()

animalRouter.get("/", AnimalController.GetAllAnimals)
animalRouter.get("/endangered", AnimalController.GetAllAnimalsEndagered)
animalRouter.get("/habitat/:habitat", AnimalController.GetAllAnimalsInHabitat)
animalRouter.get("/species", AnimalController.GetAllAnimalsSpecies)
animalRouter.post('/', AnimalController.PostNewAnimal)
animalRouter.put('/:id', AnimalController.UpdateAnimal)
animalRouter.delete('/:id', AnimalController.DeleteAnimal)

export default animalRouter