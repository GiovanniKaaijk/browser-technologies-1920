$('button[type="submit"').on('click', addUser);

let hash;
const pageShrimper = document.querySelector('.page-shrimper')
let shrimpToggle = true

function addUser(event) {
    event.preventDefault();
    console.log('ajax call')
    let url = this.dataset.href;
    hash = this.dataset.hash
    
    let postUrl,
        data = {},
        type;

    if(url === '/userData') {
        postUrl = '/startEnquete'
        type = ''
    } else if (url === '/minorData') {
        postUrl = '/register-user-data'
        type = 'userdata'
    } else if (url === '/minorData-2') {
        postUrl = '/register-minor-data'
        type = 'minordata'
    }

    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if(input.type !== 'checkbox' && input.type !== 'radio') {
            data[input.name] = input.value
        } else if(input.checked) {
            data[input.name] = input.value
        }
        
    })

    console.log(data)
    pageShrimper.classList.add('animation')
    checkShrimpTime()
    $.ajax(postUrl, {
        type: 'POST',
        data: {
            'hash': hash,
            'data': data,
            'type': type
        }
    }).done(function(res) {
        console.log(res)
        fetch(window.location.protocol + "//" + window.location.host + url)
            .then(res => res.text())
            .then(res => {
                console.log(window.location.protocol + "//" + window.location.host + url)
                let newPageHtml = res.split('<main>')
                newPageHtml = newPageHtml[1].split('</main>')
                newPageHtml = newPageHtml[0]
                // location.href = window.location.protocol + "//" + window.location.host + url
                $('main').html(newPageHtml)
                stopShrimpTime()
                
                
                $('button[type="submit"').on('click', addUser);
            })
    })
};

let timer = 0;
let interval;

function checkShrimpTime() {
    timer = 0;
    interval = setInterval(() => {
        timer += 1
        if(timer > 1) {
            document.querySelector('.icon-popup').classList.add('show')
        }
    }, 1000);
}

function stopShrimpTime() {
    clearInterval(interval)
    if(timer > 1) {
        document.querySelector('.icon-popup').classList.remove('show')
        setTimeout(() => {
            pageShrimper.classList.remove('animation')
        }, 300);
       
    } else {
        pageShrimper.classList.remove('animation')
    }
    
}