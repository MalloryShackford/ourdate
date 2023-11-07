function createUnorderedList(jsonData) {
    const data = JSON.parse(jsonData);
    const ul = document.createElement('ul');

    for (const key in data) {
      const li = document.createElement('li');
      li.innerHTML = `<b>${key}:</b> ${data[key]}`;
      ul.appendChild(li);
    }

    return ul;
  }

  // Main function to modify div contents
  function modifyDivContents() {
    console.log('hi')
    const datePlanDivs = document.querySelectorAll('.field-plan');
    

    datePlanDivs.forEach(div => {
      const readOnlyDivs = div.querySelectorAll('.readonly');
      console.log(readOnlyDivs);
      readOnlyDivs.forEach(readOnlyDiv => {
        const jsonData = readOnlyDiv.textContent.trim();
        console.log('jsonData',jsonData)
        const unorderedList = createUnorderedList(jsonData);
        readOnlyDiv.textContent = '';
        readOnlyDiv.appendChild(unorderedList);
      });
    });
  }

  // Call the function when the DOM is ready
  document.addEventListener('DOMContentLoaded', modifyDivContents);

  document.addEventListener('formset:added', (event) => {
    console.log('formset:added')
});