// DOM Elements
const navLinks = document.querySelectorAll("nav a");
const pages = document.querySelectorAll(".page");
const confettiContainer = document.getElementById("confettiContainer");
const funnyQuoteElement = document.getElementById("funnyQuote");
const birthdayWishElement = document.getElementById("birthdayWish");
const photoUpload = document.getElementById("photoUpload");
const photoCaption = document.getElementById("photoCaption");
const addPhotoBtn = document.getElementById("addPhotoBtn");
const photoGallery = document.getElementById("photoGallery");
const playPauseBtn = document.getElementById("playPauseBtn");
const birthdayMusic = document.getElementById("birthdayMusic");

// Funny Birthday Quotes
const funnyQuotes = [
  "Di usia 25 ini, semoga binar matamu tetap menjadi cahaya paling terang di hidupku",
  "Seperempat abad telah berlalu, dan aku bersyukur menjadi bagian dari setiap langkahmu",
  "Terima kasih telah tumbuh menjadi pribadi yang luar biasa dan mencintaiku dengan tulus",
  "Mari kita rangkai lebih banyak mimpi dan petualangan indah di tahun-tahun mendatang",
  "Selamat ulang tahun, Sayang; cintaku padamu akan selalu mekar, hari ini dan selamanya",
];

// Birthday Wishes
const birthdayWishes = [
  "Semoga harimu secerah senyummu dan seindah dirimu",
  "Semoga tahun ini dipenuhi tawa, tangis, senyuman, dan pertumbuhan bersamamu",
  "Hitung hidupmu dengan senyuman, bukan air mata. Hitung usiamu dengan teman, bukan tahun",
  "Semoga kebahagiaan yang telah kau sebarkan di masa lalu kembali padamu di hari ini",
  "Semoga harimu indah dengan kesehatan dan kebahagiaan selamanya",
  "Semoga ulang tahun ini membawa semua hal yang indah, semua hal yang menggembirakan, dan semua hal yang menyenangkan!",
  "Di hari ulang tahunmu, aku berharap kau mendapatkan kebahagiaan tanpa batas dan banyak kenangan berharga",
  "Kau bukan hanya setahun lebih tua, kau setahun lebih baik dan itu luar biasa",
  "Semoga ulang tahunmu semanis kue dan sebagus hadiahnya",
  "Hidup harus dijalani dengan senyum di wajahmu dan tanpa penyesalan di hatimu",
];

// Navigation
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetPage = this.getAttribute("data-page");

    // Remove active class from all pages
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    // Add active class to target page
    document.getElementById(targetPage).classList.add("active");

    // Change quote and wish when navigating
    changeQuoteAndWish();
  });
});

// Create confetti
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    // Random position
    confetti.style.left = Math.random() * 100 + "vw";

    // Random delay
    confetti.style.animationDelay = Math.random() * 5 + "s";

    // Random color
    const colors = ["#ff69b4", "#7b68ee", "#ffd700", "#00ced1", "#ff6347"];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Random size
    const size = Math.random() * 10 + 5;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";

    confettiContainer.appendChild(confetti);
  }
}

// Change quotes and wishes
function changeQuoteAndWish() {
  const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
  const randomWish = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];

  funnyQuoteElement.textContent = randomQuote;
  birthdayWishElement.textContent = randomWish;

  // Animate the change with a quick fade
  funnyQuoteElement.style.opacity = "0";
  birthdayWishElement.style.opacity = "0";

  setTimeout(() => {
    funnyQuoteElement.style.opacity = "1";
    birthdayWishElement.style.opacity = "1";
  }, 300);
}

// Create delete button
function createDeleteButton() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = "×";
  deleteBtn.title = "Delete Photo";

  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    // Add confirmation dialog
    if (confirm("Are you sure you want to delete this photo?")) {
      const photoContainer = this.parentElement;

      // Add fade out animation
      photoContainer.style.transition = "all 0.3s ease";
      photoContainer.style.transform = "scale(0.8)";
      photoContainer.style.opacity = "0";

      // Remove after animation
      setTimeout(() => {
        photoContainer.remove();
      }, 300);
    }
  });

  return deleteBtn;
}

// Photo upload functionality
addPhotoBtn.addEventListener("click", function () {
  if (!photoUpload.files[0]) {
    alert("Please select a photo first!");
    return;
  }

  const file = photoUpload.files[0];
  const caption = photoCaption.value || "Birthday Memory";

  const reader = new FileReader();
  reader.onload = function (e) {
    // Create new photo container
    const photoContainer = document.createElement("div");
    photoContainer.classList.add("photo-container");

    // Create image
    const img = document.createElement("img");
    img.src = e.target.result;
    img.alt = caption;

    // Create caption
    const captionDiv = document.createElement("div");
    captionDiv.classList.add("photo-caption");
    captionDiv.textContent = caption;

    // Create delete button for user-uploaded photos
    const deleteBtn = createDeleteButton();

    // Add to container
    photoContainer.appendChild(img);
    photoContainer.appendChild(captionDiv);
    photoContainer.appendChild(deleteBtn);

    // Add to gallery at the beginning
    photoGallery.insertBefore(photoContainer, photoGallery.firstChild);

    // Reset inputs
    photoUpload.value = "";
    photoCaption.value = "";

    // Show success message
    const successMsg = document.createElement("div");
    successMsg.textContent = "Photo added successfully!";
    successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #2ecc71;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            font-weight: bold;
          `;
    document.body.appendChild(successMsg);

    setTimeout(() => {
      successMsg.remove();
    }, 3000);
  };
  reader.readAsDataURL(file);
});

// Music player functionality
playPauseBtn.addEventListener("click", function () {
  if (birthdayMusic.paused) {
    birthdayMusic.play();
    playPauseBtn.textContent = "❚❚";
  } else {
    birthdayMusic.pause();
    playPauseBtn.textContent = "▶";
  }
});

// Initialize functions
function init() {
  createConfetti();
  changeQuoteAndWish();

  // Set interval to change quotes every 10 seconds
  setInterval(changeQuoteAndWish, 10000);

  // Random background colors on page load
  const colors = ["#f0f8ff", "#fff0f5", "#f5f5dc", "#e6e6fa", "#f0fff0"];
  document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

// Run initialization
window.addEventListener("load", init);
