export interface ITransformProps {
    position: number,
}

interface ITransformMethods {
    /**
     * Translate move the xy
     * @param delta the change in xy
     */
    translate(delta: any):void,
}

class Transform implements ITransformMethods{
    private position: number
    
    constructor({position}: ITransformProps){
        this.position = position
    }

    public translate(delta: any){}
}

export default Transform;