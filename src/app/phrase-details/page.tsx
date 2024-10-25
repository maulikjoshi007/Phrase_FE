"use client"
import { Backdrop, Button, Card, CardContent, CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'; // For navigation and getting query parameters
import { datalist } from '../listdata/modal'; // Importing the type of the data
import './phrasedetails.scss'

const Page = () => {
    const router = useRouter() // To navigate between pages
    const [selectedLanguageCode, setSelectedLanguageCode] = useState<any>('') // State to store the selected language code
    const [phraseDetail, setPhraseDetails] = useState<datalist>() // State to store the phrase details fetched from the API
    const [language, setLanguage] = useState<any[]>([]) // State to store the list of languages available
    const [newLanguage, setNewLanguage] = useState<any>() // State to store the translation of the phrase in the selected language
    const searchParams = useSearchParams() // Used to get the query parameters from the URL
    const [newLanguageName, setNewLanguageName] = useState<any>() // State to store the selected language name
    const uuid = searchParams.get('id') // Get the 'id' parameter from the URL query
    const [isLoading, setisLoading] = useState<boolean>(false)
    useEffect(() => {
        getPhraseDetail() // Fetch phrase details
        getLanguages() // Fetch available languages
    }, []) // Empty dependency array means this runs once on component mount

    // Function to get the list of languages from the API
    const getLanguages = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/language/list`)
            const data = await response.json()
            setLanguage(data.data); // Set the available languages in state
        }
        catch (error) {
            console.error("Error fetching data:", error); // Error handling
        }
    }

    // Function to fetch phrase details using the UUID from the URL
    const getPhraseDetail = async () => {
        setisLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/phrase/${uuid}`)
        const data = await response.json()
        setPhraseDetails(data.data); // Set the phrase details in state
        setisLoading(false)
    }

    // Function to handle when the user selects a new language
    const handleLanguageChange = (event: any) => {
        const selectedLanguageCode = event.target.value; // Get the selected language code
        const selectedLanguage = language.find((lan) => lan.language_code === selectedLanguageCode); // Find the selected language from the list
        if (selectedLanguage) {
            setNewLanguageName(selectedLanguage?.language_name) // Set the language name for display
            setSelectedLanguageCode(selectedLanguage.language_code) // Set the selected language code
            getNewLanguage(uuid, selectedLanguage.language_code) // Fetch the translation for the selected language
        }
    };
    const toCamelCase = (status: string): string => {
        return status
            .toLowerCase() // Convert the entire string to lower case
            .split(' ') // Split the string into words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(''); // Join the words together
    };
    // Function to fetch the translated phrase in the selected language
    const getNewLanguage = async (id: any, code: any) => {
        try {
            setisLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/phrase/${id}/${code}`)
            const data = await response.json()
            console.log(data.data, "lannnnnnnn"); // Debugging log
            setNewLanguage(data.data) // Set the translated phrase in state
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            console.error("Error fetching translation:", error); // Error handling
        }
    }

    return (
        <div>
            <div className="phrase-detail-card">
                <div>
                    {/* Button to navigate back to the list of phrases */}
                    <Button className='btn' onClick={() => { router.push('/listdata') }}>Back</Button>
                </div>

                {/* Display the phrase details */}
                <Card className="card">
                    <CardContent className="card-content">
                        <div className="card-title">Phrase Details</div>
                        <div className="card-row row">
                            <div className="card-details">
                                {/* Display the phrase */}
                                <div className="details-description">Phrase:
                                    <span className='details-title'>
                                        {phraseDetail?.phrase ? phraseDetail?.phrase : "-"}
                                    </span>
                                </div>
                            </div>

                            <div className="card-details">
                                {/* Display the status of the phrase */}
                                <div className="details-description ">Status:
                                    <span className='details-title'>
                                        {phraseDetail?.status ? toCamelCase(phraseDetail?.status) : "-"}
                                    </span>
                                </div>
                            </div>

                            <div className="card-details">
                                {/* Dropdown to select the language for translation */}
                                <div className="details-description">Translate To:
                                    <FormControl variant="outlined" style={{ minWidth:150,padding:4}}>
                                        <InputLabel>Languages</InputLabel>
                                        <Select style={{height:46}}
                                            value={selectedLanguageCode} // Bind to selected language code
                                            onChange={handleLanguageChange} // Handle language change
                                            label="Language">
                                            {language.map((lan) => {
                                                return (
                                                    <MenuItem key={lan.uuid} value={lan.language_code}>{lan.language_name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    {/* If a language is selected, display the translated phrase */}
                    {newLanguageName &&
                        <CardContent className="card-content">
                            <div className="card-row row">
                                <div className="card-details">
                                    <div className="details-description">Language:
                                        <span className='details-title'>{newLanguageName ? newLanguageName : ""}</span>
                                    </div>
                                </div>
                                <div className="card-details">
                                    {/* Display the translated phrase */}
                                    <div className="details-description">Translated phrase:
                                        <span className='details-title'>{newLanguage?.translation ? newLanguage.translation : ' - '}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>}
                </Card>
            </div>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Page
