import React, { useState, ReactNode } from 'react';
// import CardActions from '@mui/material/CardActions';
import {
  Button,
  Card, CardContent, CardMedia,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Typography } from '@mui/material';
// import { ReactNode }from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import HttpIcon from '@mui/icons-material/Http';
import LabelIcon from '@mui/icons-material/Label';

// import './RefCard.css';

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

const ExpandButton = ( props: ExpandButtonProps ) =>
  <Button onClick={ props.onClick }>{ props.isExpanded ? <ExpandLessIcon/>: <ExpandMoreIcon/> }</Button>

interface LabelledValueProps {
  label: string;
  value: string;
}

export const LabelledValue = ( props: LabelledValueProps ) =>
  <Typography variant="body2">
    <Typography variant="body2"
        component="span">{ props.label }: </Typography>
    <Typography variant="body2" component="span"
        style={{ fontWeight: 600 }}>{ props.value }</Typography>
  </Typography>

interface ReferenceCardInfoItem {
  title: string;
  items?: Array<ReactNode>;
  href?: string;
  icon?: ReactNode;
}

interface MyListItemTextProps {
  primary: string;
  secondary?: string | ReactNode;
  secondaryEx?: string | ReactNode;
  onShowSecondaryExpanded?: ( value: boolean ) => void;
}

const MyListItemText = ( props: MyListItemTextProps ) =>
  <ListItemText primary={ props.primary }
      secondary={
          props.secondaryEx ?
            <>
              { props.secondary }
              { props.secondaryEx }
            </>
          : props.secondary
        }
    />

interface RefCardItemProps {
  icon?: ReactNode;
  title: string;
  secondaryField?: string | ReactNode;
  secondaryFieldHidable?: boolean;
  secondaryEx?: string | ReactNode;
}

export const RefCardItem = (props: RefCardItemProps ) => {
  const [ expanded, setExpanded ] = useState( false );
  const hidable = props.secondaryFieldHidable ?? !!props.secondaryEx;

  return (
    <ListItem disablePadding alignItems="flex-start">
      <ListItemIcon>{ props.icon || <InfoIcon/> }</ListItemIcon>
      <MyListItemText primary={ props.title }
          secondary={ props.secondaryField }
          secondaryEx={ expanded && props.secondaryEx }
        />
      { hidable &&
        <ExpandButton
          isExpanded={ expanded }
          onClick={ () => setExpanded( !expanded ) } />
      }
    </ListItem>
  )
}

interface Notes_RefCardItemProps extends RefCardItemProps {
  notes: string[]
}

export const Notes_RefCardItem = ( props: Notes_RefCardItemProps ) => {
  const [ show, setShow ] = useState( false );
  return (
    <ListItem disablePadding alignItems="flex-start">
      <ListItemIcon>{ props.icon || <InfoIcon/> }</ListItemIcon>
      <ListItemText primary={ props.title || 'Notes' }
          secondary= { show && <ul>{ props.notes.map( it => <li>{ it }</li> ) }</ul>}
          onClick={ () => setShow( !show ) }
        />
      <ExpandButton isExpanded={ show } onClick={ () => setShow( !show ) } />
    </ListItem>
  )
}

interface Link_RefCardItemProps extends RefCardItemProps {
  href: string;
}

export const LinkRefCardItem = ( props: Link_RefCardItemProps ) => {
  const [ expanded, setExpanded ] = useState( false );
  const hidable = props.secondaryFieldHidable ?? !!props.secondaryEx;

  return (
    <ListItem disablePadding alignItems="flex-start">
      <ListItemIcon>{ props.icon || <HttpIcon/> }</ListItemIcon>
      <ListItemButton component="a" target="_blank" rel="noreferrer"
          alignItems="flex-start"
          href={ props.href }
        >
        <MyListItemText primary={ props.title }
            secondary={ props.secondaryField }
            secondaryEx={ expanded && props.secondaryEx }
          />
      </ListItemButton>
      { hidable &&
        <ExpandButton
          isExpanded={ expanded }
          onClick={ () => setExpanded( !expanded ) } />
      }
    </ListItem>
  )
}

interface Tags_RefCardItemProps {
  tags: string[];
}

export const Tags_RefCardItem = ( props: Tags_RefCardItemProps ) =>
  <ListItem disablePadding>
    <ListItemIcon><LabelIcon/></ListItemIcon>
    <ListItemText>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.tags.join( ', ' ) }
      </Typography>
    </ListItemText>
  </ListItem>

export interface RefCardProps {
  primaryLabel: string;
  secondaryLabel?: string;
  image?: string;
  tags: string[]

  children: ReactNode;

  items?: Array<ReactNode>;
}

export const RefCard = ( props: RefCardProps ) =>
  <Card style={{
      maxWidth: '30w',
      width: '23rem',
      height: '100%',
    }}>
    <CardContent>
      { props.image &&
        <CardMedia component="img"
            image={ props.image }
            style={{ margin: 'auto', height: 48, width: 'auto' }}
          />
      }
      <Typography variant="h5" component="div">{ props.primaryLabel }</Typography>
      { props.secondaryLabel &&
        <Typography sx={{ mb: 1.5 }} color="text.secondary">{ props.secondaryLabel }</Typography>
      }
      <List>
        { props.children }
        <Tags_RefCardItem tags={ props.tags } />
      </List>
    </CardContent>
  </Card>

export interface InfoItem {
  primaryLabel: string;
  icon?: ReactNode;
}

export interface ListInfoItem extends InfoItem {
  items: string[];
}
const isListInfoItem = ( infoItem: InfoItem ): infoItem is ListInfoItem =>
  ( infoItem as ListInfoItem ).items !== undefined;


export interface LinkInfoItem extends InfoItem {
  href: string;
}
const isLinkInfoItem = ( infoItem: InfoItem ): infoItem is LinkInfoItem =>
  ( infoItem as LinkInfoItem ).href !== undefined;

// export interface RefCardProps {
//   primaryLabel: string;

//   image?: any;
//   details?: string;

//   tags: string[];

//   infoItems?: Array<InfoItem>;
// }

// export default function RefCard( props: RefCardProps ) {
//   return (
//     <Card sx={{
//         maxWidth: '25vw',
//         width: '25rem',
//         height: '100%' }}>
//       <CardContent>
//         { props.image &&
//           <CardMedia sx={{ height: 80, width: '100%' }}
//             component="img"
//             height="80"
//             image={ props.image }
//           />
//         }
//         <Typography gutterBottom variant="h5" component="div">{ props.primaryLabel }</Typography>
//         { props.details &&
//           <Typography variant="body2" color="text.secondary">{ props.details }</Typography>
//         }
//         <List>
//           { props.infoItems?.map( it =>
//               <ListItem disablePadding>
//                 { isListInfoItem( it ) ?
//                     <ul>{ it.items.map( item => (<li>{item}</li>) ) }</ul>
//                   : isLinkInfoItem( it ) ?
//                     <>
//                       <ListItemIcon><HttpIcon/></ListItemIcon>
//                       <ListItemButton component="a" target="_blank" rel="noreferrer" href={it.href}>
//                         <ListItemText primary={it.primaryLabel}></ListItemText>
//                       </ListItemButton>
//                     </>
//                   : <div></div>
//                 }
//               </ListItem> )
//           }
//           <ListItem disablePadding>
//             <ListItemIcon><LabelIcon/></ListItemIcon>
//             <ListItemText secondary={ props.tags.join( ', ' ) }></ListItemText>
//           </ListItem>
//         </List>
//       </CardContent>
//     </Card>
//   );
// }
