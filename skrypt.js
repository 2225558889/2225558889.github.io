var apiKey = prompt("Please enter your API key:");


const Url = "https://my.api.mockaroo.com/users.json";


const table = document.createElement("table");
const thead = document.createElement("thead");
thead.classList.add("tbl-header");

const headRow = document.createElement("tr");
headRow.classList.add("tbl-header-row");

const th1 = document.createElement("th");
th1.textContent = "ID";
const th2 = document.createElement("th");
th2.textContent = "Credit Card";
const th3 = document.createElement("th");
th3.textContent = "Average Income";
const th4 = document.createElement("th");
th4.textContent = "Money Spent";

headRow.appendChild(th1);
headRow.appendChild(th2);
headRow.appendChild(th3);
headRow.appendChild(th4);
thead.appendChild(headRow);
table.appendChild(thead);

const tbody = document.createElement("tbody");

const options = {
  headers: {
    "X-API-Key": apiKey,
    "Content-Type": "application/json",
  },
};


fetch(Url, options)
  .then((response) => response.json()) 
  .then((data) => {
    data.forEach((rowData) => {
      const row = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = rowData.ID;
      const td2 = document.createElement("td");
      td2.textContent = rowData.credit_card;
      const td3 = document.createElement("td");
      td3.textContent = rowData.average_income;
      const td4 = document.createElement("td");
      td4.textContent = rowData.money_spent;

      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      row.appendChild(td4);
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody); 
    document.getElementById("table-container").appendChild(table);



    var ctx = document.getElementById("Chart1").getContext("2d"); 

    var myChart = new Chart(ctx, { 
      type: "bar",
      data: {
        labels: data.map(function (item) {
          return item.credit_card; 
        }),

        datasets: [
          {
            label: "amount of money on credit card",
            data: data.map(function (item) {
              return item.average_income;
            }),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    
    var filteredData = data.filter(function (item) {
      return (
        item.Year_of_creation.indexOf("2020") > -1 ||
        item.Year_of_creation.indexOf("2022") > -1 
      );
    });

    

    var ctx = document.getElementById("Chart2").getContext("2d");

    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["2020", "2022"],
        datasets: [
          {
            label: "Year of creation of credit card",
            data: [
              filteredData.filter(function (item) {
                return item.Year_of_creation.indexOf("2020") > -1;
              }).length,
              filteredData.filter(function (item) {
                return item.Year_of_creation.indexOf("2022") > -1;
              }).length,
            ],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  });
