const express = require('express');
const url = require('url');
const axios = require('axios');
const sets = require('hs-standard-sets').sets;

const CARD_JSON_URL = 'https://api.hearthstonejson.com/v1/latest/jaJP/cards.collectible.json';

let cards = [];
axios.get(CARD_JSON_URL).then(({data}) => {
  cards = data;
});

const NEUTRAL_CARD_CLASS = 'NEUTRAL';
const router = express.Router();

router.get('/cards', (req, res) => {
  const {query} = url.parse(req.url, true);

  let filteredCards = cards;

  // exclude HERO type
  filteredCards = filteredCards.filter((card) => card.type !== 'HERO');

  // exclude Wild cards
  const standardSets = sets();
  filteredCards = filteredCards.filter((card) => {
    return standardSets.includes(card.set);
  });

  // class
  if (query.class) {
    filteredCards = filteredCards.filter((card) => {
      return card.cardClass === NEUTRAL_CARD_CLASS || card.cardClass === query.class;
    });
  }
  // cost
  if (query.cost) {
    filteredCards = filteredCards.filter((card) => {
      return card.cost === Number(query.cost);
    });
  }
  // query
  if (query.query) {
    filteredCards = filteredCards.filter((card) => {
      return card.name.includes(query.query);
    });
  }

  // order
  filteredCards = filteredCards.sort((a, b) => {
    if (a.cardClass === NEUTRAL_CARD_CLASS && b.cardClass === NEUTRAL_CARD_CLASS) {
      return a.cost < b.cost ? -1 : 1;
    }
    if (a.cardClass === NEUTRAL_CARD_CLASS) {
      return 1;
    }
    if (b.cardClass === NEUTRAL_CARD_CLASS) {
      return -1;
    }
    return a.cost < b.cost ? -1 : 1;
  });

  // paging
  const PAGE_SIZE = 8;
  const page = Number(query.page) || 1;
  const lastPage = Math.floor(filteredCards.length / PAGE_SIZE) + (filteredCards.length % PAGE_SIZE === 0 ? 0 : 1);
  filteredCards = filteredCards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  res.send({
    cards: filteredCards,
    page: {
      prev: Math.max(page - 1, 1),
      current: page,
      next: Math.min(page + 1, lastPage),
      last: lastPage,
    },
  });
});

module.exports = router;
