const sizeInput = document.getElementById("size");
const generateArrayForm = document.querySelector("#generateArrayForm");
let bars;

function generateArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
    }
    return array;
}

function displayArray(array) {
    const container = document.getElementById("array-container");
    container.innerHTML = ''; // Clear previous graph
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${value * 5}px`; // Increase the height by multiplying with a factor (e.g., 5)
        bar.style.width = "25px"; // Increase the width to make the bars wider
        container.appendChild(bar);
    });
    bars = document.querySelectorAll(".array-bar");
}

async function bubbleSort() {
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const bar1 = bars[j];
            const bar2 = bars[j + 1];
            if (parseInt(bar1.style.height) > parseInt(bar2.style.height)) {
                await swap(bar1, bar2);
                bars = document.querySelectorAll(".array-bar");
            }
        }
    }
}

function swap(bar1, bar2) {
    return new Promise(resolve => {
        bar1.classList.add("swapping");
        bar2.classList.add("swapping");

        let temp = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = temp;

        setTimeout(() => {
            bar1.classList.remove("swapping");
            bar2.classList.remove("swapping");
            resolve();
        }, 500);
    });
}

async function insertionSort() {
    for (let i = 1; i < bars.length; i++) {
        let current = parseInt(bars[i].style.height);
        let j = i - 1;
        while (j >= 0 && parseInt(bars[j].style.height) > current) {
            await swap(bars[j], bars[j + 1]);
            j--;
        }
        bars[j + 1].style.height = `${current}px`;
    }
}

async function selectionSort() {
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swap(bars[i], bars[minIndex]);
            bars = document.querySelectorAll(".array-bar");
        }
    }
}

async function merge(start, mid, end) {
    let i = start, j = mid + 1;
    let tempArr = [];
    while (i <= mid && j <= end) {
        if (parseInt(bars[i].style.height) < parseInt(bars[j].style.height)) {
            tempArr.push(bars[i].style.height);
            i++;
        } else {
            tempArr.push(bars[j].style.height);
            j++;
        }
    }
    while (i <= mid) {
        tempArr.push(bars[i].style.height);
        i++;
    }
    while (j <= end) {
        tempArr.push(bars[j].style.height);
        j++;
    }
    for (let k = start; k <= end; k++) {
        bars[k].style.height = tempArr[k - start];
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

async function mergeSort() {
    await mergeSortRecursive(0, bars.length - 1);
}

async function mergeSortRecursive(start, end) {
    if

