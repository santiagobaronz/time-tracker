/* Importing the functions from the firebase.js file. */
import { login, logout, auth, getUserData } from './modules/firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { adminOptions } from './modules/admin.js';

/* Selecting the elements from the HTML file. */
const app = document.querySelector("#app");

const button = document.querySelector("#button-login");
const buttonLogOut = document.querySelector("#button-logout");
const authPage = document.querySelector("#authentication-box");
const trackerPage = document.querySelector("#tracker-box");
const dailyButton = document.querySelector("#dailyButton");
const weeklyButton = document.querySelector("#weeklyButton");
const monthlyButton = document.querySelector("#monthlyButton");

const profileImg = document.querySelector("#profile-img");
const profileName = document.querySelector("#profile-name");
const infoCardWork = document.querySelector("#workCard");
const infoCardPlay = document.querySelector("#playCard");
const infoCardStudy = document.querySelector("#studyCard");
const infoCardExercise = document.querySelector("#exerciseCard");
const infoCardSocial = document.querySelector("#socialCard");
const infoCardSelfCare = document.querySelector("#selfCareCard");

const infoCardWorkSecondary = document.querySelector("#workCardSecondary");
const infoCardPlaySecondary = document.querySelector("#playCardSecondary");
const infoCardStudySecondary = document.querySelector("#studyCardSecondary");
const infoCardExerciseSecondary = document.querySelector("#exerciseCardSecondary");
const infoCardSocialSecondary = document.querySelector("#socialCardSecondary");
const infoCardSelfCareSecondary = document.querySelector("#selfCareCardSecondary");

/* Declaring a variable called currentUser. */
let currentUser;
button.disabled = true;

/* A function that is checking if the user is logged in or not. If the user is logged in, it will add a
class to the authPage element, it will assign the currentUser variable to the user, and it will call
the init function. If the user is not logged in, it will call the mainContent function. */
onAuthStateChanged(auth, (user) => {
    if(user){
        authPage.classList.add("changePage");
        currentUser = user;
        init(user);
        button.disabled = true;
    }else{
        mainContent();
        button.disabled = false;
    }
})


/**
 * The function init() is called when the user logs in, and it takes the user's data from the database
 * and displays it on the tracker page.
 * @param user - the user object from firebase.auth()
 */
let userData;
const init = async (user) => {

    setTimeout( async function obtenerData() {
        userData = await getUserData(user);
        
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

        infoCardWorkSecondary.innerHTML = `Última semana - ${userData.work.weeklyTime}hrs`;
        infoCardPlaySecondary.innerHTML = `Última semana - ${userData.play.weeklyTime}hrs`;
        infoCardStudySecondary.innerHTML = `Última semana - ${userData.study.weeklyTime}hrs`;
        infoCardExerciseSecondary.innerHTML = `Última semana - ${userData.exercise.weeklyTime}hrs`;
        infoCardSocialSecondary.innerHTML = `Última semana - ${userData.social.weeklyTime}hrs`;
        infoCardSelfCareSecondary.innerHTML = `Última semana - ${userData.selfCare.weeklyTime} hrs`;

        /* Checking if the user is an admin or not. If the user is an admin, it will call the
        adminDisplay function. */
        if(userData.userRole === "admin"){
            adminOptions();
        }

    },1500)
    
}

/**
 * It adds the class "active" to the button that was clicked and removes the class "active" from the
 * other two buttons.
 * @param section - 1, 2, or 3
 */
const changeSectionStatus = (section) => {
    switch(section){
        case 1:
            dailyButton.classList.add("active")
            weeklyButton.classList.remove("active")
            monthlyButton.classList.remove("active")
        break;
        case 2:
            dailyButton.classList.remove("active")
            weeklyButton.classList.add("active")
            monthlyButton.classList.remove("active")
        break;
        case 3:
            dailyButton.classList.remove("active")
            weeklyButton.classList.remove("active")
            monthlyButton.classList.add("active")
        break;
    }
}


