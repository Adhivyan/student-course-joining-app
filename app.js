// ============================
// MOBILE NAVIGATION
// ============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// Close menu when clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// ============================
// COURSE SEARCH
// ============================

const courseSearch = document.getElementById("courseSearch");

const courseCards = document.querySelectorAll(".course-card");


courseSearch.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase().trim();

    courseCards.forEach(card => {

        const courseName = card.dataset.course.toLowerCase();

        const courseContent = card.innerText.toLowerCase();

        if (
            courseName.includes(searchValue) ||
            courseContent.includes(searchValue)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// ============================
// SELECT COURSE BUTTON
// ============================

const selectCourseButtons =
    document.querySelectorAll(".select-course-btn");

const courseSelect =
    document.getElementById("course");


selectCourseButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCourse =
            button.getAttribute("data-course");

        courseSelect.value = selectedCourse;

        document
            .getElementById("enroll")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


// ============================
// FORM VALIDATION
// ============================

const form =
    document.getElementById("enrollmentForm");

const studentName =
    document.getElementById("studentName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const age =
    document.getElementById("age");

const qualification =
    document.getElementById("qualification");

const course =
    document.getElementById("course");

const terms =
    document.getElementById("terms");

const termsError =
    document.getElementById("termsError");


function showError(input, message) {

    const formGroup =
        input.closest(".form-group");

    if (!formGroup) return;

    const errorElement =
        formGroup.querySelector(".error");

    errorElement.textContent = message;

}


function clearError(input) {

    const formGroup =
        input.closest(".form-group");

    if (!formGroup) return;

    const errorElement =
        formGroup.querySelector(".error");

    errorElement.textContent = "";

}


// ============================
// EMAIL VALIDATION
// ============================

function isValidEmail(emailAddress) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailAddress);

}


// ============================
// PHONE INPUT - ONLY NUMBERS
// ============================

phone.addEventListener("input", () => {

    phone.value =
        phone.value.replace(/\D/g, "");

});


// ============================
// FORM SUBMIT
// ============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    let isValid = true;


    // NAME

    if (studentName.value.trim() === "") {

        showError(
            studentName,
            "Please enter your full name."
        );

        isValid = false;

    } else if (studentName.value.trim().length < 3) {

        showError(
            studentName,
            "Name must contain at least 3 characters."
        );

        isValid = false;

    } else {

        clearError(studentName);

    }


    // EMAIL

    if (email.value.trim() === "") {

        showError(
            email,
            "Please enter your email address."
        );

        isValid = false;

    } else if (!isValidEmail(email.value.trim())) {

        showError(
            email,
            "Please enter a valid email address."
        );

        isValid = false;

    } else {

        clearError(email);

    }


    // PHONE

    if (phone.value.trim() === "") {

        showError(
            phone,
            "Please enter your phone number."
        );

        isValid = false;

    } else if (phone.value.length !== 10) {

        showError(
            phone,
            "Phone number must contain 10 digits."
        );

        isValid = false;

    } else {

        clearError(phone);

    }


    // AGE

    const ageValue =
        Number(age.value);

    if (age.value === "") {

        showError(
            age,
            "Please enter your age."
        );

        isValid = false;

    } else if (ageValue < 15 || ageValue > 60) {

        showError(
            age,
            "Age must be between 15 and 60."
        );

        isValid = false;

    } else {

        clearError(age);

    }


    // QUALIFICATION

    if (qualification.value === "") {

        showError(
            qualification,
            "Please select your qualification."
        );

        isValid = false;

    } else {

        clearError(qualification);

    }


    // COURSE

    if (course.value === "") {

        showError(
            course,
            "Please select a course."
        );

        isValid = false;

    } else {

        clearError(course);

    }


    // TERMS

    if (!terms.checked) {

        termsError.textContent =
            "Please accept the terms and conditions.";

        isValid = false;

    } else {

        termsError.textContent = "";

    }


    // ============================
    // IF FORM IS VALID
    // ============================

    if (isValid) {

        const studentData = {

            name: studentName.value.trim(),

            email: email.value.trim(),

            phone: phone.value.trim(),

            age: age.value,

            qualification:
                qualification.value,

            course:
                course.value,

            message:
                document
                    .getElementById("message")
                    .value
                    .trim()

        };


        // Store data in browser LocalStorage

        let registrations =
            JSON.parse(
                localStorage.getItem(
                    "courseRegistrations"
                )
            ) || [];


        registrations.push(studentData);


        localStorage.setItem(
            "courseRegistrations",
            JSON.stringify(registrations)
        );


        showSuccessModal(studentData);


        form.reset();

    }

});


// ============================
// SUCCESS MODAL
// ============================

const successModal =
    document.getElementById("successModal");

const successMessage =
    document.getElementById("successMessage");

const closeModal =
    document.getElementById("closeModal");


function showSuccessModal(student) {

    successMessage.textContent =
        `Thank you, ${student.name}! Your registration for ${student.course} has been submitted successfully. Our team will contact you soon.`;

    successModal.classList.add("active");

}


closeModal.addEventListener("click", () => {

    successModal.classList.remove("active");

});


successModal.addEventListener("click", event => {

    if (event.target === successModal) {

        successModal.classList.remove("active");

    }

});


// 
============================
// CLEAR ERRORS WHILE TYPING
// ============================
[
    studentName,
    email,
    phone,
    age,
    qualification,
    course

].forEach(input => {

    input.addEventListener("input", () => {

        clearError(input);

    });

});