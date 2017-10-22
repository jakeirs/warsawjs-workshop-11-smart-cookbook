import Navigo from 'navigo';
import {autorun, toJS} from 'mobx';

import {RECIPES_LIST_VIEW, BASKET_VIEW} from 'consts';

class Router {
  constructor(rootStore){
    const viewStore = rootStore.viewStore;

    const navigo = this.navigo = new Navigo(null, true);

    // define routes
    navigo
      .on(()=>navigo.navigate('/recipes-list'))  // default view
      .on({
        '/recipes-list': {
          as: RECIPES_LIST_VIEW,
          uses: () => viewStore.setCurrentView(RECIPES_LIST_VIEW)
        },
        '/basket/:recipeId': {
          as: BASKET_VIEW,
          uses: ({recipeId}) => viewStore.setCurrentView(BASKET_VIEW, {recipeId})
        }
      });

    navigo.resolve();  // resolve current location


    //  change location on state change
    autorun(()=>{
      const routeFromStore = navigo.generate(
        viewStore.currentViewName,
        toJS(viewStore.currentViewParams)
      );

      if(routeFromStore !== window.location.hash){
        navigo.navigate(routeFromStore);
      }
    });
  }
}

export default Router;
