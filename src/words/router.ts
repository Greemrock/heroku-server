import { Router } from 'express';
import { StatusCodes } from '../common';
import {
  createWord,
  deleteWord,
  getCategoryWords,
  updateWord,
} from './repository';
import { Word } from './word';

const router = Router();

// Get words category
router.get('/:categoryId/', async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.sendStatus(StatusCodes.BadRequest);
  }
  const cards = await getCategoryWords(+categoryId);
  if (!cards) {
    return res.sendStatus(StatusCodes.BadRequest);
  }
  return res.json(cards);
});

// Create word
router.post('/:categoryId/', async (req, res) => {
  const catId = req.params.categoryId;
  const cardData = req.body as Word;
  if (!cardData.word) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  try {
    const newCard = await createWord(+catId, cardData);
    return res.json(newCard);
  } catch (error) {
    return res.status(StatusCodes.BadRequest).send(error);
  }
});

// Delete word
router.delete('/:categoryId/:wordId', async (request, response) => {
  const catId = request.params.categoryId;
  const selectedWordId = request.params.wordId;

  if (!selectedWordId) {
    return response.sendStatus(StatusCodes.NotFound);
  }
  try {
    await deleteWord(+catId, +selectedWordId);
    return response.sendStatus(StatusCodes.Ok);
  } catch (error) {
    return response.status(StatusCodes.NotFound).send(error);
  }
});

// update word
router.put('/:categoryId/:wordId', async (request, response) => {
  const catId = request.params.categoryId;
  const selectedWordId = request.params.wordId;
  const wordData = request.body as Word;

  if (!selectedWordId) {
    return response.sendStatus(StatusCodes.BadRequest);
  }
  try {
    const card = await updateWord(+catId, wordData, +selectedWordId);
    return response.json(card);
  } catch (error) {
    return response.status(StatusCodes.BadRequest).send(error);
  }
});

export default router;
