import icons from 'url:../../img/icons.svg';
import View from './View';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks');
  _errorMessage = 'Could not fint the result. Please try again!';
  _message = '';

  addHandlerBookmarks(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        }" href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" crossOrigin="anonymous" alt="${
      result.title
    }" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated hidden">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
        </div>
        </a>
    </li>
      `;
  }
}

export default new BookmarksView();
