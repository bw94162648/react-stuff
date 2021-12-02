
export const isFirstInstanceInArray = <T,>( value: T, index: number, theArray: Array<T> ): boolean =>
    theArray.indexOf( value ) === index;

export const haveIntersection = ( a1: string[], a2: string[] ) =>
    a1.some( it => a2.includes( it ) );
