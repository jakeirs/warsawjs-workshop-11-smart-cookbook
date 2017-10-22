import {observable, computed, action} from 'mobx';
import _get from 'lodash/get';
import _sortedUniq from 'lodash/sortedUniq';
import _intersection from 'lodash/intersection';
import _sortBy from 'lodash/sortBy';

export class RecipesStore {
  @observable loadingRecipes = true;
  @observable loadingError = null;
  @observable _allRecipesRaw = [];

  @observable selectedIngredients = [];

  constructor(rootStore){
    this.apiConnector = rootStore.apiConnector;
    this.viewStore = rootStore.viewStore;
    this.fetchData();

  }

  @computed
  get allRecipes(){
    return this._allRecipesRaw.map(recipe => {
      const matchedIngredientsCnt = _intersection(
        recipe.ingredients,
        this.selectedIngredients
      ).length;

      return {
        ...recipe,
        matchedIngredientsCnt
      };
    });
  }


  @computed
  get sortedRecipesList(){
    return _sortBy(this.allRecipes, [(recipe) => -1 * recipe.matchedIngredientsCnt]);
  }

  @computed
  get allIngredients(){
    let result = this._allRecipesRaw.reduce((accArray, recipe)=>{
      accArray.push(...recipe.ingredients);

      return accArray;
    }, []);

    return _sortedUniq(result.sort());
  }

  @computed
  get availableIngedtients(){
    return this.allIngredients.filter(
      item => !this.selectedIngredients.includes(item)
    );
  }

  @computed
  get selectedRecipe(){
    const selectedRecipeId = _get(this.viewStore, 'currentViewParams.recipeId');
    return this.allRecipes.find( recipe => +recipe.id === +selectedRecipeId);
  }

  @computed
  get selectedRecipeMissingIngredients(){
    if(!this.selectedRecipe) return [];

    return this.selectedRecipe.ingredients.filter(i => !this.selectedIngredients.includes(i));
  }


  @action
  fetchData(){
    this.loadingRecipes = true;

    this.apiConnector.getRecipes()
      .then(
        action('fetchData__response', (data)=>{
          this._allRecipesRaw = data;
          this.loadingRecipes = false;
        })
      ).catch(
        action('fetchData__errorResponse', (err)=>{
          this.loadingRecipes = false;
          this._allRecipesRaw = [];
          this.loadingError = err;
        })
      );
  }

  @action
  selectIngredient(ingredient){
    if(
      this.selectedIngredients.includes(ingredient)
      || !this.allIngredients.includes(ingredient)
    ) return;

    this.selectedIngredients.push(ingredient);
  }

  @action
  unselectIngredient(ingredient){
    const selectedIxd = this.selectedIngredients.indexOf(ingredient);

    if(selectedIxd === -1) return;

    this.selectedIngredients.splice(selectedIxd, 1);
  }
}

export default RecipesStore;
