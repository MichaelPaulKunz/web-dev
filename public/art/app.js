/**
 * toggle hamburger menu
 */

// hello?????? hello??????

let isDropdownShowing = false;
const topNav = document.getElementById('topNav');
const dropDown = document.getElementById('dropDown');
const backdrop = document.getElementById('dropdownBackdrop');
topNav.onclick = function() {
  if (isDropdownShowing) {
    collapseDropdown();
  } else {
    // open dropdown
    dropDown.classList.remove('fade-out');
    backdrop.classList.remove('fade-out');
    dropDown.classList.add('fade-in');
    backdrop.classList.add('fade-in');
    dropDown.style.display = 'block';
    backdrop.style.display = 'block';
    isDropdownShowing = true;
  }
}
// make sure drop-down doesn't return when you navigate back (happens on phone sometimes)
const sidebarItems = Array.from(document.getElementsByClassName('sidebar-item'));
sidebarItems.forEach(item => {
  item.onclick = function(e) {
    console.log('hit');
    isDropdownShowing = false;
    dropDown.classList.add('fade-out');
    backdrop.classList.add('fade-out');
    setTimeout(() => {
      dropDown.style.display = 'none';
      backdrop.style.display = 'none';
    }, 1000);
  }
})


/**
 * thumbnail side scrolling
 */
const scrollContainers = document.getElementsByClassName('gallery');
const backBtns = document.getElementsByClassName('backBtn');
const nextBtns = document.getElementsByClassName('nextBtn');

const scrollArray = Array.from(scrollContainers);
const backArray = Array.from(backBtns);
const nextArray = Array.from(nextBtns);

scrollArray.forEach((scroll, index) => {
  backArray[index].addEventListener('click', () => {
    scroll.style.behavior = 'smooth';
    scroll.scrollLeft -= 225;
  })
  nextArray[index].addEventListener('click', () => {
    scroll.style.scrollBehavior = 'smooth';
    scroll.scrollLeft += 225;
  })
});

/**
 * image modals
 */
let modalImageContainer;
let modalTitleContainer;
let modalImage;
let isModalShowing = false;
const modal = document.getElementById("myModal");
const exitModal = document.getElementById("exitModal");
if (modal && exitModal) {
  // exit modal from X button
  exitModal.onclick = function() {
    collapseModal();
  }
}

// exit modal and dropdown by clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    collapseModal();
  }

  if (event.target == backdrop) {
    collapseDropdown();
  }
}

// click thumbnail, get modal
const thumbnails = document.getElementsByClassName('thumb');
const thumbs = Array.from(thumbnails);
let imagesInCurrentGallery = [];
let currentGallery, currentImage;
thumbs.forEach(thumb => {
  thumb.onclick = function() {
    isModalShowing = true;
    modalImageContainer = document.getElementById("modalImageContainer");
    modalTitleContainer = document.getElementById("modalTitleContainer");
    modal.classList.remove('fade-out');
    modal.classList.add('fade-in');
    modalTitleContainer.innerHTML += `<h2 class='modal-title fade-in' id='title''>${thumb.alt}</h2>`;
    modalImageContainer.innerHTML += `<a id='myModalImage' href=${thumb.src}><img class='modal-image fade-in' src=${thumb.src}></a>`;
    modal.style.display = "block";
    // resize for phone
    imageResize();
    // get gallery info for scrolling
    getGallery(thumb);
    getImages(currentGallery);
    currentImage = thumb.alt;
    // prevent thumbnails from scrolling while modal is visible
    currentGallery.style.overflowX = 'hidden';
    // remove thumbnail button scroll buttons
    changeScrollButtonDisplay('none');
  }
});

// resize modal when screen size changes
window.addEventListener("resize", () => {
  if (isModalShowing) {
    imageResize();
  }
});

// modal scroll phone
let touchStartX;
const imageContainer = document.getElementById('modalImageContainer');

