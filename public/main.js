const update = document.getElementById("update");
const del = document.getElementById("delete");

update.addEventListener("click", function() {
  fetch("quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Jim",
      quote: "Dude, that's absurd."
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload(true);
    });
});

del.addEventListener("click", function() {
  console.log("delete was clicked.");
  fetch("quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Jim"
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload(true);
    });
});

// del.addEventListener("click", function() {
//   fetch("quotes", {
//     method: "delete",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       name: "Darth Vader"
//     })
//   }).then(function(response) {
//     window.location.reload();
//   });
// });
