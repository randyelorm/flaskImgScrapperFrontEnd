import { useState } from 'react'
import './App.css'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import dancegif from '../src/assets/dancing.gif'
import dancegif2 from '../src/assets/dance2.gif'

import searchImage from '../src/assets/search.jpg'
import im1 from '../src/assets/1.webp'
import im2 from '../src/assets/wom.jpeg'
import im3 from '../src/assets/wom.webp'
import im4 from '../src/assets/wom2.webp'
import im5 from '../src/assets/man.webp'
import im6 from '../src/assets/man2.webp'
import im7 from '../src/assets/pip.webp'
import im8 from '../src/assets/run.jpeg'




function App() {

  const [imgsUrl, setImgsUrl] = useState([])
  const [isLoading, setIsloading] = useState(false)
  const [value, setValue] = useState("")
  const [removeFirstImage, setRemoveFirstImage] = useState(false)



  const fire = (e) => {
    e.preventDefault()
    setIsloading(true)
    const formdata = new FormData();
    formdata.append("url", value);


    axios.post("https://flaskimagescrapper.onrender.com", formdata)
      .then(
        (result) => {
          if (result != []) {
            setImgsUrl(result.data)
            setIsloading(false)
            setRemoveFirstImage(true)
          }

        }
      )
      .catch(error => console.log('error', error));
  }

  console.log(removeFirstImage)



  return (
    <div className="App">
      <div style={{}}>
        <div className='text'>

          <h1>
            COPY AND PASTE <br />
            THE URL OF ANY WEBSITE &<br />
            GET THE IMAGES
          </h1>
        </div>


        <form className='inputform' onSubmit={fire}>
          <input className='input' value={value}
            onChange={event => setValue(event.target.value)}
            required
          />
          <input className="submit" type="submit" value='Get Images' />
        </form>


        {
          removeFirstImage === false ?
            <div className='loading'>
              <div className='beforeImages'>
                <img src={im1} className='danceGIF2' style={{ display: isLoading ? "none" : null }} />
                <img src={im7} className='danceGIF2' style={{ display: isLoading ? "none" : null }} />
                <img src={im2} className='danceGIF2' style={{ display: isLoading ? "none" : null }} />
                <img src={im6} className='danceGIF2' style={{ display: isLoading ? "none" : null }} />
                <img src={im3} className='danceGIF2' style={{ display: isLoading ? "none" : null }} />
                <img src={im4} className='danceGIF2' style={{ display: isLoading ? "none" : null }} />
                <img src={im5} className='danceGIF2' style={{ display: isLoading ? "none" : null }} />
                <img src={im8} className='danceGIF2' style={{ display: isLoading ? "none" : null }} />

              </div>

            </div> : null
        }





        {isLoading ?

          <div className='loading'>
            <img src={dancegif} className='danceGIF' />
            <h3 style={{
              color: 'white',
              backgroundColor: 'black',
              padding: '1rem',
              borderRadius: '1rem'
            }}>...Loading</h3>
          </div> : null}
      </div>





      <div className='cards'>
        {
          imgsUrl.map(
            (urls) => {
              return (
                <div style={{ margin: '0.5rem' }}>
                  <CardGroup>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img className='images' variant="top" src={urls} />
                    </Card>
                  </CardGroup>
                </div>


              )
            }
          )

        }
      </div>



    </div >
  )
}

export default App
