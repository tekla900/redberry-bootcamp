function goToGeneralInfo() {
    location.href = './survey.html'
}

function goToLanding() {
    location.href = './index.html'
    localStorage.clear()
}

const allInputs = document.getElementsByTagName('input')

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
    console.log(input.files.length);
    return input.files.length > 0;
}

nameInput.addEventListener('blur', () => validateInput(nameInput, /^[ა-ჰ]{2,}$/))
surnameInput.addEventListener('blur', () => validateInput(surnameInput, /^[ა-ჰ]{2,}$/))
aboutMeInput.addEventListener('blur',  () => validateInput(aboutMeInput, /.*/))
emailInput.addEventListener('blur',  () => validateInput(emailInput, /^.*@redberry\.ge$/))
numberInput.addEventListener('blur',  () => validateInput(numberInput, /^(\+995\s?)?\d{3}\s?\d{3}\s?\d{3}$/))
fileInput.addEventListener('change', () => checkForFileUpload(fileInput))

function validateFirstPage() {
    let isFormValid = true;
    
    let inputs = [nameInput, surnameInput, aboutMeInput, emailInput, numberInput, fileInput];
  
    inputs.forEach(input => {
      if (input.type === 'file') {
        if (!checkForFileUpload(input)) {
          isFormValid = false;
        }
      } else {
        if (!validateInput(input, input.dataset.regex)) {
          isFormValid = false;
        }
      }
    });
    
    console.log({isFormValid});
    return isFormValid;
}
  
// NAVIGATION
// let currentTab = 0;

// // showTab(currentTab);
// let pages = document.getElementsByClassName('tab')

// function showTab(n) {
//     pages[n].style.display = 'block'

//     if (n === 0) {
//         document.getElementById("prevBtn").style.visibility = 'hidden';
//     } else {
//         document.getElementById("prevBtn").style.display = 'visible';
//     }

//     if(n === (pages.length - 1)) {
//         document.getElementById("nextBtn").innerHTML = 'ᲓᲐᲡᲠᲣᲚᲔᲑᲐ';
//         document.getElementById("nextBtn").type = 'submit'
//     }
// }

// function nextPrev(n) {
//     if (n == 1 && !validateForm()) return false;
 
//     pages[currentTab].style.display = "none";
//     currentTab = currentTab + n;

//     if (currentTab >= pages.length) {
//         document.getElementById("survey__form").submit();
//         return false;
//     }

//     showTab(currentTab);
// }



