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

positionInput.addEventListener('input', () => validateInput(positionInput, positionInput.dataset.regex))
positionInput.addEventListener('input', updateExperience)

employerInput.addEventListener('input', () => validateInput(employerInput, employerInput.dataset.regex))
employerInput.addEventListener('input', updateExperience)

startDate.addEventListener('input', () => validateInput(startDate, startDate.dataset.regex))
startDate.addEventListener('input', updateDates)

dueDate.addEventListener('input', () => validateInput(dueDate, dueDate.dataset.regex))
dueDate.addEventListener('input', updateDates)

description.addEventListener('input', () => validateInput(description, description.dataset.regex))
description.addEventListener('input', updateDescription)

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

async function saveFile(e) {
    const image = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.addEventListener('load', () => {
        localStorage.setItem('image', reader.result)
    })
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
    } else {
        input.classList.add('invalid')
        input.classList.remove('valid')
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
    if (n === 1 && !validatePage(currentTab == 0 ? inputsFirstPage : inputsSecPage)) { return false }

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
    experience.querySelector('.resume--description').innerHTML = description.value + '<hr class="resume--hr">'
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
  
    if (formData.position || formData.employer) {
        experience.querySelector('.resume--experience').innerHTML = `
            <h2 class="resume--about--header">გამოცდილება</h2>
            <p class='resume--position'>${formData.position}, ${formData.employer}</p>`
    }

    if (formData.start_date || formData.due_date) {
        experience.querySelector('.resume--dates').innerHTML = `${formData.start_date} - ${formData.due_date}`
    }

    if (formData.description) experience.querySelector('.resume--description').innerHTML = formData.description + '<hr class="resume--hr">'

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
 

    // const url = form.action
    const url = 'https://resume.redberryinternship.ge/api/cvs'
    const localStorageData = JSON.parse(localStorage.getItem('formData'))
    const imageUrl = localStorage.getItem('image')
    // let base64Img = imageUrl.replace('data:', '').replace(/^.+,/, '')
    // console.log({base64Img})
    // let img = await readFileAsBinaryString(fileInput)
    const file = await fetch(imageUrl)
      .then(res => res.blob())

    // let strArr = `{
    //     "position": "${localStorageData.position}",
    //     "employer": "${localStorageData.employer}",
    //     "start_date": "${localStorageData.start_date.split("-").join("/")}",
    //     "due_date": "${localStorageData.due_date.split("-").join("/")}",
    //     "description": "${localStorageData.description}"
    //   }`
      let arr = [
        {
          "position": "back-end developer",
          "employer": "Redberry",
          "start_date": "2019/09/09",
          "due_date": "2020/09/23",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc dui, a pellentesque magna blandit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis diam nisi, at venenatis dolor aliquet vel. Pellentesque aliquet leo nec tortor pharetra, ac consectetur orci bibendum."
        }
      ]
      if (!Array.isArray(arr)) {
        console.error('The experiences must be an array, but it is not.');
      } else if(Array.isArray(arr)) {
        console.info('is array')
      }
      
    //   if (!Array.isArray(educations)) {
    //     console.error('The educations must be an array, but it is not.');
    //   }
      
    const formData = new FormData();

    formData.append("name", localStorageData.name);
    formData.append("surname", localStorageData.surname);
    formData.append("email", localStorageData.email);
    formData.append("phone_number", localStorageData.phone_number);
    formData.append("experiences", 
    [
        {
          "position": "back-end developer",
          "employer": "Redberry",
          "start_date": "2019/09/09",
          "due_date": "2020/09/23",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc dui, a pellentesque magna blandit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis diam nisi, at venenatis dolor aliquet vel. Pellentesque aliquet leo nec tortor pharetra, ac consectetur orci bibendum."
        }
      ],
    );
    formData.append("educations", [{
      "institute": localStorageData.institute,
      "degree_id": localStorageData.degree,
      "due_date": localStorageData.due_date_edu.split("-").join("/"),
      "description": localStorageData.description_ed
    }]);
    formData.append("about_me", localStorageData.about_me);
    formData.append("image", file);


    try {
        console.log(typeof formData.get("experiences"));
        const response = await fetch(url, {
            method: 'POST',
            headers : {
                                'Connection': 'keep-alive',
                                'Accept': 'application/json',

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

