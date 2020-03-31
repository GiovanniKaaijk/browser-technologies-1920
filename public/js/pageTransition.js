document.querySelector('button[type="submit"').addEventListener('click', addUser);

let hash;
const pageShrimper = document.querySelector('.page-shrimper')
const smallShrimper = document.querySelector('.small-shrimper')
const icon = document.querySelector('.icon-popup')

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
    } else if (url === '/favorite') {
        postUrl = '/register-minor-data'
        type = 'minordata'
    } else if (url === '/finish') {
        postUrl = '/register-favorite-data'
        type = 'favoritedata'
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
    let jsonData = JSON.stringify({
        data: data,
        hash: hash,
        type: type,
        javascript: true
    })
    console.log(jsonData)
    fetch(postUrl, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonData
    }).then((res) => {
      if(res.status === 200) {
        console.log(res)
        fetch(window.location.protocol + "//" + window.location.host + url)
            .then(res => res.text())
            .then(res => {
                console.log(window.location.protocol + "//" + window.location.host + url)
                console.log(res)
                let newPageHtml = res.split('<main>')
                newPageHtml = newPageHtml[1].split('</main>')
                newPageHtml = newPageHtml[0]
                // location.href = window.location.protocol + "//" + window.location.host + url
                document.querySelector('main').innerHTML = newPageHtml
                stopShrimpTime()
                
                
                document.querySelector('button[type="submit"').addEventListener('click', addUser);

                nodeScriptReplace(document.querySelector("main"));
            })
      }
    }).catch((err) => {
      console.log(err)
    })

};

let timer = 0;
let interval;

function checkShrimpTime() {
    timer = 0;
    interval = setInterval(() => {
        timer += 1
        if(timer > 5) {
            smallShrimper.classList.add('show')
        }
        if(timer > 10) {
            icon.classList.add('show')
        }
    }, 100);
}

function stopShrimpTime() {
    clearInterval(interval)
    if(timer > 5 && timer < 10) {
        smallShrimper.classList.remove('show')
        setTimeout(() => {
            pageShrimper.classList.remove('animation')
        }, 300);
       
    } else if(timer > 10) {
        icon.classList.remove('show')
        setTimeout(() => {
            smallShrimper.classList.remove('show')
        }, 300);
        setTimeout(() => {
            pageShrimper.classList.remove('animation')
        }, 600);
    } else {
        pageShrimper.classList.remove('animation')
    }
    
}

function nodeScriptReplace(node) {
    if ( nodeScriptIs(node) === true ) {
            node.parentNode.replaceChild( nodeScriptClone(node) , node );
    }
    else {
            var i        = 0;
            var children = node.childNodes;
            while ( i < children.length ) {
                    nodeScriptReplace( children[i++] );
            }
    }

    return node;
}
function nodeScriptIs(node) {
    return node.tagName === 'SCRIPT';
}
function nodeScriptClone(node){
    var script  = document.createElement("script");
    script.text = node.innerHTML;
    for( var i = node.attributes.length-1; i >= 0; i-- ) {
            script.setAttribute( node.attributes[i].name, node.attributes[i].value );
    }
    return script;
}