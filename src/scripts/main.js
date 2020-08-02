function main() {

    const baseUrl = "http://localhost:3004";

    const getUsers = async () => {
        try {
            const response = await fetch(`${baseUrl}/users?_sort=id&_order=asc`);
            const responseJson = await response.json();
            if (responseJson.error) {
                showResponseSuccess(responseJson.message);
            } else {
                renderAllUsers(responseJson);
            }
        } catch (error) {
            showResponseMessage(error);
        }
    }

    const insertUsers = async (user) => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            }

            const response = await fetch(`${baseUrl}/users`, options)
            const responseJson = await response.json();
            showResponseSuccess(responseJson.message)
            getUsers();
        } catch (error) {
            showResponseMessage(error)
        }
    }

    const updateUsers = async (user) => {
        try {
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }

            const response = await fetch(`${baseUrl}/users/${user.id}`, options);
            const responseJson = await response.json();

            showResponseSuccess(responseJson.message);
            getUsers();
        } catch (error) {
            showResponseMessage(error);
        }
    };

    const removeUser = (userId) => {
        fetch(`${baseUrl}/users/${userId}`, {
            method: 'DELETE'
        })
            .then(response => {
                return response.json();
            })
            .then(() => {
                getUsers();
            })
            .catch(error => {
                showResponseMessage(error);
            })
    };


    const renderAllUsers = (users) => {
        const listBookElement = document.querySelector("#listUser");
        listBookElement.innerHTML = ``;

        users.forEach(user => {
            listBookElement.innerHTML += `
            <table class="table">
            
            <tbody>
            <tr>
                <th scope="row">${user.id}</th>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td><button type="button" class="btn btn-danger button-delete" id="${user.id}">Hapus</button></td>
            </tr>
          </tbody>
          </table>`;
        });

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const userId = event.target.id;
                removeUser(userId);
            })
        })
    };

    const showResponseSuccess = (message = "Berhasil") => {
        alert(message);
    };

    const showResponseMessage = (message = "Error") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputId = document.querySelector("#inputId");
        const inputName = document.querySelector("#inputName");
        const inputEmail = document.querySelector("#inputEmail");
        const inputUsername = document.querySelector("#inputUsername");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");

        buttonSave.addEventListener("click", function () {
            const user = {
                id: Number.parseInt(inputId.value),
                name: inputName.value,
                email: inputEmail.value,
                username: inputUsername.value
            };
            insertUsers(user)
        });

        buttonUpdate.addEventListener("click", function () {
            const user = {
                id: Number.parseInt(inputId.value),
                name: inputName.value,
                email: inputEmail.value,
                username: inputUsername.value
            };

            updateUsers(user)
        });
        getUsers();
    });

    class JudulApp extends HTMLElement {
        connectedCallback() {
            this.caption = this.getAttribute("caption") || null;

            this.innerHTML = `
              <figure>
                 <figcaption>${this.caption}</figcaption>
              </figure>
            `;
        }

    }

    customElements.define("judul-app", JudulApp); //custom element
}

export default main;
