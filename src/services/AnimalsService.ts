import fsPromises from 'fs/promises';
import path from 'path';
import {Animal} from "../models/animal";

const filePath: string = path.resolve('data', 'animal.ts');



const AnimalsService = {
    async readAnimalsFromFile(): Promise<Animal[]> {
        const data: string = await fsPromises.readFile(filePath, 'utf-8');
        return JSON.parse(data) as Animal[];
    },

    async getAllAnimals(): Promise<Animal[]> {
        return await this.readAnimalsFromFile();
    },

    async getAnimalById(id: number): Promise<Animal> {
        const animals = await this.readAnimalsFromFile();
        const animal = animals.find(a => a.id === id);
        if (!animal) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        return animal;
    },

    async getEndangeredAnimals(): Promise<Animal[]> {
        const animals = await this.readAnimalsFromFile();
        return animals.filter(a => a.isEndangered);
    },

    async getAnimalsByHabitat(habitat: string): Promise<Animal[]> {
        const animals = await this.readAnimalsFromFile();
        return animals.filter(a => a.habitat.toLowerCase() === habitat.toLowerCase());
    },

    async getAnimalsBySpecies(species: string): Promise<Animal[]> {
        const animals = await this.readAnimalsFromFile();
        return animals.filter(a => a.species.toLowerCase() === species.toLowerCase());
    },

    async addAnimal(newAnimal: Omit<Animal, 'id'>): Promise<Animal> {
        const animals = await this.readAnimalsFromFile();
        const id = animals.length ? animals[animals.length - 1].id + 1 : 1;
        const animal: Animal = { id, ...newAnimal };
        animals.push(animal);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
        return animal;
    },

    async updateAnimal(id: number, updates: Partial<Animal>): Promise<Animal> {
        const animals = await this.readAnimalsFromFile();
        const index = animals.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        animals[index] = { ...animals[index], ...updates };
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
        return animals[index];
    },

    async deleteAnimal(id: number): Promise<{ message: string }> {
        const animals = await this.readAnimalsFromFile();
        const index = animals.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        animals.splice(index, 1);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
        return { message: `Animal with id ${id} has been removed.` };
    }
};

export default AnimalsService;
