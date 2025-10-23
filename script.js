const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const deleteWindow = document.querySelector('.delete-popup');
const yesButton = document.querySelector('.yes-btn');
const cancelButton = document.querySelector('.cancel-btn');

const items = JSON.parse(localStorage.getItem('items')) || [];

function updateLocalstorage(items) {
    localStorage.setItem('items', JSON.stringify(items));
}

function addItem(event) {
    event.preventDefault();
    const item = this.querySelector('[name="item"]');

    items.push({
        title: item.value,
        done: false,
        editing: false
    });

    renderItems(items);
    updateLocalstorage(items);
    this.reset();
}

function renderItems(items) {
    itemsList.innerHTML = items.map((item, index) => {
        if (item.editing) {
            return `
            <li id="itemInnerList" data-index="${index}">
            <input class="checkbox-input" type="checkbox" data-index-check="${index}" id="item${index}" ${item.done ? 'checked' : ''} />
            <input id="edit-input" type="text" class="edit-input" data-index="${index}" value="${item.title}" />
            <button data-index="${index}" class="save-btn"></button>
            <button class="delete-btn" data-index="${index}"></button>
          </li>
        `;
        }
        return `
           <li id="itemInnerList" data-index="${index}">
           <input class="checkbox-input" type="checkbox" data-index-check="${index}" id="item${index}" ${item.done ? 'checked' : ''} />
           <span class="text">${item.title}</span>
           <button class="edit-btn" data-index="${index}"></button>
           <button class="delete-btn" data-index="${index}"></button>
        </li>
      `;
    })
        .join('');
}

function toggleDone(event) {
    const { target } = event;

    if(!target.matches('.checkbox-input')) {
        return;
    }

    const index = target.dataset.index;
    items[index].done = !items[index].done;

    updateLocalstorage(items);
}

itemsList.addEventListener("click", (event) => {
    if(event.target.matches('.delete-btn')) {
        deleteWindow.classList.toggle("show")
        deleteWindow.setAttribute("data-index", event.target.dataset.index);
    }
})

yesButton.addEventListener("click", (event) => {
    deleteWindow.classList.remove("show");
    deleteWindow.classList.add("hide");
    const index = deleteWindow.getAttribute("data-index");

    items.splice(Number(index), 1);

    renderItems(items);
    updateLocalstorage(items);
})

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);

renderItems(items);


cancelButton.addEventListener("click", () => {
    deleteWindow.classList.remove("show");
    deleteWindow.classList.add("hide");
});




itemsList.addEventListener("click", (event) => {

    const { target } = event;
    const index = target.dataset.index;

    if (target.matches('.edit-btn')) {
        items[index].editing = true;

        renderItems(items);
        updateLocalstorage(items);
    }


    if (target.matches('.save-btn')) {
        const input = itemsList.querySelector('.edit-input');

        items[index].editing = false;
        items[index].title = input.value;

        renderItems(items);
        updateLocalstorage(items);
    }
});










