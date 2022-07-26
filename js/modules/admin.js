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
        <div id = 'panelTitle'>
            <h2>Bienvenido al panel de administración</h2>
            <table id='userList'>
                <tr>
                    <th>Nombre de usuario</th>
                    <th>Correo electronico</th>
                    <th>Tipo de usuario</th>
                    <th>Fecha de creación</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </table>
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

const adminPanel = async () => {

    profileStats.style.display = "none";
    adminPanelBox.style.display = "block";
    adminButton.innerHTML = "Estadísticas";
    
    const userList = document.querySelector("#userList");
    const usersArray = await getUsersList();

    usersArray.forEach(user => {

        let userRole;
        (user.userRole == "admin") ? userRole = "Administrador" : userRole = "Usuario";

        const userDataObject = document.createElement("tr");
        userDataObject.id = "user-item";
        userDataObject.innerHTML = `

            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${userRole}</td>
            <td>${user.creationDate} </td>
            <td><button>Editar</button></td>
            <td><button>Eliminar</button></td>
        `
        userList.append(userDataObject);

    });

}