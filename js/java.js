let currentDay =            document.getElementById('current-Day-Day');
let currentDayNumber =      document.getElementById('current-Day-Num')
let currentDayMonth =       document.getElementById('current-Day-Month')
let currentLoc =            document.getElementById('current-Day-Location');
let currentDayTemp =        document.getElementById('current-Day-Temp')
let currentDayForecastImg = document.getElementById('current-Day-Forecast-Img')
let currentDayForecastText= document.getElementById('current-Day-Forecast-Text')
let dayHum =                document.getElementById("current-Day-Hum")
let dayWindSpd =            document.getElementById("current-Day-Wind-Speed")
let dayWindDir =            document.getElementById("current-Day-Wind-Dir")


let nextDayDay =            document.getElementsByClassName('next-Days-Day')
let nextDayForcastImg =     document.getElementsByClassName('next-Days-Forecast-Img')
let nextDayHiTemp =         document.getElementsByClassName("next-Days-Hi-Temp")
let nextDayLowTemp =        document.getElementsByClassName("next-Days-Low-Temp")
let nextDayText =           document.getElementsByClassName("next-Days-Forecast-Text")

let srchInput =             document.getElementById('searchInput')





async function getData(city) {
  let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5658db1c54424ff4a7f43525242706&q=${city}&days=3`);
  let forecastInfos = await data.json();
  console.log(forecastInfos)
  return forecastInfos
}


srchInput.addEventListener('keyup', function filter(){
    allData(srchInput.value)
})



function displayCrntDay(theCurrentDayInfo){

    currentLoc.innerHTML = theCurrentDayInfo.location.name;
    currentDayTemp.innerHTML = theCurrentDayInfo.current.temp_c + `<sup>o</sup>C`;
    currentDayForecastImg.setAttribute("src",theCurrentDayInfo.current.condition.icon)
    currentDayForecastText.innerHTML = theCurrentDayInfo.current.condition.text
    dayHum.innerHTML = theCurrentDayInfo.current.humidity + `%`
    dayWindSpd.innerHTML = theCurrentDayInfo.current.wind_kph + `Km/h `
    dayWindDir.innerHTML = theCurrentDayInfo.current.wind_dir
    let date = new Date(theCurrentDayInfo.forecast.forecastday[0].date)
    currentDay.innerHTML = date.toLocaleDateString("en-US",{weekday:"long"})
    currentDayNumber.innerHTML = date.getDate()
    currentDayMonth.innerHTML = date.toLocaleDateString("en-Us",{month:"long"})




}


function displayNxtDay(nextDaysInfos){
    // 2nd day 
    nextDayHiTemp[0].innerHTML = nextDaysInfos.forecast.forecastday[1].day.maxtemp_c
    nextDayLowTemp[0].innerHTML = nextDaysInfos.forecast.forecastday[1].day.mintemp_c
    nextDayText[0].innerHTML = nextDaysInfos.forecast.forecastday[1].day.condition.text
    nextDayForcastImg[0].setAttribute("src",nextDaysInfos.forecast.forecastday[1].day.condition.icon)
    let seconddate = new Date(nextDaysInfos.forecast.forecastday[1].date)
    nextDayDay[0].innerHTML = seconddate.toLocaleDateString("en-US",{weekday:"long"})
    
// 3rd day
    nextDayHiTemp[1].innerHTML = nextDaysInfos.forecast.forecastday[2].day.maxtemp_c
    nextDayLowTemp[1].innerHTML = nextDaysInfos.forecast.forecastday[2].day.mintemp_c
    nextDayText[1].innerHTML = nextDaysInfos.forecast.forecastday[2].day.condition.text
    nextDayForcastImg[1].setAttribute("src",nextDaysInfos.forecast.forecastday[2].day.condition.icon)

    let thirddate = new Date(nextDaysInfos.forecast.forecastday[2].date)
    nextDayDay[1].innerHTML = thirddate.toLocaleDateString("en-US",{weekday:"long"})

}



async function allData(city="Alexandria"){

    let forecastData = await getData(city)
    
    displayCrntDay(forecastData)
    displayNxtDay(forecastData)
    


}

allData()

