import hsStandardSets from "hs-standard-sets";

const CARD_JSON_URL =
  "https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json";
const NEUTRAL_CARD_CLASS = "NEUTRAL";

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

function filterCardsByConditions(cards: any[], conditions: any) {
  let filteredCards = cards;

  // exclude HERO type
  filteredCards = filteredCards.filter(card => card.type !== "HERO");

  // exclude Wild cards
  const standardSets = hsStandardSets.sets();
  filteredCards = filteredCards.filter(card => {
    return standardSets.includes(card.set);
  });

  // class
  if (conditions.class) {
    filteredCards = filteredCards.filter(card => {
      return (
        card.cardClass === NEUTRAL_CARD_CLASS ||
        card.cardClass === conditions.class
      );
    });
  }
  // mana cost
  if (conditions.manaCost) {
    filteredCards = filteredCards.filter(card => {
      if (conditions.manaCost === "7+") {
        return card.cost >= 7;
      }
      return card.cost === Number(conditions.manaCost);
    });
  }
  // query
  if (conditions.query) {
    filteredCards = filteredCards.filter(card => {
      return (
        card.name.toLowerCase().includes(conditions.query.toLowerCase()) ||
        card.type.toLowerCase().includes(conditions.query.toLowerCase())
      );
    });
  }

  // order
  filteredCards = filteredCards.sort((a, b) => {
    if (
      a.cardClass === NEUTRAL_CARD_CLASS &&
      b.cardClass === NEUTRAL_CARD_CLASS
    ) {
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
  const PAGE_SIZE = 12;
  const page = Number(conditions.page) || 1;
  const lastPage =
    Math.floor(filteredCards.length / PAGE_SIZE) +
    (filteredCards.length % PAGE_SIZE === 0 ? 0 : 1);
  filteredCards = filteredCards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    filteredCards,
    page,
    lastPage
  };
}

function filterCardsByDbfIds(cards: any[], dbfIds: string[]) {
  // dbfIds
  let filteredCards = cards.filter(card => {
    return dbfIds.includes(card.dbfId);
  });

  return filteredCards;
}

const context: Worker = self as any;
context.addEventListener("message", async event => {
  const cards = await fetchJson();

  switch (event.data.method) {
    case "findByConditions":
      const conditions = event.data.conditions;
      const { filteredCards, page, lastPage } = filterCardsByConditions(
        cards,
        conditions
      );
      context.postMessage({
        cards: filteredCards,
        page: {
          prev: Math.max(page - 1, 1),
          current: page,
          next: Math.min(page + 1, lastPage),
          last: lastPage
        }
      });
      break;
    case "findByDbfIds":
      const dbfIds = event.data.dbfIds;
      context.postMessage({
        cards: filterCardsByDbfIds(cards, dbfIds)
      });
      break;
    default:
      throw new Error(
        `Unexpected method parameter was found. method: ${event.data.method}`
      );
  }
});
