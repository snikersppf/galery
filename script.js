let currentImageIndex = 0;
const totalImages = 13;

const categories = ['nature', 'city', 'people']

const imagesData = [
    {
        id: 1,
        url: "п1.jpg",
        category: "people",
        title: "Персон 1",
        description: "Описание изображения с человеком", 
        alt: "Персон 1"
    },
    {
        id: 2,
        url: "п2.jpg",
        category: "people",
        title: "Персон 2",
        description: "описание", 
        alt: "Персон 2"
    },
    {
        id: 3,
        url: "п3.jpg",
        category: "people",
        title: "Персон 3",
        description: "тоже описание", 
        alt: "Персон 3"
    },
    {
        id: 4,
        url: "п4.jpg",
        category: "people",
        title: "Персон 4",
        description: "и это описание", 
        alt: "Персон 4"
    },
    {
        id:5,
        url: "п5.jpg",
        category: "people",
        title: "Персон 5",
        description: "и тут оно ", 
        alt: "Персон 5"
    },
    {
       id: 6,
        url: "пр1.jpg",
        category: "nature",
        title: "Природа 1",
        description: "тут ниче не поменялось", 
        alt: "Природа 1"
    },
    {
        id: 7,
        url: "пр2.avif",
        category: "nature",
        title: "Природа 2",
        description: "точно так же", 
        alt: "Природа 2"
    },
    {
        id: 8,
        url: "пр3.jpg",
        category: "nature",
        title: "Природа 3",
        description: "да", 
        alt: "Природа 3"
    },
    {
        id:9,
        url: "пр4.avif",
        category: "nature",
        title: "Природа 4",
        description: "все верно", 
        alt: "Природа 4"
    },
    {
        id: 10 ,
        url: "с1.jpg",
        category: "city",
        title: "Город 1",
        description: "именно", 
        alt: "Город 1"
    },
    {
       id: 11,
        url: "с2.jpg",
        category: "city",
        title: "Город 2",
        description: "описание", 
        alt: "Город 2"
    },
    {
        id: 12,
        url: "с3.jpg",
        category: "city",
        title: "Город 3",
        description: "Описание фото города три", 
        alt: "Город 3"
    },
    {
        id: 13,
        url: "с4.jpg",
        category: "city",
        title: "Город 4",
        description: "все", 
        alt: "Город 4"
    }

] ;

function displayImages(category = 'all') {
    const galeryContainer = document.querySelector('.photos');

    galeryContainer.innerHTML = '';
    imagesData.forEach (image => {
        if (category === 'all' || image.category === category) {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'item';
            imageDiv.dataset.category = image.category;
            imageDiv.dataset.id =image.id;

            const img = document.createElement('img');
            img.src =image.url;
            img.alt = image.alt;
            img.loading = "lazy";

            imageDiv.appendChild(img);
            
            imageDiv.addEventListener('click', function() {
                openModal(image.id);
            });

            galeryContainer.appendChild(imageDiv);
        }
    } )
}

function openModal (imageId) {
    const image = imagesData.find(img => img.id === imageId);
    if (!image) return;

    currentImageIndex = imagesData.indexOf(image);

    document.getElementById('modal-img').src = image.url;
    document.getElementById('modal-img').alt = image.alt;
    
    
    const modal = document.getElementById('modal');
    modal.hidden = false;

    document.querySelector('.modal-close') .focus();
}

function closeModal() {
    document.getElementById('modal').hidden = true;
}

function showPreviousImage () {
    currentImageIndex = (currentImageIndex - 1 + imagesData.length) % imagesData.length;

    const image = imagesData[currentImageIndex];
    document.getElementById('modal-img').src = image.url;
    document.getElementById('modal-img').alt = image.alt;
    document.getElementById('modal-title').textContent = image.title;
}    

function showNextImage () {
    currentImageIndex = (currentImageIndex + 1) % imagesData.length;

    const image = imagesData[currentImageIndex];
    document.getElementById('modal-img').src = image.url;
    document.getElementById('modal-img').alt = image.alt;
    document.getElementById('modal-title').textContent = image.title;
    
}

document.addEventListener('DOMContentLoaded', function() {
    displayImages();

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));

            this.classList.add('active');
            
            const category = this.dataset.category || 'all';

            displayImages(category);

        });
    });

    document.querySelector('.modal-close').addEventListener('click', closeModal);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !document.getElementById('modal').hidden) {
            closeModal();
        }
    });

    document.getElementById('prev-btn').addEventListener('click', showPreviousImage);
    document.getElementById('next-btn').addEventListener('click', showNextImage);
})