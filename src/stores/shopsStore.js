import {reaction, observable, action} from 'mobx';
import _forEach from 'lodash/forEach';

const shopsDefinition = [
  {id: 1, name: 'Biedronka'},
  {id: 2, name: 'Lidl'},
  {id: 3, name: 'Piotr i Paweł'},
  {id: 4, name: 'Auchan'}
];

export class ShopsStore {
  @observable pricesCache = observable.map();
  @observable missingIngredientsPrices = observable.map();

  constructor(rootStore){
    this.apiConnector = rootStore.apiConnector;
    this.recipesStore = rootStore.recipesStore;

    this.initMaps();
    this.initReactions();
  }

  initMaps(){
    shopsDefinition.forEach(({id}) => {
      this.pricesCache.set(id, observable.map());
      this.missingIngredientsPrices.set(id, null);
    });
  }

  get shops(){
    return shopsDefinition;
  }

  getMissingIngredientsPrices(shopId){
    return this.missingIngredientsPrices.get(shopId);
  }

  initReactions(){
    this._reactionsDisposes = [];

    shopsDefinition.forEach((shop) => {
      const shopId = shop.id;

      this._reactionsDisposes.push(reaction(
        () => [
          this.pricesCache.get(shopId).values(),
          this.recipesStore.selectedRecipeMissingIngredients
        ],
        () => {
          const missingIngredients = this.recipesStore.selectedRecipeMissingIngredients;
          const pricesCache = this.pricesCache.get(shopId);

          const readyPrices = {};
          const fechingPrices = [];
          const missingPrices = [];

          if(missingIngredients.length === 0){
            this.missingIngredientsPrices.set(shopId, null);
            return;
          }

          missingIngredients.forEach( item => {
            const price = pricesCache.get(item);

            if(price === null){
              fechingPrices.push(item);
            } else if(price === undefined){
              missingPrices.push(item);
            } else {
              readyPrices[item] = price;
            }
          });

          if(missingPrices.length > 0){
            this.fetchPrices(shopId, missingPrices);
          } else if(fechingPrices.length > 0) {
            this.missingIngredientsPrices.set(shopId, null);
          } else {
            this.missingIngredientsPrices.set(shopId, readyPrices);
          }
        }
      ));
    });
  }

  @action
  fetchPrices(shopId, items){
    const pricesCache = this.pricesCache.get(shopId);
    items.forEach(item => pricesCache.set(item, null));

    this.apiConnector.getPricesInShop(shopId, items)
      .then(action('fetchPrices__response', (result)=>{
        _forEach(result, (price, name)=>{
          pricesCache.set(name, price);
        });
      }));
  }

  @action.bound
  refreshPrices(){
    this.pricesCache.values().forEach( shopCache => shopCache.clear());
  }
}

export default ShopsStore;
