// script.js
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const catalog = document.getElementById('catalog');
    const toggleModeCheckbox = document.getElementById('dn');
    const logo = document.getElementById('logo');

    // Initialize an empty catalogData array
    const catalogData = [];

    // Fetch the list from the PHP file
    fetch('api/index.php')
        .then(response => response.json())
        .then(fetchedData => {
            // Access the fetched array
            console.log(fetchedData);

            // Use the fetched array to create catalog entries and populate catalogData
            fetchedData.forEach(item => {
                // Add the item to the catalogData array
                catalogData.push({
                    title: item.title,
                    image: item.imagePath,
                    link: item.link,
                    name: item.name,
                    gitlink: 'https://github.com/' + item.name,
                });
            });

            // Now catalogData is populated with the data from PHP
            console.log(catalogData);

            // Render catalog after fetching data
            renderCatalog(catalogData);
        })
        .catch(error => console.error('Error fetching catalog data:', error));

    // Function to render catalog items
    function renderCatalog(data) {
        catalog.innerHTML = ''; // Clear existing items

        data.forEach(item => {
            const catalogItem = document.createElement('div');
            catalogItem.classList.add('catalog-item');

            const link = document.createElement('a');
            link.href = item.link;

            const contributor = document.createElement('div');
            contributor.classList.add('contributor');

            const card = document.createElement('div');
            card.classList.add('card');

            const gitlink = document.createElement('a');
            gitlink.href = item.gitlink;

            const name = document.createElement('span');
            name.textContent = item.name;

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;

            link.appendChild(img);

            const title = document.createElement('span');
            title.textContent = item.title;

            // Create a new element to represent the GitHub icon
            const githubIcon = document.createElement('i');
            githubIcon.classList.add('fa-brands');
            githubIcon.classList.add('fa-github');
            githubIcon.classList.add('fa-xs');

            gitlink.appendChild(githubIcon);
            gitlink.appendChild(name);
            contributor.appendChild(gitlink);

            link.appendChild(title);

            card.appendChild(link);

            catalogItem.appendChild(card);
            catalogItem.appendChild(contributor);

            catalog.appendChild(catalogItem);
        });
    }

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        // Filter catalog items based on search term
        const filteredData = catalogData.filter(item =>
            item.title.toLowerCase().includes(searchTerm)
        );

        // Render filtered catalog
        renderCatalog(filteredData);
    });

    // Event listener for dark mode toggle
    toggleModeCheckbox.addEventListener('change', function () {
        const isDarkMode = this.checked;

        document.body.classList.toggle('dark-mode', isDarkMode);
        document.querySelectorAll('.dark-mode-toggle').forEach((el) => {
            el.classList.toggle('dark-mode', isDarkMode);
        });

        // Add logic to update CSS variables based on the theme
        updateTheme(isDarkMode);

        // Apply grayscale effect to card images in dark mode
        const cardImages = document.querySelectorAll('.card img');
        cardImages.forEach((img) => {
            img.classList.toggle('grayscale', isDarkMode);
        });
    });
    
    // Event listener for card image hover
    catalog.addEventListener('mouseover', function (event) {
        const isDarkMode = toggleModeCheckbox.checked;
    
        // Apply grayscale effect to the card image when in dark mode
        if (isDarkMode && event.target.closest('.card')) {
            const card = event.target.closest('.card');
            const img = card.querySelector('img');
            if (img) {
                img.classList.remove('grayscale');
            }
        }
    });
    
    catalog.addEventListener('mouseout', function (event) {
        const isDarkMode = toggleModeCheckbox.checked;
    
        // Remove grayscale effect on the card image when not hovered
        if (isDarkMode && event.target.closest('.card')) {
            const card = event.target.closest('.card');
            const img = card.querySelector('img');
            if (img) {
                img.classList.add('grayscale');
            }
        }
    });

    // Function to update CSS variables based on theme
    function updateTheme(isDarkMode) {
        if (isDarkMode) {
            logo.style.filter = 'none';
            document.documentElement.style.setProperty('--primary-bg', '#6A6A6A');
            document.documentElement.style.setProperty('--text-color', '#FFFFFF');
            document.documentElement.style.setProperty('--border-color', '#959595');
            document.documentElement.style.setProperty('--overlay-color', 'rgba(0, 0, 0, 0.8)');
            document.documentElement.style.setProperty('--link-color', '#468EFF');
            document.documentElement.style.setProperty('--link-hover-color', '#2B68FF');
            document.documentElement.style.setProperty('--header-bg', '#000000');
            document.documentElement.style.setProperty('--search-text-color', '#F1F4F5');
            document.documentElement.style.setProperty('--footer-bg', '#000000');
            document.documentElement.style.setProperty('--footer-text', '#FFFFFF');
            document.documentElement.style.setProperty('--toggle-bg', 'linear-gradient(to bottom, #F5515F, #CD2942)');
        } else {
            logo.style.filter = 'invert(100%)';
            document.documentElement.style.setProperty('--primary-bg', '#F1F4F5');
            document.documentElement.style.setProperty('--secondary-bg', '#FAFAFB');
            document.documentElement.style.setProperty('--text-color', '#333333');
            document.documentElement.style.setProperty('--border-color', '#E5E5E5');
            document.documentElement.style.setProperty('--overlay-color', 'rgba(0, 0, 0, 0.8)');
            document.documentElement.style.setProperty('--link-color', '#468EFF');
            document.documentElement.style.setProperty('--link-hover-color', '#2B68FF');
            document.documentElement.style.setProperty('--header-bg', '#FFFFFF');
            document.documentElement.style.setProperty('--search-text-color', '#636c72');
            document.documentElement.style.setProperty('--footer-bg', '#FAFAFB');
            document.documentElement.style.setProperty('--footer-text', '#4D4A4A');
            document.documentElement.style.setProperty('--toggle-bg', 'linear-gradient(to bottom, #F5515F, #CD2942)');
        }
    }
});
