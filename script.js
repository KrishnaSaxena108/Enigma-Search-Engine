document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const historyContainer = document.getElementById('history-container');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    function loadSearchHistory() {
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        historyContainer.innerHTML = '';
        if (searchHistory.length === 0) {
            historyContainer.innerHTML = '<p>No search history available.</p>';
            historyContainer.style.textAlign = 'center';
        } else {
            searchHistory.forEach(term => {
                const historyItem = document.createElement('p');
                historyItem.textContent = term;
                historyContainer.appendChild(historyItem);
                historyContainer.style.textAlign = 'center';
            });
        }
    }

    function saveSearchTerm(term) {
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.push(term);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        loadSearchHistory();
    }

    function clearSearchHistory() {
        localStorage.setItem('searchHistory', JSON.stringify([]));
        loadSearchHistory();
    }

    searchBtn.addEventListener('click', function () {
        const searchTerm = searchInput.value;
        if (searchTerm !== '') {
            saveSearchTerm(searchTerm);
            window.open(`https://www.google.com/search?q=${searchTerm}`, '_blank');
            searchInput.value = '';
        }
    });

    clearHistoryBtn.addEventListener('click', clearSearchHistory);

    loadSearchHistory();
});
