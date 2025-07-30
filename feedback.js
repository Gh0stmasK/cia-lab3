document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    const feedbackList = document.getElementById('feedbackList');
    const charCount = document.getElementById('charCount');
    const comments = document.getElementById('comments');
    const clearBtn = document.getElementById('clearBtn');
    const welcomeBack = document.getElementById('welcomeBack');
    if (sessionStorage.getItem('visited')) {
        welcomeBack.classList.remove('hidden');
    } else {
        sessionStorage.setItem('visited', 'true');
    }
    comments.addEventListener('input', function () {
        charCount.textContent = comments.value.length;
    });

    function loadFeedbacks() {
        feedbackList.innerHTML = '';
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        if (feedbacks.length === 0) {
            feedbackList.innerHTML = '<div class="text-center text-gray-500">No feedbacks yet.</div>';
            return;
        }
        feedbacks.forEach(fb => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow p-6';
            card.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <div class="font-bold text-lg">${fb.name}</div>
                    <div class="text-yellow-500 font-semibold">Rating: ${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}</div>
                </div>
                <div class="text-gray-600 text-sm mb-1"><span class="font-medium">Email:</span> ${fb.email}</div>
                <div class="text-gray-600 text-sm mb-1"><span class="font-medium">Department:</span> ${fb.department}</div>
                <div class="text-gray-700 mt-2 whitespace-pre-line">${fb.comments || '<i>No comments</i>'}</div>
            `;
            feedbackList.appendChild(card);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const department = document.getElementById('department').value;
        const rating = form.rating.value;
        const commentsVal = comments.value.trim();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        const feedback = { name, email, department, rating: Number(rating), comments: commentsVal };
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        form.reset();
        charCount.textContent = '0';
        loadFeedbacks();
    });

    // Rating selection event listener
    document.getElementById('ratingGroup').addEventListener('change', function (e) {
        // Could be used for live feedback, e.g., highlighting stars
    });

    // Clear all feedbacks
    clearBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to clear all feedbacks?')) {
            localStorage.removeItem('feedbacks');
            loadFeedbacks();
        }
    });

    loadFeedbacks();
});
