function goToGeneralInfo() {
    location.href = './survey.html'
}

function goToLanding() {
    location.href = './index.html'
    localStorage.clear()
}


const nameInput = document.getElementById('name')
const surnameInput = document.getElementById('surname')
const fileInput = document.getElementById('file-upload')
const aboutMeInput = document.getElementById('about_me')
const emailInput = document.getElementById('email')
const numberInput = document.getElementById('phone_number')

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

// fileInput.addEventListener('change', () => checkForFileUpload(fileInput))
fileInput.addEventListener('change', updateResumeImg)

function validateFirstPage() {
    let isFormValid = true

    let inputs = [nameInput, surnameInput, aboutMeInput, emailInput, numberInput, fileInput]
  
    inputs.forEach(input => {
        console.log(input, input.dataset.regex);
        if (input.type === 'file') {
            isFormValid = isFormValid && checkForFileUpload(input)
        } else {
            isFormValid = isFormValid && validateInput(input, input.dataset.regex)
        }
    });
    
    return isFormValid
}
  
// NAVIGATION
let currentTab = 0;
const pages = document.getElementsByClassName('tab')

showTab(currentTab)

function showTab(n) {
    pages[n].style.display = 'block'
    document.getElementById("prevBtn").style.visibility = (n === 0) ? 'hidden' : 'visible'

    if (n === (pages.length - 1)) {
        document.getElementById("nextBtn").innerHTML = 'ᲓᲐᲡᲠᲣᲚᲔᲑᲐ'
        document.getElementById("nextBtn").type = 'submit'
    }
}


function nextPrev(n) {
    if (n === 1 && !validateFirstPage()) return false
    
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

function updateName() {
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


function updateResumeImg() {
    const file = this.files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function() {
      const img = new Image();
      img.src = reader.result;

      imageColumn.innerHTML = `<img src=${reader.result} class='resume--image'>`
    });
  
    reader.readAsDataURL(file);
}
