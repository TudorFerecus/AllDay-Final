import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Person from '@mui/icons-material/Person'

function ListItemPerson({name})
{
    return (
    <ListItem>
        <ListItemButton variant="plain">
            <ListItemDecorator><Person /></ListItemDecorator>
            <ListItemContent>{name}</ListItemContent>
        </ListItemButton>
    </ListItem>
    )
}

export default function StickyList({selectedMaxHeight, users}) {
    let maxHeight = '18dvh';
    if(selectedMaxHeight) maxHeight = selectedMaxHeight;  
    return (
        <List sx={{
            maxHeight: {maxHeight},
            minHeight: '2dvh',
            overflow: 'auto',
            marginLeft: '1%'
        }}>
            {
                users.map((user) => (
                    <ListItemPerson name={user} key={user}/>
                ))
            }
        </List>    
    )
}