// Создаем элементы поисковой строки
let searchInput = document.createElement("input");

// Добавляем классы или атрибуты по необходимости
searchInput.classList.add("search-input");

// Добавление надписи
searchInput.setAttribute("placeholder", "Поиск");

// Стиль
// searchInput.style.width = "300px";

// Получаем родительский элемент, куда будем добавлять поисковую строку
let parentElement = document.querySelector(".poisk");

// Добавляем поисковую строку в родительский элемент
parentElement.appendChild(searchInput);

// Функция для выполнения поиска пользователей
function searchUsers() {
    let searchTerm = searchInput.value.toLowerCase().trim();
    let userNames = document.querySelectorAll(".block2 h");

    for (let i = 0; i < userNames.length; i++) {
        let userName = userNames[i].textContent.toLowerCase().trim();
        let block = userNames[i].closest(".block");

        if (userName.includes(searchTerm)) {
            block.style.display = "block";
        } else {
            block.style.display = "none";
        }
    }
}

searchInput.addEventListener('input', searchUsers);




///////////////////////////////////////////////////////////////////

let sendButton = document.querySelector('.continue-application')
    sendButton.addEventListener('click', sendData)

let prev = document.querySelector(".info");
function sendData(e) {
    window.location.reload()
    let name = document.querySelector('.input-field').value
    let sureName = document.querySelector('.input-field2').value
    console.log(name,sureName);

    let data = fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,sureName})

        
    })

}





const PAGE_SIZE = 5; // Количество записей на одной странице
let currentPage = 0; // Текущая страница

const pagination = document.getElementById("pagination");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

prevButton.addEventListener("click", goToPrevPage);
nextButton.addEventListener("click", goToNextPage);

function goToPrevPage() {
  if (currentPage > 0) {
    currentPage--;
    fetchUsers();
  }
}

function goToNextPage() {
  currentPage++;
  fetchUsers();
}

function fetchUsers() {
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  fetch('/api/get/users')
    .then(response => response.json())
    .then(function(json) {
      console.log(json);

      // Очищаем таблицу перед заполнением новыми данными
      const table = document.getElementById("usersTable");
      table.innerHTML = "";

      for (let i = startIndex; i < endIndex && i < json.length; i++) {
        let block = document.createElement("div");
        let block2 = document.createElement("div");
        let name = document.createElement("h");
        let sureName = document.createElement("h");
        let del = document.createElement("button");

        del.classList.add("del");
        del.textContent = "Delete";

        del.addEventListener("click", getDelId);

        del.id = json[i]._id;

        block.classList.add("block");
        block2.classList.add("block2");

        name.innerHTML = json[i].name;
        sureName.innerHTML = json[i].sureName;
        block.appendChild(block2);
        block2.appendChild(name);
        block2.appendChild(sureName);
        block2.appendChild(del);
        table.appendChild(block);
      }

      // Обновляем состояние кнопок пагинации
      prevButton.disabled = currentPage === 0;
      nextButton.disabled = endIndex >= json.length;
    });
}

// function getDelId(event) {
//   let clickedElement = event.target.id;
//   console.log(clickedElement);
//   let req = fetch('/api/delete/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ clickedElement })
//   }).then(() => {
//     // После удаления записи перезагружаем текущую страницу
//     window.location.reload();
//   });
// }

// Запускаем получение данных пользователей при загрузке страницы
fetchUsers();




// fetch('/api/get/users')
//         .then(response => response.json())
//         .then(function(json){
//             console.log(json)

//             for(let i =0; i < 31; i++)
//             {
                
                
//                 let block = document.createElement("div")
//                 let block2 = document.createElement("div")
//                 let name = document.createElement("h")
//                 let sureName = document.createElement("h")
//                 let del = document.createElement("button")
                
//                 del.classList.add("del")
//                 del.textContent = ("Delete")

//                 del.addEventListener('click', getDelId)

//                 del.id = json[i]._id


//                 block.classList.add("block")
//                 block2.classList.add("block2")


//                 name.innerHTML = json[i].name;
//                 sureName.innerHTML = json[i].sureName;
//                 prev.appendChild(block);
//                 block.appendChild(block2);
//                 block2.appendChild(name);
//                 block2.appendChild(sureName);
//                 block2.appendChild(del);
//             }
            
            
//         })
        
       

function getDelId(event) {
  let clickedelement = event.target.id;
  console.log(clickedelement);

  if (confirm("Вы уверены, что хотите удалить этого пользователя?")) {
      fetch('/api/delete/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ clickedelement })
      })
          .then(response => {
              if (response.ok) {
                  window.location.reload();
              } else {
                  console.error('Ошибка удаления пользователя.');
              }
          })
          .catch(error => {
              console.error('Произошла ошибка при отправке запроса:', error);
          });
  }
}































        // function getBtnId(event){
        //     let clickedelement = event.target.id
        //     console.log(clickedelement);
        //     let req = fetch('/api/del/users', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({clickedelement})
        //     })
        // }

// fetch('/api/get/users')
//         .then(response => response.json())
//         .then(function(json){
//             console.log(json)
//             for(let i =0; i < 31; i++)
//             {
//                 let t = document.createElement("h2");
//                 t.innerHTML = json[i].name;
//                 prev.appendChild(t);
//                 let b = document.createElement("p");
//                 b.innerHTML = json[i].sureName;
//                 prev.appendChild(b);
//             }
//         })



