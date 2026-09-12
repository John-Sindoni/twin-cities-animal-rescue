const interestSection = document.getElementById("interest-information");
const interestDetails = document.getElementById("interest-details");
const availabilitySummary = document.getElementById("availability-summary");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const firstNameInput = document.getElementById("first-name");
const firstNameError = document.getElementById("first-name-error");
const lastNameInput = document.getElementById("last-name");
const lastNameError = document.getElementById("last-name-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");
const interestOptions = document.querySelectorAll('input[name="interest"]');
const interestError = document.getElementById("interest-error");
const petExperienceInput = document.getElementById("pet-experience");
const petExperienceError = document.getElementById("pet-experience-error");

// Explain each option immediately so visitors can choose the right way to help.
function updateInterestDetails(selectedInterest) {
    if (selectedInterest === "foster") {
        interestDetails.textContent = "Foster families provide a temporary, caring home for an animal waiting for adoption";
    } else if (selectedInterest === "volunteer") {
        interestDetails.textContent = "Volunteers help with animal care, community events, and adoption support.";
    } else if (selectedInterest === "adoption") {
        interestDetails.textContent = "Learn about the adoption process and giving an animal a loving home.";
    }
}

// One listener handles choices within the fieldset, including availability.
// Save only interest and days; names, email, and written responses are not stored.
interestSection.addEventListener("change", function (event) {
    if (event.target.name === "availability") {
        updateAvailabilitySummary();
        return;
    }
    if (event.target.name !== "interest") {
        return;
    }
    updateInterestDetails(event.target.value);
    localStorage.setItem("selectedInterest", event.target.value);
});

// Restore the visitor's saved interest so they do not have to select it again.
const savedInterest = localStorage.getItem("selectedInterest");
if (savedInterest) {
    const savedOption = document.querySelector(`input[name="interest"][value = "${savedInterest}"]`);
    if (savedOption) {
        savedOption.checked = true;
        updateInterestDetails(savedInterest);
    }
}

// Keep the visible summary and saved days in sync with the checked boxes.
function updateAvailabilitySummary() {
    const checkedDays = document.querySelectorAll(`input[name="availability"]:checked`);
    const selectedDays = [];
    checkedDays.forEach(function (day) {
        selectedDays.push(day.value);
    });
    availabilitySummary.textContent = "Available: " + selectedDays.join(", ");
    localStorage.setItem("selectedDays",
        JSON.stringify(selectedDays)
    );
}
const savedDays = JSON.parse(localStorage.getItem("selectedDays")) || [];
const availabilityOptions = document.querySelectorAll('input[name="availability"]');

// Restore the checkboxes before rebuilding the summary on page load.
availabilityOptions.forEach(function (day) {
    day.checked = savedDays.includes(day.value);
});
updateAvailabilitySummary();

// Validators return true or false and update the matching inline error.
// aria-invalid also exposes the error state to assistive technology and CSS.
function validateFirstName() {
    const firstName = firstNameInput.value.trim();
    if (firstName === "") {
        firstNameError.textContent = "Please enter your first name.";
        firstNameInput.setAttribute("aria-invalid", "true");
        return false;
    }
    if (firstName.length < 2 || firstName.length > 50) {
        firstNameError.textContent = "Your first name must be between 2 and 50 characters.";
        firstNameInput.setAttribute("aria-invalid", "true");
        return false;
    }
    firstNameError.textContent = "";
    firstNameInput.removeAttribute("aria-invalid");
    return true;
}
function validateLastName() {
    const lastName = lastNameInput.value.trim();
    if (lastName === "") {
        lastNameError.textContent = "Please enter your last name.";
        lastNameInput.setAttribute("aria-invalid", "true");
        return false;
    }
    if (lastName.length < 2 || lastName.length > 50) {
        lastNameError.textContent = "Your last name must be between 2 and 50 characters.";
        lastNameInput.setAttribute("aria-invalid", "true");
        return false;
    }
    lastNameError.textContent = "";
    lastNameInput.removeAttribute("aria-invalid");
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    if (email === "") {
        emailError.textContent = "Please enter your email address.";
        emailInput.setAttribute("aria-invalid", "true");
        return false;
    }
    if (emailInput.validity.typeMismatch) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.setAttribute("aria-invalid", "true");
        return false;
    }
    emailError.textContent = "";
    emailInput.removeAttribute("aria-invalid");
    return true;
}
function validatePhone() {
    if (phoneInput.value !== "" && phoneInput.validity.patternMismatch) {
        phoneError.textContent = "Enter a phone number in the format 407-555-1234, or leave it blank.";
        phoneInput.setAttribute("aria-invalid", "true");
        return false;
    }
    phoneError.textContent = "";
    phoneInput.removeAttribute("aria-invalid");
    return true;
}

// Treat the radio buttons as one required choice and update their error state together.
function validateInterest() {
    const selectedOption = document.querySelector('input[name="interest"]:checked');
    interestError.textContent = selectedOption ? "" : "Please select Volunteer, Foster, or Adoption Information.";
    interestOptions.forEach(function (option) {
        if (selectedOption) {
            option.removeAttribute("aria-invalid");
        } else {
            option.setAttribute("aria-invalid", "true");
        }
    });
    return selectedOption !== null;
}

function validatePetExperience() {
    if (petExperienceInput.value.trim() === "") {
        petExperienceError.textContent = "Please tell us about your experience with pets. If you have none, you can say so.";
        petExperienceInput.setAttribute("aria-invalid", "true");
        return false;
    }
    if (petExperienceInput.value.length > 500) {
        petExperienceError.textContent = "Please keep your pet experience to 500 characters or fewer.";
        petExperienceInput.setAttribute("aria-invalid", "true");
        return false;
    }
    petExperienceError.textContent = "";
    petExperienceInput.removeAttribute("aria-invalid");
    return true;
}

// Let the submit handler show the inline messages before browser validation.
contactForm.noValidate = true;

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formStatus.textContent = "";

    // Run every validator so visitors see all errors from a single submission.
    const firstNameValid = validateFirstName();
    const lastNameValid = validateLastName();
    const emailValid = validateEmail();
    const phoneValid = validatePhone();
    const interestValid = validateInterest();
    const petExperienceValid = validatePetExperience();
    if (!firstNameValid || !lastNameValid || !emailValid ||
        !phoneValid || !interestValid || !petExperienceValid) {
        // Move keyboard focus to the first field that needs correction.
        contactForm.querySelector('[aria-invalid="true"]').focus();
        return;
    }
    // Check remaining HTML constraints before showing the success message.
    if (!contactForm.reportValidity()) {
        return;
    }
    formStatus.textContent = "Your information passed validation. This is a class demonstration; no inquiry was sent.";
});

// Capture native invalid events because they do not bubble up from the fields.
contactForm.addEventListener("invalid", function (event) {
    event.target.setAttribute("aria-invalid", "true");
}, true);

// Recheck fields already marked invalid as visitors correct them.
// Untouched fields wait until submission, avoiding errors while visitors first type.
contactForm.addEventListener("input", function (event) {
    formStatus.textContent = "";
    const field = event.target;
    if (field.getAttribute("aria-invalid") !== "true") {
        return;
    }

    if (field === firstNameInput) {
        validateFirstName();
    } else if (field === lastNameInput) {
        validateLastName();
    } else if (field === emailInput) {
        validateEmail();
    } else if (field === phoneInput) {
        validatePhone();
    } else if (field.name === "interest") {
        validateInterest();
    } else if (field === petExperienceInput) {
        validatePetExperience();
    } else if (field.validity.valid) {
        field.removeAttribute("aria-invalid");
    }
});
