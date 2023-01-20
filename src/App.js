import "./App.css"
import { useState, useEffect } from "react"

function App() {
    const [searchTerm, setSearchTerm] = new useState("")
    const [searchResult, setSearchResult] = new useState([])
    const [error, setError] = new useState(null)
    const [isLoading, setIsLoading] = new useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await fetch(
                    `https://api.api-ninjas.com/v1/celebrity?name=${searchTerm}`,
                    {
                        headers: {
                            "X-Api-Key":
                                "5Y5jKyHxrRxKoDDIhKJpjw==IUhio9nPMBSaeeCN",
                        },
                    }
                )
                const data = await res.json()
                setSearchResult(data)
            } catch (error) {
                setError(error)
            }
            setIsLoading(false)
        }
        if (searchTerm.length > 0) {
            fetchData()
        }
    }, [searchTerm, setError, setIsLoading, setSearchResult])

    if (error) {
        console.log(error)
    }

    return (
        <div className="App">
            <form>
                <label>Search for a celebrity networth:</label>
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </form>
            {isLoading ? (
                <p>One moment please...</p>
            ) : (
                searchResult.map((result, index) => {
                    return (
                        <div key={index}>
                            <h2>{result.name}</h2>
                            <h3>Nepo baby net worth: {result.net_worth}</h3>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default App
