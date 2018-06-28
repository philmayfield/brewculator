// function to check if a specific id matches either a single item in the store (recipe, version, brew, gravity) or exists in a collection in the store (recipes, versins, brews, gravities) and returns and object with the results

import { notEmpty } from "./empty";

const hasInStore = (id = null, single = {}, multiple = []) => {
  const fromSingle = notEmpty(single) && single._id === id && single;
  const hasFromSingle = fromSingle && notEmpty(fromSingle);
  let inStore, fromMultiple, hasFromMultiple, storeItem;

  if (!hasFromSingle) {
    fromMultiple = notEmpty(multiple) && multiple.find(item => item._id === id);
    hasFromMultiple = fromMultiple && notEmpty(fromMultiple);
  }

  inStore = hasFromSingle || hasFromMultiple;
  storeItem = fromSingle || fromMultiple || null;

  return {
    inStore,
    storeItem
  };
};

export default hasInStore;
