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


const instituteInput = document.getElementById('institute')
const degreeSelect = document.getElementById('degree')
const dueDateEdu = document.getElementById('due_date_edu')
const descriptionEdu = document.getElementById('description_edu')

const inputsFirstPage = [nameInput, surnameInput, aboutMeInput, emailInput, numberInput, fileInput]
const inputsSecPage = document.querySelector('.experience').querySelectorAll("input, select, checkbox, textarea")
const inputsThirdPage = [instituteInput, degreeSelect, dueDateEdu, descriptionEdu]

const form = document.querySelector('form')
const formElements = form.elements

const addExperience = document.getElementById('add--experience')
const addEducation = document.getElementById('add--education')

let positionCounter = 0
let experiences = []


const addPosition = () => {
    const positionInput = document.querySelector(`#position-${positionCounter}`)
    const employerInput = document.querySelector(`#employer-${positionCounter}`)
    const startDate = document.querySelector(`#start_date-${positionCounter}`)
    const dueDate = document.querySelector(`#due_date-${positionCounter}`)
    const descriptionInput = document.querySelector(`#description-${positionCounter}`)

    if(validatePage([positionInput, employerInput, startDate, dueDate, descriptionInput])) 
    {
        const positionValue = positionInput.value
        const employerValue = employerInput.value
        const startDateValue = startDate.value
        const dueDateValue = dueDate.value
        const descriptionValue = descriptionInput.value
    
        experiences.push({ 
            position: positionValue,
            employer:  employerValue,
            start_date: startDateValue,
            due_date: dueDateValue,
            description: descriptionValue
        })
    
        localStorage.setItem("experiences", JSON.stringify(experiences))
    
        positionCounter++
    
        const div = document.createElement("div")
    
        div.innerHTML = `
        <div class="input--group ">
                <label class="input-group__label" for="position">თანამდებობა</label>
                <div class="position--div">
                    <input class="input-group__input" type="text" name="position" id="position-${positionCounter}" oninput="updateExperience(${positionCounter}); validateInput(this, this.getAttribute('data-regex'))" placeholder="Position" data-regex="^.{2,}$">
                    <i class="fas fa-check-circle validation--icons outside"></i>
                    <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
                </div>
                <span class="input-group__span">მინიმუმ 2 სიმბოლო</span>
            </div>
    
            <div class="input--group employer">
                <label class="input-group__label" for="employer">დამსაქმებელი</label>
                <div class="position--div">
                    <input class="input-group__input" type="text" name="employer" id="employer-${positionCounter}" oninput="updateExperience(${positionCounter}); validateInput(this, this.getAttribute('data-regex'))" placeholder="დამსაქმებელი" data-regex="^.{2,}$">
                    <i class="fas fa-check-circle validation--icons outside"></i>
                    <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
                </div>
                <span class="input-group__span">მინიმუმ 2 სიმბოლო</span>
            </div>
    
            <div class="input-groups__names">
                <div class="input--group">
                    <label for="start_date">დაწყების რიცხვი</label>
                    <div class="position--div">
                        <input type="date" id="start_date-${positionCounter}" name="start_date" oninput="updateDates(${positionCounter}); validateInput(this, this.getAttribute('data-regex'))"
                        value="mm/dd/yyyy" min="1900-01-01">
                        <i class="fas fa-check-circle validation--icons outside"></i>
                        <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
                    </div>
                    
                </div>
                
                <div class="input--group">
                    <label for="due_date">დამთავრების რიცხვი</label> 
                    <div class="position--div">
                        <input type="date" id="due_date-${positionCounter}" oninput="updateDates(${positionCounter}); validateInput(this, this.getAttribute('data-regex'))" name="due_date"
                        value="mm/dd/yyyy" min="1900-01-01">
                        <i class="fas fa-check-circle validation--icons outside"></i>
                        <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
                    </div>
                </div>
            </div>
    
            <div class="input--group experience--info">
                <label class="input-group__label" for="description">აღწერა</label>
                <div class="position--div">
                    <textarea name="description" id="description-${positionCounter}"  oninput="updateDescription(${positionCounter}); validateInput(this, this.getAttribute('data-regex'))" placeholder="როლი თანამდებობაზე და ზოგადი აღწერა" data-regex="^.+$"></textarea>
                    <i class="fas fa-check-circle validation--icons outside"></i>
                    <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
                </div>
            </div>
    
            <hr>
        `
    
        const experience  = document.createElement('div')
        experience.id = `experience-resume-${positionCounter}`
        experience.innerHTML = `
                         <div class="resume--experience">
                            <h2 class="resume--about--header" id="resume--header-${positionCounter}"></h2>
                            <p class='resume--position' id="resume--position-${positionCounter}""></p>
                            <span class='resume--position' id="resume--employer-${positionCounter}""></span>
                        </div>
    
                        <p class="resume--dates" id="resume-start-date-${positionCounter}""></p>
                        <span class="resume--dates" id="resume-due-date-${positionCounter}""></span>
                        <p class="resume--description" id="resume-description-${positionCounter}"></p>`
        
        document.querySelector('.sec-page-0').appendChild(experience)
    
        document.querySelector('.experience').insertBefore(div, document.querySelector("#add--experience"))
    }

}

