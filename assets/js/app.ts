const strRegex: RegExp = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex: RegExp = /^\d+$/;

// Defining valid types as an enum
enum ValidType {
    TEXT = 'text',
    TEXT_EMP = 'text_emp',
    EMAIL = 'email',
    DIGIT = 'digit',
    PHONENO = 'phoneno',
    ANY = 'any',
}

// Defining HTMLElement types for form inputs
const mainForm = document.getElementById('cv-form') as HTMLFormElement;
const firstnameElem = mainForm.firstname as HTMLInputElement;
const middlenameElem = mainForm.middlename as HTMLInputElement;
const lastnameElem = mainForm.lastname as HTMLInputElement;
const imageElem = mainForm.image as HTMLInputElement;
const designationElem = mainForm.designation as HTMLInputElement;
const addressElem = mainForm.address as HTMLInputElement;
const emailElem = mainForm.email as HTMLInputElement;
const phonenoElem = mainForm.phoneno as HTMLInputElement;
const summaryElem = mainForm.summary as HTMLTextAreaElement;

// Defining HTMLElement types for display elements
const nameDsp = document.getElementById('fullname_dsp') as HTMLElement;
const imageDsp = document.getElementById('image_dsp') as HTMLImageElement;
const phonenoDsp = document.getElementById('phoneno_dsp') as HTMLElement;
const emailDsp = document.getElementById('email_dsp') as HTMLElement;
const addressDsp = document.getElementById('address_dsp') as HTMLElement;
const designationDsp = document.getElementById('designation_dsp') as HTMLElement;
const summaryDsp = document.getElementById('summary_dsp') as HTMLElement;
const projectsDsp = document.getElementById('projects_dsp') as HTMLElement;
const achievementsDsp = document.getElementById('achievements_dsp') as HTMLElement;
const skillsDsp = document.getElementById('skills_dsp') as HTMLElement;
const educationsDsp = document.getElementById('educations_dsp') as HTMLElement;
const experiencesDsp = document.getElementById('experiences_dsp') as HTMLElement;

