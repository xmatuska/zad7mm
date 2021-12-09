
const section = document.querySelector("section")
const filter = document.querySelector("#filter")
const backdrop = document.querySelector("#backdrop")
const modal = document.querySelector("#modal")

backdrop.addEventListener("click",() =>{
    backdrop.style.display = "none"
})

const filterValue = localStorage.getItem("filter") == null ? "": localStorage.getItem("filter")
filter.value = filterValue


filter.addEventListener("input",event =>{
    console.log(event.target.value)
    loadImages(event.target.value)
})

const loadImages = (filterString) => {
    localStorage.setItem("filter", filterString)
    section.innerHTML = ''

    fetch("./images.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(image => {
                if(image.title.indexOf(filterString) != -1) {
                    const thumbnail = document.createElement("img")
                    thumbnail.src = `images/${image.src}`
                    thumbnail.height = 200
                    thumbnail.width = 200
                    thumbnail.style = "object-fit: cover"

                    thumbnail.addEventListener("click",() => {
                        backdrop.style.display = "flex"
                        modal.innerHTML = ""
                        const imageElement = document.createElement("img")
                        imageElement.src = `images/${image.src}`
                        modal.appendChild(imageElement)
                    })
                    section.appendChild(thumbnail)
                    console.log(image)
                }
            })
        })
}

loadImages(filterValue)

