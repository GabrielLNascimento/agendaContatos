import { Router } from "express";
import {
    listContatos,
    createContato,
    deleteContato,
    updateContato
} from '../controllers/contatosControllers.js'

const router = Router();

router.get("/contatos", listContatos);
router.post("/createcontato", createContato);
router.put("/updatecontato/:id", updateContato)
router.delete("/deletecontato/:id", deleteContato)

export default router;
