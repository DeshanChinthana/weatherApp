import React from 'react';
import './App.css';
import Home from './components/Home';
import CitySingle from './components/CitySingle';
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

    return (

        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/CitySingle/:wData" element={<CitySingle />} />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </>

    );
}

export default App;