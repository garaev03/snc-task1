let table = document.getElementById("table")
fetch('./test.json')
    .then(resp => resp.json())
    .then(json => {
        for (let i = 0; i < json.workers.worker.length; i++) {
            let tr = document.createElement("tr")
            tr.innerHTML =
                `
            <td>`+ json.workers.worker[i].firstName + `</td>
            <td>`+ json.workers.worker[i].lastName + `</td>
            <td>`+ json.workers.worker[i].category + `</td>
            <td>`+ json.workers.worker[i].date + `</td>
            <td> <div><button class="deleteBtn">delete</button></div> </td>
             `
            table.children[3].appendChild(tr)
        }
            let deleteBtns = document.getElementsByClassName("deleteBtn")
            for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener("click",()=>{
                console.log( deleteBtns[i].parentElement.parentElement.parentElement);
                deleteBtns[i].parentElement.parentElement.parentElement.remove();
            })
            }
    })