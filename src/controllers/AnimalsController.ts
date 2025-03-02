import { Request, Response } from 'express';
import animalsService from '../services/AnimalsService.ts';

const AnimalsController = {
    getAllAnimals: async (req: Request, res: Response): Promise<void> => {
        try {
            const animals = await animalsService.getAllAnimals();
            res.status(200).json(animals);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getAnimalById: async (req: Request, res: Response): Promise<void> => {
        try {
            const animal = await animalsService.getAnimalById(parseInt(req.params.id));
            res.status(200).json(animal);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    },

    getEndangeredAnimals: async (req: Request, res: Response): Promise<void> => {
        try {
            const animals = await animalsService.getEndangeredAnimals();
            res.status(200).json(animals);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getAnimalsByHabitat: async (req: Request, res: Response): Promise<void> => {
        try {
            const animals = await animalsService.getAnimalsByHabitat(req.params.habitat);
            res.status(200).json(animals);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    getAnimalsBySpecies: async (req: Request, res: Response): Promise<void> => {
        try {
            const species = req.query.species as string;
            const animals = await animalsService.getAnimalsBySpecies(species);
            res.status(200).json(animals);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    addAnimal: async (req: Request, res: Response): Promise<void> => {
        try {
            const newAnimal = req.body;
            const animal = await animalsService.addAnimal(newAnimal);
            res.status(201).json(animal);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    updateAnimal: async (req: Request, res: Response): Promise<void> => {
        try {
            const animalId = parseInt(req.params.id);
            const updates = req.body;
            const updatedAnimal = await animalsService.updateAnimal(animalId, updates);
            res.status(200).json(updatedAnimal);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteAnimal: async (req: Request, res: Response): Promise<void> => {
        try {
            const animalId = parseInt(req.params.id);
            const result = await animalsService.deleteAnimal(animalId);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default AnimalsController;