if (imageContainer) {
  imageContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  }, {passive: true});

  imageContainer.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const threshold = 50;
    let nextImage;

    imagesInCurrentGallery.forEach((image, index) => {
        if (image.alt === currentImage) {
          if (touchEndX < touchStartX - threshold) {
            if (index < imagesInCurrentGallery.length - 1) {
              nextImage = imagesInCurrentGallery[index + 1];
            } else {
              nextImage = imagesInCurrentGallery[0];
            }
          }
          if (touchEndX > touchStartX + threshold) {
            if (index > 0) {
              nextImage = imagesInCurrentGallery[index - 1];
            } else {
              const lastInGallery = imagesInCurrentGallery.length - 1;
              nextImage = imagesInCurrentGallery[lastInGallery];
            }
          }
        }
      });

      if (nextImage) {
        modalScroll(nextImage);
        imageResize();
      }
  });

  // modal scroll laptop
  document.addEventListener('keydown', function(e) {
    imageResize();
    if (isModalShowing) {
      let nextImage;
      imagesInCurrentGallery.forEach((image, index) => {
          if (image.alt === currentImage) {
            if (e.key === 'ArrowRight') {
              if(index < imagesInCurrentGallery.length - 1) {
                nextImage = imagesInCurrentGallery[index + 1];
              } else {
                nextImage = imagesInCurrentGallery[0];
              }
            }
            if (e.key === 'ArrowLeft') {
              if (index > 0) {
                nextImage = imagesInCurrentGallery[index - 1];
              } else {
                const lastInGallery = imagesInCurrentGallery.length - 1;
                nextImage = imagesInCurrentGallery[lastInGallery];
              }
            }
          }
        });
      if (nextImage) {
        modalScroll(nextImage);
        imageResize();
      }
    }
  });
}

// helper functions
function imageResize() {
  const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pictureFrame = document.getElementsByClassName('modal-content')[0];
    if (screenHeight > screenWidth) {
      // recenter image for portrait
      pictureFrame.style.margin = '40% auto';
      // resize image for portrait
      setTimeout(function(){
        const pictureItself = document.getElementsByClassName('modal-image')[0];
        pictureItself.style.maxHeight = '800px';
     }, 1);
    } else {
      // recenter image for landscape
      pictureFrame.style.margin = '5px auto;';
      pictureFrame.style.padding = '10px';
      // resize image for landscape
      setTimeout(function(){
        const pictureItself = document.getElementsByClassName('modal-image')[0];
        pictureItself.style.maxHeight = '555px';
     }, 0);
    }
}

// find all images in given gallery, add src and alt to array
function getImages(gallery) {
  const children = Array.from(gallery.children);
  if (!children.length) {
    return;
  }
  children.forEach(child => {
    if (child.tagName === 'IMG') {
      imagesInCurrentGallery.push({alt: child.alt, src: child.src});
    } else {
      getImages(child);
    }
  })
}

// find the gallery of the given image
function getGallery(element) {
  const parent = element.parentElement;
  // end if we reach the top
  if (!parent) {
    return;
  }
  const classList = Array.from(parent.classList);
  // crawl till we find the gallery
  if (classList.includes('gallery')) {
    currentGallery = parent;
  } else {
    getGallery(parent);
  }
}

function collapseDropdown() {
  isDropdownShowing = false;
  dropDown.classList.add('fade-out');
  backdrop.classList.add('fade-out');
  setTimeout(() => {
    dropDown.style.display = 'none';
    backdrop.style.display = 'none';
  }, 1000);
}

function collapseModal() {
  isModalShowing = false;
      modal.classList.remove('fade-in');
      modal.classList.add('fade-out');
      const image = document.getElementById('myModalImage');
      const title = document.getElementById('title');
      image.classList.add('fade-out');
      title.classList.add('fade-out');
      setTimeout(function() {
        modal.style.display = "none";
        modalImageContainer.removeChild(image);
        modalTitleContainer.removeChild(title);
      }, 200);

      // bring back thumnbail scrolling
      currentGallery.style.overflowX = 'scroll';
      imagesInCurrentGallery = [];
      currentGallery = {};
      currentImage = '';
      // bring back thumbnail scrollers
      changeScrollButtonDisplay('block')
}

// scroll to next modal image
function modalScroll(nextImage) {
  const image = document.getElementById('myModalImage');
  const title = document.getElementById('title');
  modalImageContainer.removeChild(image);
  modalTitleContainer.removeChild(title);
  currentImage = nextImage.alt;
  modalTitleContainer.innerHTML += `<h2 class='modal-title' id='title''>${nextImage.alt}</h2>`;
  modalImageContainer.innerHTML += `<a id='myModalImage' href=${nextImage.src}><img class='modal-image' src=${nextImage.src}></a>`;
}

// change back and next button display
function changeScrollButtonDisplay(value) {
  const back = Array.from(document.getElementsByClassName('backBtn'));
  const next = Array.from(document.getElementsByClassName('nextBtn'));
  const buttons = back.concat(next);
  console.log(back, next, buttons);
  buttons.forEach(button => {
    button.style.display = value;
  });
}

