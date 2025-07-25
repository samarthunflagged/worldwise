/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:8000';


function CitiesProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});


    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert('There was error loading cities');
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {

        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert('There was error loading cities');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity
        }}>
            {children}
        </CitiesContext.Provider>

    )
}
function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider')
    return context;
}
export { CitiesProvider, useCities };