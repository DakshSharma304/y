import { getToken } from "./api/auth.js"
import { uploadMaterials } from "./api/materials.js";

if (!getToken()) { // Redirect to login if user not logged in
    window.location.href = "login.html"
}

// Input fields
const courseNameInput = document.querySelector("#matCourseName");
const unitNameInput = document.querySelector("#matUnitName");
const descriptionInput = document.querySelector("#matDescription");
const errorDisplay = document.querySelector("#error-message");

// Buttons
const addButton = document.querySelector("#addToCourseBtn");

// File upload elements
const fileInput = document.querySelector("#materialUpload");
const dropZone = document.querySelector("#dropZone");
const fileList = document.querySelector("#fileList");
const fileTemplate = document.querySelector("#file-template");

let stagedFiles = []

function displayFileList() {
    fileList.textContent = "" // This function acts like a refresh. We don't want files from the previous refresh

    stagedFiles.forEach((file, index) => {
        const clone = fileTemplate.content.cloneNode(true) // Clones the template

        clone.querySelector(".fileName").textContent = file.name; // Set filename
        
        clone.querySelector(".removeFile").addEventListener("click", () => {
            stagedFiles.splice(index, 1)
            displayFileList()
        })

        fileList.appendChild(clone)
    })
}

function addFiles(newFiles) {
    for (const file of newFiles) { // Note: will not detect duplicates; duplicates will be accepted
        stagedFiles.push(file);
    }

    displayFileList();
}

// --- File selection via click --- 
fileInput.addEventListener("change", (e) => {
    addFiles(e.target.files)
    fileInput.value = ""
})

// --- File selection via drag and drop ---
dropZone.addEventListener("dragover", (e) => {
    e.preventDefault(); // Prevent default behavior, which is to open the file in a new tab
})

dropZone.addEventListener("drop", (e) => {
    e.preventDefault() // Prevent default behavior, which is to open the file in a new tab
    addFiles(e.dataTransfer.files)
})

async function submitMaterials() {
    errorDisplay.textContent = ""

    const courseName = courseNameInput.value.trim()
    const unitName = unitNameInput.value.trim()
    const description = descriptionInput.value.trim()

    // Validate that fields are not empty
    if (!courseName || !unitName) {
        errorDisplay.textContent = "Both Course Name and Unit Name Required"
        return;
    }

    // Bundle fields and files together into one object: formData
    const formData = new FormData()
    formData.append("courseName", courseName)
    formData.append("unitName", unitName)
    formData.append("description", description)
    
    stagedFiles.forEach((file) => {
        formData.append("files", file)
    })

    addButton.disabled = true // Disable so user can't spam

    // Send request
    try {
        const result = await uploadMaterials(formData)

        if (!result.ok) {
            errorDisplay.textContent = "Error: " + result.error || "Failed to upload materials."
            return
        }

        window.location.href = "home.html" // Succeeded, so redirect to home

    } catch (err) {
        errorDisplay.textContent = "Could not connect to server. Please try again."
    } finally {
        addButton.disabled = false
    }
}

addButton.addEventListener("click", () => submitMaterials())