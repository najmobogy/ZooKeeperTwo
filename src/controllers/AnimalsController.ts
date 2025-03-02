import {Response, Request} from "express";
import {animalService} from "../services/AnimalsService";
import {Animal} from "../models/animal";

class AnimalController{
    static GetAllAnimals(req: Request, res: Response): void{
        const animals = animalService.GetAllAnimals()
        res.json({message: "all animals", animals})
    }
    static GetAllAnimalsEndagered(req: Request, res: Response): void{
        const endageredAnimals = animalService.GetAllAnimalsEndagered()
        res.json({message: "all endagered animals", endageredAnimals})

    }
    static GetAllAnimalsInHabitat(req: Request, res: Response): void{
        const habitat: string = req.params.habitat
        const animalsHabitat = animalService.GetAllAnimalsInHabitat(habitat)
        if(animalsHabitat.length != 0){
            res.json({message: "all animals in habitat", animalsHabitat})
        }
        else {
            res.status(400).json({message: "There is an error in your request. Check and try again"})
        }
    }
    static GetAllAnimalsSpecies(req: Request, res: Response): void{
        const species:string = req.query.species as string
        const animalsSpecies = animalService.GetAllAnimalsSpecies(species)
        if(animalsSpecies.length != 0){
            res.json({message: "all animals in habitat", animalsSpecies})
        }
        else {
            res.status(400).json({message: "There is an error in your request. Check and try again"})
        }
    }
    static PostNewAnimal(req: Request, res: Response): void{
        const newAnimal: Animal = req.body
        const PostAnimal = animalService.PostNewAnimal(newAnimal)
        res.json({message: "We added your animal", PostAnimal})
    }
    static UpdateAnimal(req: Request, res: Response): void{
        const id: number = parseInt(req.params.id)
        const UpdatedAnimal: Animal = req.body
        const result = animalService.UpdateAnimal(id, UpdatedAnimal)
        if(result != null){
            res.json({message: "We updated animal", result})
        }
        else{
            res.status(400).json({message: "There is an error in your request. Check and try again"})
        }
    }
    static DeleteAnimal(req: Request, res: Response): void{
        const id: number = parseInt(req.params.id)
        const result = animalService.DeleteAnimal(id)
        if(result){
            res.json({message: `We deleted animal with id numer: ${id} :c \uf5b4`})
        }
        else{
            res.status(400).json({message: "There is an error in your request. Check and try again"})
        }
    }
}
export default AnimalController