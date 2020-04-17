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
    <div class="userContainer" data-id=${user.id} data-name="${user.name}" data-age=${user.age} data-gender=${user.gender}>
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

  console.log(userId);

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userId,
      name: userName,
      age: userAge,
      gender: userGender,
    }),
  }).then((response) => {
    getAllUsers();
  });
}

function deleteUser(event) {
  let userId = event.target.parentElement.dataset.id;

  fetch("http://localhost:3000/users/" + userId, {
    method: "DELETE",
  }).then((response) => {
    getAllUsers();
  });
}

function updateUser(event) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  let updateButton = document.getElementById("updateButton");

  let userInfo = event.target.parentElement.dataset;

  document.getElementById("updateUserName").value = userInfo.name;
  document.getElementById("updateUserAge").value = userInfo.age;
  document.getElementById("updateUserGender").value = userInfo.gender;

  updateButton.onclick = function () {
    const updatedUserName = document.getElementById("updateUserName").value;
    const updatedUserAge = document.getElementById("updateUserAge").value;
    const updatedUserGender = document.getElementById("updateUserGender").value;
    fetch("http://localhost:3000/users/" + userInfo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(userInfo.id),
        name: updatedUserName,
        age: updatedUserAge,
        gender: updatedUserGender,
      }),
    }).then((response) => {
      getAllUsers();
    });
    modal.style.display = "none";
  };
}
