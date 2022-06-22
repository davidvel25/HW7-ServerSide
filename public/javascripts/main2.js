let libraryArray = [];

let Book = function (bTitle, bYear, bLastName, bFirstName, bISBN, bGenre, bReviewer, bDate, bRating){
    this.title = bTitle;
    this.year = bYear;
    this.lastName = bLastName;
    this.firstName = bFirstName;
    this.libraryCount = libraryArray.length + 1;
    this.ISBN = bISBN;
    this.genre = bGenre;
    this.reviewer = bReviewer;
    this.date = bDate;
    this.rating = bRating;
    this.ID = Math.random().toString(16).slice(5);

    //Rating Catalog
    this.newReview = [new Review(bDate, bTitle, bGenre, bReviewer, bRating)];
}

let Review = function(bDate, bTitle, bGenre, bReviewer, bRating){
    this.date = bDate;
    this.title = bTitle;
    this.genre = bGenre;
    this.reviewer = bReviewer;
    this.rating = bRating;
}

libraryArray.push(new Book("book1", 2012, "floop", "droop", 1925320, 'adventure', 'John Dempsey', '2022-05-04', '5'));

let currentGenre = "noneSelected";

document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("addtoList").addEventListener("click", function(){
        document.getElementById("ulBookList").innerHTML = libraryArray;
        document.getElementById("ulBookRemove").innerHTML = libraryArray;
        let tempGenre = document.getElementById("select-genre");
        let tempGenre2 = tempGenre.options[tempGenre.selectedIndex].text;
        let tempRating = document.getElementById("rating");
        let tempRating2 = tempRating.options[tempRating.selectedIndex].text;
        libraryArray.push(new Book  (   document.getElementById("title").value,
                                        document.getElementById("year").value,
                                        document.getElementById("lastName").value,
                                        document.getElementById("firstName").value,
                                        document.getElementById("ISBN").value,
                                        tempGenre2,
                                        document.getElementById("reviewer").value,
                                        document.getElementById("date").value,
                                        tempRating2,

                                    ));

                                    //new code until 1
                                    let newBook = new Book(document.getElementById("specificBookID").value, document.getElementById("rating").value,
                                    document.getElementById("specificBookTitle").value );
                                                                //push note to server
                                    $.ajax({
                                        url : "/AddBook",
                                        type: "POST",
                                        data: JSON.stringify(newBook),
                                        contentType: "application/json; charset=utf-8",
                                        success: function (result) {
                                            console.log(result);
                                                    // document.location.href = "index2.html#listAll";
                                                    document.location.href = "index.html#listAll";
                                        }
                                    });
                            
                                    // $(document).bind("change", "#rating", function(event, ui){
                                    //     selectedRating = document.getElementById("rating").value;
                                    // });
                            
                                    // $(document).on("pagebeforeshow", "show", function(event){
                                    //     createList();
                                    // });

                                    //until here 1
        
    console.log("add Book");
    console.log(libraryArray);
    updateList();
    clearForm();
    });

    // I need help clearing the two lines that use the dropdown... this means using the .selectedIndex property
    // here is a site that I used, but it didn't end up working out:
    // https://bit.ly/3ajnwWx

    function clearForm(){
        let genreSelect = document.getElementById("select-genre")
        genreSelect.options[genreSelect.selectedIndex].value = 'pick';
        // genreSelect.options[genreSelect.selectedIndex].text = " -- select a genre -- ";
        $("#select-genre").selectmenu('refresh', true); 

        document.getElementById("title").value = "";
        document.getElementById("year").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("firstName").value = "";
        document.getElementById("ISBN").value = "";
        // document.getElementById("select-genre").selectedIndex = 0;
        // document.getElementById("select-genre").value = "fiction";
        document.getElementById("reviewer").value = "";
        document.getElementById("date").value = "";
        document.getElementById("rating").selectedIndex = 0;    
    }

    document.getElementById("clearLibrary").addEventListener("click", function(){
        libraryArray = [];
    });

    //new method of for-loop known as the for-of loop
    function updateList(){
        let tempulList = document.getElementById("ulBookList");
        let tempulRemove = document.getElementById("ulBookRemove");
        let fullList = "";
        for (let element of libraryArray) {
            fullList += `   
                            <li>${element.date} : ${element.title} by ${element.lastName},${element.firstName} rated by ${element.reviewer} with a rating of ${element.rating}</li>
                            <br>
                        `;

            // fullList += `   
            //                 <li><strong><u>Book #${element.libraryCount}</u></strong>:</li>
            //                 <li>title: ${element.title}</li>
            //                 <li>year: ${element.year}</li>
            //                 <li>last name: ${element.lastName}</li>
            //                 <li>first name: ${element.firstName}</li>
            //                 <li>isbn: ${element.ISBN}</li>
            //                 <li>genre: ${element.genre}</li>
            //                 <li>reviewer: ${element.reviewer}</li>
            //                 <li>date: ${element.date}</li>
            //                 <li>rating: ${element.rating}</li>
            //                 <br>
            //             `;
        }
        tempulList.innerHTML = fullList;
        tempulRemove.innerHTML = fullList;
    }

    // function deleteMovie(which) {
    //     console.log(which);
    //     let arrayPointer = GetArrayPointer(which);
    //     movieArray.splice(arrayPointer, 1);  // remove 1 element at index 
    // }

    // document.getElementById("delete").addEventListener("click", function () {
    //     let localParm = localStorage.getItem('parm');  // get the unique key back from the dictionairy
    //     deleteMovie(localParm);
    //     createList();  // recreate li list after removing one
    //     document.location.href = "index.html#ListAll";  // go back to movie list 
    // });


    // function dynamicSort(property){
    //     var sortOrder = 1;
    //     for (let element of libraryArray) {

    //         if(property[0] === "-"){
    //             sortOrder = -1;
    //             property = property.substr(1);
    //         }

    //         return function(a,b){
    //             if (sortOrder == -1) return b[property].localeCompare(a[property]);
    //             else return a[property].localeCompare(b[property]);;
    //         }

    //     }
    // }

    // document.getElementById("sortTile").addEventListener("click", function(){
    //     // libraryArray.sort(sortTitleFunction);
    //     movieArray.sort(dynamicSort("title"));
    //     var sortTitleList = [];
    //     document.location.href = "index2.html#listAll";
    // });    

    // function sortTitleFunction(a, b){
    //     for (let element of libraryArray){
    //         if (a.genre.toLowerCase.substring(0,1)() < b.genre.toLowerCase()) return -1;
    //         if (a.genre.toLowerCase() > b.genre.toLowerCase()) return +1;
    //         return 0;
    //     }



    // }



        // page before show code *************************************************************************
        $(document).on("pagebeforeshow", "#listAll", function (event) {   // have to use jQuery 
            createList();
        });
    
    
        // need one for our details page to fill in the info based on the passed in ID
        $(document).on("pagebeforeshow", "#details", function (event) {   
            let BookID = localStorage.getItem('parm');  // get the unique key back from the storage dictionairy
            let book;
            for (let i = 0; i < libraryArray.length; i++){
                if(libraryArray[i].ID == BookID){
                    book = libraryArray[i];
                    document.getElementById("specificBookID").innerHTML = BookID;
                    document.getElementById("specificBookRating").innerHTML = book.rating;
                    document.getElementById("specificBookTitle").innerHTML = book.title;
                }
            }
            // document.getElementById("specificBookID").innerHTML = "Title: " + title;
            // document.getElementById("specificBookID").innerHTML = "Year Published: " + year;
            // document.getElementById("specificBookID").innerHTML = "Author's Last Name: " + lastName;
            // document.getElementById("specificBookID").innerHTML = "Author's First Name: " + firstName;
            // document.getElementById("specificBookID").innerHTML = "ISBN: " + ISBN;
            // document.getElementById("specificBookID").innerHTML = "Genre: " + genre;
            // document.getElementById("specificBookID").innerHTML = "Reviewer: " + reviewer;
            // document.getElementById("specificBookID").innerHTML = "Date: " + date;
            // document.getElementById("specificBookID").innerHTML = "Rating: " + rating;

            // document.getElementById("title").innerHTML = "Title: " + title;
            // document.getElementById("year").innerHTML = "Year Published: " + year;
            // document.getElementById("lastName").innerHTML = "Author's Last Name: " + lastName;
            // document.getElementById("firstName").innerHTML = "Author's First Name: " + firstName;
            // document.getElementById("ISBN").innerHTML = "ISBN: " + ISBN;
            // document.getElementById("select-genre").innerHTML = "Genre: " + genre;
            // document.getElementById("reviewer").innerHTML = "Reviewer: " + reviewer;
            // document.getElementById("date").innerHTML = "Date: " + date;
            // document.getElementById("rating").innerHTML = "Rating: " + rating;
        });

    function createList() {
        // clear prior data
        var theList = document.getElementById("ulBookList");
        theList.innerHTML = "";

        var theRemove = document.getElementById("ulBookRemove");
        theRemove.innerHTML = "";
    
        //new code until 2

        $.get("/getAllBooks", function(data, status){
            // AJAX get 
            NoteArray = data; // copy returned server json data into local array
            // now INSIDE this “call back” anonymous function, 
            // update the web page with this new data

        
     
    
        libraryArray.forEach(function (element, i) {   // use handy array forEach method
            var myLi = document.createElement('li');
            myLi.classList.add('oneBook');
            myLi.innerHTML =  element.date + ":  " + element.title + " rated by " + element.reviewer + " with rating of " + element.rating;
    
            // use the html5 "data-parm" to store the ID of this particular movie object 
            // that we are currently building an li for so that I can later know which movie this li came from
            myLi.setAttribute("data-parm", element.ID);
    
            theList.appendChild(myLi);
        });
    });
    //until 2
    
        var liList = document.getElementsByClassName("oneBook");
        let newLibraryArray = Array.from(liList);
    
        newLibraryArray.forEach(function (element,i) {     
            element.addEventListener('click', function () {     
                
                var parm = this.getAttribute("data-parm");  // data-parm has this movie object's ID value
                // now save THIS ID value in the localStorage "dictionairy"
                localStorage.setItem('parm', parm);
                let stringBookArray = JSON.stringify(libraryArray);
                localStorage.setItem('libraryArray', stringBookArray);
        // document.location.href = "index2.html#listAll";
        document.location.href = "index.html#details";            
    });
        });
      
    };



    // $(document).on("pagebeforeshow", "#details", function(event){
        // document.getElementById("title").innerHTML = "Title: " + title;
        // document.getElementById("year").innerHTML = "Year Published: " + year;
        // document.getElementById("lastName").innerHTML = "Author's Last Name: " + lastName;
        // document.getElementById("firstName").innerHTML = "Author's First Name: " + firstName;
        // document.getElementById("ISBN").innerHTML = "ISBN: " + ISBN;
        // document.getElementById("select-genre").innerHTML = "Genre: " + genre;
        // document.getElementById("reviewer").innerHTML = "Reviewer: " + reviewer;
        // document.getElementById("date").innerHTML = "Date: " + date;
        // document.getElementById("rating").innerHTML = "Rating: " + rating;
    //     })

    document.getElementById("sortTitle").addEventListener("click", function(){
        console.log("sort Title");
        libraryArray.sort(dynamicSort("title"));
        // document.location.href = "index2.html#listAll";
        document.location.href = "index.html#listAll";
    });

    document.getElementById("sortGenre").addEventListener("click", function(){
        console.log("sort Genre");
        libraryArray.sort(dynamicSort("select-genre"));
        // document.location.href = "index2.html#listAll";
        document.location.href = "index.html#listAll";
    });

    // document.getElementById("sortRating").addEventListener("click", function(){
    //     console.log("sort by rating");
    //     libraryArray.sort(dynamicSort("rating"));
    //     document.location.href = "index2.html#listAll";
    // });

});