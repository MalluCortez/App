/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const { makeFetch } = useFetch();
  const [meals, setMeals] = useState([]);
  const [drink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [mesures, setMesure] = useState([]);
  const [youtubeID, setYoutubeId] = useState('');
  const history = useHistory();
  const match = useRouteMatch();
  const { location: { pathname } } = history;
  const { params: { id } } = match;

  const separateIngredients = () => {
    const mealsORdrink = pathname.includes('/meals') ? meals : drink;
    const arrEntries = Object.entries(mealsORdrink[0]);
    const EntriesIngredients = arrEntries.filter((f) => f[0].includes('strIngredient'));
    const ingredientsInc = EntriesIngredients.map((el) => el[1]);
    const ingredientsArr = ingredientsInc.filter((i) => i !== null && i !== '');
    setIngredients(ingredientsArr);
  };

  const separateMesure = () => {
    const mealsORdrink = pathname.includes('/meals') ? meals : drink;
    const arrEntries = Object.entries(mealsORdrink[0]);
    const EntriesMesure = arrEntries.filter((f) => f[0].includes('strMeasure'));
    const MesureValue = EntriesMesure.map((el) => el[1]);
    const MesureArr = MesureValue.filter((i) => i !== null && i !== '');
    setMesure(MesureArr);
  };
  const IdYoutube = () => {
    const SrcYoutube = String(meals[0].strYoutube);
    const indexID = SrcYoutube.indexOf('=');
    const strArr = SrcYoutube.split('');
    const idArr = strArr.filter((l, i) => i > indexID);
    const idYou = idArr.join('');
    console.log(idYou);
    setYoutubeId(idYou);
    // "https://www.youtube.com/embed/U9JYm5KSipM"
    // https://www.youtube.com/watch?v=VVnZd8A84z4
  };
  useEffect(() => {
    const fetchRecipesDT = async () => {
      if (pathname.includes('/meals')) {
        const mealsReq = await makeFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setMeals(mealsReq.meals);
      }
      if (pathname.includes('/drinks')) {
        const drinkReq = await makeFetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDrink(drinkReq.drinks);
      }
    };
    fetchRecipesDT();
  }, []);

  useEffect(() => {
    const mealsORdrink = pathname.includes('/meals') ? meals : drink;
    if (mealsORdrink.length && mealsORdrink !== null) {
      separateIngredients();
      separateMesure();
    } if (meals.length) {
      IdYoutube();
    }
  }, [meals, drink]);

  return (
    <>
      {(pathname.includes('/meals') && (
        meals?.map((el, i) => (
          <div key={ i }>
            <img
              src={ el.strMealThumb }
              alt={ el.strMeal }
              width="300px"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{el.strMeal}</h1>
            <p data-testid="recipe-category">{el.strCategory}</p>
            <p data-testid="instructions">{el.strInstructions}</p>
            { ingredients?.map((ingredient, indx) => (
              <ul key={ indx } data-testid={ `${indx}-ingredient-name-and-measure` }>
                <li>
                  {`${mesures[indx]} ${ingredient}`}
                  {' '}
                </li>
              </ul>
            )) }
            <iframe
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${youtubeID}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share"
              allowfullscreen
            />
          </div>
        ))
      ))}
      {(pathname.includes('/drinks') && (
        drink?.map((el, i) => (
          <div key={ i }>
            <img
              src={ el.strDrinkThumb }
              alt={ el.strDrink }
              width="300"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{el.strDrink}</h1>
            <p data-testid="recipe-category">{el.strAlcoholic}</p>
            { ingredients?.map((ingredient, indx) => (
              <ul key={ indx } data-testid={ `${indx}-ingredient-name-and-measure` }>
                <li>
                  {`${mesures[indx]} ${ingredient}`}
                  {' '}
                </li>
              </ul>
            )) }
            <p data-testid="instructions">{el.strInstructions}</p>
          </div>
        ))
      ))}
    </>
  );
}
export default RecipeDetails;
