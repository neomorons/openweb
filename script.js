const modeToggle = document.getElementById('modeToggle');
const modeText = document.getElementById('modeText');
const body = document.body;
const overlay = document.querySelector('.overlay');


modeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        modeText.innerText = 'Dark Mode';
    } else {
        modeText.innerText = 'Light Mode';
    }
});



// Check for user's preference in local storage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    modeToggle.checked = true;
    modeText.innerText = 'Dark Mode';
} else {
    body.classList.remove('dark-mode');
    modeToggle.checked = false;
    modeText.innerText = 'Light Mode';
}

// Save user's preference in local storage
modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        body.classList.add('dark-mode');
        modeText.innerText = 'Dark Mode';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        modeText.innerText = 'Light Mode';
        localStorage.setItem('darkMode', 'disabled');
    }
});
