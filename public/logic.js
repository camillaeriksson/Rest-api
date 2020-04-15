function getAllUsers() {
  fetch("http://localhost:3000/users")
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      printAllUsers(users);
    });
}

getAllUsers();

function printAllUsers(users) {
  let allUsersContainer = document.getElementById("allUsers");
  allUsersContainer.innerHTML = "";
  users.forEach((user) => {
    allUsersContainer.innerHTML += `
    <div class="userContainer" data-id=${user.id}>
    <h3>${user.name}</h3>
    <h4>Age: ${user.age}</h4>
    <h4>Gender: ${user.gender}</h4>
    <button onClick="deleteUser(event)">Delete</button>
    <button onClick="updateUser(event)">Update</button>
    </div>
    `;
  });
}

function getSpecificUser() {
  const id = document.getElementById("userIdInput").value;

  fetch("http://localhost:3000/users/" + id)
    .then((response) => {
      if (response.status === 404) {
        printSpecificUser();
      } else {
        return response.json();
      }
    })
    .then((users) => {
      printSpecificUser(users);
    });
}

function printSpecificUser(user) {
  let specificUserContainer = document.getElementById("specificUser");
  specificUserContainer.innerHTML = "";
  if (user) {
    specificUserContainer.innerHTML += `
      <div class="userContainer" data-id=${user.id}>
    <h3>${user.name}</h3>
    <h4>Age: ${user.age}</h4>
    <h4>Gender: ${user.gender}</h4>
    </div>
    `;
  } else {
    let errorResponse = document.createElement("h4");
    errorResponse.innerText = "User not found.";
    specificUserContainer.appendChild(errorResponse);
  }
}

function addUser() {
  const userId = document.getElementById("newUserId").value;
  const userName = document.getElementById("newUserName").value;
  const userAge = document.getElementById("newUserAge").value;
  const userGender = document.getElementById("newUserGender").value;

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: Number(userId),
      name: userName,
      age: userAge,
      gender: userGender,
    }),
  }).then((response) => {
    getAllUsers();
  });
}

function deleteUser(event) {
  let id = event.target.parentElement.dataset.id;

  fetch("http://localhost:3000/users/" + id, {
    method: "DELETE",
  }).then((response) => {
    getAllUsers();
  });
}

function updateUser(event) {
  let id = event.target.parentElement.dataset.id;
  console.log(id);
}
