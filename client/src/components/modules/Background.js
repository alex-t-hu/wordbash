import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";


import "../../utilities.css";


import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

/**
 * Define the "App" component
 */
const Background = (props) => {

    const particlesInit = useCallback(async engine => {
        // console.logengine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <div className="-z-20">
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: `${props.bg_color}`,
                        },
                        opacity: 1,
                    },
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            // onClick: {
                            //     enable: true,
                            //     mode: "push",
                            // },
                            // onHover: {
                            //     enable: true,
                            //     mode: "repulse",
                            // },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: `#BEE9B6`,
                        },
                        // links: {
                        //     color: "#ffffff",
                        //     distance: 150,
                        //     enable: true,
                        //     opacity: 0.5,
                        //     width: 1,
                        // },
                        collisions: {
                            enable: false,
                        },
                        move: {
                            directions: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 2,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 30,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                            stroke: { width: 0, color: "white"},
                            image: { src: {},
                             width: 50, height: 50 }
                        },
                        size: {
                            value: { min: 20, max: 30 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
};
export default Background;


