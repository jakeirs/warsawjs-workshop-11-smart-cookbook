/**
 * json-server do tworzenia backendu na szybko
 *  "proxy": {
    "/api": {
      "target": "http://localhost:3001",
      "pathRewrite": {
        "^/api/": "/"
      }
    }
  }
 * w scripts: "api": "json-server --watch db.json --port 3001"
 *
 *
 *     extendObservable(this, {
      loadingRecipes: true
    })
 *
 *jest tym samym co @observable loadingRecipes = true; w klasie w Recipes Store.js
 *
 *@computed --> pobierasz dane ze store
 *
 *@observer --> dodane do kompotenentu. Observer zamienia propsy i state na @observable
 *
 * @inject('recipesStore') wskrzykujesz dane do komponentu
 *
 * @observable loadingRecipes = true;
 *
 * dane w Store
 *
 * @action -> modyfikujesz store
 *
 * reselect (middleWare) w REDUX -> sprawdź czy musisz renderować wszystko czy tylko ten komponent, który używa
 * danego props
 *
 * */
