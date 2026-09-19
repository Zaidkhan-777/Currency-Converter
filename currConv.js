const base_URL= "https://latest.currency-api.pages.dev/v1/currencies"
// const base_URL="https://api.frankfurter.app/latest";
const dropdown_s=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
 let msg = document.querySelector(".msg");

/*for (code in countryList){
    console.log(code,countryList[code]);
}*/

for(let select of dropdown_s){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if(select.name==="from"&& currCode==="USD"){
            newOption.selected="selected";
        }
        else if (select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(eve)=>{
    updateFlag(eve.target);
    })
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");//("form input");
    let amtVal=amount.value;
    // console.log(amtVal);

    if (amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${base_URL}/${fromCurr.value.toLowerCase()}.json`;
    console.log(fromCurr.value,toCurr.value);
    let response=await fetch(URL);
    // console.log(response)
    let data =await response.json();
    // console.log(data);

    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    console.log(finalAmount);
 
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  console.log(msg.innerText);

})




