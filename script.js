let apiURL = 'https://api.github.com/users/';
let nameId = "userName";
let infoId = "userInfo";
let hrefId = "userPage";
let photoId = "userPhoto";
let dateId = "date";
let mainId = "main";
let preloaderId = "preloader";

const getDate = new Promise ((resolve, reject) => {
	setTimeout(() => resolve(new Date()), 1000)
});

const getUserLogin = new Promise ((resolve, reject) =>{
	let currentURL = window.location.href;
	const userName = '/?username='; 
	let userLogin = '6thSence';
	if (currentURL.includes(userName)){
		userLogin = currentURL.substr(currentURL.indexOf('=') + 1);
	}
	setTimeout(() => userLogin ? resolve(userLogin) : 
								 reject("Имя пользователя не найдено"), 2000)
});

document.getElementById(mainId).classList.add('hide');

Promise.all([getDate, getUserLogin])
	.then(([date, userLogin]) => {	
		document.getElementById(preloaderId).classList.add('hide');	
		document.getElementById(mainId).classList.remove('hide');

		document.getElementById(dateId).appendChild(document.createTextNode(date));

		fetch(apiURL + `${userLogin}`)
			.then(response => response.json())
			.then(result => {
			    document.getElementById(nameId).appendChild(document.createTextNode(result.name));
			    document.getElementById(infoId).appendChild(document.createTextNode(result.bio));
			    document.getElementById(hrefId).href = result.html_url;
			    document.getElementById(photoId).src = result.avatar_url;			  
			});
	})
	.catch(err =>console.log(err));