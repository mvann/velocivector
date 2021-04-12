import React, { useState, useEffect } from 'react';
import { updateSourceFile } from 'typescript';

interface IScene {
    width: number;
    height: number;
}

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

const Avatar: React.FC<IAvatar> = ( {targetPosition: IVector2} ) => {
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

const Scene: React.FC<IScene> = ({width, height}) => {
    return (
        <div>
            <svg width={width} height={height}>
                <Ball />
            </svg>
        </div>
    );
}

export default Scene;