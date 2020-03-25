document.querySelector('.radio').classList.add('js')
document.querySelector('.range').classList.add('js')
let prev = null

document.querySelectorAll('.radio input').forEach(input => {
    input.checked ? input.parentNode.classList.add('checked') : null
    input.addEventListener('change', function() {
        input.parentNode.classList.add('checked') 
        prev ? prev.parentNode.classList.remove('checked')  : document.querySelector('.checked').classList.remove('checked')
        prev = input
    })
});

const slider = document.querySelector('.range input')
const value = document.querySelector('.slider-wrapper .value')

// value.textContent = slider.value
// const width = window.getComputedStyle(slider, null).getPropertyValue('width').split('p')
// const step = (width[0] - 37 )/10

// let offsetLeft = (parseInt(slider.value)*step) + 'px'
// document.body.style.setProperty('--offsetLeft', offsetLeft)

slider.addEventListener('input', () => {
    // offsetLeft = (parseInt(slider.value)*step) + value.offsetWidth  + 'px'
    calculateLeft()
})

function calculateLeft() {
    let offsetLeft;
    value.textContent = slider.value
    if(slider.value == 1) {
        offsetLeft = '2.5%'
    } else if(slider.value == 2) {
        offsetLeft = '12.5%'
    }else if(slider.value == 3) {
        offsetLeft = '23%'
    }else if(slider.value == 4) {
        offsetLeft = '33%'
    }else if(slider.value == 5) {
        offsetLeft = '43.5%'
    }else if(slider.value == 6) {
        offsetLeft = '54%'
    }else if(slider.value == 7) {
        offsetLeft = '64.5%'
    }else if(slider.value == 8) {
        offsetLeft = '74.5%'
    }else if(slider.value == 9) {
        offsetLeft = '85%'
    }else if(slider.value == 10) {
        offsetLeft = '94.5%'
    }
    document.body.style.setProperty('--offsetLeft', offsetLeft)
}

calculateLeft()