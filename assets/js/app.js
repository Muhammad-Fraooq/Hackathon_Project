"use strict";
var _a, _b;
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;
// Defining valid types as an enum
var ValidType;
(function (ValidType) {
    ValidType["TEXT"] = "text";
    ValidType["TEXT_EMP"] = "text_emp";
    ValidType["EMAIL"] = "email";
    ValidType["DIGIT"] = "digit";
    ValidType["PHONENO"] = "phoneno";
    ValidType["ANY"] = "any";
})(ValidType || (ValidType = {}));
// Defining HTMLElement types for form inputs
const mainForm = document.getElementById('cv-form');
const firstnameElem = mainForm.firstname;
const middlenameElem = mainForm.middlename;
const lastnameElem = mainForm.lastname;
const imageElem = mainForm.image;
const designationElem = mainForm.designation;
const addressElem = mainForm.address;
const emailElem = mainForm.email;
const phonenoElem = mainForm.phoneno;
const summaryElem = mainForm.summary;
// Defining HTMLElement types for display elements
const nameDsp = document.getElementById('fullname_dsp');
const imageDsp = document.getElementById('image_dsp');
const phonenoDsp = document.getElementById('phoneno_dsp');
const emailDsp = document.getElementById('email_dsp');
const addressDsp = document.getElementById('address_dsp');
const designationDsp = document.getElementById('designation_dsp');
const summaryDsp = document.getElementById('summary_dsp');
const projectsDsp = document.getElementById('projects_dsp');
const achievementsDsp = document.getElementById('achievements_dsp');
const skillsDsp = document.getElementById('skills_dsp');
const educationsDsp = document.getElementById('educations_dsp');
const experiencesDsp = document.getElementById('experiences_dsp');
// Utility function for fetching values from NodeLists
const fetchValues = (attrs, ...nodeLists) => {
    const elemsAttrsCount = nodeLists.length;
    const elemsDataCount = nodeLists[0].length;
    const tempDataArr = [];
    for (let i = 0; i < elemsDataCount; i++) {
        const dataObj = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }
    return tempDataArr;
};
const getUserInputs = () => {
    const achievementsTitleElem = document.querySelectorAll('.achieve_title');
    const achievementsDescriptionElem = document.querySelectorAll('.achieve_description');
    const expTitleElem = document.querySelectorAll('.exp_title');
    const expOrganizationElem = document.querySelectorAll('.exp_organization');
    const expLocationElem = document.querySelectorAll('.exp_location');
    const expStartDateElem = document.querySelectorAll('.exp_start_date');
    const expEndDateElem = document.querySelectorAll('.exp_end_date');
    const expDescriptionElem = document.querySelectorAll('.exp_description');
    const eduSchoolElem = document.querySelectorAll('.edu_school');
    const eduDegreeElem = document.querySelectorAll('.edu_degree');
    const eduCityElem = document.querySelectorAll('.edu_city');
    const eduStartDateElem = document.querySelectorAll('.edu_start_date');
    const eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date');
    const eduDescriptionElem = document.querySelectorAll('.edu_description');
    const projTitleElem = document.querySelectorAll('.proj_title');
    const projLinkElem = document.querySelectorAll('.proj_link');
    const projDescriptionElem = document.querySelectorAll('.proj_description');
    const skillElem = document.querySelectorAll('.skill');
    // Add event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, ValidType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, ValidType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, ValidType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, ValidType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, ValidType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, ValidType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, ValidType.TEXT, 'Designation'));
    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem)
    };
};
// Validation function
function validateFormData(elem, elemType, elemName) {
    if (elemType === ValidType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    else if (elemType === ValidType.TEXT_EMP) {
        if (!strRegex.test(elem.value))
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    else if (elemType === ValidType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    else if (elemType === ValidType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
    else if (elemType === ValidType.ANY) {
        if (elem.value.trim().length === 0)
            addErrMsg(elem, elemName);
        else
            removeErrMsg(elem);
    }
}
// Helper functions
function addErrMsg(formElem, formElemName) {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}
function removeErrMsg(formElem) {
    formElem.nextElementSibling.innerHTML = "";
}
// Show list data
const showListData = (list, listElem, keysToShow) => {
    let html = '<ul>';
    for (let item of list) {
        html += '<li>';
        for (let key of keysToShow) {
            html += `${item[key]} `;
        }
        html += '</li>';
    }
    html += '</ul>';
    listElem.innerHTML = html;
};
const showUserInputs = (formData) => {
    nameDsp.innerHTML = `${formData.firstname} ${formData.middlename ? formData.middlename : ''} ${formData.lastname}`;
    phonenoDsp.innerHTML = formData.phoneno;
    emailDsp.innerHTML = formData.email;
    addressDsp.innerHTML = formData.address;
    designationDsp.innerHTML = formData.designation;
    summaryDsp.innerHTML = formData.summary;
    showListData(formData.achievements, achievementsDsp, ['achieve_title', 'achieve_description']);
    showListData(formData.experiences, experiencesDsp, ['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description']);
    showListData(formData.educations, educationsDsp, ['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description']);
    showListData(formData.projects, projectsDsp, ['proj_title', 'proj_link', 'proj_description']);
    showListData(formData.skills, skillsDsp, ['skill']);
};
// Fetching form data and displaying it
const generateCV = () => {
    const formData = getUserInputs();
    showUserInputs(formData);
};
// Event listener for the 'Generate Resume' button
(_a = document.getElementById('generate-resume-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    e.preventDefault();
    generateCV();
});
(_b = document.getElementById('toggleResumeButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    const resume = document.getElementById('resume');
    const form = document.getElementById('cv-form');
    if (resume && form) {
        if (resume.style.display === 'none' || resume.style.display === '') {
            resume.style.display = 'block'; // Show the resume
            form.style.display = 'none'; // Hide the form
            this.textContent = 'Update Resume'; // Change button text
        }
        else {
            resume.style.display = 'none'; // Hide the resume
            form.style.display = 'block'; // Show the form
            this.textContent = 'Generate Resume'; // Change button text
        }
    }
});
// Define the previewImage function
function previewImage(event) {
    const input = event.target;
    const file = input.files ? input.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            const imagePreview = document.getElementById('image_dsp');
            imagePreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Set the image source to the loaded file
        };
        reader.readAsDataURL(file); // Read the image file as a data URL
    }
}
function printCV() {
    window.print(); // This will print the resume
}
