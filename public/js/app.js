function createCustomer() {
  const form = document.querySelector("#bill-form");

  form.addEventListener("submit", function (e) {
    const phone = document.getElementById("phone").value;
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const discount = document.getElementById("discount").value;
    let cats = document.querySelector('input[name="cats"]:checked').value;
    const http = new EassyHTTP();
    const data = {
      phone: phone,
      name: name,
      amount: amount,
      discount: discount,
      category: cats,
    };

    http
      .post("/bill", data)
      .then((data) => {
        //created division

        const div = document.createElement("div");
        div.className = "alert alert-success";

        div.appendChild(document.createTextNode("Billing done!"));
        const container = document.querySelector("#bill-form");
        //container.insertBefore(div, form);
        container.after(div, form);
        //Time out after 3 sec.
        setTimeout(function () {
          //document.querySelector(".alert-success").value = "";
          document.querySelector(".alert-success").remove();

          document.getElementById("phone").value = "";
          document.getElementById("name").value = "";
          document.getElementById("amount").value = "";
          document.getElementById("discount").value = "";
        }, 3000);
      })
      .catch((err) => console.log(err));

    e.preventDefault();
  });
}

function category() {
  document.querySelector(".category").addEventListener("click", function (e) {
    const cat = document.querySelector(".category").textContent;
    return cat;
    // console.log(cat);
    //e.preventDefault();
  });
}

class EassyHTTP {
  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  //get all
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

// const http = new EassyHTTP();
// const data = {
//   phone: 88383839,
//   name: "shruti",
//   amount: 78,
//   discount: 7,
// };

// http
//   .post("/bill", data)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

//GET USAGE FROM

// http.get('/bill')
// .then(data => console.log(data))
// .catch((err) => console.log(err));