document.querySelector("#add--experience").addEventListener("click", addPosition)


// EVENT LISTENERS
form.addEventListener('submit', handleFormSubmit)

nameInput.addEventListener('input', () => validateInput(nameInput, nameInput.dataset.regex))
nameInput.addEventListener('input', updateName)

surnameInput.addEventListener('input', () => validateInput(surnameInput, surnameInput.dataset.regex))
surnameInput.addEventListener('input', updateName)

aboutMeInput.addEventListener('input',  () => validateInput(aboutMeInput, aboutMeInput.dataset.regex))
aboutMeInput.addEventListener('input', updateAboutMe)

emailInput.addEventListener('input',  () => validateInput(emailInput, emailInput.dataset.regex))
emailInput.addEventListener('input', updateEmail)

numberInput.addEventListener('input',  () => validateInput(numberInput, numberInput.dataset.regex))
numberInput.addEventListener('input', updateNumber)

instituteInput.addEventListener('input', () => validateInput(instituteInput, instituteInput.dataset.regex))
instituteInput.addEventListener('input', updateInstitute)

degreeSelect.addEventListener('input', () => validateInput(degreeSelect, degreeSelect.dataset.regex))
degreeSelect.addEventListener('input', updateInstitute)

dueDateEdu.addEventListener('input', () => validateInput(dueDateEdu, dueDateEdu.dataset.regex))
dueDateEdu.addEventListener('input', updateDatesEdu)

descriptionEdu.addEventListener('input', () => validateInput(descriptionEdu, descriptionEdu.dataset.regex))
descriptionEdu.addEventListener('input', updateDescriptionEdu)

fileInput.addEventListener('change', updateResumeImg)
fileInput.addEventListener('input', saveFile)

let formatedExperiences = []


async function saveFile(e) {
    const image = e.target.files[0]

    const checkIcon = document.querySelector('.fileIcon')
    const warnIcon = document.querySelector('.fileIconWarn')

    if(image && image['type'].split('/')[0] === 'image') { 
        checkIcon.style.display = 'inline'
        warnIcon.style.display = 'none'
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.addEventListener('load', () => {
        localStorage.setItem('image', reader.result)
    })
    } else {
        checkIcon.style.display = 'none'
        warnIcon.style.display = 'inline'
    }
    
}

// FETCHING DATA FOR DEGREES
fetch('https://resume.redberryinternship.ge/api/degrees')
    .then(res => res.json())
    .then(res => {
        res.forEach(el => {
            const option = document.createElement('option')
            option.value = el.id
            option.text = el.title
            degreeSelect.appendChild(option)
        })
    })

