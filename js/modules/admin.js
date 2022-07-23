const profileBox = document.querySelector(".profile-info");
let adminButton;

/**
 * It creates a button, appends it to the profileBox div, and adds an event listener to it.
 */
export const adminDisplay = () => {

    let button = document.createElement("button");
    button.textContent = "Administrador";
    button.id = "adminButton";
    profileBox.append(button);
    adminButton = button;

    adminButton.addEventListener("click", () => {
        console.log("Button is working");
    })

}

/**
 * It removes the admin button from the DOM.
 */
export const closeSessionAdmin = () => {

    let elementToDelete = document.querySelector("#adminButton");
    if(elementToDelete != undefined){
        elementToDelete.remove();
    }
}