import _random from 'lodash/random';

const RECIPES_URL = '/api/recipes';

class ApiConnector {
  constructor(fetch){
    this.fetch = fetch;
  }

  getRecipes(){
    return this._delay().then(()=>{
      return this.getJson(RECIPES_URL);
    });
  }

  getJson(url){
    return fetch(url, {method: 'GET'}).then((response)=>{
      if(response.ok){
        return response.json();
      } else {
        throw response;
      }
    });
  }

  getPricesInShop(shopId, items){
    return this._delay(_random(1,5) * 1000)
      .then(()=>{
        let result = {};
        items.forEach(item => {
          result[item] = _random(1, 100);
        });
        return result;
      })
  }

  _delay(time=1000){
    return new Promise((resolve)=>{
      setTimeout(()=>resolve(), time);
    });
  }
}

export default ApiConnector;
