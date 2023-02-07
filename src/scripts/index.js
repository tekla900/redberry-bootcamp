function goToGeneralInfo() {
    location.href = './survey.html'
}

function goToLanding() {
    location.href = './index.html'
    localStorage.clear()
}


const nameInput = document.getElementById('name')
const surnameInput = document.getElementById('surname')
const fileInput = document.getElementById('image')
const aboutMeInput = document.getElementById('about_me')
const emailInput = document.getElementById('email')
const numberInput = document.getElementById('phone_number')

const positionInput = document.getElementById('position')
const employerInput = document.getElementById('employer')
const startDate = document.getElementById('start_date')
const dueDate = document.getElementById('due_date')
const description = document.getElementById('description')

const instituteInput = document.getElementById('institute')
const degreeSelect = document.getElementById('degree')
const dueDateEdu = document.getElementById('due_date_edu')
const descriptionEdu = document.getElementById('description_edu')


const inputsFirstPage = [nameInput, surnameInput, aboutMeInput, emailInput, numberInput, fileInput]
const inputsSecPage = [positionInput, employerInput, startDate, dueDate, description]
const inputsThirdPage = [instituteInput, degreeSelect, dueDateEdu, descriptionEdu]

const form = document.querySelector('form')
const formElements = form.elements


// EVENT LISTENERS

nameInput.addEventListener('blur', () => validateInput(nameInput, nameInput.dataset.regex))
nameInput.addEventListener('input', updateName)

surnameInput.addEventListener('blur', () => validateInput(surnameInput, surnameInput.dataset.regex))
surnameInput.addEventListener('input', updateName)

aboutMeInput.addEventListener('blur',  () => validateInput(aboutMeInput, aboutMeInput.dataset.regex))
aboutMeInput.addEventListener('input', updateAboutMe)

emailInput.addEventListener('blur',  () => validateInput(emailInput, emailInput.dataset.regex))
emailInput.addEventListener('input', updateEmail)

numberInput.addEventListener('blur',  () => validateInput(numberInput, numberInput.dataset.regex))
numberInput.addEventListener('input', updateNumber)


positionInput.addEventListener('blur', () => validateInput(positionInput, positionInput.dataset.regex))
positionInput.addEventListener('input', updateExperience)

employerInput.addEventListener('blur', () => validateInput(employerInput, employerInput.dataset.regex))
employerInput.addEventListener('input', updateExperience)

startDate.addEventListener('blur', () => validateInput(startDate, startDate.dataset.regex))
startDate.addEventListener('input', updateDates)

dueDate.addEventListener('blur', () => validateInput(dueDate, dueDate.dataset.regex))
dueDate.addEventListener('input', updateDates)

description.addEventListener('blur', () => validateInput(description, description.dataset.regex))
description.addEventListener('input', updateDescription)

instituteInput.addEventListener('blur', () => validateInput(instituteInput, instituteInput.dataset.regex))
instituteInput.addEventListener('input', updateInstitute)

degreeSelect.addEventListener('blur', () => validateInput(degreeSelect, degreeSelect.dataset.regex))
degreeSelect.addEventListener('input', updateInstitute)

dueDateEdu.addEventListener('blur', () => validateInput(dueDateEdu, dueDateEdu.dataset.regex))
dueDateEdu.addEventListener('input', updateDatesEdu)

descriptionEdu.addEventListener('blur', () => validateInput(descriptionEdu, descriptionEdu.dataset.regex))
descriptionEdu.addEventListener('input', updateDescriptionEdu)


// fileInput.addEventListener('change', () => checkForFileUpload(fileInput))
fileInput.addEventListener('change', updateResumeImg)

// FETCHING DATA FOR DEGREES
fetch('https://resume.redberryinternship.ge/api/degrees')
.then(res => res.json())
.then(res => {
    res.forEach(el => {
        const option = document.createElement('option')
        option.value = el.id
        option.text = el.title
        degreeSelect.appendChild(option)
    });
})

