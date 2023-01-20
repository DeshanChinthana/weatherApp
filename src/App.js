import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './components/Home';
// import CitySingle from './components/CitySingle';
// import { Route, Routes } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';


const queryClient = new QueryClient(); // for call APIs.

function App() {

    return (

        <>
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>

            {/* <BrowserRouter>
                <Routes>
                    <Route path="/CitySingle" element={<CitySingle />} />
                </Routes>
            </BrowserRouter> */}
        </>

    );
}

export default App;