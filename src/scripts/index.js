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

const form = document.querySelector('form')
const formElements = form.elements

function validateInput(input, regex) {
    let value =  input.value.match(regex)
    
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

function checkForFileUpload(input) {
    return input.files.length > 0
}

nameInput.addEventListener('blur', () => validateInput(nameInput, nameInput.dataset.regex))
nameInput.addEventListener('input', updateName)

surnameInput.addEventListener('blur', () => validateInput(surnameInput, surnameInput.dataset.regex))
surnameInput.addEventListener('input', updateName)

aboutMeInput.addEventListener('blur',  () => validateInput(aboutMeInput, aboutMeInput.dataset.regex))
aboutMeInput.addEventListener('input', updateAboutMe)

emailInput.addEventListener('blur',  () => validateInput(emailInput, emailInput.dataset.regex))
emailInput.addEventListener('input', updateEmail)

numberInput.addEventListener('blur',  () => validateInput(numberInput, numberInput.dataset.regex))
numberInput.addEventListener('input', updateEmail)


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

// fileInput.addEventListener('change', () => checkForFileUpload(fileInput))
fileInput.addEventListener('change', updateResumeImg)

function validatePage(inputsArr) {
    let isFormValid = true

    inputsArr.forEach(input => {
        if (input.type === 'file') {
            isFormValid = isFormValid && checkForFileUpload(input)
        } else {
            isFormValid = isFormValid && validateInput(input, input.dataset.regex)
        }
    })

    return isFormValid
}

function validateFirstPage() {
    let inputs = [nameInput, surnameInput, aboutMeInput, emailInput, numberInput, fileInput]
  
    return validatePage(inputs)
}

function validateSecPage() {
    let inputs = [positionInput, employerInput, startDate, dueDate, description]

    return validatePage(inputs)
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
    if(currentTab == 0) {
        if (n === 1 && !validateFirstPage()) {
            return false
        }
        } else if(currentTab == 1){
        if (n === 1 && !validateSecPage()) {
            return false
        }
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
    infoColumn.querySelector('.resume--contact').innerHTML = `
    <div><i class="fa-solid fa-at"></i> <p class="resume--contact--info">${emailInput.value}</p></div>
    <div><i class="fa-solid fa-phone"></i> <p class="resume--contact--info">${numberInput.value}</p></div>
    `
}

function updateExperience() {
    experience.querySelector('.resume--experience').innerHTML = `
    <h2 class="resume--about--header">გამოცდილება</h2>
    <p class='resume--position'>${positionInput.value}, ${employerInput.value}</p>
    `
}

function updateDates() {
    experience.querySelector('.resume--dates').innerHTML = `${startDate.value} - ${dueDate.value}`
}

function updateDescription() {
    experience.querySelector('.resume--description').innerHTML = description.value
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

    infoColumn.innerHTML = `
            <h1 class="resume--fullname">${formData.name} ${formData.surname}</h1>
            <div class="resume--contact">
                <div><i class="fa-solid fa-at"></i> <p class="resume--contact--info">${formData.email}</p></div>
                <div><i class="fa-solid fa-phone"></i> <p class="resume--contact--info">${formData.phone_number}</p></div>
            </div>

            <div class="resume--about">
                <h2 class="resume--about--header">
                    ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ
                </h2>

                <p class="resume--about--info">
                ${formData.about_me}
                </p>
            </div>
    `

    experience.innerHTML = `
        <div class="resume--experience">
            <h2 class="resume--about--header">გამოცდილება</h2>
            <p class='resume--position'>${formData.position}, ${formData.employer}</p>
        </div>
        <p class='resume--dates'>${formData.start_date} - ${formData.due_date}</p>
        <p class="resume--description">${formData.description}</p>
    `
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