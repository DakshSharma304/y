function SelectedSubject({ subject, units }) {
    return (
        <>
            <button>{subject}</button>

            <div className="indent">
                {units.map(unit => (
                    <button key={unit}>{unit}</button>
                ))}
                
            </div>
        </>
    )
}