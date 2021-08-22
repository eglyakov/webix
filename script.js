const tagsInput = document.querySelector('#tagsInput');
const btnAdd = document.querySelector('.btn-add');
const tagsList = document.querySelector('.tags_list');
const btnClear = document.querySelector('.btn-clear');


function renderTags(arrTags) {
  if (!arrTags) return;

  for (let i = 0; i < arrTags.length; i++) {
    if (arrTags[i]) {
      let tagsItem = document.createElement('li');
      tagsItem.classList.add('tags_item');

      tagsItem.innerHTML = `
        <span class="tags_name">${arrTags[i]}</span>
        <span class="btn-del">&#215;</span>
      `;

      tagsList.appendChild(tagsItem);
    }
  }
}

btnAdd.addEventListener('click', () => {
  if (checkReadonlyMode()) return;
  let value = tagsInput.value;
  if (value == false) return;

  let arrTags = value.split(' ');
  renderTags(arrTags);
  tagsInput.value = '';

  setList();
});


tagsList.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-del')) {
    if (checkReadonlyMode()) return;
    localStorage.clear();
    let tag = event.target.closest('.tags_item')
    tagsList.removeChild(tag);
    setList();
  }
});


function setList() {
  let tags = document.querySelectorAll('.tags_name');
  for (i = 0; i < tags.length; i++) {
    localStorage.setItem(i, tags[i].textContent)
  }
}

function getList() {
  let arrTags = [];
  for(let i = 0; i < localStorage.length; i++) {
    arrTags.push(localStorage.getItem(i));
  }
  renderTags(arrTags);
}
getList()


function checkReadonlyMode() {
  let check = document.querySelector('#readonlyMode');
  return check.checked;
}

btnClear.addEventListener('click', () => {
  if (checkReadonlyMode()) return;
  localStorage.clear();
  tagsList.innerHTML = '';
})