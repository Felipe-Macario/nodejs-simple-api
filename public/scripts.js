const ul = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector('form');

load();

async function load() {
    const res = await fetch("http://localhost:3000/").then((data) => data.json());
    
    res.urls.map(({name, url}) => addElement({name, url}));
}

function saveUrl(name, url){
    fetch(`http://localhost:3000/create?name=${ name }&url=${ url }`);
}

function deleteUrl(url){
    fetch(`http://localhost:3000/delete?url=${ url }`);
}

function addElement({ name, url }) {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const trash = document.createElement("span");

    a.href = url;
    a.innerHTML = name;
    a.target = "_blank";

    trash.innerHTML = "x";
    trash.onclick = () => removeElement(a);

    li.append(a);
    li.append(trash);
    ul.append(li);
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')){
        deleteUrl(el.href);
        el.parentNode.remove();
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) 
        return alert('Preencha o campo');

    const [name, url] = value.split(",").map(item => item.trim());

    if (!url)
        return alert('formate o texto da maneira correta');

    if (!/^https?:\/\//.test(url))
        return alert("Digite a url da maneira correta");

    addElement({ name, url });
    saveUrl(name, url);

    input.value = "";
})