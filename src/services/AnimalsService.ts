import {Animal} from "../models/animal";
import AnimalController from "../controllers/AnimalsController";

class AnimalService{
    private animals: Array<Animal> = [
        {
            id: 1,
            name: "Simba",
            species: "Lion",
            age: 5,
            isEndangered: true,
            habitat: "Savanna"
        },
        {
            id: 2,
            name: "Nemo",
            species: "Clownfish",
            age: 2,
            isEndangered: false,
            habitat: "Ocean"
        },
    ]
    GetAllAnimals(): Array<Animal>{
        return this.animals
    }
    GetAllAnimalsEndagered(): Array<Animal>{
        let EndageredAnimals: Array<Animal> = []
        for(let i: number = 0; i < this.animals.length; i++){
            if(this.animals[i]["isEndangered"]){
                EndageredAnimals.push(this.animals[i])
            }
        }
        return EndageredAnimals
    }
    GetAllAnimalsInHabitat(habitat: string): Array<Animal>{
        let HabitatAnimals: Array<Animal> = [];

        for(let i = 0; i < this.animals.length; i++){
            if(this.animals[i]["habitat"] === habitat){
                HabitatAnimals.push(this.animals[i])
            }
        }
        return HabitatAnimals
    }
    GetAllAnimalsSpecies(species: string): Array<Animal>{
        let SpeciesAnimals: Array<Animal> = [];
        console.log(species)
        for(let i = 0; i < this.animals.length; i++){
            if(this.animals[i]["species"] === species){
                console.log(this.animals[i])
                SpeciesAnimals.push(this.animals[i])
            }
        }
        console.log(SpeciesAnimals)
        return SpeciesAnimals
    }
    PostNewAnimal(AnimalNew: Animal): Animal{
        const newAnimal: Animal ={
            id: this.animals.length+1,
            name: AnimalNew.name,
            species: AnimalNew.species,
            age: AnimalNew.age,
            isEndangered: AnimalNew.isEndangered,
            habitat: AnimalNew.habitat
        }
        this.animals.push(newAnimal)
        return newAnimal
    }
    UpdateAnimal(id:number, animal: Animal): Animal | null{
        const animalIndex: number = this.animals.findIndex(animal => animal.id === id)
        if(animalIndex === -1){
            return null
        }
        const UpdatedAnimal: Animal ={
            id,
            name: animal.name,
            species: animal.species,
            age: animal.age,
            isEndangered: animal.isEndangered,
            habitat: animal.habitat
        }
        this.animals[animalIndex] = {...this.animals[animalIndex], ...UpdatedAnimal}
        return UpdatedAnimal
    }
    DeleteAnimal(id:number): Boolean{
        const animalIndex: number = this.animals.findIndex(animal => animal.id === id)
        if(animalIndex === -1){
            return false
        }
        this.animals.splice(animalIndex, 1)
        return true
    }
}
export const animalService = new AnimalService()