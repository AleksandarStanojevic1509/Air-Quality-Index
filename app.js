
const inputValue = document.getElementById('city');
const formHandler = document.querySelector('form');

const isExist = (data) =>{
    if(data === undefined){
        console.log('GRESKAAAAAAAAAAAAAAA')
        return 'X'
    }
    else{
        return data
    }
} 

const printFinal = (data)=>{
    if(data === 'X'){
        return 'X'
    }
    else{
        return data.v
    }
}

const renderData = (data) =>{
    return new Promise ((resolve, reject)=>{
        fetch(`https://api.waqi.info/feed/${data}/?token=ce9793a1f33cdc0d550f0df4bcb3be64fa5701d0`)
        .then(data =>{
        return data.json();
        })
        .then(data=>{
            console.log(data)
            if(data.status === 'error'){
                resolve ('Nepoznata stanica');
            }
            else{            
            resolve(data.data);   
            }
        })
        .catch(err=>{
            console.log(err);
        })        
    })
}

const randomCities = () =>{
    let cities = ['Zenica', 'Ashdod ', 'Tel Aviv', 'Oslo', 'London', 'Novi Sad', 'Berlin', 'Tokyo', 'Belgrade', 'Ljubljana', 'Sombor','Sofia', 'Barcelona', 'Moscow', 'Bejing', 'Athens', 'Paris', 'New York', 'Sarajevo', 'Ottawa', 'Valletta'];    
    let randomCities = [];    
        for (let i = 0; i < cities.length; i++){
            if(randomCities.length < 6) {
            let index = Math.floor(Math.random() * cities.length);
            if(randomCities.includes(cities[index])){continue}
            randomCities.push(cities[index]);
        }        
    }
    return randomCities;    
}

formHandler.addEventListener('submit', (event)=>{
    event.preventDefault()
    let tempInput = inputValue.value
    let input = tempInput.slice(0, 1).toUpperCase() + tempInput.slice(1).toLowerCase()
    console.log(input)
    renderData(input)
    .then(data=>{
        if(data === 'Nepoznata stranica'){
            console.log('Nepoznata stranica');
        }
        else{
           

            let quality = '';
            let color = '';
            if(data.aqi >= 0 && data.aqi <= 50){
                quality = 'Good';
                color = '#00a500';
            }
            else if(data.aqi >= 51 && data.aqi <=100){
                quality = 'Moderate';
                color = '#ffd507';
            }
            else if(data.aqi >= 101 && data.aqi <=150){
                quality = 'Unhealthy for Sensitive';
                color = '#ff9800';
            }
            else if(data.aqi >= 151 && data.aqi <=200){
                quality = 'Unhealthy';
                color = '#f44336';
            }
            else if(data.aqi >= 201 && data.aqi <=300){
                quality = 'Very Unhealthy';
                color = '#9b27b0';
            }
            else if(data.aqi > 301){
                quality = 'Hazardous';
                color = '#940015';
            }


            let pm10 = isExist(data.iaqi.pm10);
            let pm25 = isExist(data.iaqi.pm25);
            let o3 = isExist(data.iaqi.o3);
            let no2 = isExist(data.iaqi.no2);
            let so2 = isExist(data.iaqi.so2);
            let co = isExist(data.iaqi.co);
            let h = isExist(data.iaqi.h);
            let p = isExist(data.iaqi.p);




            document.getElementById('result').innerHTML = `
            <div class="aqi-city-card-random">
            <div class="city-name-random"><p>${data.city.name}</p></div>
            <div class="title-random">
                <h4>${input}</h4>
                <h4>${data.iaqi.t.v.toFixed(0)} &#8451</h4>
            </div>
            <div class="update-random">
                <div class="last-random">
                    <h5 style="color:${color}">${quality}</h5>
                    <h6><strong>last update: </strong> ${data.time.s.slice(0,10)}</h6>
                </div>
                <h2 style="background-color:${color}">${data.aqi}</h2>
            </div>
            <div class="card-row">
                <div class="card-row-left">
                    <p>PM10:</p>
                    <p>${printFinal(pm10)}</p>
                </div>
                <div class="card-row-right">
                    <p>PM25:</p>
                    <p>${printFinal(pm25)}</p>
                </div>
            </div>
            <div class="card-row">
                <div class="card-row-left">
                    <p>O3:</p>
                    <p>${printFinal(o3)}</p>
                </div>
                <div class="card-row-right">
                    <p>NO2:</p>
                    <p>${printFinal(no2)}</p>
                </div>
            </div>
            <div class="card-row">
            <div class="card-row-left">
                <p>SO2:</p>
                <p>${printFinal(so2)}</p>
            </div>
            <div class="card-row-right">
                <p>CO:</p>
                <p>${printFinal(co)}</p>
            </div>
        </div>
        <div class="card-row">
            <div class="card-row-left">
                <p>HUM:</p>
                <p>${printFinal(h)}</p>
            </div>
            <div class="card-row-right">
                <p>PRESS:</p>
                <p>${printFinal(p)}</p>
            </div>
        </div>   
            </div>`

            
        }
    })

    formHandler.reset()
})



let renderRandomCities = () =>{
    let cities = randomCities()
    cities.forEach((elem) =>{
        renderData(elem)
        .then(data=>{
            if(data === 'Nepoznata stranica'){
                console.log('Nepoznata stranica');
            }
            else{
                console.log(data);
                let quality = '';
                let color = '';
                if(data.aqi >= 0 && data.aqi <= 50){
                    quality = 'Good';
                    color = '#00a500';
                }
                else if(data.aqi >= 51 && data.aqi <=100){
                    quality = 'Moderate';
                    color = '#ffd507';
                }
                else if(data.aqi >= 101 && data.aqi <=150){
                    quality = 'Unhealthy for Sensitive';
                    color = '#ff9800';
                }
                else if(data.aqi >= 151 && data.aqi <=200){
                    quality = 'Unhealthy';
                    color = '#f44336';
                }
                else if(data.aqi >= 201 && data.aqi <=300){
                    quality = 'Very Unhealthy';
                    color = '#9b27b0';
                }
                else if(data.aqi > 301){
                    quality = 'Hazardous';
                    color = '#940015';
                }

                document.getElementById('random').innerHTML += `
                <div class="aqi-city-card-random">
                <div class="city-name-random"><p>${data.city.name}</p></div>
                <div class="title-random">
                    <h4>${elem}</h4>
                    <h4>${data.iaqi.t.v.toFixed(0)} &#8451</h4>
                </div>
                <div class="update-random">
                    <div class="last-random">
                        <h5 style="color:${color}">${quality}</h5>
                        <h6><strong>last update: </strong> ${data.time.s.slice(0,10)}</h6>
                    </div>
                    <h2 style="background-color:${color}">${data.aqi}</h2>
                </div>
                </div>`
    
            }
            
        })
        
    })

}

renderRandomCities()

document.querySelector('.fa-question-circle').addEventListener('click', ()=>{
    document.getElementById('scale-box').style.display = 'flex'
})
document.querySelector('.fa-times-circle').addEventListener('click', ()=>{
    document.getElementById('scale-box').style.display = 'none'
})

