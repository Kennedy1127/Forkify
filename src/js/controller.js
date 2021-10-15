import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';
import { TIMEOUT_TOGGLE, TIMEOUT_CREATEFORM } from './config';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  const query = searchView.getQuery();
  if (!query) return;
  resultsView.renderSpinner();

  await model.loadSearchResults(query);

  resultsView.render(model.getSearchResultsPage());
  paginationView.render(model.state.search);
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  else model.deleteBookmarks(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarsk = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadData = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.addRecipeUploadData(newRecipe);

    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    addRecipeView.renderMessage();

    setTimeout(function () {
      if (!addRecipeView._overlay.classList.contains('hidden'))
        addRecipeView.toggleWindow();
    }, TIMEOUT_TOGGLE * 1000);

    setTimeout(function () {
      addRecipeView.createFrom();
    }, TIMEOUT_CREATEFORM * 1000);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  bookmarksView.addHandlerBookmarks(controlBookmarsk);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUploadData(controlUploadData);
};
init();

console.log('Welcome');
