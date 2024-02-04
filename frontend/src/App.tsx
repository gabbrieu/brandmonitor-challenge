import { LoadingButton } from '@mui/lab';
import { Box, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css';
import ShowResults from './components/show-results';
import {
    ELanguage,
    ISearchParams,
    ISearchResponse,
    ISearchResponseState,
} from './utils/types';

export default function App(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState<ISearchParams>({
        location: '',
        frequency: 1,
        keywords: '',
    });
    const [response, setResponse] = useState<ISearchResponseState | null>(null);

    async function handleSubmit(e: FormEvent): Promise<void> {
        setLoading(true);
        e.preventDefault();

        try {
            const backendPort = Number(process.env.BACKEND_PORT) || 3000;
            const { data } = await axios.post<ISearchResponse>(
                `http://localhost:${backendPort}/google-search`,
                {
                    ...searchParams,
                    keywords: searchParams.keywords.trim().split(' ').join(';'),
                }
            );

            setResponse(data);
        } catch (error) {
            setLoading(false);
            console.error('Error while sending data to backend: ', error);
            throw error;
        }

        setLoading(false);
    }

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void {
        let value: string | number = e.target.value;

        if (e.target.name === 'frequency') {
            value = Number(value);
        }

        setSearchParams({
            ...searchParams,
            [e.target.name]: value,
        });
    }

    return (
        <main className="center-container">
            <h1>Google Search Scraper</h1>
            <Box
                component="form"
                sx={{ width: '45%', minWidth: '350px' }}
                onSubmit={handleSubmit}
            >
                <TextField
                    required
                    fullWidth
                    margin="dense"
                    name="keywords"
                    label="Keywords"
                    value={searchParams.keywords}
                    helperText="Type what you want to search"
                    onChange={handleChange}
                />
                <br />

                <TextField
                    required
                    fullWidth
                    margin="dense"
                    type="number"
                    name="frequency"
                    InputProps={{ inputProps: { min: 0 } }}
                    label="Frequency"
                    value={searchParams.frequency}
                    helperText="Number of results that you want"
                    onChange={handleChange}
                />
                <br />

                <TextField
                    required
                    fullWidth
                    select
                    margin="dense"
                    name="location"
                    label="Location"
                    value={searchParams.location}
                    helperText="Location of the research"
                    onChange={handleChange}
                >
                    {Object.entries(ELanguage).map(([key, value]) => (
                        <MenuItem key={value} value={value}>
                            {key.includes('_') ? key.split('_').join(' ') : key}
                        </MenuItem>
                    ))}
                </TextField>
                <br />

                <LoadingButton
                    loading={loading}
                    fullWidth
                    sx={{ mt: '1rem', p: '0.8rem' }}
                    variant="outlined"
                    type="submit"
                    size="large"
                >
                    Search
                </LoadingButton>
            </Box>

            {response && (
                <ShowResults sx={{ mt: '5rem' }} results={response.results} />
            )}
        </main>
    );
}
