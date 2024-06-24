
request = new XMLHttpRequest()
console.log("loaded")
request.open("GET", "http://localhost:3000/login?username=mrkkeagile@gmail.com&password=pass", )
request.setRequestHeader("access-control-allow-origin", "http://localhost:5173/")
request.setRequestHeader('Set-Cookie', "http://localhost:5173/")
request.send()
request.onload =()=>{
    console.log(request.response);
    console.log(request.getResponseHeader('Set-Cookie'));
    request.open('GET', "http://localhost:3000/")
    request.setRequestHeader("access-control-allow-origin", "http://localhost:5173/")
    request.setRequestHeader('Set-Cookie', "http://localhost:5173/")
    request.send()
    request.onload = ()=>{
        
    }
}
