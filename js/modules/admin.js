import { getUsersList } from "./firebase.js";

const profileInfo = document.querySelector(".profile-info");
const profileStats = document.querySelector("#stats-info");
const mainContent = document.querySelector(".main-content")
let adminButton, adminPanelBox;

/**
 * It creates a button, appends it to the profileBox div, and adds an event listener to it.
 */
export const adminOptions = () => {

    let button = document.createElement("button");
    button.textContent = "Administrador";
    button.id = "adminButton";
    profileInfo.append(button);
    adminButton = button;

    let adminPanelInfo = document.createElement("div");
    adminPanelInfo.id = "adminPanel";
    adminPanelInfo.style.display = "none";

    adminPanelInfo.innerHTML = `
        <div id = 'panelSection'>
            <h2>Bienvenido al panel de administración</h2>
            <div id='userCards'></div>
        </div>
    `

    mainContent.append(adminPanelInfo);
    adminPanelBox = adminPanelInfo;

    adminButton.addEventListener("click", () => {

        profileStats.style.display === "none" ? statsPanel() : adminPanel();


    })

}

/**
 * It removes the admin button from the DOM.
 */
export const closeSessionAdmin = () => {

    let buttonToDelete = document.querySelector("#adminButton");
    let adminPanelToDelete = document.querySelector("#adminPanel");
    if (buttonToDelete != undefined) {
        profileStats.style.display = "contents"
        buttonToDelete.remove();
        adminPanelToDelete.remove();
    }
}

const statsPanel = () => {

    profileStats.style.display = "contents";
    adminPanelBox.style.display = "none";
    adminButton.innerHTML = "Administrador";

}

const cleanResults = () => {
    const userCards = document.querySelectorAll("#user-card");
    if(userCards.length != 0){
        userCards.forEach(card => {
            card.remove();
        });
    }
}

const adminPanel = async () => {

    await cleanResults();

    profileStats.style.display = "none";
    adminPanelBox.style.display = "block";
    adminButton.innerHTML = "Estadísticas";
    
    const userList = document.querySelector("#userCards");
    const usersArray = await getUsersList();

    usersArray.forEach(user => {

        let userRole;
        (user.userRole == "admin") ? userRole = "Administrador" : userRole = "Usuario";

        const userDataObject = document.createElement("div");
        userDataObject.id = "user-card";
        userDataObject.innerHTML = `

            <img src='${user.photoURL}' onerror="this.src='assets/default-image.png'">
            <p id='userRole'>${userRole}</p>
            <h3>${user.username}</h3>
            <p id='userEmail'>Email: ${user.email}</p>
            <p id='userDate'>Fecha de creación: ${user.creationDate} </p>
            <button id='editButton' style='--bg: #fff; --b_hover: #BFBFBF'>Editar</button>
            <button id='deleteButton' style='--bg: #9032bb; --b_hover: #a63bd8 '>Eliminar</button>
        `
        userList.append(userDataObject);

    });

}