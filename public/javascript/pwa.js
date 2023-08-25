document.addEventListener('DOMContentLoaded', init, false);
function init() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/serviceWorker.js')
        .then(reg => {
            console.log('Service sorker registered -->', reg);
        }, err => {
            console.error('Service worker not registered --> ', err);
        })
    }
}