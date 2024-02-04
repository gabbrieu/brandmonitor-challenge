import { List, ListItem, ListItemText } from '@mui/material';
import { ISearchResponseProps } from '../utils/types';

export default function ShowResults({
    sx,
    results,
}: ISearchResponseProps): JSX.Element {
    return (
        <List sx={sx}>
            {results.map((e, idx) => (
                <ListItem key={idx}>
                    <ListItemText primary={e.result} />
                </ListItem>
            ))}
        </List>
    );
}
