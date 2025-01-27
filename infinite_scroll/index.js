// function fetchAndAppendTestimonials() {
//   canFetchTestimonials = false;
//   const url = afterID
//     ? `${API_BASE_URL}?limit=5&after=${afterID}`
//     : `${API_BASE_URL}?limit=5`;
//   fetch(url, {
//     method: "GET",
//     mode: "no-cors",
//   })
//     .then((res) => res.json())
//     .then(({ testimonials, hasNext }) => {
//       const fragment = document.createDocumentFragment();
//       testimonials.forEach(({ message }) => {
//         fragment.appendChild(createTestimonialElement(message));
//       });
//       testimonialContainer.appendChild(fragment);

//       if (hasNext) {
//         afterID = testimonials[testimonials.length - 1].id;
//       } else {
//         testimonialContainer.removeEventListener("scroll", handleScroll);
//       }

//       canFetchTestimonials = true;
//     });
// }

// function createTestimonialElement(message) {
//   const testimonialElement = document.createElement("p");
//   testimonialElement.classList.add("testimonial");
//   testimonialElement.textContent = message;
//   return testimonialElement;
// }

// const API_BASE_URL = "https://api.frontendexpert.io/api/fe/testimonials";
// const PAGE_SIZE = 5;
// const testimonialContainer = document.getElementById("testimonial-container");

// let canFetchTestimonials = true;
// let afterID = null;

// fetchAndAppendTestimonials();

// testimonialContainer.addEventListener("scroll", handleScroll);
// function handleScroll() {
//   const bottomSpaceLeftToScroll =
//     this.scrollHeight - this.scrollTop - this.clientHeight;

//   if (bottomSpaceLeftToScroll == 0 && canFetchTestimonials) {
//     fetchAndAppendTestimonials();
//   }
// }

const API_BASE_URL = "https://api.frontendexpert.io/api/fe/testimonials";
let afterId = null;
let canFetch = true;
const testimonialContainer = document.getElementById("testimonial-container");

function fetchResponseAndCreateElement() {
  canFetch = false;
  fetch(
    afterId
      ? `${API_BASE_URL}?limit=5&after=${afterId}`
      : `${API_BASE_URL}?limit=5`
  ).then(async (responses) => {
    try {
      const fragment = document.createDocumentFragment();
      const data = await responses.json();
      console.log(data.testimonials);
      console.log(data.hasNext);
      data.testimonials.map((testimonial) => {
        const pElement = createTextElement(testimonial.message);
        fragment.appendChild(pElement);
      });
      document.getElementById("testimonial-container").appendChild(fragment);
      if (data.hasNext) {
        afterId = data.testimonials[data.testimonials.length - 1].id;
      } else {
        testimonialContainer.removeEventListener("scroll", scrollListener);
      }
      canFetch = true;
    } catch (error) {
      console.error(error);
    }
  });
}

function createTextElement(message) {
  const pElement = document.createElement("p");
  pElement.classList.add("testimonial");
  pElement.textContent = message;
  return pElement;
}

fetchResponseAndCreateElement();
testimonialContainer.addEventListener("scroll", scrollListener);

function scrollListener() {
  const spaceLeft = this.scrollHeight - this.scrollTop - this.clientHeight;

  if (spaceLeft === 0 && canFetch) {
    fetchResponseAndCreateElement();
  }
}
