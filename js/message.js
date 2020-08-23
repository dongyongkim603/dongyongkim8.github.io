document.querySelector('#submit1').addEventListener('click', function () {
    let ul1 = document.getElementById('response1');
    let ul2 = document.getElementById('response2');

    let nMessage = document.createElement('p');
    let nMessage2 = document.createElement('p');


    nMessage.textContent = document.getElementById("name1").value + ": " + document.getElementById("msg1").value;
    nMessage2.textContent = document.getElementById("name1").value + ": " + document.getElementById("msg1").value;

    ul1.appendChild(nMessage);
    ul2.appendChild(nMessage2);


});


const button2 = document.querySelector('#button2');

document.querySelector('#submit2').addEventListener('click', function () {
    let ul1 = document.getElementById('response1');
    let ul2 = document.getElementById('response2');

    let nMessage = document.createElement('p');
    let nMessage2 = document.createElement('p');



    nMessage.textContent = document.getElementById("name2").value + ": " + document.getElementById("msg2").value;
    nMessage2.textContent = document.getElementById("name2").value + ": " + document.getElementById("msg2").value;

    ul1.appendChild(nMessage);
    ul2.appendChild(nMessage2);

});