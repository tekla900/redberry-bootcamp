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

const inputsFirstPage = [nameInput, surnameInput, aboutMeInput, emailInput, numberInput, fileInput]
const inputsSecPage = document.querySelector('.experience').querySelectorAll("input, select, checkbox, textarea")
const inputsThirdPage = document.querySelector('.education').querySelectorAll("input, select, checkbox, textarea")

const form = document.querySelector('form')
const formElements = form.elements



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



// VALIDATION
function validateInput(input, regex) {

    if(input.tagName == 'SELECT') {
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

    const isValid = input.type === 'date' ? input.value !== "" :
                                            input.value.match(regex) !== null

    input.classList.toggle('valid', isValid)
    input.classList.toggle('invalid', !isValid)
    input.nextElementSibling.style.display = isValid ? 'inline' : 'none'
    input.nextElementSibling.nextElementSibling.style.display = isValid ? 'none' : 'inline'

    return isValid
}

  
function validatePage(inputs) {
    return inputs.every(input => input.type === 'file' ? checkForFileUpload(input) : validateInput(input, input.dataset.regex))
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
    if (n === 1) {
        const inputsToValidate = currentTab === 0
          ? inputsFirstPage
          : currentTab === 1
            ? Array.from(document.querySelector('.experience').querySelectorAll("input, select, checkbox, textarea"))
            : Array.from(document.querySelector('.education').querySelectorAll("input, select, checkbox, textarea"))
      
        if (!validatePage(inputsToValidate)) {
          return false
        }
    }
        
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

function updateInstitute() {
    let selectedOption = degreeSelect.options[degreeSelect.selectedIndex]
    education.querySelector('.resume--experience').innerHTML = `
    <h2 class="resume--about--header">ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h2>
    <p class='resume--position'>${instituteInput.value}, ${selectedOption.dataset.title}</p>
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
    const formData = JSON.parse(localStorage.getItem('formData'))
    // const experiences = JSON.parse(localStorage.getItem('experiences'))
    // const educations = JSON.parse(localStorage.getItem('educations'))

    if (formData) {
        populateForm(formData)
        populateResume(formData)
    }
    // if (experiences) {
    //     populateExpResume(experiences)
    // }
    // if (educations) {
    //     populateEduResume(educations)
    // }
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
            if((element.tagName === 'SELECT')) {
                const selectedOption = element.querySelector(`option[value="${formData[key]}"]`)
                if (selectedOption) {
                  selectedOption.selected = true
                }
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


const addExperienceBtn = document.getElementById("add--experience")
const addEducationBtn = document.getElementById("add--education")
let experienceCount = 1
let eduCount = 1

addEducationBtn.addEventListener('click', function() {
    const educationDiv = document.createElement("div")

    educationDiv.innerHTML = `
    <div class="input--group ">
        <label class="input-group__label" for="institute-${eduCount}">სასწავლებელი</label>
        <div class="position--div">
            <input class="input-group__input" type="text" name="institute" id="institute-${eduCount}" placeholder="თანამდებობა" data-regex="^.{2,}$"
            oninput="updateEdu(this.id); saveToLocalStorage(this.id); validateInput(this, this.getAttribute('data-regex'))">
            <i class="fas fa-check-circle validation--icons outside"></i>
            <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
        </div>
        <span class="input-group__span">მინიმუმ 2 სიმბოლო</span>
    </div>

    <div class="input-groups__selects">
        <div class="input--group">
            <label for="degree-${eduCount}">ხარისხი</label>
            <div class="position--div">
                <select name="degree" id="degree-${eduCount}" oninput="updateEdu(this.id); saveToLocalStorage(this.id); validateInput(this, this.getAttribute('data-regex'))">
                    <option value="0" disabled>აირჩიეთ ხარისხი</option>
                </select>                           
                <i class="fas fa-check-circle validation--icons outside"></i>
                <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
            </div>     
        </div>
        
        <div class="input--group">
            <label for="due_date_edu-${eduCount}">დამთავრების რიცხვი</label>
            <div class="position--div">
                <input type="date" id="due_date_edu-${eduCount}" name="due_date_edu" value="mm/dd/yyyy" min="1900-01-01"
                oninput="updateEduDates(this.id); saveToLocalStorage(this.id); validateInput(this, this.getAttribute('data-regex'))">                        
                <i class="fas fa-check-circle validation--icons outside"></i>
                <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
            </div>
        </div>    
    </div>

    <div class="input--group">
        <label class="input-group__label" for="description_edu-${eduCount}">აღწერა</label>
        <div class="position--div">
            <textarea name="description_ed" id="description_edu-${eduCount}" placeholder="როლი თანამდებობაზე და ზოგადი აღწერა" data-regex="^.+$"
            oninput="updateEduDescription(this.id); saveToLocalStorage(this.id); validateInput(this, this.getAttribute('data-regex'))"></textarea>                       
            <i class="fas fa-check-circle validation--icons outside"></i>
            <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
        </div>
    </div>

    <hr>
    `
    fetchDegrees(eduCount)
    const resume = `
    <div class="resume--education--col" id="education-resume-${eduCount}">
        <div class="resume--experience" id="edu-headers-${eduCount}"></div>
        <p class="resume--dates" id="edu-dates-${eduCount}"></p>
        <p class="resume--description" id="education-desc-${eduCount}"></p>
    </div>
    `

    document.querySelector('.third-page').innerHTML += resume

    document.querySelector('.education').insertBefore(educationDiv, addEducationBtn)

    eduCount++
})

addExperienceBtn.addEventListener("click", function() {
  
    const positionDiv = document.createElement("div")

    positionDiv.innerHTML = `
        <div class="input--group ">
            <label class="input-group__label" for="position-${experienceCount}">თანამდებობა</label>
            <div class="position--div">
                <input class="input-group__input" type="text" name="position" id="position-${experienceCount}" placeholder="თანამდებობა" data-regex="^.{2,}$"
                oninput="updateExperience(this.id); saveToLocalStorage(this.id); validateInput(this, this.getAttribute('data-regex'))">
                <i class="fas fa-check-circle validation--icons outside"></i>
                <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
            </div>
            <span class="input-group__span">მინიმუმ 2 სიმბოლო</span>
        </div>

        <div class="input--group employer">
            <label class="input-group__label" for="employer-${experienceCount}">დამსაქმებელი</label>
            <div class="position--div">
                <input class="input-group__input" type="text" name="employer" id="employer-${experienceCount}" placeholder="დამსაქმებელი" data-regex="^.{2,}$"
                oninput="updateExperience(this.id); saveToLocalStorage(this.id); validateInput(this, this.getAttribute('data-regex'))" >
                <i class="fas fa-check-circle validation--icons outside"></i>
                <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
            </div>
            <span class="input-group__span">მინიმუმ 2 სიმბოლო</span>
        </div>

        <div class="input-groups__names">
            <div class="input--group">
                <label for="start_date-${experienceCount}">დაწყების რიცხვი</label>
                <div class="position--div">
                    <input type="date" id="start_date-${experienceCount}" name="start_date" value="mm/dd/yyyy" min="1900-01-01" 
                    oninput="saveToLocalStorage(this.id); updateDates(this.id); validateInput(this, this.getAttribute('data-regex'))">
                    <i class="fas fa-check-circle validation--icons outside"></i>
                    <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
                </div>
                
            </div>
            
            <div class="input--group">
                <label for="due_date-${experienceCount}">დამთავრების რიცხვი</label> 
                <div class="position--div">
                    <input type="date" id="due_date-${experienceCount}" name="due_date" value="mm/dd/yyyy" min="1900-01-01" 
                    oninput="saveToLocalStorage(this.id); updateDates(this.id); validateInput(this, this.getAttribute('data-regex'))" >
                    <i class="fas fa-check-circle validation--icons outside"></i>
                    <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
                </div>
            </div>
        </div>

        <div class="input--group experience--info">
            <label class="input-group__label" for="description-${experienceCount}">აღწერა</label>
            <div class="position--div">
                <textarea name="description" id="description-${experienceCount}" placeholder="როლი თანამდებობაზე და ზოგადი აღწერა" data-regex="^.+$"
                oninput="saveToLocalStorage(this.id); updateDescription(this.id); validateInput(this, this.getAttribute('data-regex'))" ></textarea>
                <i class="fas fa-check-circle validation--icons outside"></i>
                <i class="fa-solid fa-triangle-exclamation validation--icons outside"></i>
            </div>
        </div>

        <hr>
    `
    
    const resume = `
        <div class="resume--experience--col" id="experience-resume-${experienceCount}">
            <div class="resume--experience">
                <h2 class="resume--about--header" id="resume--header-${experienceCount}"></h2>
                <p class='resume--position' id="resume--position-${experienceCount}"></p>
                <span class='resume--position' id="resume--employer-${experienceCount}"></span>
            </div>

            <p class="resume--dates" id="resume-start-date-${experienceCount}"></p>
            <span class="resume--dates" id="resume-due-date-${experienceCount}"></span>

            <p class="resume--description" id="resume-description-${experienceCount}"></p>
        </div>
    `
    document.querySelector('.sec-page-0').innerHTML += resume

    document.querySelector('.experience').insertBefore(positionDiv, addExperienceBtn)

    experienceCount++
})


function updateExperience(id) {   
    const experience = document.getElementById(`experience-resume-${id.slice(-1)}`)
    const pos = document.getElementById(`position-${id.slice(-1)}`).value
    const employer = document.getElementById(`employer-${id.slice(-1)}`).value
    const positionElement = `<p class='resume--position'>${pos}, ${employer}</p>`
    const content = id.slice(-1) == 0
        ? `<h2 class="resume--about--header">გამოცდილება</h2>${positionElement}`
        : positionElement

    experience.querySelector('.resume--experience').innerHTML = content
}

function updateEdu(id) {
    let select = document.getElementById(`degree-${id.slice(-1)}`)
    // fetchDegrees(id.slice(-1))
    const education = document.getElementById(`education-resume-${id.slice(-1)}`)
    const institute = document.getElementById(`institute-${id.slice(-1)}`).value
    const degree = select.options[select.selectedIndex].text

    const educationElement = `<p class='resume--position'>${institute}, ${degree}</p>`
    const content = id.slice(-1) == 0
    ? `<h2 class="resume--about--header">განათლება</h2>${educationElement}`
    : educationElement

    education.querySelector('.resume--experience').innerHTML = content
}

function updateDates(id) {
    const start = document.getElementById(`start_date-${id.slice(-1)}`).value
    const due = document.getElementById(`due_date-${id.slice(-1)}`).value
    
    document.getElementById(`resume-start-date-${id.slice(-1)}`).innerHTML = `${start} - ${due}`
}

function updateEduDates (id) {
    const due = document.getElementById(`due_date_edu-${id.slice(-1)}`).value
    document.getElementById(`edu-dates-${id.slice(-1)}`).innerHTML = due
}

function updateDescription(id) {
    const desc = document.getElementById(`description-${id.slice(-1)}`).value
    document.getElementById(`resume-description-${id.slice(-1)}`).innerHTML = desc
}

function updateEduDescription(id) {
    const desc = document.getElementById(`description_edu-${id.slice(-1)}`).value
    document.getElementById(`education-desc-${id.slice(-1)}`).innerHTML = desc
}

const saveToLocalStorage = id => localStorage.setItem(id, document.getElementById(id).value)

function saveExpAndEduData() {
    const experiences = []
    const educations = []
    
    const keys = Object.keys(localStorage).filter(key => key.startsWith('position-')).sort((a, b) => {
      const aNum = parseInt(a.replace('position-', ''))
      const bNum = parseInt(b.replace('position-', ''))
      return aNum - bNum
    })
    
    const eduKeys = Object.keys(localStorage).filter(key => key.startsWith('institute-')).sort((a, b) => {
        const aNum = parseInt(a.replace('institute-', ''))
        const bNum = parseInt(b.replace('institute-', ''))
        return aNum - bNum
    })

    for (const key of keys) {
        const number = key.replace('position-', '')
        const position = localStorage.getItem(key)
        const employer = localStorage.getItem(`employer-${number}`)
        const start_date = localStorage.getItem(`start_date-${number}`).replace(/-/g, '/')
        const due_date = localStorage.getItem(`due_date-${number}`).replace(/-/g, '/')
        const description = localStorage.getItem(`description-${number}`)
        experiences.push({ position, employer, start_date, due_date, description })
    }
    
    for (const key of eduKeys) {
        const number = key.replace('institute-', '')
        const institute = localStorage.getItem(key)
        const degree_id = localStorage.getItem(`degree-${number}`)
        const due_date = localStorage.getItem(`due_date-${number}`).replace(/-/g, '/')
        const description = localStorage.getItem(`description-${number}`)
        educations.push({ institute, degree_id, due_date, description })
    }

    localStorage.setItem('experiences', JSON.stringify(experiences))
    localStorage.setItem('educations', JSON.stringify(educations))

}



  

// function populateExpResume(experiences) {
//     let isFirstExp = true

//     for(let i = 0; i < experiences.length; i++) {
//         const resume = `
//         <div class="resume--experience--col" id="experience-resume-${i}">
//             <div class="resume--experience">
//                 ${isFirstExp ?  `<h2 class="resume--about--header" id="resume--header-${i}">გამოცდილება</h2>` : ''}
//                 <p class='resume--position' id="resume--position-${i}">${experiences[i]['position']}, ${experiences[i]['employer']}</p>
//             </div>

//             <p class="resume--dates" id="resume-start-date-${i}">${experiences[i]['start_date'] + ', ' + experiences[i]['due_date']}</p>

//             <p class="resume--description" id="resume-description-${i}">${experiences[i]['description']}</p>
        
//             <hr>
//         </div>
//     `
//     document.querySelector('.sec-page-0').innerHTML += resume
//     }
// }
 
// function populateEduResume(educations) {
//     let isFirstExp = true

//     for(let i = 0; i < educations.length; i++) {
//         const resume = `
//         <div class="resume--experience--col" id="education-resume-${i}">
//             <div class="resume--experience" id="edu-headers-${i}">
//                 ${isFirstExp ?  `<h2 class="resume--about--header" id="resume--header-${i}">გამოცდილება</h2>` : ''}
//                 <p class='resume--position'>${educations[i]['institute']}, ${educations[i]['degree']}</p>
//             </div>
//             <p class="resume--dates" id="edu-dates-${i}">${educations[i]['due_date']}</p>

//             <p class="resume--description" id="education-desc-${i}">${educations[i]['description']}</p>
       
//         </div>
//     `
//     document.querySelector('.third-page').innerHTML += resume
//     }
// }

// FETCHING DATA FOR DEGREES
function fetchDegrees(id) {
    fetch('https://resume.redberryinternship.ge/api/degrees')
    .then(res => res.json())
    .then(res => {
        let degreeSelect = document.getElementById(`degree-${id}`)
        res.forEach(el => {
            const option = document.createElement('option')
            option.value = el.id
            option.text = el.title
            option.dataset.title = el.title
            degreeSelect.appendChild(option)
        })
    })
   
}
fetchDegrees(0)


// SUBMITING DATA
async function handleFormSubmit(e) {
  
    e.preventDefault()
    saveExpAndEduData()
    const url = 'https://resume.redberryinternship.ge/api/cvs'
    const localStorageData = JSON.parse(localStorage.getItem('formData'))
    const imageUrl = localStorage.getItem('image')
    const experiences = JSON.parse(localStorage.getItem("experiences"))
    const educations = JSON.parse(localStorage.getItem("educations"))
    const formData = new FormData()

    for(let i in experiences) {
        formData.append(`experiences[${i}][position]`, experiences[i].position.toString())
        formData.append(`experiences[${i}][employer]`, experiences[i].employer.toString())
        formData.append(`experiences[${i}][start_date]`, experiences[i].start_date.toString())
        formData.append(`experiences[${i}][due_date]`, experiences[i].due_date.toString())
        formData.append(`experiences[${i}][description]`, experiences[i].description.toString())
    }

    for(let i in educations) {
        formData.append(`educations[${i}][institute]`, educations[i].institute.toString())
        formData.append(`educations[${i}][degree_id]`, educations[i].degree_id.toString())
        formData.append(`educations[${i}][due_date]`, educations[i].due_date.toString())
        formData.append(`educations[${i}][description]`, educations[i].description.toString())
    }

    const file = await fetch(imageUrl).then(res => res.blob())

    formData.append("name", localStorageData.name)
    formData.append("surname", localStorageData.surname)
    formData.append("email", localStorageData.email)
    formData.append("phone_number", localStorageData.phone_number.replace(/\s/g, ""))
    formData.append("about_me", localStorageData.about_me)
    formData.append("image", file)
    
    try {
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
            const responseBody = await response.json()
            showCompletedResume(responseBody)
            localStorage.clear()
        }

    } catch (error) {
        console.error(error)
    }
}

function showCompletedResume(response) {
    document.querySelector('body').innerHTML= `
        <div class="nav__button--secondary" onclick="goToLanding()">
            <i class="fa-solid fa-angle-left fa-lg"></i>
        </div>

        <section class="completed--resume">
            <div class="resume" id="resume--div">
                <div class="first-div">
                    <div class="first-page">
                        <div class="first--col">
                            <h1 class="resume--fullname">${response.name} ${response.surname}</h1>
                            <div class="resume--contact">
                                <div><i class="fa-solid fa-at"></i> <p class="resume--contact--info">${response.email}</p></div>
                                <div><i class="fa-solid fa-phone"></i> <p class="resume--contact--info">${response.phone_number}</p></div>
                            </div>
                
                            <div class="resume--about">
                                <h2 class="resume--about--header">ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h2>
                                <p class="resume--about--info">${response.about_me}</p>
                                <hr class="resume--hr">
                            </div>
                        </div>
                    </div>

                    <div class="sec-page-0"></div>
                    <div class="third-page"></div>
                </div>
        
                <div class="resume--photo">
                    <img src="https://resume.redberryinternship.ge/${response.image}" class='resume--image'>
                </div>
            </div>
            <img class="logo--small" src="./src/images/redberry-logo-small.png">  
        </section>

        <section class="pop-up">
            <span id="close-popup" onclick="closePopUp()">x</span>
            <div>
                <h2>რეზიუმე წარმატებით გაიგზავნა &#127881;</h2>
            </div>
        </section>
    `

    const experienceArr = response.experiences
    const expDiv = document.querySelector('.sec-page-0')
    let isFirstExp = true

    const educationArr = response.educations
    const eduDiv = document.querySelector('.third-page')
    let isFirstEdu = true

    experienceArr.forEach(el => {
        const elDiv = ` 
            <div class="resume--experience--col" >
                <div class="resume--experience">
                    ${isFirstExp ? '<h2 class="resume--about--header">გამოცდილება</h2>' : ''}
                    <p class='resume--position'>${el.position}, </p>
                    <span class='resume--position'>${el.employer}</span>
                </div>
                <p class="resume--dates">${el.start_date} - ${el.due_date}</p>
                <p class="resume--description" id="resume-description-0">${el.description}</p>
            </div>
`
        isFirstExp = false
        expDiv.innerHTML += elDiv 
    })

    expDiv.innerHTML += '<hr class="resume--hr">'

    educationArr.forEach(el => {
        const elDiv = `
        <div class="resume--education--col" id="education-resume-0">
            <div class="resume--experience">
                ${isFirstEdu ? '<h2 class="resume--about--header">ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h2>' : ''}
                <p class='resume--position'>${el.institute}, ${el.degree}</p>
            </div>
            <p class="resume--dates">${el.due_date}</p>
            <p class="resume--description">${el.description}</p>
        </div>
        `

        isFirstEdu = false
        eduDiv.innerHTML += elDiv
    })

    eduDiv.innerHTML += '<hr class="resume--hr">'
}

function closePopUp() {
    document.querySelector('.pop-up').style.display = 'none'
}