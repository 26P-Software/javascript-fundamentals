// Check if data exists when the page loads
window.onload = () => {
    const savedUser = localStorage.getItem('userName');

    if (savedUser) {
        document.getElementById('displayArea').textContent = ` Hello ${userName}!`
    }
};

function saveData() {
    const inputValue = document.getElementById('nameInput').value;

    if (inputValue.trim() !== "") {
        localStorage.setItem('userName', inputValue);
        document.getElementById('displayArea').textContent = `Hello, ${inputValue}!`
        alert("Data has been saved successfully!");
    } else {
        alert("Please enter name to save!");
    }
};

function clearData() {
    localStorage.removeItem('userName');
    document.getElementById('displayArea').textContent = 'No saved data yet.';
    document.getElementById("nameInput").value = "";
    alert("Data cleared!")
}

const button = document.getElementById('btn').addEventListener('click', () => {
    saveData();
})
const clear = document.getElementById('btn1').addEventListener('click', () => {
    clearData();
})

