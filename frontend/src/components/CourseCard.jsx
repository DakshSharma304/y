function CourseCard({ name, units }) {
    return (
        <div className="course-card">
            <h2 className="course-name">{name}</h2>
            <div className="units">{units}</div>
        </div>
    )
}

export default CourseCard