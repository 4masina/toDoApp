import React from "react";

const CheckListItem = ({ id, label, text, checked, handleUserClick }) => {
    return (
        <div key={id}>
            <label htmlFor={label}>{text}</label>
            <input onChange = {e => handleUserClick(e)}
            type="checkbox" name={label} checked={checked} />
           
        </div>
    );
};

export default CheckListItem;