import fsPromises from 'fs/promises';
import path from 'path';

const filePath: string = path.resolve('data', 'animals.json');

interface Animal {
    id: number;
    species: string;
    habitat: string;
    isEndangered: boolean;
    [key: string]: any;
}

const readAnimalsFromFile = async (): Promise<Animal[]> => {
    try {
        const data: string = await fsPromises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            await fsPromises.writeFile(filePath, JSON.stringify([], null, 2), 'utf-8');
            return [];
        }
        throw error;
    }
};

const AnimalsService = {
    getAllAnimals: async (): Promise<Animal[]> => {
        return await readAnimalsFromFile();
    },

    getAnimalById: async (id: number): Promise<Animal> => {
        const animals = await readAnimalsFromFile();
        const animal = animals.find(a => a.id === id);
        if (!animal) {
            throw new Error(`Animal with id ${id} not found.`);
        }
        return animal;
    },

    getEndangeredAnimals: async (): Promise<Animal[]> => {
        const animals = await readAnimalsFromFile();
        return animals.filter(a => a.isEndangered);
    },

    getAnimalsByHabitat: async (habitat: string): Promise<Animal[]> => {
        const animals = await readAnimalsFromFile();
        return animals.filter(a => a.habitat.toLowerCase() === habitat.toLowerCase());
    },

    getAnimalsBySpecies: async (species: string): Promise<Animal[]> => {
        const animals = await readAnimalsFromFile();
        return animals.filter(a => a.species.toLowerCase() === species.toLowerCase());
    },

    addAnimal: async (newAnimal: Omit<Animal, 'id'>): Promise<Animal> => {
        const animals = await readAnimalsFromFile();
        const id = animals.length ? animals[animals.length - 1].id + 1 : 1;

        const animal: Animal = {
            id,
            species: newAnimal.species,
            habitat: newAnimal.habitat,
            isEndangered: newAnimal.isEndangered,
            ...newAnimal
        };

        animals.push(animal);
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
        return animal;
    },

    updateAnimal: async (id: number, updates: Partial<Animal>): Promise<Animal> => {
        const animals = await readAnimalsFromFile();
        const index = animals.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error(`Animal with id ${id} not found.`);
        }

        animals[index] = { ...animals[index], ...updates };
        await fsPromises.writeFile(filePath, JSON.stringify(animals, null, 2), 'utf-8');
        return animals[index];
    },

    deleteAnimal: async (id: number): Promise<{ message: string }> => {
        const animals = await readAnimalsFromFile();
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
