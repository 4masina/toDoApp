import React from "react";

const CheckListItem = ({ id, label, text, completed, handleUserClick, handleDeleteItem }) => {
    return (
        <div key={id}>
            <label htmlFor={label}>{text}</label>
            <input onChange = {(e) => handleUserClick(e)}
            type="checkbox" name={label} checked={completed} />
            <button onClick={() => handleDeleteItem(id)}>Delete</button>
            
        </div>
    );


 const checkListComponents = checkListComponents.map((item) => (
    <CheckListItem
        key={item.id}
        id={item.id}
        label={item.label}
        text={item.text}
        completed={item.completed}
        handleUserClick={handleUserClick}
        handleDeleteItem={handleDeleteItem}
    />
 ));
 return (
    <main className='main-container'>
        {checkListComponents}
        <input type='text' placeholder='Add new item...' onChange={handleAddItemChange} value={newItemText} />
        <button onClick={handleAddItem}>Add</button>
    </main>
)};
export default CheckListItem;