function FileItem({ name, onRemove }) {
    return (
        <div className="file">
            <span className="fileName">{name}</span>
            <button type="button" className="removeFile" onClick={onRemove}>
                x
            </button>
        </div>
    )
}

export default FileItem