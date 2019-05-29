const containerImg = document.querySelector('.container-images');
const flickrKey = '138be61f7875e8ba4ab97367ef01772a';
const searchInput = document.querySelector('.input-search');
const searchButton = document.querySelector('.button-search');
const counts = document.querySelectorAll('.count');
let imgs = {};
let inputValue;
let numberImages = 0;
let nextStart;

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
        insertImages(0, numberImages);
    });
}
else {
    alert('Select the number of photos');
}}
searchButton.addEventListener('click',downloadData);

/*
function removeLastNthChild(n) {
    let NumberOfChildren= containerImg.children.length;
    for(let i=(NumberOfChildren-1); i>=(NumberOfChildren-n); i--) {
        containerImg.children[i].remove();
        console.log('NumberOfChildren');
    }
} */

function numberOfImages() {
    counts.forEach(count => count.classList.remove('active'));
    this.classList.add('active');
    numberImages = this.dataset.value;
    if(inputValue && ((nextStart < parseInt(numberImages)) || numberImages ==='All')) {
        insertImages(nextStart, numberImages);
    }
    
    
 /*   else if (inputValue && (nextStart > parseInt(numberImages))) {
        let number = Math.abs(parseInt(numberImages)-nextStart);
        console.log(number);
        removeLastNthChild(number);
        
    }*/
}
counts.forEach(count => count.addEventListener('click',numberOfImages));



function insertImages(xStart, xEnd) {
    
    if(imgs.length === 0) {
        const p = document.createElement('p');
        p.innerText = `${inputValue} was not found`;
        containerImg.appendChild(p);
    }
    else if(xEnd === 'All' || imgs.length < parseInt(xEnd)){
        for(let i = xStart; i<imgs.length; i++) {
            let img = imgs[i];
            const divImg = document.createElement('div');
            divImg.classList.add('image');
            const picture = document.createElement('img');
            picture.src = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;  
            divImg.appendChild(picture);
            const link = document.createElement('a');
            link.href = picture.src;
            link.target = '_blank';
            link.appendChild(divImg);
            containerImg.appendChild(link);
            nextStart = parseInt(xEnd);
            }
    }
    else {
        for(let i = xStart; i<parseInt(xEnd); i++) {
            let img = imgs[i];
            const divImg = document.createElement('div');
            divImg.classList.add('image');
            const picture = document.createElement('img');
            picture.src = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`;  
            divImg.appendChild(picture);
            const link = document.createElement('a');
            link.href = picture.src;
            link.target = '_blank';
            link.appendChild(divImg);
            containerImg.appendChild(link);
            nextStart = parseInt(xEnd);
            console.log(nextStart);
            }
    }
    containerImg.classList.add('images');
}


