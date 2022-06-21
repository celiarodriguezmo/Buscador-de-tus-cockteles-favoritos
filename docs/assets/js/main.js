"use strict";const inputSearch=document.querySelector(".js-input-search"),btnSearch=document.querySelector(".js-btn-search"),btnReset=document.querySelector(".js-btn-reset");let resultList=document.querySelector(".js-list");const urlApiCocktails="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";let SearchResults=[],textSearchByUser="",favList=document.querySelector(".js-list-favs"),arrayFavoritos=[];function handleUserSearchForm(){textSearchByUser=inputSearch.value,fetch(`${urlApiCocktails}${textSearchByUser}`).then(t=>t.json()).then(t=>{resultList.innerHTML="",SearchResults=t.drinks,paintResults();const e=document.getElementsByClassName("js-li");for(const t of e)t.addEventListener("click",addFavouriteCocktail)})}function paintResults(){for(const t of SearchResults)paintCockteles(t,resultList)}function paintCockteles(t,e){let r="";arrayFavoritos.findIndex(e=>e.idDrink===t.idDrink);r+=`<li class="js-li js-fav-li" id="${t.idDrink}" data-id="${t.idDrink}">`,r+='<article class="article">',r+=`<img src="${t.strDrinkThumb}"\n  alt="Imagen del cocktail buscado" class="img"/>`,r+='<div class="container">',r+=`<h3>${t.strDrink}</h3>`,r+='<div class="ingredients">',r+=`<p>${t.strIngredient1}</p>`,r+=`<p>${t.strIngredient2}</p>`,r+=`<p>${t.strIngredient3}</p>`,r+="</div>",r+='<div class="alcoholic">',r+=`<p>${t.strAlcoholic}</p>`,r+='<i class="fa-solid fa-martini-glass-citrus"></i>',r+="</div>",r+="</div>",r+="</article>",r+="</li>",e.innerHTML+=r}function addFavouriteCocktail(t){const e=t.currentTarget.dataset.id;checkFavCocktails(SearchResults.filter(t=>e===t.idDrink)[0],t)}function paintFavourites(){favList.innerHTML="";for(const t of arrayFavoritos)paintCockteles(t,favList),paintButtonXFavorites(t.idDrink)}function checkFavCocktails(t,e){const r=arrayFavoritos.findIndex(e=>e.idDrink===t.idDrink);return-1===r?(arrayFavoritos.push(t),e.currentTarget.classList.add("favourite")):(arrayFavoritos.splice(r,1),e.currentTarget.classList.remove("favourite")),paintFavourites(),localStorage.setItem("arrayFavoritosStored",JSON.stringify(arrayFavoritos)),r}btnSearch.addEventListener("click",handleUserSearchForm);const saveFavorites=JSON.parse(localStorage.getItem("arrayFavoritosStored"));function paintButtonXFavorites(t){let e="";e+=`<span><i class="js-xButton hidden fa-solid fa-trash-can" data-id="${t}"></span>`,favList.innerHTML+=e;let r=document.getElementsByClassName("js-xButton");for(const t of r)t.addEventListener("click",removeFavouriteCocktail)}function removeFavouriteCocktail(t){const e=t.currentTarget.dataset.id;removePosition(arrayFavoritos.filter(t=>e===t.idDrink)[0])}function removePosition(t){let e=arrayFavoritos.findIndex(e=>e.idDrink===t.idDrink);arrayFavoritos.splice(e,1),paintFavourites();document.getElementById(t.idDrink).classList.remove("favourite"),localStorage.setItem("arrayFavoritosStored",JSON.stringify(arrayFavoritos))}function handleBtnReset(t,e){deleteArrayFavoritos(),paintFavourites(),localStorage.setItem("arrayFavoritosStored",JSON.stringify(arrayFavoritos)),location.reload()}function deleteArrayFavoritos(){arrayFavoritos.length=0,console.log(arrayFavoritos)}null!==saveFavorites?(arrayFavoritos=saveFavorites,paintFavourites()):(console.log("no hay nada en local"),handleUserSearchForm(event)),btnReset.addEventListener("click",handleBtnReset);