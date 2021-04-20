import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';

/*
interface IVector2 {
    x: number;
    y: number;
}

interface ITransform {
    position: IVector2;
    rotation: number;
    scale: IVector2;
}

interface IGameObject {
    transform: ITransform;
}

const useTransform = () => {
    return (
        useState<ITransform>({
            position: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 }
        })
    );
}

interface IBall {

}

enum KeyCodes {
    W = "KeyW",
    A = "KeyA",
    S = "KeyS",
    D = "KeyD"
}

const Ball: React.FC<IBall> = () => {
    const [ transform, setTransform ] = useTransform();

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            let moveDelta: IVector2 = { x: 0, y: 0 };
            switch (e.code) {
                case KeyCodes.A:
                    moveDelta.x = -5;
                    break;
                case KeyCodes.D:
                    moveDelta.x = 5;
                    break;
                case KeyCodes.W:
                    moveDelta.y = -5;
                    break;
                case KeyCodes.S:
                    moveDelta.y = 5;
                    break;
            }
            if (moveDelta != { x: 0, y: 0 }) {
                setTransform((prevTransform) => ({
                    ...prevTransform,
                    position: 
                    {
                        ...prevTransform.position,
                        x: prevTransform.position.x + moveDelta.x,
                        y: prevTransform.position.y + moveDelta.y
                    }
                }));
            }
        };
        document.addEventListener("keypress", handler);
        return (
            () => {
                document.removeEventListener("keypress", handler);
            }
        );
    }, [setTransform]);
    console.log(transform);
    return (
        <circle cx={transform.position.x} cy={transform.position.y} r="40" stroke="green" strokeWidth="4" fill="yellow" />
    );
}

interface IAvatar {
    targetPosition: IVector2
}

const Avatar: React.FC<IAvatar> = ( {targetPosition} ) => {
    const [ transform, setTransform ] = useTransform();
    const speed = 5
    useEffect(() => {
        let running = true;
        const update = () => {
            setTransform((prevTransform) => ({
                ...prevTransform,
                position: {
                    ...prevTransform.position,
                    x: prevTransform.position.x + (speed / 60),
                }
            }));

            if (running){
                window.requestAnimationFrame(update)
            }
        };
        window.requestAnimationFrame(update);
        return (() => {
            running = false;
        });
    }, [targetPosition, setTransform]);
    return (
        <circle cx={transform.position.x} cy={transform.position.y} r="40" stroke="green" strokeWidth="4" fill="yellow" />
    );
};
*/

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)

let app = new PIXI.Application({
    width: 1024,
    height: 1024
});

const bunny = PIXI.Sprite.from("bunny.jpg");
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.width / 2;

app.stage.addChild(bunny);

const basicText = new PIXI.Text('Basic text in pixi');
basicText.x = 50;
basicText.y = 100;

app.stage.addChild(basicText);
//asdf
app.ticker.add((delta) => {
    
});

interface IScene {
    width: number;
    height: number;
}

const Scene: React.FC<IScene> = ({width, height}) => {
    const pixiContainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (pixiContainer != undefined && pixiContainer.current != undefined){
            pixiContainer.current.appendChild(app.view);
        }
        /*return(() => {
            if (pixiContainer != undefined && pixiContainer.current != undefined){
                pixiContainer.current.removeChild(app.view);
            }
        })*/
    }, []);
    return (
        <div ref={pixiContainer}>

        </div>
    );
}

export default Scene;