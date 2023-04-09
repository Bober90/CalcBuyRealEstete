export const percentFormatter=new Intl.NumberFormat('ru-RU' ,
{style:'percent',
maximumFractionDigits:3,
}
); 



export const priceFormatter=new Intl.NumberFormat('ru-RU', 
{style:'currency',
 currency:'USD', 
 maximumFractionDigits:0,
}
); 

export const priceFormatterDecimals=new Intl.NumberFormat('ru-RU', 
{style:'currency',
 currency:'USD', 
 maximumFractionDigits:2,
}
); 