/* Listening for a click event on the dailyButton element, and when it is clicked, it will call the
changeSectionStatus function with the parameter 1, and it will change the content of the cards. */
dailyButton.addEventListener("click", () => {

    changeSectionStatus(1);

    infoCardWork.innerHTML = userData.work.dailyTime + "hrs";
    infoCardPlay.innerHTML = userData.play.dailyTime + "hrs";
    infoCardStudy.innerHTML = userData.study.dailyTime + "hrs";
    infoCardExercise.innerHTML = userData.exercise.dailyTime + "hrs";
    infoCardSocial.innerHTML = userData.social.dailyTime + "hrs";
    infoCardSelfCare.innerHTML = userData.selfCare.dailyTime + "hrs";

    infoCardWorkSecondary.innerHTML = `Última semana - ${userData.work.weeklyTime}hrs`;
    infoCardPlaySecondary.innerHTML = `Última semana - ${userData.play.weeklyTime}hrs`;
    infoCardStudySecondary.innerHTML = `Última semana - ${userData.study.weeklyTime}hrs`;
    infoCardExerciseSecondary.innerHTML = `Última semana - ${userData.exercise.weeklyTime}hrs`;
    infoCardSocialSecondary.innerHTML = `Última semana - ${userData.social.weeklyTime}hrs`;
    infoCardSelfCareSecondary.innerHTML = `Última semana - ${userData.selfCare.weeklyTime} hrs`;
})

/* Listening for a click event on the weeklyButton element, and when it is clicked, it will call the
changeSectionStatus function with the parameter 2, and it will change the content of the cards. */
weeklyButton.addEventListener("click", () => {

    changeSectionStatus(2);

    infoCardWork.innerHTML = userData.work.weeklyTime + "hrs";
    infoCardPlay.innerHTML = userData.play.weeklyTime + "hrs";
    infoCardStudy.innerHTML = userData.study.weeklyTime + "hrs";
    infoCardExercise.innerHTML = userData.exercise.weeklyTime + "hrs";
    infoCardSocial.innerHTML = userData.social.weeklyTime + "hrs";
    infoCardSelfCare.innerHTML = userData.selfCare.weeklyTime + "hrs";

    infoCardWorkSecondary.innerHTML = `Último mes - ${userData.work.monthlyTime}hrs`;
    infoCardPlaySecondary.innerHTML = `Último mes - ${userData.play.monthlyTime}hrs`;
    infoCardStudySecondary.innerHTML = `Último mes - ${userData.study.monthlyTime}hrs`;
    infoCardExerciseSecondary.innerHTML = `Último mes - ${userData.exercise.monthlyTime}hrs`;
    infoCardSocialSecondary.innerHTML = `Último mes - ${userData.social.monthlyTime}hrs`;
    infoCardSelfCareSecondary.innerHTML = `Último mes - ${userData.selfCare.monthlyTime} hrs`;
})

/* Listening for a click event on the monthlyButton element, and when it is clicked, it will call the
changeSectionStatus function with the parameter 3, and it will change the content of the cards. */
monthlyButton.addEventListener("click", () => {

    changeSectionStatus(3);
    
    infoCardWork.innerHTML = userData.work.monthlyTime + "hrs";
    infoCardPlay.innerHTML = userData.play.monthlyTime + "hrs";
    infoCardStudy.innerHTML = userData.study.monthlyTime + "hrs";
    infoCardExercise.innerHTML = userData.exercise.monthlyTime + "hrs";
    infoCardSocial.innerHTML = userData.social.monthlyTime + "hrs";
    infoCardSelfCare.innerHTML = userData.selfCare.monthlyTime + "hrs";

    infoCardWorkSecondary.innerHTML = `Hoy - ${userData.work.dailyTime}hrs`;
    infoCardPlaySecondary.innerHTML = `Hoy - ${userData.play.dailyTime}hrs`;
    infoCardStudySecondary.innerHTML = `Hoy - ${userData.study.dailyTime}hrs`;
    infoCardExerciseSecondary.innerHTML = `Hoy - ${userData.exercise.dailyTime}hrs`;
    infoCardSocialSecondary.innerHTML = `Hoy - ${userData.social.dailyTime}hrs`;
    infoCardSelfCareSecondary.innerHTML = `Hoy - ${userData.selfCare.dailyTime} hrs`;
})

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

