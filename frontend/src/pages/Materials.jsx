import FileItem from "../components/FileItem.jsx"
import logo from "../assets/yNotStudy logo 1.png"

function Page() {
    const loggedIn = false; /*add auth state here*/

    return (
        <>
        <img src={logo} className="logo" alt="y not study logo" />

        <main className="materials">
            <h2>Add Materials</h2>
        
            <input type="text" id="matCourseName" placeholder="course name" required/>
            <input type="text" id="matUnitName" placeholder="unit name" required/>
            <input type="text" id="matDescription" placeholder="description"/>

            <label for="materialUpload" className="uploadBox" id="dropZone">
                <h2>Upload course materials</h2>
                <p>Drag and drop or click to select files</p>
            </label>
            <input type="file" id="materialUpload" multiple hidden />

            <div className="files" id="fileList"></div>


            <p id="error-message" className="error-text"></p>

            <div className="matOptions">
                <button type="button" id="addToCourseBtn">Add unit to course</button>
            </div>
        </main>
        </>
    )

}

export default Page