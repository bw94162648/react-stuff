import React, { ReactNode } from 'react';
import { Grid } from '@mui/material'

interface CardGridProps {
  items: Array<ReactNode>;
}

export const CardGrid = ( props: CardGridProps ) =>
  <Grid container spacing={ 2 }>
    { props.items.map( it => <Grid item>{ it }</Grid> ) }
  </Grid>