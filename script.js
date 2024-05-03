document.addEventListener('DOMContentLoaded', async function () {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');
    const themeBtn = document.getElementById('themeBtn');
    const amountInput = document.getElementById('amount');

    try {
        // Fetches exchange rate data from API endpoint
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();

        // Extract currency codes from the response
        const currencies = Object.keys(data.rates);

        // Populate the dropdown lists with currency options
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrencySelect.appendChild(option.cloneNode(true));
            toCurrencySelect.appendChild(option.cloneNode(true));
        });
    } catch (error) {
        console.error('Error fetching currency data:', error);
        resultDiv.textContent = 'An error occurred. Please try again later.';
        convertBtn.disabled = true; // Disables the convert button if there's an error
    }

    // Add event listener to the convert button
    convertBtn.addEventListener('click', handleConvertClick);

    // Add event listener to the "fromCurrency" and "toCurrency" dropdown lists
    fromCurrencySelect.addEventListener('change', handleConversionUpdate);
    toCurrencySelect.addEventListener('change', handleConversionUpdate);

    // Add event listener to the "amount" input field
    amountInput.addEventListener('keyup', handleConversionUpdate);

    // Add event listener to the theme button
    themeBtn.addEventListener('click', toggleTheme);

    // Function to handle currency conversion
    async function handleConvertClick() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = amountInput.value;

        try {
            // Fetch exchange rate data from API
            const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
            const data = await response.json();

            // Check if the conversion rates are available
            if (!data || !data.rates || !data.rates[toCurrency]) {
                throw new Error('Invalid data received from the API');
            }

            // Retrieve exchange rate
            const exchangeRate = data.rates[toCurrency];

            // Convert the amount
            const convertedAmount = amount * exchangeRate;

            // Display conversion result and exchange rate
            resultDiv.innerHTML = `
                <p>${amount} ${fromCurrency} equals ${convertedAmount.toFixed(2)} ${toCurrency}.</p>
                <p>1 ${fromCurrency} equals ${exchangeRate} ${toCurrency}.</p>
            `;
        } catch (error) {
            console.error('Error fetching or processing data:', error);
            resultDiv.textContent = 'An error occurred. Please try again later.';
        }
    }

    // Updates the conversion result when the "fromCurrency", "toCurrency", or "amount" changes
    function handleConversionUpdate() {
        // This function is now empty, as the conversion result will only be displayed when the convert button is clicked
    }

   
});
