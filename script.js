const imgContainer = document.querySelector('.img-container');
const loader = document.querySelector('.loader');

let isInitialLoad = true;
let readyToScroll = false;
let imgsLoaded = 0;
let totalImgs = 0;
let photosArray = [];
let initialLoad = true;

let initialCount = 5;
const apiKey = 'JMZuwZyOC1sY7kHGsoglHeXzWpLw_jO21wI8D9mzcWs';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Check if all images were loaded
const imgLoaded = () => {
    imgsLoaded++;
    if (imgsLoaded === totalImgs) {
        readyToScroll = true;
        loader.hidden = true;
        initialCount = 30;
    }
}

// Set attributes on DOM elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos -> add to DOM
const displayPhotos = () => {
    imgsLoaded = 0;
    totalImgs = photosArray.length;
    console.log(totalImgs)
    photosArray.forEach((photo) => {
        // Create <a> to link to API
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank'
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imgLoaded)
        // Put <img> inside <a>, then put both inside imgContainer
        item.appendChild(img);
        imgContainer.appendChild(item);
    })
}

// Get photots from Unsplash API
const getPhotos = async function() {
    try {
        const resp = await fetch(apiUrl);
        photosArray = await resp.json();
        displayPhotos();
    } catch (err) {
        alert('something went wrong', err)
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToScroll) {
        readyToScroll = false;
        getPhotos();
    }
});

getPhotos();
