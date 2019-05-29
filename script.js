const containerImg = document.querySelector('.container-images');
const flickrKey = '138be61f7875e8ba4ab97367ef01772a';
const searchInput = document.querySelector('.input-search');
const searchButton = document.querySelector('.button-search');
const counts = document.querySelectorAll('.count');
let imgs = {};
let inputValue;
let numberImages = 0;

function removeData(){
    containerImg.innerHTML = '';
}
function downloadData(e) {
e.preventDefault();
removeData();
inputValue = searchInput.value;
if (numberImages) {
fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=138be61f7875e8ba4ab97367ef01772a&text=${inputValue}&sort=relevance&format=json&nojsoncallback=1`)
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        imgs = resp.photos.photo; 
        insertImages(numberImages);
    });
}
else {
    alert('Select the number of photos');
}}

function numberOfImages() {
    counts.forEach(count => count.classList.remove('active'));
    this.classList.add('active');
    numberImages = this.dataset.value;
}

function insertImages(x) {
    const div = document.createElement('div');
    div.classList.add('images');
    if(x === 'All'){
        for(let i=0; i<imgs.length; i++) {
            let img = imgs[i];
            const divImg = document.createElement('div');
            divImg.classList.add('image');
            const picture = document.createElement('img');
            picture.src = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;  
            divImg.appendChild(picture);
            div.appendChild(divImg);
            }
    }
    else {

        for(let i=0; i<parseInt(x); i++) {
            let img = imgs[i];
            const divImg = document.createElement('div');
            divImg.classList.add('image');
            const picture = document.createElement('img');
            picture.src = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;  
            divImg.appendChild(picture);
            div.appendChild(divImg);
            }
    }
    containerImg.appendChild(div); 
}

searchButton.addEventListener('click',downloadData);
counts.forEach(count => count.addEventListener('click',numberOfImages));
