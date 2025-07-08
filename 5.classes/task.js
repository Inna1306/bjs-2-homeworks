class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100;
        this.type = null;
    }

    fix() {
        this.state = this._state * 1.5;
    }

    set state(newState) {
        if (newState < 0) {
            this._state = 0;
        } else if (newState > 100) {
            this._state = 100;
        } else {
            this._state = newState;
        }
    }

    get state() {
        return this._state;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "book";
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}
// ... existing code ...

// Класс библиотеки
class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        return this.books.find(book => book[type] === value) || null;
    }

    giveBookByName(bookName) {
        const bookIndex = this.books.findIndex(book => book.name === bookName);
        if (bookIndex === -1) {
            return null;
        }
        return this.books.splice(bookIndex, 1)[0];
    }
}


const library = new Library("Городская библиотека");

const magazine = new Magazine("National Geographic", 2020, 120);
const novel = new NovelBook("Лев Толстой", "Война и мир", 1869, 1225);
const fantastic = new FantasticBook("Айзек Азимов", "Основание", 1951, 255);
const detective = new DetectiveBook("Артур Конан Дойл", "Собака Баскервилей", 1902, 256);
const oldBook = new Book("Неизвестный автор", "Старинная книга", 1919, 300);
oldBook.state = 40;
const badBook = new Book("Плохой автор", "Плохая книга", 2000, 100);
badBook.state = 10; // Не должна быть добавлена

library.addBook(magazine);
library.addBook(novel);
library.addBook(fantastic);
library.addBook(detective);
library.addBook(oldBook);
library.addBook(badBook); // Не добавится

console.log("\nКниги в библиотеке:", library.books.map(b => b.name));

// Найти книгу, изданную в 1919 году
let found1919 = library.findBookBy("releaseDate", 1919);
if (!found1919) {
    found1919 = new Book("Неизвестный автор", "Старинная книга", 1919, 300);
    library.addBook(found1919);
}
console.log("\nКнига 1919 года:", found1919 ? found1919.name : "Не найдена");

// Выдать любую книгу
const issuedBook = library.giveBookByName("Война и мир");
console.log("\nВыдана книга:", issuedBook ? issuedBook.name : "Не найдена");


if (issuedBook) {
    issuedBook.state = 20;
    console.log("Состояние после повреждения:", issuedBook.state);

    issuedBook.fix();
    console.log("Состояние после восстановления:", issuedBook.state);

    library.addBook(issuedBook);
    console.log("\nКниги в библиотеке после возврата:", library.books.map(b => b.name));
}
