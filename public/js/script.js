function clear() {
    document.getElementById('task_desc').innerText = "";
}

function edit(id){
    let e = document.getElementById(id);
    console.log(e);
    e.classList.toggle('hidden');
}

