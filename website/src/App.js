import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';

import{Navbar,Footer,Sidebar,ThemeSettings, LineChart, SparkLine} from './components';
import{Calendar, Clinic, Clinician, Patients, ColorPicker, Home, Export, AddPatient, TakeMeasure, LogOut, Line} from './pages';

import { useStateContext } from './contexts/ContextProvider';

import './App.css'
import Measure from './pages/TakeMeasure';

const App = () => {

    const {activeMenu} = useStateContext();
  return (
    <div>
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className='fixed right-4 bottom-4' style={{zIndex:'1000'}}>
                    <TooltipComponent content = "Settings" position = "Top">
                        <button type='button' 
                        className='text-3xl p-3 
                        hover:drop-shadow-xl
                        hover:bg-light-gray
                        text-white'
                        style={{background:'blue',
                        borderRadius:'50%'}}>
                            <FiSettings/>
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className='w-72 fixed sidebar
                    dark:bg-secondary-dark-bg
                    bg-white'>
                        <Sidebar/>
                    </div>
                ) : (
                    <div className='w-0 dark:bg-secondar-dark-bg'>
                        <Sidebar/>
                    </div>
                )}
                <div className={ "dark: bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72':'w-full'}"
            }>
                    <div className='fixed md: static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                        <Navbar/>
                    </div>
                </div>
                <div>
                    <Routes>
                        {/*Dashboard*/}
                        <Route path='/' element={<Home/>}/>
                        {/*<Route path='/Measure' element={<Measure/>}/>*/}
                        <Route path='/AddPatient' element={<AddPatient/>}/>
                        <Route path='/Export' element={<Export/>}/>
                        <Route path='/LogOut' element={<LogOut/>}/>

                        {/* Pages */}
                        <Route path='/Clinic' element={<Clinic/>}/>
                        <Route path='/Clinician' element={<Clinician/>}/>
                        <Route path='/Patients' element={<Patients/>}/>

                        {/*Apps*/}
                        <Route path='/Measure' element={<TakeMeasure/>}/>
                        <Route path='/ColorPicker' element={<ColorPicker/>}/>

                        {/*Charts*/}
                        <Route path='/Line' element={<LineChart/>}/>
                        <Route path='/SparkLine' element={<SparkLine/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default App