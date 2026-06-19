
const msg = document.querySelector(".msg");
const dropdown = document.querySelectorAll('.dropdown select');

// Function to update flag image based on currency code
function updateFlag(selectElement) {
    const currCode = selectElement.value;
    const countryCode = countryList[currCode];
    const imgElement = selectElement.closest('.select-container').querySelector('img');
    
    if (imgElement && countryCode) {
        imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }
}


// for displaying the name of the currency in the dropdown
for(let select of dropdown){
    for( let currCode in countryList) {
        let newOpt = document.createElement('option');
        newOpt.value = currCode;
        newOpt.innerText = currCode;
        select.append(newOpt);
    }
    // Add event listener to update flag when selection changes
    select.addEventListener('change', function() {
        updateFlag(this);
    });
}



const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const btn = document.querySelector('form button');
//default values for the dropdowns
fromCurr.value = 'USD';
toCurr.value = 'INR'; 

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const amtVal = document.querySelector('.amount input').value;
    if (isNaN(amtVal) || amtVal <= 0) {
        msg.innerText = "Please enter a valid amount.";
        return;
    }
    const URL =`https://open.er-api.com/v6/latest/${fromCurr.value}`;
    
    let response = await fetch(URL);
    let data = await response.json(); // add 'let'
    const rate = data.rates[toCurr.value];
    let total =rate*amtVal;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${total.toFixed(2)} ${toCurr.value}`;

});

const swapIcon = document.querySelector('.dropdown i');

swapIcon.addEventListener('click', () => {
    // Swap the selected currency values
    let tempVal = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempVal;

    // Swap the flags
    updateFlag(fromCurr);
    updateFlag(toCurr);
});