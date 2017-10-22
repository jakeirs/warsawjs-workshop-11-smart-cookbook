import React from 'react';

const IngredientsSummary = ({matchedIngredientsCnt, ingredientsCnt}) => {
  return (
    <span>
      pasujących składników: {matchedIngredientsCnt} z {ingredientsCnt}
    </span>
  );
};

export default IngredientsSummary;
