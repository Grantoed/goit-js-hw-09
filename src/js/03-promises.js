import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const delayValue = refs.delay.value;
  const stepValue = refs.step.value;
  const amountValue = refs.amount.value;

  for (let i = 1; i <= amountValue; i += 1) {
    setTimeout(() => {
      createPromise(i, delayValue)
        .then(({ position, delay }) =>
          Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`)
        )
        .catch(({ position, delay }) =>
          Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`)
        );
    }, delayValue);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
