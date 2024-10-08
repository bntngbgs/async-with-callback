const url = 'https://jsonplaceholder.typicode.com/users';
const elementContainer = document.querySelector('.container');

function getData(url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url);

  xhr.onload = () => {
    if (xhr.status == 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    } else {
      const error = document.createElement('p');
      error.classList.add('text-danger', 'fs-4');
      error.innerText = xhr.status + ' Error retrieving data!';

      elementContainer.append(error);
    }
  };

  xhr.send();
}

function renderTable(data) {
  const tableEl = document.createElement('table');
  tableEl.classList.add('table', 'table-striped', 'table-hover');

  const tableHeader = document.createElement('thead');
  tableHeader.innerHTML = `<tr>
  <th>ID</th>
  <th>Name</th>
  <th>Username</th>
  <th>Email</th>
  <th>Address</th>
  <th>Company</th>
  </tr>`;

  const tableBody = document.createElement('tbody');
  for (let i = 0; i < data.length; i++) {
    const tableData = document.createElement('tr');
    tableData.innerHTML = `
    <td>${data[i].id}</td>
    <td>${data[i].name}</td>
    <td>${data[i].username}</td>
    <td>${data[i].email}</td>
    <td>${data[i].address.street}, ${data[i].address.suite}, ${data[i].address.city}</td>
    <td>${data[i].company.name}</td>
    `;
    tableBody.append(tableData);
  }

  tableEl.append(tableHeader);
  tableEl.append(tableBody);
  elementContainer.append(tableEl);
}

getData(url, renderTable);
