import React, { useState } from 'react';
import { TaggedPropFuncComp } from './PropFuncComp';
import { haveIntersection, isFirstInstanceInArray } from '../utils/array-utils';
import {
    Button, Grid,
  } from '@mui/material';

interface TaggedDeckProps {
  cards: Array<TaggedPropFuncComp<any>>;
}

export const TaggedDeck = ( props: TaggedDeckProps ) => {
  const [ filters, setFilters ] =  useState<string[]>( [] );

  const tags = props.cards
      .flatMap( it => it.props.tags )
      .filter( isFirstInstanceInArray )
      .sort();

  const filteredCards = props.cards
      .filter( it => filters.length === 0 || haveIntersection( filters, it.props.tags ) );

  return (
    <>
      <Button onClick={ ()=>setFilters( [] ) }>Clear</Button>
      { tags.map( it =>
          <Button
              variant={ haveIntersection( [ it ], filters ) ? 'contained': 'outlined' }
              onClick={() => setFilters( [ it ] )}>{ it }</Button>
        )
      }
      <Grid container spacing={ 2 }>
        { filteredCards.map( it => <Grid item>{ it.func( it.props ) }</Grid> ) }
      </Grid>
    </>
  );
}