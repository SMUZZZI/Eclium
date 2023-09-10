import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './App/Header/Header';
import Main from './App/pages/Main/Main';
import SubscribersAndSubscription from './App/pages/SubscribersAndSubscription/SubscribersAndSubscription';
import AboutUs from './App/pages/AboutUs/AboutUs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { audioNext } from './redux/slices/audioControl.slice';
import MainPlayer from './App/MainPlayer/MainPlayer';
import AccountUser from './App/pages/AccountUser/AccountUser';
import AccountMy from './App/pages/AccountMy/AccountMy';


function App() {
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.songId)
  const isPlaying = useSelector(state => state.audioControl) && data != null

  const audioRef = useRef()
  const [volumeRange, setVolumeRange] = useState(0.5)
  const [songRange, setSongRange] = useState(0)
  useEffect(() => {
    if (data != null) {
      if (isPlaying)
        audioRef.current.play()
      else
        audioRef.current.pause()
    }
  }, [isPlaying])

  const onPlay = () => {
    const duration = audioRef.current.duration
    const currentTime = audioRef.current.currentTime
    setSongRange(currentTime / duration * 100)
    if (duration == currentTime) {
      dispatch(audioNext(true))
    }
  }

  const checkWidth = (e, clickRef) => {
    let width = clickRef.current.clientWidth
    const offset = e.nativeEvent.offsetX

    const progress = offset / width * 100
    audioRef.current.currentTime = progress / 100 * audioRef.current.duration
  }
  useEffect(() => {
    if (data != null) {
      audioRef.current.volume = volumeRange
    }
  }, [volumeRange])


  return (
    <div className='app-container'>
      <Header />
      {
        data != null ? <audio ref={audioRef} onTimeUpdate={onPlay} preload='metadata' controls src={`http://45.84.226.30:5000${data.audio}`}></audio> : null
      }
      <Routes >
        <Route path='/' element={<Main songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth} />} />
        <Route path='/account/:id' element={<AccountUser songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth} />} />
        <Route path='/account/my' element={<AccountMy songRange={songRange} setSongRange={setSongRange} checkWidth={checkWidth} />} />
        <Route path='/:accountid/subscriptions' element={<SubscribersAndSubscription title={'subscriptions'} />} />
        <Route path='/about' element={<AboutUs />} />
      </Routes>
      <MainPlayer checkWidth={checkWidth} songRange={songRange} setSongRange={setSongRange} volumeRange={volumeRange} setVolumeRange={setVolumeRange} />
    </div >
  );
}

export default App;
