import React, { ReactNode } from 'react';

export interface PropFuncComp<P> {
  props: P;
  func: (props: P) => ReactNode;
}

export interface Tagged {
  tags: string[];
}

export interface TaggedPropFuncComp<P extends Tagged> extends PropFuncComp<P>{
}