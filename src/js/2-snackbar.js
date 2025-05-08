import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

function createPromise(delay, isActive) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isActive) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay)
    });

    return promise;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value; 
    const isActive = state === 'fulfilled';

    createPromise(delay, isActive)
        .then((result) => {
            console.log(`✅ Fulfilled promise in ${result}ms`);
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${result}ms`,
            });
        })
        .catch((result) => {
            console.log(`❌ Rejected promise in ${result}ms`);
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${result}ms`,
            });
        });
})