// VALIDATION
function validateInput(input, regex) {
    let isValid = false

    const checkIcon = input.nextElementSibling
    const warningIcon = checkIcon.nextElementSibling

    
    if (input.type === 'date') {
        isValid = input.value !== ""
    } else if (input.type === 'select') {
        isValid = input.value !== 0
    } else {
        isValid = input.value.match(regex) !== null
    }

    if (isValid) {
        input.classList.add('valid')
        input.classList.remove('invalid')
        checkIcon.style.display = 'inline'
        warningIcon.style.display = 'none'

    } else {
        input.classList.add('invalid')
        input.classList.remove('valid')
        checkIcon.style.display = 'none'
        warningIcon.style.display = 'inline'
    }

    return isValid
}

function validatePage(inputs) {
    return inputs.every(input => {
        return input.type === 'file' ? checkForFileUpload(input) : validateInput(input, input.dataset.regex)
    })
}

const checkForFileUpload = (input) => input.files.length > 0 || localStorage.getItem('image')

// NAVIGATION
let currentTab = 0
const pages = document.getElementsByClassName('tab')

showTab(currentTab)

function showTab(n) {
    pages[n].style.display = 'block'
    document.getElementById("prevBtn").style.visibility = (n === 0) ? 'hidden' : 'visible'
    document.querySelector('.nav__span').innerHTML = `${n+1}/${pages.length}`
    const titles = ['ზოგადი ინფო', 'გამოცდილება', 'განათლება']
    document.querySelector('.survey__title').innerHTML = titles[n]

    if (n === (pages.length - 1)) document.getElementById("nextBtn").innerHTML = 'ᲓᲐᲡᲠᲣᲚᲔᲑᲐ'
}

function nextPrev(n) { 
    if (n === 1 && !validatePage(currentTab == 0 ? inputsFirstPage : Array.from(document.querySelector('.experience').querySelectorAll("input, select, checkbox, textarea")))) { return false }

    pages[currentTab].style.display = "none"
    currentTab += n

    if (currentTab >= pages.length) {
        document.getElementById("nextBtn").type = 'submit'
        return false
    }

    showTab(currentTab)
}

// UPDATE RESUME
const infoColumn = document.getElementById('resume--div').querySelector('.first--col')
const imageColumn = document.getElementById('resume--div').querySelector('.resume--photo')
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
        <p class="resume--about--info">${aboutMeInput.value}</p>
        <hr class="resume--hr">`
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

// const experience = document.querySelector('.resume--experience--col')


function updateExperience(id) {

    let experience = document.getElementById(`experience-resume-${positionCounter}`)

    let pos = document.getElementById(`position-${positionCounter}`)
    let employer = document.getElementById(`employer-${positionCounter}`)
    if(positionCounter == 0) {
        experience.querySelector('.resume--experience').innerHTML = `
        <h2 class="resume--about--header">გამოცდილება</h2>
        <p class='resume--position'>${pos.value} ${employer.value}</p> 
        `
    } else {
        experience.querySelector('.resume--experience').innerHTML = `
        <p class='resume--position'>${pos.value} ${employer.value}</p> 
        `
    }
    
}

function updateDates(id) {
  
    let experience = document.getElementById(`experience-resume-${positionCounter}`)
    let startData = document.getElementById(`start_date-${positionCounter}`)
    let dueData = document.getElementById(`due_date-${positionCounter}`)
    experience.querySelector('.resume--dates').innerHTML = `${startData.value} - ${dueData.value}`
}

function updateDescription(id) {
    let experience = document.getElementById(`experience-resume-${positionCounter}`)

    let descr = document.getElementById(`description-${positionCounter}`)

    experience.querySelector('.resume--description').innerHTML = descr.value + '<hr class="resume--hr">'
}





function updateInstitute() {
    let selectedOption = degreeSelect.options[degreeSelect.selectedIndex]

    education.querySelector('.resume--experience').innerHTML = `
    <h2 class="resume--about--header">ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h2>
    <p class='resume--position'>${instituteInput.value}, ${selectedOption.textContent}</p>
    `
}



function updateDatesEdu() {
    education.querySelector('.resume--dates').innerHTML = dueDateEdu.value
}


function updateDescriptionEdu() {
    education.querySelector('.resume--description').innerHTML = descriptionEdu.value + '<hr class="resume--hr">'
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

async function populateResume(formData) {

    if(localStorage.getItem('image')) imageColumn.innerHTML = `<img src=${localStorage.getItem('image')} class='resume--image'>`

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
            <p class="resume--about--info">${formData.about_me}</p>
            <hr class="resume--hr">`
    }
  
    // if (formData.position || formData.employer) {
    //     experience.querySelector('.resume--experience').innerHTML = `
    //         <h2 class="resume--about--header">გამოცდილება</h2>
    //         <p class='resume--position'>${formData.position}, ${formData.employer}</p>`
    // }

    // if (formData.start_date || formData.due_date) {
    //     experience.querySelector('.resume--dates').innerHTML = `${formData.start_date} - ${formData.due_date}`
    // }

    // if (formData.description) experience.querySelector('.resume--description').innerHTML = formData.description + '<hr class="resume--hr">'

    if (formData.institute || formData.degree) {

        education.querySelector('.resume--experience').innerHTML = `
            <h2 class="resume--about--header">ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h2>
            <p class='resume--position'>${formData.institute}, ${formData.degree}</p>
        `
    }
    if (formData.due_date_edu) education.querySelector('.resume--dates').innerHTML = formData.due_date_edu
    if (formData.description_ed)  education.querySelector('.resume--description').innerHTML = formData.description_ed + '<hr class="resume--hr">'

}

