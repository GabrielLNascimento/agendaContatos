import { Router } from "express";
import {
    listContatos,
    createContato,
    deleteContato,
    updateContato,
    findContatoId
} from '../controllers/contatosControllers.js'

const router = Router();

router.get("/contatos", listContatos);
router.get("/contato/:id", findContatoId)
router.post("/createcontato", createContato);
router.put("/updatecontato/:id", updateContato)
router.delete("/deletecontato/:id", deleteContato)

export default router;
