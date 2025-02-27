import express, { Request, Response } from 'express';
    import animalsController from './controllers/AnimalsController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/animals", (req: Request, res: Response) => animalsController.getAllAnimals(req, res));
app.get("/animals/:id", (req: Request, res: Response) => animalsController.getAnimalById(req, res));
app.get("/animals/endangered", (req: Request, res: Response) => animalsController.getEndangeredAnimals(req, res));
app.get("/animals/habitat/:habitat", (req: Request, res: Response) => animalsController.getAnimalsByHabitat(req, res));
app.get("/animals/species", (req: Request, res: Response) => animalsController.getAnimalsBySpecies(req, res));
app.post("/animals", (req: Request, res: Response) => animalsController.addAnimal(req, res));
app.put("/animals/:id", (req: Request, res: Response) => animalsController.updateAnimal(req, res));
app.delete("/animals/:id", (req: Request, res: Response) => animalsController.deleteAnimal(req, res));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});