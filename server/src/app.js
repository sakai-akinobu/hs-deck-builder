const express = require('express');
const request = require('request');
const url = require('url');

const CARD_JSON_URL = 'https://api.hearthstonejson.com/v1/latest/jaJP/cards.collectible.json';
request(CARD_JSON_URL, (error, response, body) => {
  const cards = JSON.parse(body);

  const app = express();
  app.listen(3000);

  app.get('/api/card', (req, res) => {
    const {query} = url.parse(req.url, true);

    let filteredCards = cards;

    // exclude HERO type
    filteredCards = filteredCards.filter((card) => card.type !== 'HERO');

    // exclude Wild cards
    filteredCards = filteredCards.filter((card) => {
      return [
        'GILNEAS',
        'LOOTAPALOOZA',
        'ICECROWN',
        'UNGORO',
        'CORE',
        'EXPERT1',
      ].some((set) => card.set === set);
    });

    // class
    if (query.class) {
      filteredCards = filteredCards.filter((card) => {
        return card.cardClass === 'NEUTRAL' || card.cardClass === query.class;
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
      if (a.cardClass === 'NEUTRAL' && b.cardClass === 'NEUTRAL') {
        return a.cost > b.cost;
      }
      if (a.cardClass === 'NEUTRAL') {
        return 1;
      }
      if (b.cardClass === 'NEUTRAL') {
        return -1;
      }
      return a.cost > b.cost;
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
});
