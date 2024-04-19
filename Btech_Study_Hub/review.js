document.addEventListener("DOMContentLoaded", function() {
    const allStar = document.querySelectorAll('.rating .star');
    const ratingValue = document.querySelector('.rating input');
    const nameInput = document.getElementById('name');
    const opinionInput = document.getElementById('opinion');
    const reviewList = document.getElementById('review-list');

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDOjKbUvqrKvydfCDJiM627dSZ21z80Ci0",
        authDomain: "live-chat-44836.firebaseapp.com",
        projectId: "live-chat-44836",
        storageBucket: "live-chat-44836.appspot.com",
        messagingSenderId: "703867762202",
        appId: "1:703867762202:web:ad3e03750b1bb7f08c83a3"
      };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    allStar.forEach((item, idx) => {
        item.addEventListener('click', function() {
            let click = 0;
            ratingValue.value = idx + 1;

            allStar.forEach((star, i) => {
                if (i <= idx) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
        });
    });

    function addReviewToDatabase(name, opinion, rating) {
        const reviewRef = database.ref('reviews').push();
        reviewRef.set({
            name: name,
            opinion: opinion,
            rating: rating
        }).then(() => {
            console.log('Review added to database successfully.');
        }).catch(error => {
            console.error('Error adding review to database:', error);
        });
    }

    function addReviewToList(name, opinion, rating) {
        const reviewItem = document.createElement('li');
        reviewItem.style.whiteSpace = "nowrap"; // Prevent line breaks
        reviewItem.style.display = "inline-block"; // Ensure each review item is inline
        reviewItem.style.paddingRight = "20px"; // Add spacing between review items
        reviewItem.innerHTML = `
            <strong>${name}</strong>: (${rating}/5<i class='bx bx-star star' style="color:#f01447;"></i>): ${opinion}
        `;
        reviewList.appendChild(reviewItem);
    }
    

    document.querySelector('.btn.submit').addEventListener('click', function(event) {
        event.preventDefault();
        const name = nameInput.value;
        const opinion = opinionInput.value;
        const rating = parseInt(ratingValue.value);

        if (name && opinion && rating >= 1 && rating <= 5) {
            addReviewToDatabase(name, opinion, rating);
            addReviewToList(name, opinion, rating);
            nameInput.value = '';
            opinionInput.value = '';
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    // Display existing reviews from the database
    database.ref('reviews').once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            const review = childSnapshot.val();
            const { name, opinion, rating } = review;
            addReviewToList(name, opinion, rating);
        });
    });
});