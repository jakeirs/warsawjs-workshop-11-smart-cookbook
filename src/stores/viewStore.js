import {observable, action} from 'mobx';
import {RECIPES_LIST_VIEW, BASKET_VIEW} from 'consts';

export class ViewStore {
    @observable currentViewName = RECIPES_LIST_VIEW;
    @observable currentViewParams = null;

    @action
    setCurrentView(name, params=null){
        this.currentViewName = name;
        this.currentViewParams = params;
    }

    navigateRecipesLits(){
      this.setCurrentView(RECIPES_LIST_VIEW);
    }

    navigateBasket(recipeId){
      this.setCurrentView(BASKET_VIEW, {recipeId});
    }
}

export default ViewStore;
