let table = document.getElementById("table");

// fetch("./test.json")
//   .then((resp) => resp.json())
//   .then((json) => {
//     for (let i = 0; i < json.workers.worker.length; i++) {
//       let tr = document.createElement("tr");
//       tr.innerHTML =
//         `
//             <td>` +
//         json.workers.worker[i].firstName +
//         `</td>
//             <td>` +
//         json.workers.worker[i].lastName +
//         `</td>
//             <td>` +
//         json.workers.worker[i].category +
//         `</td>
//             <td>` +
//         json.workers.worker[i].date +
//         `</td>
//             <td> <div><button class="deleteBtn">delete</button></div> </td>
//              `;
//       table.children[3].appendChild(tr);
//     }
//     let deleteBtns = document.getElementsByClassName("deleteBtn");
//     for (let i = 0; i < deleteBtns.length; i++) {
//       deleteBtns[i].addEventListener("click", () => {
//         console.log(deleteBtns[i].parentElement.parentElement.parentElement);
//         deleteBtns[i].parentElement.parentElement.remove();
//       });
//     }
//   });

const AddWoker = document.getElementById("add_worker");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const category = document.getElementById("category");
const date = document.getElementById("date");

AddWoker.addEventListener("click", (e) => {
  e.preventDefault();
  const form = {
    firstName: firstName.value,
    lastName: lastName.value,
    category: category.value,
    date: date.value,
    id: self.crypto.randomUUID(),
  };
  if (
    form.firstName === "" &&
    form.lastName === "" &&
    form.category === "" &&
    form.date === ""
  ) {
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill in all fields!",
    });
    return;
  }
  axios.post("http://localhost:3000/workers", form).then((res) => {
    if (res.status === 201) {
      swal.fire({
        icon: "success",
        title: "Success...",
        text: "Worker added successfully!",
      });
    }
  });
});
axios.get("http://localhost:3000/workers").then((res) => {
  console.log(res.data.worker);
  res.data.map((worker) => {
    let tr = document.createElement("tr");
    tr.innerHTML =
      `
            <td>` +
      worker.firstName +
      `</td>
            <td>` +
      worker.lastName +
      `</td>
            <td>` +
      worker.category +
      `</td>
            <td>` +
      worker.date +
      `</td>
            <td> <div><button class="deleteBtn">delete</button></div> </td>
             `;
    table.children[3].appendChild(tr);
    const Button = document.querySelectorAll(".deleteBtn");
    for (let index = 0; index < Button.length; index++) {
      Button[index].addEventListener("click", (e) => {
        e.preventDefault();
        axios
          .delete(`http://localhost:3000/workers/${worker.id}`)
          .then((res) => {
            swal.fire({
              icon: "success",
              title: "Success...",
              text: "Worker deleting successfully!",
            });
          })
          .catch((error) => {
            console.error("Delete error:", error);
          })
          .finally(() => {
            Button[index].parentElement.parentElement.remove();
          });
      });
    }
  });
});
