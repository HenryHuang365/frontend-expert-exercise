document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    const form = event.target;
    if (form.checkValidity()) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fill out all required fields.");
    }
  });
