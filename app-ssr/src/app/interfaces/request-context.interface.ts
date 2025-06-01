export interface RequestContext {
    providers: Array<Provide>
}

interface Provide {
    provide: string,
    useValue: any,
}