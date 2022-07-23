const profileBox = document.querySelector(".profile-info");
let adminButton;

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

export const closeSessionAdmin = () => {

    let elementToDelete = document.querySelector("#adminButton");
    if(elementToDelete != undefined){
        elementToDelete.remove();
    }
}