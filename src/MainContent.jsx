import React, {useState} from "react";
import CheckListItem from "./CheckList";

const Content = () => {
    let toDoList = [
        {id:1, label: "Work", text: "Work",  checked: false },
        {id:2, label: "Read a Book", text: "Read a book", checked: false },
        {id:3, label: "GoToGym", text: "Go To Gym", checked:false },
    ];
    const [checkedItems, setCheckedItems] = useState(toDoList);
    
    const handleUserClick = (e) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[e.target.id].checked =!newCheckedItems[e.target.id].checked;
        setCheckedItems(newCheckedItems);  
        console.log(newCheckedItems);   
    };
    const mappingToDoList = checkedItems.map(({ label, id, text, checked }) => (
        <CheckListItem  label={label} id={id} text={text} checked={checked} />
    ));
    return <>{mappingToDoList}</>   
};

export default Content;