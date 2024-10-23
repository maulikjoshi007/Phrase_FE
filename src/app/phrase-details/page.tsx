"use client"
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './phrasedetails.scss'
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
    const [status, setStatus] = useState('')
    const [phraseDetail, setphraseDetails] = useState<any>()
    useEffect(() => {
        getphrasedetail()
    }, [])
    const getphrasedetail = async () => {
        const response = await fetch(`api-url`);
        console.log(response, "");
        setphraseDetails(response);
    }
    const handleStatusChange = (event: any) => {
        setStatus(event.target.value);
    };
    return (
        <div>
            <div className="phrase-detail-card">
                <div>
                    <Button className='btn' onClick={() => { router.push('/listdata') }}>Back</Button>
                </div>
                <Card className="card">
                    <CardContent className="card-content">
                        <div className="card-title">Phrase Details</div>
                        <div className="card-row row">
                            <div className="card-details">
                                <div className="details-description">Phrase:</div>
                                <div className="details-title">
                                    {/* {phraseDetail.phrase} */}
                                </div>
                            </div>

                            <div className="card-details">
                                <div className="details-title w-fc">
                                    <div className='details-description'>
                                        {/* {phraseDetail.status} */}
                                    </div>
                                </div>
                                <div className="details-description">Status:</div>
                            </div>
                            <div className="card-details">
                                <div className="details-description">Translate To:
                                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                                        <InputLabel>Languages</InputLabel>
                                        <Select value={status} onChange={handleStatusChange} label="Status">
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="EN">English</MenuItem>
                                            <MenuItem value="NR">Netherland</MenuItem>
                                        </Select>
                                    </FormControl></div>
                            </div>
                        </div>
                        <div className="card-row row">
                            <div className="card-details">
                                <div className="details-description">New phrase:</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}

export default page
