export default class Recipe {
  constructor(recipe) {
    this.title = recipe.label;
    this.author = recipe.source;
    this.img = recipe.image;
    this.url = recipe.url;
    this.ingredients = recipe.ingredients;
  }
  
  /**
   * Assuming every 3 ingredients take 15min
   */
  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  /**
   * Just a random serve
   */
  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounce',
      'ounces',
      'teaspoon',
      'teaspoons',
      'cups',
      'pounds',
    ];
    const unitShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound',
    ];

    const units = [...unitShort, 'g', 'kg'];

    /**
     * Complex logic to break ingredient into
     * COUNT, UNIT, INGREDIENT
     */
    const newIngredients = this.ingredients.map((el) => {
      // Uniform units
      let ingredient = el.text.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });

      // Remove paranthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        // Ex. 4 1/2 cups, arrcount = [4, 1/2]
        // EX. 4 cups, arrcount = [4]
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount === 1) {
          count = arrIng.slice(0, unitIndex);
        } else {
          // eslint-disable-next-line no-eval
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }
        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' '),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit but has a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ').replace('x ', ''),
        };
      } else if (unitIndex === -1) {
        // There is no unit and NO number in 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient: ingredient.replace('x ', ''),
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }

  /**
   * type == inc || dec
   */
  updateServings(type) {
    if ((this.servings === 1 && type === 'dec') || (this.servings===10 && type==='inc')) {
      return;
    }

    // Servings
    const newServings = type === 'inc' ? this.servings + 1 : this.servings - 1;

    // Ingredients
    this.ingredients.forEach((ing) => {
      ing.count *= newServings / this.servings;
    });

    this.servings = newServings;
  }
}
