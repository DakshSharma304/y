function Carousel({ cards, active }) {
    const leftIndex = (active - 1 + cards.length) % cards.length
    const rightIndex = (active + 1) % cards.length
    const farLeftIndex = (active - 2 + cards.length) % cards.length
    const farRightIndex = (active + 2) % cards.length
    return (
        <div className="carousel">
            {cards.map((card, index) => {
                let position = "hidden"

                if (index === active) position = "active"
                else if (index === leftIndex) position = "left"
                else if (index === rightIndex) position = "right"
                else if (index === farLeftIndex) position = "farLeft"
                else if (index === farRightIndex) position = "farRight"

                return (
                    <div key={index} className={`carouselSlot ${position}`}>
                        <div className="carouselCard">
                            {card}
                        </div> 
                    </div>
                )
                })}
        </div>
    )
}

export default Carousel