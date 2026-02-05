using Microsoft.VisualStudio.TestTools.UnitTesting;
using LibraryManagementSystem;

namespace LibraryTests
{
    [TestClass]
    public class LibraryTest
    {
        private Library library;

        [TestInitialize]
        public void Setup()
        {
            library = new Library();
        }

        [TestMethod]
        public void AddBook_Test()
        {
            Book book = new Book { Title = "C#", Author = "MS", ISBN = "101" };
            library.AddBook(book);
            Assert.AreEqual(1, library.Books.Count);
        }

        [TestMethod]
        public void RegisterBorrower_Test()
        {
            Borrower borrower = new Borrower { Name = "Ravi", LibraryCardNumber = "L01" };
            library.RegisterBorrower(borrower);
            Assert.AreEqual(1, library.Borrowers.Count);
        }

        [TestMethod]
        public void BorrowBook_Test()
        {
            Book book = new Book { Title = "Java", Author = "Oracle", ISBN = "102" };
            Borrower borrower = new Borrower { Name = "Anu", LibraryCardNumber = "L02" };

            library.AddBook(book);
            library.RegisterBorrower(borrower);
            library.BorrowBook("102", "L02");

            Assert.IsTrue(book.IsBorrowed);
            Assert.AreEqual(1, borrower.BorrowedBooks.Count);
        }

        [TestMethod]
        public void ReturnBook_Test()
        {
            Book book = new Book { Title = "Python", Author = "Guido", ISBN = "103" };
            Borrower borrower = new Borrower { Name = "Kiran", LibraryCardNumber = "L03" };

            library.AddBook(book);
            library.RegisterBorrower(borrower);
            library.BorrowBook("103", "L03");
            library.ReturnBook("103", "L03");

            Assert.IsFalse(book.IsBorrowed);
            Assert.AreEqual(0, borrower.BorrowedBooks.Count);
        }
    }
}
