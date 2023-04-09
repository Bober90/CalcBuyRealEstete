import { priceFormatter, priceFormatterDecimals } from "./formatters.js";

//знаходимо інпути

const inputCost=document.querySelector('#input-cost');
const inputDownPayment=document.querySelector('#input-downpayment');
const inputTerm=document.querySelector('#input-term');
const form=document.querySelector('#form');


const totalCost=document.querySelector('#total-cost');
const totalMonthPaymen=document.querySelector('#total-month-payment');

//cleave опциї форматування
const cleavePriceSetting={
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    delimiter:' ',
}

const cleaveYears={
    numeral: true,
  
}



//запускаєм форматування Cleave
const cleaveCost = new Cleave(inputCost, cleavePriceSetting);
const cleaveDownPayment = new Cleave(inputDownPayment,cleavePriceSetting);
const cleaveTerm = new Cleave(inputTerm,cleavePriceSetting);

//Сума кредита
calcMortgage();


//відображення і розрахунок суми кредита
form.addEventListener('input', function(){
    calcMortgage();
})

function calcMortgage(){
    const totalAmount=+cleaveCost.getRawValue()-cleaveDownPayment.getRawValue();
    totalCost.innerText=priceFormatter.format(totalAmount);

    //Ставка по кредиту


    //термін іпотеки в рік
const creditRate=+document.querySelector('input[name="program"]:checked').value;
const monthRate=creditRate/12;



    const years = +cleaveTerm.getRawValue();
   
    const monts =years*12;
//Розрахунок  місячного платежа
const monthPayment= (totalAmount*monthRate)/(1- (1+monthRate)*(1-monts));


//Відображення щомісячноого платежа
totalMonthPaymen.innerText=priceFormatterDecimals.format(monthPayment);

}

const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    tooltips:true,
    step:100000,
    range: {
        'min': 0,
        '50%':[10000000, 1],
        'max': 100000000
    },
    format:wNumb({
        decimals:0,
        thousand:' ',
        suffix:' ',
    })
});

sliderCost.noUiSlider.on('update', function(){
  
    const sliderValue=parseInt(sliderCost.noUiSlider.get(true));
    // inputCost.value=sliderValue;

    cleaveCost.setRawValue(sliderValue);
    calcMortgage();
});

// Slider Downpayment


const sliderDownPaymant=document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownPaymant, {
    start: 6000000,
    connect: 'lower',
    tooltips:true,
    step:100000,
    range: {
        'min': 0,
        '50%':[10000000, 1],
        'max': 100000000
    },
    format:wNumb({
        decimals:0,
        thousand:' ',
        suffix:' ',
    })
});

sliderDownPaymant.noUiSlider.on('update', function(){
  
    const sliderValue=parseInt(sliderDownPaymant.noUiSlider.get(true));
    // inputCost.value=sliderValue;

    cleaveDownPayment.setRawValue(sliderValue);
    calcMortgage();
});

//Slider YEARS

const sliderTerm=document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    tooltips:true,
    step:1,
    range: {
        'min': 1,
        'max': 30,
    },
    format:wNumb({
        decimals: 0,
        thousand:' ',
        suffix:' ',
    })
});

sliderTerm.noUiSlider.on('update', function(){
  
    const sliderValue=parseInt(sliderTerm.noUiSlider.get(true));
   

    cleaveTerm.setRawValue(sliderValue);
    calcMortgage();
});

