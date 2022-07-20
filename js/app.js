/* Importing the functions from the firebase.js file. */
import { login, logout, auth, getData } from './modules/firebase.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js"

/* Selecting the elements from the HTML file. */
const app = document.querySelector("#app");

const button = document.querySelector("#button-login");
const buttonLogOut = document.querySelector("#button-logout");
const authPage = document.querySelector("#authentication-box");
const trackerPage = document.querySelector("#tracker-box")

const profileImg = document.querySelector("#profile-img");
const profileName = document.querySelector("#profile-name");
const infoCardWork = document.querySelector("#workCard");
const infoCardPlay = document.querySelector("#playCard");
const infoCardStudy = document.querySelector("#studyCard");
const infoCardExercise = document.querySelector("#exerciseCard");
const infoCardSocial = document.querySelector("#socialCard");
const infoCardSelfCare = document.querySelector("#selfCareCard");

const infoCardWorkSeconday = document.querySelector("#workCardSecondary");
const infoCardPlaySeconday = document.querySelector("#playCardSecondary");
const infoCardStudySeconday = document.querySelector("#studyCardSecondary");
const infoCardExerciseSeconday = document.querySelector("#exerciseCardSecondary");
const infoCardSocialSeconday = document.querySelector("#socialCardSecondary");
const infoCardSelfCareSeconday = document.querySelector("#selfCareCardSecondary");

/* Declaring a variable called currentUser. */
let currentUser;

/* A function that is checking if the user is logged in or not. If the user is logged in, it will add a
class to the authPage element, it will assign the currentUser variable to the user, and it will call
the init function. If the user is not logged in, it will call the mainContent function. */
onAuthStateChanged(auth, (user) => {
    if(user){
        authPage.classList.add("changePage");
        currentUser = user;
        init(user);
    }else{
        mainContent();
    }
})


/**
 * The function init() is called when the user logs in, and it takes the user's data from the database
 * and displays it on the tracker page.
 * @param user - the user object from firebase.auth()
 */
const init = async (user) => {
    let userData;

    setTimeout( async function obtenerData() {
        userData = await getData(user);
        
        authPage.classList.remove("changePage")
        authPage.classList.add("hidden")
        trackerPage.classList.remove("hidden")

        profileImg.src = userData.photoURL;
        profileName.innerHTML = userData.username;

        infoCardWork.innerHTML = userData.work.dailyTime + "hrs";
        infoCardPlay.innerHTML = userData.play.dailyTime + "hrs";
        infoCardStudy.innerHTML = userData.study.dailyTime + "hrs";
        infoCardExercise.innerHTML = userData.exercise.dailyTime + "hrs";
        infoCardSocial.innerHTML = userData.social.dailyTime + "hrs";
        infoCardSelfCare.innerHTML = userData.selfCare.dailyTime + "hrs";

        infoCardWorkSeconday.innerHTML = `Última semana - ${userData.work.weeklyTime}hrs`;
        infoCardPlaySeconday.innerHTML = `Última semana - ${userData.play.weeklyTime}hrs`;
        infoCardStudySeconday.innerHTML = `Última semana - ${userData.study.weeklyTime}hrs`;
        infoCardExerciseSeconday.innerHTML = `Última semana - ${userData.exercise.weeklyTime}hrs`;
        infoCardSocialSeconday.innerHTML = `Última semana - ${userData.social.weeklyTime}hrs`;
        infoCardSelfCareSeconday.innerHTML = `Última semana - ${userData.selfCare.weeklyTime} hrs`;

    },1000)
    
}

/**
 * When the user clicks the 'Sign In' button, the authPage div will be displayed and the trackerPage
 * div will be hidden.
 */
const mainContent = () => {
    authPage.classList.remove("hidden")
    trackerPage.classList.add("hidden");
}

/* Listening for a click event on the button element, and when it is clicked, it will call the login
function. */
button.addEventListener("click", async () => {
    try {
        currentUser = await login();
    } catch (error) {
        console.log(error);
    }
})

/* Listening for a click event on the buttonLogOut element, and when it is clicked, it will call the
logout function. */
buttonLogOut.addEventListener("click", () => {
    logout();
})

