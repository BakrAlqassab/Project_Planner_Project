
// let curElementNumber = 0;

// function scrollHandler() {
//     const distanceToBottom = document.body.getBoundingClientRect().bottom;

//     if (distanceToBottom < document.documentElement.clientHeight + 150) {
//         const newDataElement = document.createElement('div');
//         curElementNumber++;
//         newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
//         document.body.append(newDataElement);
//     }
// }

// window.addEventListener('scroll', scrollHandler);
// This function will implemented every Two seconds continiously
const intervalId = setInterval(() => {
  console.log("Analytics files reading .....");
}, 2000);

document
  .getElementById("stop-analytics-button")
  .addEventListener("click", () => {
    clearTimeout(intervalId);
  });