function readFileAsBinaryString(fileInput) {
  return new Promise((resolve, reject) => {
    if (fileInput.files.length > 0) {
      // convert file to binary string
      const reader = new FileReader()
      reader.onload = function() {
        const binaryString = reader.result
        let file = new File([binaryString], 'img.jpeg', {type: 'image/jpeg'})
        resolve(file)
      }
      reader.readAsBinaryString(fileInput.files[0])
    } else {
      reject(new Error('No file selected'))
    }
  })
}


// SUBMITING DATA
async function handleFormSubmit(e) {
    e.preventDefault()
 
    const url = 'https://resume.redberryinternship.ge/api/cvs'
    const localStorageData = JSON.parse(localStorage.getItem('formData'))
    const imageUrl = localStorage.getItem('image')
    const experiences = JSON.parse(localStorage.getItem("experiences"))
    const formatedExperiences = []
    const formData = new FormData()

    // experiences.forEach((experience) => {
    //     const formatedExperience = {
    //       position: experience.position,
    //       employer: experience.employer,
    //       start_date: experience.start_date.replace(/-/g, '/'),
    //       due_date: experience.due_date.replace(/-/g, '/'),
    //       description: experience.description,
    //     }
    //     // formData.append("experiences", JSON.stringify(formatedExperience))
    //     formatedExperiences.push(formatedExperience)
    //   })
  
    experiences.map(el => formatedExperiences.push({
        position: el.position,
        employer: el.employer,
        start_date: el.start_date.replace(/-/g, '/'),
        due_date: el.due_date.replace(/-/g, '/'),
        description: el.description,
    }))
    
    const file = await fetch(imageUrl)
      .then(res => res.blob())


    try {

    formData.append("name", localStorageData.name)
    formData.append("surname", localStorageData.surname)
    formData.append("email", localStorageData.email)
    formData.append("phone_number", localStorageData.phone_number)
    formData.append("about_me", localStorageData.about_me)
    formData.append("image", file)
    formData.append("educations", {
        "position": localStorageData.position,
        "employer": localStorageData.employer,
        "start_date": localStorageData.start_date.split("-").join("/"),
        "due_date": localStorageData.due_date.split("-").join("/"),
        "description": localStorageData.description
    })
      
    formData.append("experiences", JSON.stringify(experiences))

        const response = await fetch(url, {
            method: 'POST',
            headers : {
                'Connection': 'keep-alive',
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
            },
            body: formData
        })
        
        if (!response.ok) {
            const errorMessage = await response.text()

            throw new Error(errorMessage)
        } else {
            console.log('yay u did it')
        }

    } catch (error) {
        console.error(error)
    }

}