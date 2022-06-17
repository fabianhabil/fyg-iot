import { Tagline, TagLineWrap } from "../Micro/Micro";
import SwitchButton from "../Micro/SwitchButton";
import React, { useState, useEffect } from "react";

const Sensor = () => {
    const [toggle, setToggle] = useState(null);
    const functionToggle = (e) => {
        setToggle(e);
    };

    return (
        <>
            <div className="row min-vh-100 align-items-center text-black pt-md-2 pb-md-4">
                <div className="col-12 mt-5 d-flex flex-column align-items-center">
                    <TagLineWrap className="text-center">
                        <Tagline style={{ margin: 0 }}>Turn On / Turn Off Your Photo Sensor!</Tagline>
                    </TagLineWrap>
                    <SwitchButton checked={toggle} setChecked={functionToggle} />
                </div>
            </div>
        </>
    );
};

export default Sensor;
