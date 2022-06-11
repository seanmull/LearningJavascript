const dayClosure = (whatKindOfDayIsIt, whatDay) => {
    return whatKindOfDayIsIt
}

const dayChooser = dayClosure((typeOfDay, whatDay) => 
                   console.log(`${whatDay} is a ${typeOfDay} day`))
const sunnyDay = dayChooser("sunny", "today")
const cloudyDay = dayChooser("cloudy", "tomorrow")



