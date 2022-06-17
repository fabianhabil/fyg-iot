const SwitchButton = (props) => {
    const checked = props.checked;
    const setChecked = props.setChecked;
    return (
        <>
            <div className="form-check form-switch d-flex justify-content-center" style={{ fontSize: "50px" }}>
                <input
                    style={{ padding: 0 }}
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={checked}
                    onClick={(e) => {
                        setChecked(e.target.checked);
                    }}
                />
            </div>
        </>
    );
};

export default SwitchButton;