// Utility function for fetching values from NodeLists
const fetchValues = (attrs: string[], ...nodeLists: NodeListOf<HTMLInputElement | HTMLTextAreaElement>[]): object[] => {
    const elemsAttrsCount = nodeLists.length;
    const elemsDataCount = nodeLists[0].length;
    const tempDataArr: object[] = [];

    for (let i = 0; i < elemsDataCount; i++) {
        const dataObj: { [key: string]: string } = {};
        for (let j = 0; j < elemsAttrsCount; j++) {
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
};

const getUserInputs = (): object => {
    const achievementsTitleElem = document.querySelectorAll('.achieve_title') as NodeListOf<HTMLInputElement>;
    const achievementsDescriptionElem = document.querySelectorAll('.achieve_description') as NodeListOf<HTMLTextAreaElement>;

    const expTitleElem = document.querySelectorAll('.exp_title') as NodeListOf<HTMLInputElement>;
    const expOrganizationElem = document.querySelectorAll('.exp_organization') as NodeListOf<HTMLInputElement>;
    const expLocationElem = document.querySelectorAll('.exp_location') as NodeListOf<HTMLInputElement>;
    const expStartDateElem = document.querySelectorAll('.exp_start_date') as NodeListOf<HTMLInputElement>;
    const expEndDateElem = document.querySelectorAll('.exp_end_date') as NodeListOf<HTMLInputElement>;
    const expDescriptionElem = document.querySelectorAll('.exp_description') as NodeListOf<HTMLTextAreaElement>;

    const eduSchoolElem = document.querySelectorAll('.edu_school') as NodeListOf<HTMLInputElement>;
    const eduDegreeElem = document.querySelectorAll('.edu_degree') as NodeListOf<HTMLInputElement>;
    const eduCityElem = document.querySelectorAll('.edu_city') as NodeListOf<HTMLInputElement>;
    const eduStartDateElem = document.querySelectorAll('.edu_start_date') as NodeListOf<HTMLInputElement>;
    const eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date') as NodeListOf<HTMLInputElement>;
    const eduDescriptionElem = document.querySelectorAll('.edu_description') as NodeListOf<HTMLTextAreaElement>;

    const projTitleElem = document.querySelectorAll('.proj_title') as NodeListOf<HTMLInputElement>;
    const projLinkElem = document.querySelectorAll('.proj_link') as NodeListOf<HTMLInputElement>;
    const projDescriptionElem = document.querySelectorAll('.proj_description') as NodeListOf<HTMLTextAreaElement>;

    const skillElem = document.querySelectorAll('.skill') as NodeListOf<HTMLInputElement>;

    // Add event listeners for form validation
    firstnameElem.addEventListener('keyup', (e: Event) => validateFormData(e.target as HTMLInputElement, ValidType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e: Event) => validateFormData(e.target as HTMLInputElement, ValidType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e: Event) => validateFormData(e.target as HTMLInputElement, ValidType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e: Event) => validateFormData(e.target as HTMLInputElement, ValidType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e: Event) => validateFormData(e.target as HTMLInputElement, ValidType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e: Event) => validateFormData(e.target as HTMLInputElement, ValidType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e: Event) => validateFormData(e.target as HTMLInputElement, ValidType.TEXT, 'Designation'));

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
function validateFormData(elem: HTMLInputElement | HTMLTextAreaElement, elemType: ValidType, elemName: string) {
    if (elemType === ValidType.TEXT) {
        if (!strRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType === ValidType.TEXT_EMP) {
        if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType === ValidType.EMAIL) {
        if (!emailRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType === ValidType.PHONENO) {
        if (!phoneRegex.test(elem.value) || elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    } else if (elemType === ValidType.ANY) {
        if (elem.value.trim().length === 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// Helper functions
function addErrMsg(formElem: HTMLInputElement | HTMLTextAreaElement, formElemName: string) {
    formElem.nextElementSibling!.innerHTML = `${formElemName} is invalid`;
}

function removeErrMsg(formElem: HTMLInputElement | HTMLTextAreaElement) {
    formElem.nextElementSibling!.innerHTML = "";
}

// Show list data
const showListData = (list: { [key: string]: string }[], listElem: HTMLElement, keysToShow: string[]): void => {
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

const showUserInputs = (formData: any): void => {
    nameDsp.innerHTML = `${formData.firstname} ${formData.middlename ? formData.middlename : ''} ${formData.lastname}`;
    phonenoDsp.innerHTML = formData.phoneno;
    emailDsp.innerHTML = formData.email;
    addressDsp.innerHTML = formData.address;
    designationDsp.innerHTML = formData.designation;
    summaryDsp.innerHTML = formData.summary;

     // Name and other fields
     nameDsp.innerHTML = `${formData.firstname} ${formData.middlename ? formData.middlename : ''} ${formData.lastname}`;
    
     // Displaying phone number with label
     phonenoDsp.innerHTML = `<strong>Phone Number: </strong> ${formData.phoneno}`;
     
     // Displaying email with label
     emailDsp.innerHTML = `<strong>Email: </strong> ${formData.email}`;
     
     // Displaying address with label
     addressDsp.innerHTML = `<strong>Address: </strong> ${formData.address}`;
     
     // Displaying summary with label
     summaryDsp.innerHTML = `<strong>Summary: </strong> ${formData.summary}`;
     
    showListData(formData.achievements, achievementsDsp, ['achieve_title', 'achieve_description']);
    showListData(formData.experiences, experiencesDsp, ['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description']);
    showListData(formData.educations, educationsDsp, ['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description']);
    showListData(formData.projects, projectsDsp, ['proj_title', 'proj_link', 'proj_description']);
    showListData(formData.skills, skillsDsp, ['skill']);
};

// Fetching form data and displaying it
const generateCV = (): void => {
    const formData = getUserInputs();
    showUserInputs(formData);
};

// Event listener for the 'Generate Resume' button
document.getElementById('generate-resume-btn')?.addEventListener('click', (e: Event) => {
    e.preventDefault();
    generateCV();
});
document.getElementById('toggleResumeButton')?.addEventListener('click', function(this: HTMLElement) {
    const resume = document.getElementById('resume') as HTMLElement | null;
    const form = document.getElementById('cv-form') as HTMLElement | null;

    if (resume && form) {
        if (resume.style.display === 'none' || resume.style.display === '') {
            resume.style.display = 'block'; // Show the resume
            form.style.display = 'none'; // Hide the form
            this.textContent = 'Update Resume'; // Change button text
        } else {
            resume.style.display = 'none'; // Hide the resume
            form.style.display = 'block'; // Show the form
            this.textContent = 'Generate Resume'; // Change button text
        }
    }
});
// Define the previewImage function
function previewImage(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e: ProgressEvent<FileReader>) {
            const imagePreview = document.getElementById('image_dsp') as HTMLImageElement;
            imagePreview.src = e.target?.result as string; // Set the image source to the loaded file
        };
        reader.readAsDataURL(file); // Read the image file as a data URL
    }
}

  
function printCV() {
    window.print(); // This will print the resume
}

