const url = "http://localhost:5678/api/works"
const container = document.getElementById("gallery")

const getWorks = () => {
    fetch(url)
    .then(function (result) {
        return result.json()
    })
    .then(function (data) {
        console.log(data)
        for (product in data)
        container.innerHTML += `<figure>
        <img src="${data[product].imageUrl}" alt="${data[product].title}">
        <figcaption>${data[product].title}</figcaption>
    </figure>`
    })
}

getWorks()
