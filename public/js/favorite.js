document.querySelector('.range').classList.add('js')
document.querySelector('.time').classList.add('js')


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

const original = document.querySelector('.multirange.original')
const ghost = document.querySelector('.multirange.ghost')



function calculateGradient(min, max) {
    let bottom = 0
    let top = 0
    // if(original.value > ghost.value && this.classList.contains('original')) {
    //     ghost.value = original.value
    //     bottom = original.value
    //     min = original.value
    // } else if (ghost.value < original.value) {
    //     original.value = ghost.value
    //     top = ghost.value
    //     max = ghost.value
    // }


    let width = window.getComputedStyle(slider, null).getPropertyValue('width').split('p')
    width = parseInt(width[0])
    const step = width/40

    if(min && max || bottom !== 0 || top !== 0) {
        let positionLow = original.value * step
        let positionHigh = ghost.value * step

        document.body.style.setProperty(`--low`, positionLow + 'px')
        document.body.style.setProperty(`--high`, positionHigh + 'px')
    } else {
        let toggle;
        if(this.classList.contains('original')) {
            toggle = 'low'
        } else {
            toggle = 'high'
        }

        const value = this.value
        
        let position = value * step
        document.body.style.setProperty(`--${toggle}`, position + 'px')
    }
}

original.addEventListener('input', calculateGradient)
ghost.addEventListener('input', calculateGradient)

calculateGradient(original.value, ghost.value)