import hsStandardSets from 'hs-standard-sets';

const CARD_JSON_URL = 'https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json';
const NEUTRAL_CARD_CLASS = 'NEUTRAL';

let cards = [] as any[];

function fetchJson(): Promise<any[]> {
  return new Promise(resolve => {
    if (cards.length !== 0) {
      return resolve(cards);
    }

    fetch(CARD_JSON_URL)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      });
  });
}

function filterCards(cards: any[], query: any) {
  let filteredCards = cards;

  // exclude HERO type
  filteredCards = filteredCards.filter((card) => card.type !== 'HERO');

  // exclude Wild cards
  const standardSets = hsStandardSets.sets();
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

  return {
    filteredCards,
    page,
    lastPage,
  };
}

const context: Worker = self as any;
context.addEventListener('message', async event => {
  cards = await fetchJson();
  const query = event.data;
  const {
    filteredCards,
    page,
    lastPage,
  } = filterCards(cards, query);

  context.postMessage({
    cards: filteredCards,
    page: {
      prev: Math.max(page - 1, 1),
      current: page,
      next: Math.min(page + 1, lastPage),
      last: lastPage,
    },
  });
});

