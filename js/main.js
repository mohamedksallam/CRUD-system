var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCategory");
var productDesc = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var productList = [];
var indexDemo = 0
if (localStorage.getItem("list") != null) {
  productList = JSON.parse(localStorage.getItem("list"));
  displayData();
}

function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCat.value,
    desc: productDesc.value,
  };
  productList.push(product);
  localStorage.setItem("list", JSON.stringify(productList));
  displayData();
}

function displayData() {
  var temp = "";
  for (var i = 0; i < productList.length; i++) {
    temp =
      temp +
      `   <tr>
        <td>` +
      i +
      `</td>
        <td>` +
      productList[i].name +
      `</td>
        <td>` +
      productList[i].price +
      `</td>
        <td>` +
      productList[i].category +
      `</td>
        <td>` +
      productList[i].desc +
      `</td>
        <td>
            <button onclick="updateProduct(`+i+`)" class="btn btn-outline-warning">Update</button>
        </td>
        <td>

            <button onclick="deleteProduct(` +
      i +
      `)" class="btn btn-outline-danger">Delete</button>
        </td>
    </tr> `;
  }
  document.getElementById("tableBody").innerHTML = temp;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("list", JSON.stringify(productList));
  displayData();
}

function search() {
  var searchVal = searchInput.value.toLowerCase();
  console.log(searchVal);
  var temp = "";
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(searchVal) == true ||
      productList[i].category.toLowerCase().includes(searchVal) == true
    ) {
      temp =
        temp +
        `   <tr>
              <td>` +
        i +
        `</td>
              <td>` +
        productList[i].name.toLowerCase().replace(searchVal , '<span class="bg-info">'+searchVal+'</span>') +
        `</td>
              <td>` +
        productList[i].price +
        `</td>
              <td>` +
        productList[i].category.toLowerCase().replace(searchVal , '<span class="bg-info">'+searchVal+'</span>') +
        `</td>
              <td>` +
        productList[i].desc +
        `</td>
              <td>
                  <button class="btn btn-outline-warning">Update</button>
              </td>
              <td>
      
                  <button onclick="deleteProduct(` +
        i +
        `)" class="btn btn-outline-danger">Delete</button>
              </td>
          </tr> `;
    }
  }

  document.getElementById("tableBody").innerHTML = temp;
}

function updateProduct(index){
  productName.value = productList[index].name
  productPrice.value = productList[index].price
  productCat.value = productList[index].category
  productDesc.value = productList[index].desc
  document.getElementById("addproduct").style.display = "none"
  document.getElementById("editproduct").style.display = "inline-block"
  indexDemo = index
}

function edit(){
  productList[indexDemo].name = productName.value 
  productList[indexDemo].price = productPrice.value 
  productList[indexDemo].category = productCat.value 
  productList[indexDemo].desc = productDesc.value 
  localStorage.setItem("list", JSON.stringify(productList));
  displayData();
  document.getElementById("addproduct").style.display = "inline-block"
  document.getElementById("editproduct").style.display = "none"
}

function clearForm(){
  productName.value = ""
  productPrice.value = ""
  productCat.value = ""
  productDesc.value = ""
}