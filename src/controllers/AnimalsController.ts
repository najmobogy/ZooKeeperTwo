import {Response, Request} from "express";
import {animalService} from "../services/AnimalsService";
import {Animal} from "../models/animal";

class AnimalController{
    static GetAllAnimals(req: Request, res: Response): void{
        const animals = animalService.GetAllAnimals()
        res.json({message: "wszystkie zwierzeta", animals})
    }
    static GetAllAnimalsEndagered(req: Request, res: Response): void{
        const endageredAnimals = animalService.GetAllAnimalsEndagered()
        res.json({message: "wszystkie zwierzeta zagrozone", endageredAnimals})

    }
    static GetAllAnimalsInHabitat(req: Request, res: Response): void{
        const habitat: string = req.params.habitat
        const animalsHabitat = animalService.GetAllAnimalsInHabitat(habitat)
        if(animalsHabitat.length != 0){
            res.json({message: "Wszystkie zwierzaki", animalsHabitat})
        }
        else {
            res.status(400).json({message: "ERROR"})
        }
    }
    static GetAllAnimalsSpecies(req: Request, res: Response): void{
        const species:string = req.query.species as string
        const animalsSpecies = animalService.GetAllAnimalsSpecies(species)
        if(animalsSpecies.length != 0){
            res.json({message: "zwierzaki", animalsSpecies})
        }
        else {
            res.status(400).json({message: "ERROR"})
        }
    }
    static PostNewAnimal(req: Request, res: Response): void{
        const newAnimal: Animal = req.body
        const PostAnimal = animalService.PostNewAnimal(newAnimal)
        res.json({message: "Dodanie zwierzaczka", PostAnimal})
    }
    static UpdateAnimal(req: Request, res: Response): void{
        const id: number = parseInt(req.params.id)
        const UpdatedAnimal: Animal = req.body
        const result = animalService.UpdateAnimal(id, UpdatedAnimal)
        if(result != null){
            res.json({message: "aktualizacja zwierzaczka", result})
        }
        else{
            res.status(400).json({message: "ERROR"})
        }
    }
    static DeleteAnimal(req: Request, res: Response): void{
        const id: number = parseInt(req.params.id)
        const result = animalService.DeleteAnimal(id)
        if(result){
            res.json({message: `Usunięcie zwierzecia o id: ${id} :c \uf5b4`})
        }
        else{
            res.status(400).json({message: "ERROR"})
        }
    }
}
export default AnimalController