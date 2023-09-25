async function getPhotographers() {
    // Load data from JSON using Fetch
    const response = await fetch('./data/photographers.json');
    const data = await response.json();

    const photographersArray = data.photographers;
    const mediaArray = data.media;

    return {
        photographers: photographersArray,
        media: mediaArray,
    };
}


async function displayPhotographerInfo(photographer) {
    const photographerHeader = document.querySelector(".photographer-head");

    if (photographerHeader) {
        const photographerModel = photographerHeaderTemplate(photographer);
        const userHeaderDOM = photographerModel.getUserHeaderDOM();
    } else {
        console.log("Element with class 'photographer-head' not found.");
    }
}

async function displayPhotographerGallery(photographerId, media, photographer) {
    const photographerGallery = document.querySelector('.photographer_gallery');
    const filteredMedia = media.filter(mediaItem => mediaItem.photographerId === photographerId);

    filteredMedia.forEach((mediaItem) => {
        const galleryModel = galleryTemplate(mediaItem, photographer.name);
        const galleryDOM = galleryModel.getGalleryDOM();

        if (galleryDOM instanceof Node) {
            photographerGallery.appendChild(galleryDOM);
        } else {
            console.log('galleryDOM is not a valid DOM node.');
        }
    });
}

async function init() {
    try {
        const { photographers, media } = await getPhotographers();
        const url = new URL(window.location.href);
        const photographerId = parseInt(url.searchParams.get('id'));
        const photographer = photographers.find(photographer => photographer.id === photographerId)
        if (photographer) {
            displayPhotographerInfo(photographer);
            displayPhotographerGallery(photographerId, media, photographer);
        } else {
            console.log('Photographer not found.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

init();

//SELECT
   // Save a list of named combobox actions, for future readability
   const SelectActions = {
    Close: 0,
    CloseSelect: 1,
    First: 2,
    Last: 3,
    Next: 4,
    Open: 5,
    PageDown: 6,
    PageUp: 7,
    Previous: 8,
    Select: 9,
    Type: 10,
  };
  
  /*
   * Helper functions
   */
  
  // filter an array of options against an input string
  // returns an array of options that begin with the filter string, case-independent
  function filterOptions(options = [], filter, exclude = []) {
    return options.filter((option) => {
      const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
      return matches && exclude.indexOf(option) < 0;
    });
  }
  
  
  // map a key press to an action
  function getActionFromKey(event, menuOpen) {
    const { key, altKey, ctrlKey, metaKey } = event;
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
    // handle opening when closed
    if (!menuOpen && openKeys.includes(key)) {
      return SelectActions.Open;
    }
  
    // home and end move the selected option when open or closed
    if (key === 'Home') {
      return SelectActions.First;
    }
    if (key === 'End') {
      return SelectActions.Last;
    }
  
    // handle typing characters when open or closed
    if (
      key === 'Backspace' ||
      key === 'Clear' ||
      (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
    ) {
      return SelectActions.Type;
    }
  
    // handle keys when open
    if (menuOpen) {
      if (key === 'ArrowUp' && altKey) {
        return SelectActions.CloseSelect;
      } else if (key === 'ArrowDown' && !altKey) {
        return SelectActions.Next;
      } else if (key === 'ArrowUp') {
        return SelectActions.Previous;
      } else if (key === 'PageUp') {
        return SelectActions.PageUp;
      } else if (key === 'PageDown') {
        return SelectActions.PageDown;
      } else if (key === 'Escape') {
        return SelectActions.Close;
      } else if (key === 'Enter' || key === ' ') {
        return SelectActions.CloseSelect;
      }
    }
  }
  
  // return the index of an option from an array of options, based on a search string
  // if the filter is multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
  function getIndexByLetter(options, filter, startIndex = 0) {
    const orderedOptions = [
      ...options.slice(startIndex),
      ...options.slice(0, startIndex),
    ];
    const firstMatch = filterOptions(orderedOptions, filter)[0];
    const allSameLetter = (array) => array.every((letter) => letter === array[0]);
  
    // first check if there is an exact match for the typed string
    if (firstMatch) {
      return options.indexOf(firstMatch);
    }
  
    // if the same letter is being repeated, cycle through first-letter matches
    else if (allSameLetter(filter.split(''))) {
      const matches = filterOptions(orderedOptions, filter[0]);
      return options.indexOf(matches[0]);
    }
  
    // if no matches, return -1
    else {
      return -1;
    }
  }
  
  // get an updated option index after performing an action
  function getUpdatedIndex(currentIndex, maxIndex, action) {
    const pageSize = 10; // used for pageup/pagedown
  
    switch (action) {
      case SelectActions.First:
        return 0;
      case SelectActions.Last:
        return maxIndex;
      case SelectActions.Previous:
        return Math.max(0, currentIndex - 1);
      case SelectActions.Next:
        return Math.min(maxIndex, currentIndex + 1);
      case SelectActions.PageUp:
        return Math.max(0, currentIndex - pageSize);
      case SelectActions.PageDown:
        return Math.min(maxIndex, currentIndex + pageSize);
      default:
        return currentIndex;
    }
  }
  
  // check if element is visible in browser view port
  function isElementInView(element) {
    var bounding = element.getBoundingClientRect();
  
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // check if an element is currently scrollable
  function isScrollable(element) {
    return element && element.clientHeight < element.scrollHeight;
  }
  
  // ensure a given child element is within the parent's visible scroll area
  // if the child is not visible, scroll the parent
  function maintainScrollVisibility(activeElement, scrollParent) {
    const { offsetHeight, offsetTop } = activeElement;
    const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;
  
    const isAbove = offsetTop < scrollTop;
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;
  
    if (isAbove) {
      scrollParent.scrollTo(0, offsetTop);
    } else if (isBelow) {
      scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
    }
  }
  
  /*
   * Select Component
   * Accepts a combobox element and an array of string options
   */
  const Select = function (el, options = []) {
    // element refs
    this.el = el;
    this.comboEl = el.querySelector('[role=combobox]');
    this.listboxEl = el.querySelector('[role=listbox]');
  
    // data
    this.idBase = this.comboEl.id || 'combo';
    this.options = options;
  
    // state
    this.activeIndex = 0;
    this.open = false;
    this.searchString = '';
    this.searchTimeout = null;
  
    // init
    if (el && this.comboEl && this.listboxEl) {
      this.init();
    }
  };
  
  Select.prototype.init = function () {
    // select first option by default
    this.comboEl.innerHTML = this.options[0];
  
    // add event listeners
    this.comboEl.addEventListener('blur', this.onComboBlur.bind(this));
    this.comboEl.addEventListener('click', this.onComboClick.bind(this));
    this.comboEl.addEventListener('keydown', this.onComboKeyDown.bind(this));
  
    // create options
    this.options.map((option, index) => {
      const optionEl = this.createOption(option, index);
      this.listboxEl.appendChild(optionEl);
    });
  };
  
  Select.prototype.createOption = function (optionText, index) {
    const optionEl = document.createElement('div');
    optionEl.setAttribute('role', 'option');
    optionEl.id = `${this.idBase}-${index}`;
    optionEl.className =
      index === 0 ? 'combo-option option-current' : 'combo-option';
    optionEl.setAttribute('aria-selected', `${index === 0}`);
    optionEl.innerText = optionText;
  
    optionEl.addEventListener('click', (event) => {
      event.stopPropagation();
      this.onOptionClick(index);
    });
    optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));
  
    return optionEl;
  };
  
  Select.prototype.getSearchString = function (char) {
    // reset typing timeout and start new timeout
    // this allows us to make multiple-letter matches, like a native select
    if (typeof this.searchTimeout === 'number') {
      window.clearTimeout(this.searchTimeout);
    }
  
    this.searchTimeout = window.setTimeout(() => {
      this.searchString = '';
    }, 500);
  
    // add most recent letter to saved search string
    this.searchString += char;
    return this.searchString;
  };
  
  Select.prototype.onComboBlur = function () {
    // do not do blur action if ignoreBlur flag has been set
    if (this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }
  
    // select current option and close
    if (this.open) {
      this.selectOption(this.activeIndex);
      this.updateMenuState(false, false);
    }
  };
  
  Select.prototype.onComboClick = function () {
    this.updateMenuState(!this.open, false);
  };
  
  Select.prototype.onComboKeyDown = function (event) {
    const { key } = event;
    const max = this.options.length - 1;
  
    const action = getActionFromKey(event, this.open);
  
    switch (action) {
      case SelectActions.Last:
      case SelectActions.First:
        this.updateMenuState(true);
      // intentional fallthrough
      case SelectActions.Next:
      case SelectActions.Previous:
      case SelectActions.PageUp:
      case SelectActions.PageDown:
        event.preventDefault();
        return this.onOptionChange(
          getUpdatedIndex(this.activeIndex, max, action)
        );
      case SelectActions.CloseSelect:
        event.preventDefault();
        this.selectOption(this.activeIndex);
      // intentional fallthrough
      case SelectActions.Close:
        event.preventDefault();
        return this.updateMenuState(false);
      case SelectActions.Type:
        return this.onComboType(key);
      case SelectActions.Open:
        event.preventDefault();
        return this.updateMenuState(true);
    }
  };
  
  Select.prototype.onComboType = function (letter) {
    // open the listbox if it is closed
    this.updateMenuState(true);
  
    // find the index of the first matching option
    const searchString = this.getSearchString(letter);
    const searchIndex = getIndexByLetter(
      this.options,
      searchString,
      this.activeIndex + 1
    );
  
    // if a match was found, go to it
    if (searchIndex >= 0) {
      this.onOptionChange(searchIndex);
    }
    // if no matches, clear the timeout and search string
    else {
      window.clearTimeout(this.searchTimeout);
      this.searchString = '';
    }
  };
  
  Select.prototype.onOptionChange = function (index) {
     // Mettez à jour l'index actif
  this.activeIndex = index;

  // Mettez à jour aria-activedescendant
  this.comboEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

  // Mettez à jour les styles de l'option active
  const options = this.el.querySelectorAll('[role=option]');
  options.forEach((optionEl, i) => {
    if (i === index) {
      optionEl.classList.add('option-current', 'highlighted');
    } else {
      optionEl.classList.remove('option-current', 'highlighted');
    }
  });

  // Assurez-vous que la nouvelle option est visible à l'écran
  if (isScrollable(this.listboxEl)) {
    maintainScrollVisibility(options[index], this.listboxEl);
  }

  // Assurez-vous que la nouvelle option est visible à l'écran
  if (!isElementInView(options[index])) {
    options[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};
  
  Select.prototype.onOptionClick = function (index) {
    this.onOptionChange(index);
    this.selectOption(index);
    this.updateMenuState(false);
  };
  
  Select.prototype.onOptionMouseDown = function () {
    // Clicking an option will cause a blur event,
    // but we don't want to perform the default keyboard blur action
    this.ignoreBlur = true;
  };
  
  Select.prototype.selectOption = function (index) {
    // update state
    this.activeIndex = index;
  
    // update displayed value
    const selected = this.options[index];
    this.comboEl.innerHTML = selected;
  
    // update aria-selected
    const options = this.el.querySelectorAll('[role=option]');
    [...options].forEach((optionEl) => {
      optionEl.setAttribute('aria-selected', 'false');
    });
    options[index].setAttribute('aria-selected', 'true');
  };
  
  Select.prototype.updateMenuState = function (open, callFocus = true) {
    if (this.open === open) {
      return;
    }
  
    // update state
    this.open = open;
  
    // update aria-expanded and styles
    this.comboEl.setAttribute('aria-expanded', `${open}`);
    open ? this.el.classList.add('open') : this.el.classList.remove('open');
  
    // update activedescendant
    const activeID = open ? `${this.idBase}-${this.activeIndex}` : '';
    this.comboEl.setAttribute('aria-activedescendant', activeID);
  
    if (activeID === '' && !isElementInView(this.comboEl)) {
      this.comboEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  
    // move focus back to the combobox, if needed
    callFocus && this.comboEl.focus();
  };

  Select.prototype.createOption = function (optionText, index) {
    const optionEl = document.createElement('div');
    optionEl.setAttribute('role', 'option');
    optionEl.id = `${this.idBase}-${index}`;
    optionEl.className =
      index === 0 ? 'combo-option option-current' : 'combo-option';
    optionEl.setAttribute('aria-selected', `${index === 0}`);
    optionEl.innerText = optionText;
    
    // change text as value 
    optionEl.setAttribute('value', optionText);
    
    optionEl.addEventListener('click', (event) => {
      event.stopPropagation();
      this.onOptionClick(index);
    });
    optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));
    
    return optionEl;
  };

Select.prototype.createOption = function (optionText, index) {
  const optionEl = document.createElement('div');
  optionEl.setAttribute('role', 'option');
  optionEl.id = `${this.idBase}-${index}`;
  optionEl.className =
    index === 0 ? 'combo-option option-current' : 'combo-option';
  optionEl.setAttribute('aria-selected', `${index === 0}`);
  optionEl.innerText = optionText;

  // Set the 'data-value' attribute to the option text
  optionEl.setAttribute('value', optionText);

  optionEl.addEventListener('click', (event) => {
    event.stopPropagation();
    this.onOptionClick(index);
  });
  optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

  return optionEl;
};


  // init select
  window.addEventListener('load', function () {
    const options = [
      'Popularité',
      'Date',
      'Titre',
    ];
    const selectEls = document.querySelectorAll('.js-select');
  
    selectEls.forEach((el) => {
      new Select(el, options);
    });
  });



document.addEventListener('DOMContentLoaded', function() {
  const comboText2 = document.querySelector('#combo1-0');
  comboText2.addEventListener('click', test())
  function test() {
      console.log('test');
  }
});

  const closeModalIcon = document.getElementById('close-modal-icon');
if (closeModalIcon) {
closeModalIcon.addEventListener('click', closeModalGallery);
}

function galleryChecker(event) {
  const clickedItem = event.currentTarget;
  clickedItem.classList.add('currentItem');
  const prevItem = clickedItem.previousElementSibling;
  if (prevItem) {
      prevItem.classList.add('prevItem');
      chevronLeft.style.display = 'block';
  } else {
      const chevronLeft = document.querySelector('#chevron-left');
      chevronLeft.style.display = 'none';
  }
  const nextItem = clickedItem.nextElementSibling;
  if(nextItem) {
  nextItem.classList.add('nextItem');
  } else  {
      const chevronRight = document.querySelector('#chevron-right');
      chevronRight.style.display = 'none';
  }
}




const chevronLeft = document.querySelector('#chevron-left');
chevronLeft.addEventListener('click', handlePrevItemClick);

const chevronRight = document.querySelector('#chevron-right');
chevronRight.addEventListener('click', handleNextItemClick);


function handlePrevItemClick(event) {
  chevronRight.style.display = 'block';
  chevronLeft.style.display = 'block';
  const prevItem = document.querySelector(".prevItem");
  const nextItem = document.querySelector(".nextItem");
  let newCurrentItem;
  if (prevItem) {
      const prevImg = prevItem.querySelector('img');
      const prevVideo = prevItem.querySelector('video');
      const prevTitleElement = prevItem.querySelector('.gallery-item-title');
      const imgModal = document.getElementById("modale-img");
      const videoModal = document.getElementById("modale-video");
      const titleModal = document.getElementById("gallery-item-title");
      if (prevImg) {
          imgModal.style.display = 'block';
          videoModal.style.display = 'none';
          const prevSrc = prevImg.getAttribute('src');
          const prevTitle = prevTitleElement.textContent;
          imgModal.src = prevSrc;
          titleModal.textContent = prevTitle;
      }
      if (prevVideo) {
          imgModal.style.display = 'none';
          videoModal.style.display = 'block';
          const prevSrc = prevVideo.getAttribute('src');
          const prevTitle = prevTitleElement.textContent;
          videoModal.src = prevSrc;
          titleModal.textContent = prevTitle;
      }
      let currentItem = document.querySelector('.currentItem');
      newCurrentItem = currentItem.previousElementSibling; 
      currentItem.classList.remove('currentItem');
      newCurrentItem.classList.add('currentItem');

  if (nextItem) {
    nextItem.classList.remove('nextItem');
  }
  if (prevItem) {
      prevItem.classList.remove('prevItem');
      
  }
  const newPrevItem = newCurrentItem.previousElementSibling;
  const newNextItem = newCurrentItem.nextElementSibling;

  if (newPrevItem) {
      newPrevItem.classList.add('prevItem');
      chevronLeft.style.display = 'block';
  } else {
      chevronLeft.style.display = 'none';
  }
  if (newNextItem) {
      newNextItem.classList.add('nextItem');
      chevronRight.style.display = 'block';
  } else {
      chevronRight.style.display = 'none';
  }
}
}

function handleNextItemClick(event) {
  chevronRight.style.display = 'block';
  chevronLeft.style.display = 'block';
  const prevItem = document.querySelector(".prevItem");
  const nextItem = document.querySelector(".nextItem");
  
  let newCurrentItem; 
  if (nextItem) {
      const nextImg = nextItem.querySelector('img');
      const nextVideo = nextItem.querySelector('video');
      const nextTitleElement = nextItem.querySelector('.gallery-item-title');
      const imgModal = document.getElementById("modale-img");
      const videoModal = document.getElementById("modale-video");
      const titleModal = document.getElementById("gallery-item-title");
      if (nextImg) {
          imgModal.style.display = 'block';
          videoModal.style.display = 'none';
          const nextSrc = nextImg.getAttribute('src');
          const nextTitle = nextTitleElement.textContent;
          imgModal.src = nextSrc;
          titleModal.textContent = nextTitle;
      }
      if (nextVideo) {
          imgModal.style.display = 'none';
          videoModal.style.display = 'block';
          const nextSrc = nextVideo.getAttribute('src');
          const nextTitle = nextTitleElement.textContent;
          videoModal.src = nextSrc;
          titleModal.textContent = nextTitle;
      }
      let currentItem = document.querySelector('.currentItem');
      newCurrentItem = currentItem.nextElementSibling; 
      currentItem.classList.remove('currentItem');
      newCurrentItem.classList.add('currentItem');
  }

  if (nextItem) {
      nextItem.classList.remove('nextItem');
  }
  if (prevItem) {
      prevItem.classList.remove('prevItem');
  }

  const newPrevItem = newCurrentItem.previousElementSibling;
  const newNextItem = newCurrentItem.nextElementSibling;
  if (newPrevItem) {
  newPrevItem.classList.add('prevItem');
  chevronLeft.style.display = 'block';
  } else {
      chevronLeft.style.display = 'none';
  }

  if (newNextItem) {
  newNextItem.classList.add('nextItem');
  chevronRight.style.display = 'block';
  } else {
      chevronRight.style.display = 'none';
  }
}

const close = document.querySelector('#close-modal-icon');
close.addEventListener('click', removeClasses);
function removeClasses(event) {
  currentItem = document.querySelector('.currentItem');
  prevItem = document.querySelector('.prevItem');
  nextItem = document.querySelector('.nextItem');
  if (currentItem) {
  currentItem.classList.remove('currentItem');
  }
  if (prevItem)  {
      prevItem.classList.remove('prevItem');
  }
  if (nextItem) {
  nextItem.classList.remove('nextItem');
  }
}
function openModalContact(event) {
  event.preventDefault();
  const modalContact = document.getElementById('container-contact-modal');
      modalContact.style.display = 'block';
}

const openModalBtn = document.getElementById('contact-btn');
openModalBtn.addEventListener('click', openModalContact)



const closeContactModalBtn = document.getElementById('close-modal-icon');
closeContactModalBtn.addEventListener("click", closeModalContact);

function closeModalContact() {
  const modal = document.getElementById('container-contact-modal');
  modal.style.display = 'none';
}

const submitModal = document.querySelector('.submit_button');
submitModal.addEventListener("click", submitModalForm);

function submitModalForm(event) {
  event.preventDefault();
  const firstname = document.querySelector('#first');
  const lastname = document.querySelector('#last');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');
  
  console.log(firstname.value);
  console.log(lastname.value);
  console.log(email.value);
  console.log(message.value);
}
