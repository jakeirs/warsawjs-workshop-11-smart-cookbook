import Router from 'router';
import ApiConnector from 'apiConnector';
import RecipesStore from './recipesStore';
import ShopsStore from './shopsStore';
import ViewStore from './viewStore';

export class RootStore {
  constructor(fetch){

    this.apiConnector = new ApiConnector(fetch);

    this.viewStore = new ViewStore(this);

    this.recipesStore = new RecipesStore(this);
    this.shopsStore = new ShopsStore(this);

    this.router = new Router(this);
  }

  get injectables(){
    return {
      rootStore: this,
      router: this.router,
      recipesStore: this.recipesStore,
      shopsStore: this.shopsStore,
      viewStore: this.viewStore,
    };
  }
}

export default RootStore;
