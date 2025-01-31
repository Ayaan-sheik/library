const openBtn = document.getElementsByClassName('AddBook')[0];
const closeBtn = document.getElementsByClassName('cancel')[0];
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');

openBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
    overlay.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});


const myLibrary = [];

function AddBook(title ,author , pages , read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title ,author , pages , read){
    const newBook = new AddBook(title ,author , pages , read)
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks(){
    const cardsContainer = document.querySelector('.cards');
    // Clear existing cards
    cardsContainer.innerHTML = '';

    // Create a card for each book in the library
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <div class="book-header">
                Book Details
            </div>
            <div class="book-content">
                <div class="book-details">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-pages">Pages: ${book.pages}</div>
                </div>
                <div class="book-actions">
                    <div class="read-toggle">
                        <input type="checkbox" id="readToggle${index}" ${book.read ? 'checked' : ''}>
                        <label for="readToggle${index}">Mark as Read</label>
                    </div>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(bookCard);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            myLibrary.splice(index, 1);
            displayBooks();
        });
    })

    const readToggles = document.querySelectorAll('.read-checkbox');
    readToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const index = toggle.getAttribute('data-index');
            myLibrary[index].toggleRead();
            displayBooks(); // Refresh UI to reflect changes
        });
    });
}



AddBook.prototype.toggleRead = function () {
    this.read = !this.read; 
};

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;
    const read = document.getElementById('book-read').checked;

    addBookToLibrary(title, author, pages, read);
    
    // Close popup and reset form
    popup.style.display = 'none';
    overlay.style.display = 'none';
    form.reset();
});