// VALIDATION
function validateInput(input, regex) {
    let value =  input.value.match(regex)
    
    if(input.type == 'date') {
        if (input.value == "") {
            input.classList.add('invalid')
            input.classList.remove('valid')
            return false 
        } else {
            input.classList.add('valid')
            input.classList.remove('invalid')
            return true
        }
    }

    if(input.type == 'select') {
        if (input.value == 0) {
            input.classList.add('invalid')
            input.classList.remove('valid')
            return false 
        } else {
            input.classList.add('valid')
            input.classList.remove('invalid')
            return true
        }
    }

    if (value) {
        input.classList.add('valid')
        input.classList.remove('invalid')
        return true
    } else {
        input.classList.add('invalid')
        input.classList.remove('valid')
        return false
    }
}

function validatePage(inputs) {
    return inputs.every(input => {
    return input.type === 'file' ? checkForFileUpload(input) : validateInput(input, input.dataset.regex)
    })
}

function checkForFileUpload(input) {
    return input.files.length > 0
}


// NAVIGATION
let currentTab = 0
const pages = document.getElementsByClassName('tab')

showTab(currentTab)

function showTab(n) {
    pages[n].style.display = 'block'
    document.getElementById("prevBtn").style.visibility = (n === 0) ? 'hidden' : 'visible'
    document.querySelector('.nav__span').innerHTML = `${n+1}/${pages.length}`
    const titles = ['ზოგადი ინფო', 'გამოცდილება', 'განათლება'];
    document.querySelector('.survey__title').innerHTML = titles[n];

    if (n === (pages.length - 1)) {
        document.getElementById("nextBtn").innerHTML = 'ᲓᲐᲡᲠᲣᲚᲔᲑᲐ'
        document.getElementById("nextBtn").type = 'submit'
    }
}

function nextPrev(n) {
    
    if (n === 1 && !validatePage(currentTab == 0 ? inputsFirstPage : inputsSecPage)) {
        return false;
    }

    pages[currentTab].style.display = "none"
    currentTab += n
    
    if (currentTab >= pages.length) {
        document.getElementById("survey__form").submit()
        return false
    }
    
    showTab(currentTab)
}


// UPDATE RESUME
const infoColumn = document.getElementById('resume--div').querySelector('.first--col')
const imageColumn = document.getElementById('resume--div').querySelector('.resume--photo')
const experience = document.querySelector('.resume--experience--col')
const education = document.querySelector('.resume--education--col')

function updateName() {
    if(localStorage.getItem('name') && localStorage.getItem('surname')) {
        infoColumn.querySelector('.resume--fullname').innerHTML = `${nameInput.value + ' ' + surnameInput.value}`
    }
    infoColumn.querySelector('.resume--fullname').innerHTML = `${nameInput.value + ' ' + surnameInput.value}`
}

function updateAboutMe() {
    infoColumn.querySelector('.resume--about').innerHTML = `
        <h2 class="resume--about--header">ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>
        <p class="resume--about--info">${aboutMeInput.value}</p>`
}

function updateEmail() {
    document.querySelector('.resume--email').innerHTML = `
    <div><i class="fa-solid fa-at"></i> <p class="resume--contact--info">${emailInput.value}</p></div>
    `
}

function updateNumber() {
    document.querySelector('.resume--number').innerHTML = `
    <div><i class="fa-solid fa-phone"></i> <p class="resume--contact--info">${numberInput.value}</p></div>
    `
}

function updateExperience() {
    experience.querySelector('.resume--experience').innerHTML = `
    <h2 class="resume--about--header">გამოცდილება</h2>
    <p class='resume--position'>${positionInput.value}, ${employerInput.value}</p>
    `
}

function updateInstitute() {
    let selectedOption = degreeSelect.options[degreeSelect.selectedIndex]

    education.querySelector('.resume--experience').innerHTML = `
    <h2 class="resume--about--header">ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h2>
    <p class='resume--position'>${instituteInput.value}, ${selectedOption.textContent}</p>
    `
}

function updateDates() {
    experience.querySelector('.resume--dates').innerHTML = `${startDate.value} - ${dueDate.value}`
}

function updateDatesEdu() {
    education.querySelector('.resume--dates').innerHTML = dueDateEdu.value
}

function updateDescription() {
    experience.querySelector('.resume--description').innerHTML = description.value
}

function updateDescriptionEdu() {
    education.querySelector('.resume--description').innerHTML = descriptionEdu.value
}

