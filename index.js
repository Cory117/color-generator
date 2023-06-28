// VARIABLES
const colorForm = document.getElementById("color-form")
const colorContainer = document.getElementById("color-container")

// RENDER FUNCTION
function renderColorScheme(){
    const color = document.getElementById("color-selector").value.substring(1)
    const mode = document.getElementById("mode-selector").value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`)
        .then(res => res.json())
        .then(data => {
            const html = data.colors.map((color)=>{
                return `
                    <div class="color-card">
                        <img
                            class="color-img" 
                            data-hex=${color.hex.value} 
                            src="${color.image.bare}"
                        />
                        <p class="color-value" data-hex=${color.hex.value}>
                            ${color.hex.value}
                        </p>
                    </div>
                `
            }).join("")
            colorContainer.innerHTML = html
        }) 
}
renderColorScheme()

// FORM EVENT LISTENER
colorForm.addEventListener("submit", function(e){
    e.preventDefault()
    renderColorScheme()
})

// COPY COLOR
colorContainer.addEventListener("click", function(e){
    navigator.clipboard.writeText(e.target.dataset.hex)
    let copyMessage = document.createElement("span")
    copyMessage.classList.add("copy-message")
    e.target.parentNode.appendChild(copyMessage)
    copyMessage.innerText = "Copied!"
    setTimeout(()=>{
        e.target.parentNode.removeChild(copyMessage)
    }, 1000)
})