function updateResumeImg() {
    const file = this.files[0]
    const reader = new FileReader()
  
    reader.addEventListener("load", function() {
      const img = new Image()
      img.src = reader.result

      imageColumn.innerHTML = `<img src=${reader.result} class='resume--image'>`
    })
  
    reader.readAsDataURL(file)
}

// LOCAL STORAGE
// STORING INPUT DATA IN LOCALSTORAGE

for (let i = 0; i < formElements.length; i++) {
    let element = formElements[i]
    if (element.name) {
        element.addEventListener('input', function() {
            localStorage.setItem('formData', JSON.stringify(getFormData()))
        })
    }
}


// Retrieve form data from local storage and populate the form fields when the page is loaded
window.addEventListener('load', function() {
    let formData = JSON.parse(localStorage.getItem('formData'))
    if (formData) {
        populateForm(formData)
        populateResume(formData)
    }
})


// Helper function to get the form data as an object
function getFormData() {
    let formData = {}
    for (let i = 0; i < formElements.length; i++) {
        
        let element = formElements[i]
        if (element.name) {
            formData[element.name] = element.value
        }
    }
    return formData
}

// Helper function to populate the form fields with data
function populateForm(formData) {

    for (let key in formData) {
        let element = document.getElementsByName(key)[0]
        if(!(element.tagName === 'INPUT' && element.type === 'file')) {
            if(!(element.tagName === 'SELECT')) {
                element.value = Number(formData[key])
            }
            element.value = formData[key]
        }
    }
}

function populateResume(formData) {

    if(formData.name || formData.surname) {
        infoColumn.querySelector('.resume--fullname').innerHTML = `${formData.name} ${formData.surname}`
    }

    if(formData.email || formData.phone_number) {
        infoColumn.querySelector('.resume--contact').innerHTML = `
            <div><i class="fa-solid fa-at"></i> <p class="resume--contact--info">${formData.email}</p></div>
            <div><i class="fa-solid fa-phone"></i> <p class="resume--contact--info">${formData.phone_number}</p></div>`
    }

    if (formData.about_me) {
        infoColumn.querySelector('.resume--about').innerHTML = `
            <h2 class="resume--about--header">ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>
            <p class="resume--about--info">${formData.about_me}</p>`
    }
  
    if (formData.position || formData.employer) {
        experience.querySelector('.resume--experience').innerHTML = `
            <h2 class="resume--about--header">გამოცდილება</h2>
            <p class='resume--position'>${formData.position}, ${formData.employer}</p>`
    }

    if (formData.start_date || formData.due_date) {
        experience.querySelector('.resume--dates').innerHTML = `${formData.start_date} - ${formData.due_date}`
    }

    if (formData.description) experience.querySelector('.resume--description').innerHTML = formData.description
  
}


// ADDING EXPERIENCES

let addBtn = document.getElementById("add--experience")

addBtn.addEventListener("click", function() {
  let section = document.querySelector(".experience")
  
  section.innerHTML += `
    <div class="input--group ">
        <label class="input-group__label" for="position">თანამდებობა</label>
        <input class="input-group__input" type="text" name="position" id="position" placeholder="თანამდებობა" data-regex="^.{2,}$">
        <span class="input-group__span">მინიმუმ 2 სიმბოლო</span>
    </div>

    <div class="input--group employer">
        <label class="input-group__label" for="employer">დამსაქმებელი</label>
        <input class="input-group__input" type="text" name="employer" id="employer" placeholder="დამსაქმებელი" data-regex="^.{2,}$">
        <span class="input-group__span">მინიმუმ 2 სიმბოლო</span>
    </div>

    <div class="input-groups__names">
        <div class="input--group">
            <label for="start_date">დაწყების რიცხვი</label>
            <input type="date" id="start_date" name="start_date"
            value="mm/dd/yyyy" min="1900-01-01">
        </div>
        
        <div class="input--group">
            <label for="due_date">დამთავრების რიცხვი</label>
            <input type="date" id="due_date" name="due_date"
            value="mm/dd/yyyy" min="1900-01-01">
        </div>
    </div>

    <div class="input--group experience--info">
        <label class="input-group__label" for="description">აღწერა</label>
        <textarea name="description" id="description"  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა" data-regex="^.+$"></textarea>
    </div>

    <hr>
  `
})